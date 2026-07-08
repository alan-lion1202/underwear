"use client";

import type { ChangeEvent, ReactNode } from "react";
import { Fragment, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Columns3, Download, Search, Upload } from "lucide-react";
import { downloadCsv, parseCsv, toCsv } from "@/lib/csv";
import { StatusPill } from "@/components/StatusPill";

type Row = { id: number };
type Column<T extends Row> = {
  key: keyof T;
  label: string;
  render?: (row: T) => ReactNode;
};
type FilterConfig<T extends Row> = {
  key: keyof T;
  label: string;
  type?: "value" | "array" | "boolean";
};

export function DataTable<T extends Row>({
  title,
  rows,
  columns,
  getRowDetail,
  statusKey,
  statusOptions,
  tagKey,
  filters = [],
  searchPlaceholder,
  exportName,
  templateHeaders
}: {
  title: string;
  rows: T[];
  columns: Column<T>[];
  getRowDetail?: (row: T) => ReactNode;
  statusKey?: keyof T;
  statusOptions?: string[];
  tagKey?: keyof T;
  filters?: FilterConfig<T>[];
  searchPlaceholder: string;
  exportName: string;
  templateHeaders?: string[];
}) {
  const [data, setData] = useState<T[]>(rows);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [tag, setTag] = useState("All");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showColumns, setShowColumns] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<string[]>(() => columns.map((column) => String(column.key)));
  const inputRef = useRef<HTMLInputElement>(null);
  const visibleColumns = columns.filter((column) => visibleKeys.includes(String(column.key)));

  const statuses = useMemo(() => statusOptions ?? uniqueValues(data, statusKey), [data, statusKey, statusOptions]);
  const tags = useMemo(() => uniqueTags(data, tagKey), [data, tagKey]);
  const filterOptions = useMemo(() => {
    return filters.reduce<Record<string, string[]>>((acc, filter) => {
      acc[String(filter.key)] = uniqueFilterValues(data, filter);
      return acc;
    }, {});
  }, [data, filters]);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return data.filter((row) => {
      const record = row as Record<string, unknown>;
      const textMatch = !normalized || Object.values(record).join(" ").toLowerCase().includes(normalized);
      const statusMatch = !statusKey || status === "All" || String(row[statusKey]) === status;
      const rawTags = tagKey ? row[tagKey] : [];
      const tagValues = Array.isArray(rawTags) ? rawTags.map(String) : [];
      const tagMatch = tag === "All" || tagValues.includes(tag);
      const filtersMatch = filters.every((filter) => {
        const selected = filterValues[String(filter.key)] ?? "All";
        if (selected === "All") return true;
        return getFilterValues(row, filter).includes(selected);
      });
      return textMatch && statusMatch && tagMatch && filtersMatch;
    });
  }, [data, filterValues, filters, query, status, statusKey, tag, tagKey]);

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const imported = parseCsv(text).map((row, index) => coerceImportedRow(row, index + 1)) as T[];
    setData(imported);
    event.target.value = "";
  };

  return (
    <section className="tableBlock">
      <div className="tableTop">
        <div>
          <h2>{title}</h2>
          <span>{filtered.length} / {data.length} records 记录</span>
        </div>
        <div className="tableActions">
          <button className="iconButton" type="button" aria-label="Import CSV" title="Import CSV 导入" onClick={() => inputRef.current?.click()}>
            <Upload size={17} />
          </button>
          <button className="iconButton" type="button" aria-label="Export CSV" title="Export CSV 导出" onClick={() => downloadCsv(exportName, toCsv(filtered))}>
            <Download size={17} />
          </button>
          {templateHeaders ? (
            <button className="templateButton" type="button" onClick={() => downloadCsv(exportName.replace(".csv", "-template.csv"), `${templateHeaders.join(",")}\n`)}>
              Template CSV 模板
            </button>
          ) : null}
          <button className="iconButton" type="button" aria-label="Columns" title="Columns 列显示" onClick={() => setShowColumns((value) => !value)}>
            <Columns3 size={17} />
          </button>
          <input ref={inputRef} className="visuallyHidden" type="file" accept=".csv,text/csv" onChange={handleImport} />
        </div>
      </div>

      {showColumns ? (
        <div className="columnPicker" aria-label="Column visibility controls">
          {columns.map((column) => {
            const key = String(column.key);
            return (
              <label key={key}>
                <input
                  checked={visibleKeys.includes(key)}
                  onChange={(event) => {
                    setVisibleKeys((current) => event.target.checked ? [...current, key] : current.filter((item) => item !== key));
                  }}
                  type="checkbox"
                />
                <span>{column.label}</span>
              </label>
            );
          })}
        </div>
      ) : null}

      <div className="filters">
        <label className="searchBox">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} />
        </label>
        {statusKey ? (
          <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">
            <option value="All">All status 全部状态</option>
            {statuses.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        ) : null}
        {tagKey ? (
          <select value={tag} onChange={(event) => setTag(event.target.value)} aria-label="Filter by tag">
            <option value="All">All tags 全部标签</option>
            {tags.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        ) : null}
        {filters.map((filter) => {
          const key = String(filter.key);
          return (
            <select
              value={filterValues[key] ?? "All"}
              onChange={(event) => setFilterValues((current) => ({ ...current, [key]: event.target.value }))}
              aria-label={`Filter by ${filter.label}`}
              key={key}
            >
              <option value="All">{filter.label}: All 全部</option>
              {(filterOptions[key] ?? []).map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
          );
        })}
      </div>

      <div className="tableScroll">
        <table>
          <thead>
            <tr>
              {visibleColumns.map((column, index) => <th className={index === 0 ? "stickyCell" : undefined} key={String(column.key)}>{column.label}</th>)}
              {getRowDetail ? <th>Detail 详情</th> : null}
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((row) => (
                <Fragment key={row.id}>
                  <tr>
                    {visibleColumns.map((column, index) => (
                      <td className={index === 0 ? "stickyCell" : undefined} key={String(column.key)}>{column.render ? column.render(row) : renderCell(row[column.key])}</td>
                    ))}
                    {getRowDetail ? (
                      <td>
                        <button className="detailToggle" type="button" onClick={() => setExpandedId((current) => current === row.id ? null : row.id)}>
                          {expandedId === row.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          View
                        </button>
                      </td>
                    ) : null}
                  </tr>
                  {getRowDetail && expandedId === row.id ? (
                    <tr className="detailRow">
                      <td colSpan={visibleColumns.length + 1}>{getRowDetail(row)}</td>
                    </tr>
                  ) : null}
                </Fragment>
              ))
            ) : (
              <tr>
                <td className="emptyCell" colSpan={visibleColumns.length + (getRowDetail ? 1 : 0)}>
                  No verified records yet / 暂无已核验记录。Use CSV import 导入，或继续抓取 official source 官方来源。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function Tags({ values }: { values: string[] }) {
  return (
    <div className="tagList">
      {values.map((value) => <span key={value}>{value}</span>)}
    </div>
  );
}

export function ScoreBar({ value }: { value: number }) {
  return (
    <div className="scoreCell">
      <div><span style={{ width: `${value}%` }} /></div>
      <strong>{value}</strong>
    </div>
  );
}

function renderCell(value: unknown) {
  if (Array.isArray(value)) return <Tags values={value.map(String)} />;
  if (typeof value === "string" && isStatusLike(value)) return <StatusPill value={value} />;
  return String(value ?? "");
}

function isStatusLike(value: string) {
  return ["Active", "Emerging", "Monitor", "Dormant", "Validated", "Testing", "Gap", "New", "Researching", "Contacted", "Replied", "Qualified", "Not Fit", "Partner", "Nurture", "Growing", "Stable", "Declining", "Open", "Sizing", "Pilot", "Parked", "High", "Medium", "Low"].includes(value);
}

function uniqueValues<T extends Row>(rows: T[], key?: keyof T) {
  if (!key) return [];
  return Array.from(new Set(rows.map((row) => String(row[key])).filter(Boolean))).sort();
}

function uniqueTags<T extends Row>(rows: T[], key?: keyof T) {
  if (!key) return [];
  return Array.from(new Set(rows.flatMap((row) => (Array.isArray(row[key]) ? (row[key] as unknown[]).map(String) : [])))).sort();
}

function uniqueFilterValues<T extends Row>(rows: T[], filter: FilterConfig<T>) {
  return Array.from(new Set(rows.flatMap((row) => getFilterValues(row, filter)))).filter(Boolean).sort();
}

function getFilterValues<T extends Row>(row: T, filter: FilterConfig<T>) {
  const value = row[filter.key];
  if (filter.type === "boolean") return [String(Boolean(value))];
  if (filter.type === "array" || Array.isArray(value)) return Array.isArray(value) ? value.map(String) : [];
  return [String(value ?? "")];
}

function coerceImportedRow(row: Record<string, string>, fallbackId: number) {
  return Object.entries(row).reduce<Record<string, unknown> & Row>((record, [key, value]) => {
    const looksLikeList = value.includes("|");
    const normalized = value.trim().toLowerCase();
    const numeric = Number(value);
    record[key] = key === "id" ? numeric || fallbackId : looksLikeList ? value.split("|").map((item) => item.trim()).filter(Boolean) : normalized === "true" ? true : normalized === "false" ? false : Number.isFinite(numeric) && value.trim() !== "" ? numeric : value;
    return record;
  }, { id: fallbackId });
}
