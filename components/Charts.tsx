import { StatusPill } from "@/components/StatusPill";

type Distribution = Record<string, number>;

export function getDistribution<T>(rows: T[], accessor: (row: T) => string): Distribution {
  return rows.reduce<Distribution>((acc, row) => {
    const key = accessor(row);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

export function DistributionBars({ title, data }: { title: string; data: Distribution }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, value]) => value), 1);

  return (
    <section className="chartBlock">
      <div className="chartHeader">
        <h2>{title}</h2>
        <span className="chartCount">{entries.length} groups / 分组</span>
      </div>
      <div className="barList">
        {entries.map(([label, value]) => (
          <div className="barRow" key={label}>
            <span>{label}</span>
            <div className="barTrack" aria-label={`${label}: ${value}`}>
              <div className="barFill" style={{ width: `${(value / max) * 100}%` }} />
            </div>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DonutChart({ title, data }: { title: string; data: Distribution }) {
  const entries = Object.entries(data);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  let offset = 25;
  const segments = entries.map(([label, value], index) => {
    const length = total ? (value / total) * 100 : 0;
    const segment = { label, value, length, offset, color: chartColors[index % chartColors.length] };
    offset -= length;
    return segment;
  });

  return (
    <section className="chartBlock">
      <div className="chartHeader">
        <h2>{title}</h2>
        <span className="chartCount">{total} records / 记录</span>
      </div>
      <div className="donutWrap">
        <svg viewBox="0 0 42 42" className="donut" role="img" aria-label={title}>
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#eef1f5" strokeWidth="5" />
          {segments.map((segment) => (
            <circle
              cx="21"
              cy="21"
              fill="transparent"
              key={segment.label}
              r="15.915"
              stroke={segment.color}
              strokeDasharray={`${segment.length} ${100 - segment.length}`}
              strokeDashoffset={segment.offset}
              strokeWidth="5"
            />
          ))}
        </svg>
        <div className="legend">
          {segments.map((segment) => (
            <div key={segment.label}>
              <i style={{ background: segment.color }} />
              <span>{segment.label}</span>
              <strong>{segment.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const chartColors = ["#3267d6", "#1f9d75", "#ef9b20", "#d94f70", "#6d5bd0", "#1898a5", "#6c7788"];
