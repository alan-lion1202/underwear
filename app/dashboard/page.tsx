"use client";

import Link from "next/link";
import { DistributionBars, DonutChart, getDistribution } from "@/components/Charts";
import { ScoreBar } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { brands, leads, products, type Product } from "@/data/seed";

export default function DashboardPage() {
  const productVerifiedBrands = brands.filter((brand) => brand.productDataVerified).length;
  const recordsNeedingResearch = brands.filter((brand) => brand.dataQuality === "Needs Research").length;
  const sourceUrlCount = brands.reduce((sum, brand) => sum + brand.sourceUrls.length, 0) + products.reduce((sum, product) => sum + product.sourceUrls.length, 0);
  const categoryDistribution = brands.reduce<Record<string, number>>((acc, brand) => {
    brand.priorityProductCategories.forEach((category) => {
      acc[category] = (acc[category] ?? 0) + 1;
    });
    return acc;
  }, {});
  const fabricDistribution = products.reduce<Record<string, number>>((acc, product) => {
    if (clean(product.fabric)) acc[product.fabric] = (acc[product.fabric] ?? 0) + 1;
    return acc;
  }, {});
  const productCategoryDistribution = getDistribution(products, (product) => product.category);
  const priceDistribution = getDistribution(products, (product) => product.priceRange);
  const marketTrends = Object.entries(categoryDistribution)
    .map(([category, brandCoverage]) => ({
      category,
      brandCoverage,
      benchmarkCount: products.filter((product) => product.productCategory === category).length,
      avgDemand: average(products.filter((product) => product.productCategory === category).map((product) => product.marketDemandScore)),
      signal: getCategorySignal(category, brandCoverage, products.filter((product) => product.productCategory === category))
    }))
    .sort((a, b) => b.brandCoverage - a.brandCoverage || b.avgDemand - a.avgDemand)
    .slice(0, 6);
  const productOpportunities = products
    .slice()
    .sort((a, b) => b.samplePriorityScore - a.samplePriorityScore)
    .map((product) => ({
      product,
      knowledgeDepth: getKnowledgeDepth(product),
      recommendation: getRecommendation(product)
    }));
  const learningBrands = brands
    .slice()
    .sort((a, b) => b.productReferenceValueScore - a.productReferenceValueScore)
    .slice(0, 5);

  return (
    <div className="pageStack">
      <PageHeader
        eyebrow="Product Intelligence 产品情报"
        title="Product Intelligence Dashboard 产品决策看板"
        description="把 LGBTQ+ underwear 市场、产品和消费者信号转化为开发判断：什么产品值得做，为什么成功，以及下一步如何改进。"
        metric={`${products.length} benchmarks`}
      />
      <SummaryCards
        cards={[
          { label: "Priority categories 优先品类", value: String(Object.keys(categoryDistribution).length), note: "brand coverage signal" },
          { label: "Product benchmarks 产品基准", value: String(products.length), note: "real product-level records" },
          { label: "Product data verified 产品已核验品牌", value: String(productVerifiedBrands), note: "brand productDataVerified" },
          { label: "Source URLs 来源链接", value: String(sourceUrlCount), note: "brand + product evidence" },
          { label: "Needs research 待研究记录", value: String(recordsNeedingResearch), note: "dataQuality = Needs Research" },
          { label: "High B2B potential 高客户潜力", value: String(leads.filter((lead) => lead.priority === "High").length), note: "for customer development" }
        ]}
      />

      <section className="intelligenceSection">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Market Trend Intelligence 市场趋势</p>
            <h2>Category signals for product planning 品类开发信号</h2>
          </div>
          <Link className="sectionLink" href="/product-research">Open Product Research 产品研究</Link>
        </div>
        <div className="insightGrid">
          {marketTrends.map((trend) => (
            <article className="insightCard" key={trend.category}>
              <div className="insightTop">
                <h3>{trend.category}</h3>
                <span>{trend.brandCoverage} brands</span>
              </div>
              <InfoLine label="Benchmark records 产品记录" value={String(trend.benchmarkCount)} />
              <InfoLine label="Market demand 市场需求" value={trend.avgDemand ? `${trend.avgDemand}/100` : "Needs research"} />
              <p>{trend.signal}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="intelligenceSection">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Product Opportunity Center 产品机会中心</p>
            <h2>What to develop next 下一步做什么产品</h2>
          </div>
          <span className="sectionMeta">Sorted by sample priority / 按样品优先级排序</span>
        </div>
        <div className="opportunityList">
          {productOpportunities.map(({ product, knowledgeDepth, recommendation }) => (
            <article className="opportunityCard" key={product.id}>
              <div className="opportunityMain">
                <Link className="sourceLink" href={`/product-research/${product.id}`}>{product.productName}</Link>
                <span>{product.brandName} / {product.productCategory}</span>
              </div>
              <Metric label="Market Demand 需求" value={product.marketDemandScore} />
              <InfoLine label="Competition 竞争" value={product.competitiveIntensity} />
              <InfoLine label="Difficulty 难度" value={product.developmentDifficulty} />
              <InfoLine label="Knowledge Depth 知识深度" value={knowledgeDepth} />
              <strong className="recommendationBadge">{recommendation}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="intelligenceSection">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Brand Learning Value 品牌学习价值</p>
            <h2>Reference brands worth studying 值得研究的参考品牌</h2>
          </div>
          <Link className="sectionLink" href="/brand-database">Open Brand Database 品牌库</Link>
        </div>
        <div className="brandLearningGrid">
          {learningBrands.map((brand) => (
            <article className="brandLearningCard" key={brand.id}>
              <div className="insightTop">
                <Link className="sourceLink" href={`/brand-database/${brand.slug}`}>{brand.brandName}</Link>
                <span>{brand.productReferenceValueScore}/100</span>
              </div>
              <InfoLine label="Product innovation 产品创新" value={brand.brandPositioning} />
              <InfoLine label="Representative products 代表品类" value={brand.priorityProductCategories.join(" | ")} />
              <InfoLine label="Market influence 市场影响" value={brand.lgbtqRelevance} />
              <InfoLine label="Customer potential 客户潜力" value={`${brand.customerPotentialScore}/100`} />
            </article>
          ))}
        </div>
      </section>

      <div className="chartGrid">
        <DistributionBars title="Product category coverage 品类覆盖" data={categoryDistribution} />
        <DonutChart title="Benchmarked category mix 产品基准品类" data={productCategoryDistribution} />
        <DistributionBars title="Price range distribution 价格带" data={priceDistribution} />
        <DistributionBars title="Fabric DNA coverage 面料DNA覆盖" data={fabricDistribution} />
      </div>
    </div>
  );
}

function clean(value: string) {
  return value && value !== "Not checked" && value !== "Unknown";
}

function average(values: number[]) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function getCategorySignal(category: string, brandCoverage: number, benchmarks: Product[]) {
  if (!benchmarks.length) return "Brand coverage exists, but product-level benchmark evidence still needs research. 有品牌覆盖，但产品级证据仍需补齐。";
  const topProduct = benchmarks.slice().sort((a, b) => b.samplePriorityScore - a.samplePriorityScore)[0];
  return `${topProduct.brandName} ${topProduct.productName} provides current benchmark evidence. Brand coverage: ${brandCoverage}. 可作为该品类开发参考。`;
}

function getKnowledgeDepth(product: Product) {
  const fields = [product.price, product.fabric, product.composition, product.sizeRange, product.fit, product.rise, product.inseam, product.keySellingPoints, product.bestsellerSignal];
  const verified = fields.filter(clean).length;
  if (verified >= 7) return "High";
  if (verified >= 4) return "Medium";
  return "Needs research";
}

function getRecommendation(product: Product) {
  if (product.samplePriorityScore >= 90 && product.marketDemandScore >= 90) return "High Priority Development 高优先开发";
  if (product.samplePriorityScore >= 85) return "Develop after validation 验证后开发";
  return "Monitor / research more 继续研究";
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="miniInfo">
      <span>{label}</span>
      <strong>{clean(value) ? value : "Unknown"}</strong>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="miniMetric">
      <span>{label}</span>
      <ScoreBar value={value} />
    </div>
  );
}
