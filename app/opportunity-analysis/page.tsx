"use client";

import { DataTable, Tags } from "@/components/DataTable";
import { DistributionBars, DonutChart, getDistribution } from "@/components/Charts";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { opportunities } from "@/data/seed";

export default function OpportunityAnalysisPage() {
  const activeSizing = opportunities.filter((item) => item.status === "Sizing" || item.status === "Pilot" || item.status === "Open").length;
  const high = opportunities.filter((item) => item.priority === "High").length;
  const markets = new Set(opportunities.map((item) => item.market)).size;

  return (
    <div className="pageStack">
      <PageHeader
        eyebrow="Opportunity Analysis 机会分析"
        title="Market White Space & Go-to-Market Bets 市场机会"
        description="把 brand 品牌、product 产品、social 社媒和 B2B signals 信号转化为可排序的 opportunity themes 机会主题，用于 action planning 行动规划。"
        metric={`${opportunities.length} themes`}
      />
      <SummaryCards
        cards={[
          { label: "High priority 高优先级", value: String(high), note: "priority = High" },
          { label: "Active sizing 机会评估中", value: String(activeSizing), note: "open / sizing / pilot" },
          { label: "Markets covered 覆盖市场", value: String(markets), note: "verified market spread" }
        ]}
      />
      <div className="chartGrid">
        <DonutChart title="Opportunity priority distribution 机会优先级" data={getDistribution(opportunities, (item) => item.priority)} />
        <DistributionBars title="Opportunity segment distribution 机会细分" data={getDistribution(opportunities, (item) => item.segment)} />
      </div>
      <DataTable
        title="Opportunity Analysis Table 机会分析表"
        rows={opportunities}
        exportName="opportunity-analysis.csv"
        searchPlaceholder="Search opportunities, markets, evidence... 搜索机会/市场/证据"
        statusKey="status"
        tagKey="tags"
        columns={[
          { key: "opportunity", label: "Opportunity 机会" },
          { key: "segment", label: "Segment 细分" },
          { key: "market", label: "Market 市场" },
          { key: "priority", label: "Priority 优先级" },
          { key: "status", label: "Status 状态" },
          { key: "tags", label: "Tags 标签", render: (row) => <Tags values={row.tags} /> },
          { key: "evidence", label: "Evidence 证据" }
        ]}
      />
    </div>
  );
}
