"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { Tags } from "@/components/DataTable";
import { DistributionBars, getDistribution } from "@/components/Charts";
import { brands } from "@/data/seed";

export default function BrandTonePage() {
  const archetypes = new Set(brands.map((brand) => brand.toneProfile.archetype)).size;
  const allTags = new Set(brands.flatMap((brand) => brand.toneProfile.toneTags)).size;
  const fullyVerified = brands.filter((brand) => brand.websiteVerified && brand.productDataVerified && brand.contactVerified && brand.socialVerified).length;

  return (
    <div className="pageStack">
      <PageHeader
        eyebrow="Brand Intelligence 品牌情报"
        title="Positioning & Tone Classification 定位与调性"
        description="品牌调性视图：按 archetype、tone tags、visual language 和 customer persona 分类品牌。"
        metric={`${brands.length} brands`}
      />
      <SummaryCards
        cards={[
          { label: "Fully verified brands 完整核验", value: String(fullyVerified), note: "website + product + contact + social" },
          { label: "Tone archetypes 调性原型", value: String(archetypes), note: "brand-level classification" },
          { label: "Tone tags 调性标签", value: String(allTags), note: "deduped keyword set" }
        ]}
      />
      <div className="contentGrid">
        <DistributionBars title="Tone archetype distribution 调性原型分布" data={getDistribution(brands, (brand) => brand.toneProfile.archetype)} />
        <section className="toneGrid" aria-label="Brand tone cards">
          {brands.map((brand) => (
            <Link className="toneCard" href={`/brand-database/${brand.slug}`} key={brand.slug}>
              <div className="toneCardTop">
                <div>
                  <span>{brand.country}</span>
                  <h2>{brand.brand}</h2>
                </div>
                <strong>{brand.priceRange}</strong>
              </div>
              <p className="toneArchetype">{brand.toneProfile.archetype}</p>
              <Tags values={brand.toneProfile.toneTags} />
              <p>{brand.toneProfile.customerPersona}</p>
              <small>Open main intelligence profile 查看主情报页</small>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
