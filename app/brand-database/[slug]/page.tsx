import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { ScoreBar, Tags } from "@/components/DataTable";
import { StatusPill } from "@/components/StatusPill";
import { brands, leads, products } from "@/data/seed";

type BrandDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandDatabaseDetailPage({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = brands.find((item) => item.slug === slug);
  if (!brand) notFound();

  const relatedProducts = products.filter((product) => product.brandSlug === brand.slug);
  const lead = leads.find((item) => item.brandSlug === brand.slug);

  return (
    <div className="pageStack">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/dashboard">Dashboard 总览</Link>
        <span>/</span>
        <Link href="/brand-database">Brand Database 品牌库</Link>
        <span>/</span>
        <strong>{brand.brandName}</strong>
      </nav>
      <Link className="backButton" href="/brand-database">Back to Brand Database 返回品牌库</Link>
      <PageHeader
        eyebrow="Brand Detail 品牌详情"
        title={`${brand.brand} Intelligence 品牌情报`}
        description={brand.intelligence.brandSummary}
        metric={`${brand.b2bOpportunityScore}/100`}
      />

      <SummaryCards
        cards={[
          { label: "Priority 优先级", value: brand.leadPriority, note: "B2B outreach priority" },
          { label: "Wholesale signal 批发信号", value: brand.wholesaleAvailable ? "Yes" : "No", note: isKnown(brand.wholesaleEmail) ? brand.wholesaleEmail : isKnown(brand.contactPage) ? brand.contactPage : "Needs research" },
          { label: "Products tracked 产品记录", value: String(relatedProducts.length), note: "linked product records" }
        ]}
      />

      <section className="detailGrid">
        <article className="detailPanel">
          <h2>Overview 概览</h2>
          <Info label="Company 公司" value={brand.companyName} />
          <Info label="Headquarters 总部" value={brand.headquarters} />
          <Info label="Country 国家" value={brand.country} />
          <Info label="Positioning 定位" value={brand.positioning} />
          <Info label="Target customer 目标客户" value={brand.targetCustomer} />
          <Info label="Size range 尺码范围" value={brand.sizeRange} />
          <Info label="Data quality 数据质量" value={brand.dataQuality} />
          <div className="infoRow">
            <span>Status 状态</span>
            <StatusPill value={brand.status} />
          </div>
        </article>

        <article className="detailPanel">
          <h2>Contact & Social Links 联系与社媒</h2>
          <InfoLink label="Website 官网" href={brand.website} />
          <InfoEmail label="Contact email 联系邮箱" value={brand.contactEmail} />
          <InfoEmail label="Wholesale email 批发邮箱" value={brand.wholesaleEmail} />
          <InfoLink label="Contact page 联系页" href={brand.contactPage} />
          <InfoLink label="Instagram" href={brand.instagram} />
          <InfoLink label="TikTok" href={brand.tiktok} />
          <InfoLink label="LinkedIn" href={brand.linkedin} />
          <InfoLink label="Facebook" href={brand.facebook} />
          <InfoLink label="Pinterest" href={brand.pinterest} />
          <InfoLink label="YouTube" href={brand.youtube} />
        </article>

        <article className="detailPanel">
          <h2>Product Categories 产品品类</h2>
          <div className="infoRow">
            <span>Categories 品类</span>
            <Tags values={brand.categories} />
          </div>
          <div className="infoRow">
            <span>Main materials 主要面料</span>
            <Tags values={brand.mainMaterials} />
          </div>
          <Info label="Price range 价格带" value={brand.priceRange} />
          <Info label="Product focus 产品重点" value={brand.intelligence.productFocus} />
          <div className="infoRow">
            <span>Verified fields 已核验字段</span>
            <Tags values={brand.verifiedFields.length ? brand.verifiedFields : ["Unknown"]} />
          </div>
        </article>

        <article className="detailPanel">
          <h2>B2B Opportunity Analysis B2B机会分析</h2>
          <div className="scoreDetail">
            <span>B2B opportunity score B2B机会分</span>
            <ScoreBar value={brand.b2bOpportunityScore} />
          </div>
          <Info label="Lead status 线索状态" value={lead?.status ?? "New"} />
          <Info label="Buyer type 买家类型" value={lead?.buyerType ?? "Research target"} />
          <Info label="Analysis 分析" value={brand.intelligence.b2bFitRationale} />
          <Info label="Customer development angle 客户开发角度" value={brand.intelligence.customerDevelopmentAngle} />
        </article>

        <article className="detailPanel">
          <h2>Manufacturing Signals 生产信号</h2>
          <Info label="Manufacturing country 生产国家" value={brand.manufacturingCountry} />
          <Info label="OEM / private label signal 贴牌信号" value={brand.oemPrivateLabelSignal} />
          <div className="infoRow">
            <span>Certifications 认证</span>
            <Tags values={brand.certifications.length ? brand.certifications : ["Unknown"]} />
          </div>
          <Info label="Notes 备注" value={brand.intelligence.manufacturingSignals} />
        </article>

        <article className="detailPanel">
          <h2>Data Gaps 待补数据</h2>
          <ul className="cleanList">
            {brand.missingFields.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className="detailPanel">
          <h2>Next Research Steps 下一步研究</h2>
          <ul className="cleanList">
            {brand.intelligence.nextResearchSteps.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className="detailPanel wide">
          <h2>Source Evidence 来源证据</h2>
          <Info label="Source type 来源类型" value={brand.sourceType} />
          <Info label="Last checked 检查日期" value={brand.lastChecked ?? "Unknown"} />
          <p>{brand.sourceEvidence}</p>
          <div className="sourceStack">
            {brand.sourceUrls.map((url) => (
              <InfoLink key={url} label="Source URL 来源" href={url} />
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="infoRow">
      <span>{label}</span>
      <strong>{isKnown(value) ? value : "Unknown"}</strong>
    </div>
  );
}

function InfoLink({ label, href }: { label: string; href: string }) {
  return (
    <div className="infoRow">
      <span>{label}</span>
      {isKnown(href) ? <Link className="sourceLink" href={href} target="_blank" rel="noreferrer">{href}</Link> : <strong className="mutedText">Unknown</strong>}
    </div>
  );
}

function InfoEmail({ label, value }: { label: string; value: string }) {
  return (
    <div className="infoRow">
      <span>{label}</span>
      {isKnown(value) ? <a className="sourceLink" href={`mailto:${value}`}>{value}</a> : <strong className="mutedText">Unknown</strong>}
    </div>
  );
}

function isKnown(value: string) {
  return Boolean(value && value !== "Unknown" && value !== "Not checked");
}
