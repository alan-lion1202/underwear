"use client";

import Link from "next/link";
import { DataTable, ScoreBar } from "@/components/DataTable";
import { DonutChart, getDistribution } from "@/components/Charts";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { leads } from "@/data/seed";
import { StatusPill } from "@/components/StatusPill";

export default function B2BLeadsPage() {
  const qualified = leads.filter((lead) => lead.status === "Qualified").length;
  const highPriority = leads.filter((lead) => lead.priority === "High").length;

  return (
    <div className="pageStack">
      <PageHeader
        eyebrow="B2B Leads 客户线索"
        title="Customer Development Pipeline 客户开发管线"
        description="CRM-style lead tracker，用于管理 wholesale signal、contact path、outreach status 和 next follow-up。"
        metric={`${leads.length} leads`}
      />
      <SummaryCards
        cards={[
          { label: "High priority 高优先级", value: String(highPriority), note: "priority = High" },
          { label: "Qualified 已合格", value: String(qualified), note: "ready for next step" },
          { label: "Average fit 平均匹配度", value: `${Math.round(leads.reduce((sum, lead) => sum + lead.fitScore, 0) / leads.length)}%`, note: "B2B fit score" }
        ]}
      />
      <div className="chartGrid">
        <DonutChart title="Lead priority distribution 线索优先级分布" data={getDistribution(leads, (lead) => lead.priority)} />
        <section className="leadCardGrid" aria-label="B2B lead cards">
          {leads.map((lead) => (
            <article className="leadCard" key={lead.id}>
              <div className="leadCardTop">
                <div>
                  <span>{lead.country}</span>
                  <Link className="leadTitle" href={`/brand-database/${lead.brandSlug}`}>{lead.company}</Link>
                </div>
                <StatusPill value={lead.status} />
              </div>
              <div className="leadMeta">
                <span>Priority 优先级: <strong>{lead.priority}</strong></span>
                <span>Fit 匹配度: <strong>{lead.fitScore}</strong></span>
                <span>Buyer 买家: <strong>{lead.buyerType}</strong></span>
              </div>
              <div className="leadLinks">
                <SafeExternalLink href={lead.website} label="Website 官网" />
                <SafeExternalLink href={lead.contactPage} label="Contact 联系页" />
                <SafeExternalLink href={lead.instagram} label="Instagram" />
              </div>
              <p>{lead.nextStep}</p>
            </article>
          ))}
        </section>
      </div>
      <div>
        <DataTable
          title="B2B Lead List B2B线索表"
          rows={leads}
          exportName="b2b-leads.csv"
          searchPlaceholder="Search brands, contacts, status, next steps... 搜索品牌/联系人/状态/下一步"
          statusKey="status"
          statusOptions={["New", "Researching", "Contacted", "Replied", "Qualified", "Not Fit", "Partner"]}
          tagKey="tags"
          filters={[
            { key: "priority", label: "Priority 优先级" },
            { key: "country", label: "Country 国家" },
            { key: "buyerType", label: "Buyer Type 买家类型" }
          ]}
          columns={[
            { key: "company", label: "Company 公司", render: (row) => <Link className="sourceLink" href={`/brand-database/${row.brandSlug}`}>{row.company}</Link> },
            { key: "website", label: "Website 官网", render: (row) => <SafeExternalLink href={row.website} label="Website" /> },
            { key: "contactPage", label: "Contact Page 联系页", render: (row) => <SafeExternalLink href={row.contactPage} label="Contact" /> },
            { key: "status", label: "Status 状态" },
            { key: "priority", label: "Priority 优先级" },
            { key: "fitScore", label: "Fit Score 匹配度", render: (row) => <ScoreBar value={row.fitScore} /> },
            { key: "nextStep", label: "Next Step 下一步" },
            { key: "notes", label: "Notes 备注" }
          ]}
        />
      </div>
    </div>
  );
}

function SafeExternalLink({ href, label }: { href: string; label: string }) {
  if (!href || href === "Unknown" || href === "Not checked") return <span className="mutedText">Unknown</span>;
  return <Link className="sourceLink" href={href} target="_blank" rel="noreferrer">{label}</Link>;
}
