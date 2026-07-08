"use client";

import Link from "next/link";
import { DataTable, ScoreBar, Tags } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { DistributionBars, getDistribution } from "@/components/Charts";
import { SummaryCards } from "@/components/SummaryCards";
import { brandCsvHeaders, brands } from "@/data/seed";

export default function BrandDatabasePage() {
  const highReference = brands.filter((brand) => brand.productReferenceValueScore >= 85).length;
  const highPotential = brands.filter((brand) => brand.customerPotentialScore >= 80).length;
  const verified = brands.filter((brand) => brand.dataQuality === "Verified").length;

  return (
    <div className="pageStack">
      <PageHeader
        eyebrow="Brand Database 品牌库"
        title="Brand Research Database 品牌研究库"
        description="用于 manual product research、contact discovery 和 B2B customer development 的品牌资料表。"
        metric={`${brands.length} brands`}
      />
      <SummaryCards
        cards={[
          { label: "High reference value 高参考价值", value: String(highReference), note: "score >= 85" },
          { label: "High customer potential 高客户潜力", value: String(highPotential), note: "score >= 80" },
          { label: "Verified brands 已核验品牌", value: String(verified), note: "dataQuality = Verified" }
        ]}
      />
      <div className="contentGrid">
        <DistributionBars title="Brand country distribution 国家分布" data={getDistribution(brands, (brand) => brand.country)} />
        <DataTable
          title="Brand Database 品牌库"
          rows={brands}
          exportName="brand-database.csv"
          searchPlaceholder="Search brands, contacts, countries, categories... 搜索品牌/联系人/国家/品类"
          filters={[
            { key: "country", label: "Country 国家" },
            { key: "categories", label: "Category 品类", type: "array" },
            { key: "dataQuality", label: "Data Quality 数据质量" },
            { key: "wholesaleAvailable", label: "Wholesale 批发", type: "boolean" },
            { key: "priceRange", label: "Price 价格" }
          ]}
          templateHeaders={brandCsvHeaders}
          getRowDetail={(row) => (
            <div className="rowDetail">
              <div className="rowDetailBlock">
                <h3>Contacts 联系方式</h3>
                <p>Contact Email: {row.contactEmail}</p>
                <p>Wholesale Email: {row.wholesaleEmail}</p>
                <p>Contact Page: <ExternalLink href={row.contactPage} label="Open" /></p>
              </div>
              <div className="rowDetailBlock">
                <h3>Social Accounts 社媒</h3>
                <p>Instagram: <ExternalLink href={row.instagram} label="Open" /></p>
                <p>Facebook: <ExternalLink href={row.facebook} label="Open" /></p>
                <p>LinkedIn: <ExternalLink href={row.linkedin} label="Open" /></p>
              </div>
              <div className="rowDetailBlock">
                <h3>Evidence 证据</h3>
                <p>Manufacturing: {row.manufacturingSignal}</p>
                <p>Sources: {row.sourceUrls.join(" | ")}</p>
                <p>Notes: {row.notes}</p>
              </div>
            </div>
          )}
          columns={[
            { key: "brandName", label: "Brand 品牌", render: (row) => <Link className="sourceLink" href={`/brand-database/${row.slug}`}>{row.brandName}</Link> },
            { key: "country", label: "Country 国家" },
            { key: "brandPositioning", label: "Positioning 定位" },
            { key: "priorityProductCategories", label: "Main Categories 主要品类", render: (row) => <Tags values={row.priorityProductCategories} /> },
            { key: "priceRange", label: "Price Range 价格带" },
            { key: "productReferenceValueScore", label: "Reference Score 参考分", render: (row) => <ScoreBar value={row.productReferenceValueScore} /> },
            { key: "customerPotentialScore", label: "Customer Score 客户分", render: (row) => <ScoreBar value={row.customerPotentialScore} /> },
            { key: "dataQuality", label: "Data Quality 数据质量" },
            { key: "lastChecked", label: "Last Checked 检查日期" }
          ]}
        />
      </div>
    </div>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  if (!isKnown(href)) return <span className="mutedText">Unknown</span>;
  return <a className="sourceLink" href={href} target="_blank" rel="noreferrer">{label}</a>;
}

function Email({ value }: { value: string }) {
  if (!isKnown(value)) return <span className="mutedText">Unknown</span>;
  return <a className="sourceLink" href={`mailto:${value}`}>{value}</a>;
}

function isKnown(value: string) {
  return Boolean(value && value !== "Unknown" && value !== "Not checked");
}
