"use client";

import Link from "next/link";
import { DataTable, ScoreBar } from "@/components/DataTable";
import { DistributionBars, DonutChart, getDistribution } from "@/components/Charts";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { productCsvHeaders, products } from "@/data/seed";

export default function ProductResearchPage() {
  const gaps = products.filter((product) => product.status === "Gap").length;
  const avgOpportunity = Math.round(products.reduce((sum, product) => sum + product.opportunity, 0) / products.length);
  const checkedMaterials = new Set(products.map((product) => product.material).filter((material) => material && material !== "Not checked" && material !== "Unknown")).size;

  return (
    <div className="pageStack">
      <PageHeader
        eyebrow="Product Research 产品研究"
        title="Product Research Tracker 产品研究表"
        description="比较 category、fit、fabric、support features、MSRP 和 source evidence，用于手动选品研究。"
        metric={`${products.length} SKUs`}
      />
      <SummaryCards
        cards={[
          { label: "Average opportunity 平均机会分", value: `${avgOpportunity}%`, note: "weighted research signal" },
          { label: "Category gaps 品类空白", value: String(gaps), note: "status = Gap" },
          { label: "Material themes 材质主题", value: String(checkedMaterials), note: "tracked material records" }
        ]}
      />
      <div className="chartGrid">
        <DonutChart title="Product category distribution 产品品类分布" data={getDistribution(products, (product) => product.category)} />
        <DistributionBars title="Price range distribution 价格带分布" data={getDistribution(products, (product) => product.priceRange)} />
      </div>
      <DataTable
        title="Product Research Table 产品研究表"
        rows={products}
        exportName="product-research.csv"
        templateHeaders={productCsvHeaders}
        searchPlaceholder="Search products, fit, fabric, support... 搜索产品/版型/面料/功能"
        statusKey="status"
        tagKey="tags"
        getRowDetail={(row) => (
          <div className="rowDetail">
            <div className="rowDetailBlock">
              <h3>Construction 结构</h3>
              <p>Collection: {row.collection}</p>
              <p>Composition: {row.composition}</p>
              <p>Colors: {row.colors.join(" | ")}</p>
              <p>Fit / rise / inseam: {row.fit} / {row.rise} / {row.inseam}</p>
              <p>Waistband: {row.waistband}</p>
              <p>Construction: {row.construction}</p>
              <p>Packing / Tucking: {row.packingSupport} / {row.tuckingSupport}</p>
            </div>
            <div className="rowDetailBlock">
              <h3>Market Notes 市场备注</h3>
              <p>Key selling points: {row.keySellingPoints}</p>
              <p>Review pain points: {row.reviewPainPoints}</p>
              <p>Bestseller signal: {row.bestsellerSignal}</p>
              <p>Notes: {row.notes}</p>
            </div>
            <div className="rowDetailBlock">
              <h3>Sources 来源</h3>
              <p>Product URL: <SafeExternalLink href={row.productUrl} label="Open" /></p>
              <p>Image URL: {row.productImageUrl}</p>
              <p>Source URLs: {row.sourceUrls.join(" | ")}</p>
            </div>
          </div>
        )}
        columns={[
          { key: "product", label: "Product 产品", render: (row) => isKnown(row.productUrl) ? <Link className="sourceLink" href={row.productUrl} target="_blank" rel="noreferrer">{row.product}</Link> : row.product },
          { key: "brand", label: "Brand 品牌", render: (row) => <Link className="sourceLink" href={`/brand-database/${row.brandSlug}`}>{row.brand}</Link> },
          { key: "category", label: "Category 品类" },
          { key: "targetUser", label: "Target User 目标用户" },
          { key: "price", label: "Price 价格" },
          { key: "fabric", label: "Fabric 面料" },
          { key: "sizeRange", label: "Sizes 尺码" },
          { key: "marketDemandScore", label: "Market Demand 需求", render: (row) => <ScoreBar value={row.marketDemandScore} /> },
          { key: "manufacturingDifficulty", label: "Mfg Difficulty 生产难度" },
          { key: "samplePriorityScore", label: "Sample Priority 样品优先级", render: (row) => <ScoreBar value={row.samplePriorityScore} /> }
        ]}
      />
    </div>
  );
}

function SafeExternalLink({ href, label }: { href: string; label: string }) {
  if (!isKnown(href)) return <span className="mutedText">Unknown</span>;
  return <Link className="sourceLink" href={href} target="_blank" rel="noreferrer">{label}</Link>;
}

function isKnown(value: string) {
  return Boolean(value && value !== "Unknown" && value !== "Not checked");
}
