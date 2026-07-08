"use client";

import { DistributionBars, DonutChart, getDistribution } from "@/components/Charts";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { brands, leads, products } from "@/data/seed";

export default function DashboardPage() {
  const verifiedBrands = brands.filter((brand) => brand.websiteVerified && brand.productDataVerified && brand.contactVerified && brand.socialVerified).length;
  const highPriorityLeads = leads.filter((lead) => lead.priority === "High").length;
  const brandsWithContact = brands.filter((brand) => Boolean(clean(brand.contactEmail))).length;
  const brandsWithWholesale = brands.filter((brand) => brand.wholesaleAvailable || Boolean(clean(brand.wholesaleEmail))).length;
  const recordsNeedingResearch = brands.filter((brand) => brand.dataQuality === "Needs Research").length;
  const highReferenceBrands = brands.filter((brand) => brand.productReferenceValueScore >= 85).length;
  const highPotentialBrands = brands.filter((brand) => brand.customerPotentialScore >= 80).length;
  const sampleDevelopmentCandidates = products.filter((product) => product.samplePriorityScore >= 85).length;
  const categoryDistribution = brands.reduce<Record<string, number>>((acc, brand) => {
    brand.priorityProductCategories.forEach((category) => {
      acc[category] = (acc[category] ?? 0) + 1;
    });
    return acc;
  }, {});
  const fabricDistribution = products.reduce<Record<string, number>>((acc, product) => {
    acc[product.fabric] = (acc[product.fabric] ?? 0) + 1;
    return acc;
  }, {});
  const referenceRanking = Object.fromEntries(brands.slice().sort((a, b) => b.productReferenceValueScore - a.productReferenceValueScore).slice(0, 8).map((brand) => [brand.brandName, brand.productReferenceValueScore]));
  const customerRanking = Object.fromEntries(brands.slice().sort((a, b) => b.customerPotentialScore - a.customerPotentialScore).slice(0, 8).map((brand) => [brand.brandName, brand.customerPotentialScore]));
  const sampleRanking = Object.fromEntries(products.slice().sort((a, b) => b.samplePriorityScore - a.samplePriorityScore).slice(0, 8).map((product) => [product.productCategory, product.samplePriorityScore]));

  return (
    <div className="pageStack">
      <PageHeader
        eyebrow="Dashboard 总览"
        title="LGBTQ+ Underwear Market Intelligence 行业情报"
        description="用于手动 brand tracking、product comparison 和 B2B customer development 的研究工作台。"
        metric={`${brands.length} brands`}
      />
      <SummaryCards
        cards={[
          { label: "Total brands 品牌总数", value: String(brands.length), note: "Seed / imported records" },
          { label: "Verified brands 已核验", value: String(verifiedBrands), note: "Official-source checked" },
          { label: "High-priority B2B leads 高优先线索", value: String(highPriorityLeads), note: "priority = High" },
          { label: "High reference brands 高参考品牌", value: String(highReferenceBrands), note: "reference score >= 85" },
          { label: "High customer potential 高客户潜力", value: String(highPotentialBrands), note: "customer score >= 80" },
          { label: "Sample candidates 样品候选", value: String(sampleDevelopmentCandidates), note: "sample priority >= 85" },
          { label: "Needs research 待研究记录", value: String(recordsNeedingResearch), note: "dataQuality = Needs Research" },
          { label: "Products benchmarked 产品基准", value: String(products.length), note: "research records" }
        ]}
      />
      <div className="chartGrid">
        <DistributionBars title="Brand count by country 按国家" data={getDistribution(brands, (brand) => brand.country)} />
        <DistributionBars title="Brand count by category 按品类" data={categoryDistribution} />
        <DonutChart title="Lead priority distribution 线索优先级" data={getDistribution(leads, (lead) => lead.priority)} />
        <DonutChart title="Product category distribution 产品品类" data={getDistribution(products, (product) => product.category)} />
        <DistributionBars title="Product Reference Value ranking 产品参考价值" data={referenceRanking} />
        <DistributionBars title="Customer Potential ranking 客户潜力" data={customerRanking} />
        <DistributionBars title="Sample Priority ranking 样品优先级" data={sampleRanking} />
        <DistributionBars title="Fabric usage distribution 面料使用" data={fabricDistribution} />
      </div>
    </div>
  );
}

function clean(value: string) {
  return value && value !== "Not checked" && value !== "Unknown";
}
