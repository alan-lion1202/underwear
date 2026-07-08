import Link from "next/link";
import { notFound } from "next/navigation";
import { ScoreBar, Tags } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { products } from "@/data/seed";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export default async function ProductResearchDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((item) => String(item.id) === id);
  if (!product) notFound();

  const comparableProducts = products.filter((item) => item.productCategory === product.productCategory && item.id !== product.id);
  const representativeBrands = Array.from(new Set(products.filter((item) => item.productCategory === product.productCategory).map((item) => item.brandName)));
  const consumerPositives = getConsumerPositives(product);
  const consumerNegatives = getConsumerNegatives(product);

  return (
    <div className="pageStack">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/dashboard">Dashboard 总览</Link>
        <span>/</span>
        <Link href="/product-research">Product Benchmark 产品基准</Link>
        <span>/</span>
        <strong>{product.productName}</strong>
      </nav>
      <Link className="backButton" href="/product-research">Back to Product Research 返回产品研究</Link>
      <PageHeader
        eyebrow="Product Intelligence Detail 产品情报详情"
        title={`${product.productName} Product DNA 产品DNA`}
        description="分析该产品为什么值得研究：market demand、fabric DNA、fit DNA、construction DNA、consumer insight 和 development opportunity。"
        metric={`${product.samplePriorityScore}/100`}
      />

      <SummaryCards
        cards={[
          { label: "Market demand 市场需求", value: `${product.marketDemandScore}/100`, note: "benchmark score" },
          { label: "Sample priority 样品优先级", value: `${product.samplePriorityScore}/100`, note: "development reference" },
          { label: "Data quality 数据质量", value: product.dataQuality, note: product.lastChecked }
        ]}
      />

      <section className="detailGrid">
        <article className="detailPanel">
          <h2>Product Overview 产品概览</h2>
          <Info label="Product name 产品名" value={product.productName} />
          <Info label="Category 品类" value={product.productCategory} />
          <Info label="Representative brands 代表品牌" value={representativeBrands.join(" | ")} />
          <Info label="Price range 价格带" value={product.priceRange} />
          <Info label="Price 价格" value={product.price} />
          <Info label="Market position 市场定位" value={product.targetUser} />
          <InfoLink label="Product page 产品页" href={product.productUrl} />
          <InfoLink label="Product image 产品图片" href={product.productImageUrl} />
        </article>

        <article className="detailPanel">
          <h2>Fabric DNA 面料DNA</h2>
          <Info label="Fabric 面料" value={product.fabric} />
          <Info label="Composition 成分" value={product.composition} />
          <Info label="Softness 柔软度" value={inferFabricSignal(product, "soft")} />
          <Info label="Breathability 透气性" value={inferFabricSignal(product, "breathable")} />
          <Info label="Stretch 弹力" value={inferStretch(product)} />
          <Info label="Premium feeling 高级感" value={inferPremium(product)} />
        </article>

        <article className="detailPanel">
          <h2>Fit DNA 版型DNA</h2>
          <Info label="Rise 腰高" value={product.rise} />
          <Info label="Coverage 包覆" value={product.fit} />
          <Info label="Leg length 裤腿长度" value={product.inseam} />
          <Info label="Body fit 贴合感" value={product.fit} />
          <Info label="Size range 尺码范围" value={product.sizeRange} />
          <div className="infoRow">
            <span>Colors 颜色</span>
            <Tags values={product.colors.length ? product.colors : ["Unknown"]} />
          </div>
        </article>

        <article className="detailPanel">
          <h2>Construction DNA 结构DNA</h2>
          <Info label="Pouch type 囊袋结构" value={product.construction} />
          <Info label="Support level 支撑度" value={product.packingSupport} />
          <Info label="Waistband 腰带" value={product.waistband} />
          <Info label="Seam structure 车缝结构" value={product.construction} />
          <Info label="Comfort features 舒适特征" value={product.keySellingPoints} />
        </article>

        <article className="detailPanel">
          <h2>Consumer Insight 消费者洞察</h2>
          <div className="infoRow">
            <span>Positive feedback 正向反馈</span>
            <Tags values={consumerPositives} />
          </div>
          <Info label="Negative feedback 负向反馈" value={consumerNegatives} />
          <Info label="Bestseller signal 热销信号" value={product.bestsellerSignal} />
          <Info label="Review pain points 评论痛点" value={product.reviewPainPoints} />
        </article>

        <article className="detailPanel">
          <h2>Development Opportunity 开发机会</h2>
          <div className="scoreDetail">
            <span>Market demand 市场需求</span>
            <ScoreBar value={product.marketDemandScore} />
          </div>
          <Info label="Competition 竞争强度" value={product.competitiveIntensity} />
          <Info label="Development difficulty 开发难度" value={product.developmentDifficulty} />
          <Info label="Manufacturing difficulty 生产难度" value={product.manufacturingDifficulty} />
          <Info label="Recommended improvement 改进方向" value={getDevelopmentOpportunity(product)} />
        </article>

        <article className="detailPanel wide">
          <h2>Market Benchmark 市场基准</h2>
          {comparableProducts.length ? (
            <div className="benchmarkList">
              {comparableProducts.map((item) => (
                <div className="benchmarkRow" key={item.id}>
                  <Link className="sourceLink" href={`/product-research/${item.id}`}>{item.productName}</Link>
                  <span>{item.brandName}</span>
                  <span>{item.price}</span>
                  <span>{item.fabric}</span>
                  <span>{item.keySellingPoints}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No comparable product benchmark records yet. 暂无同品类产品基准记录。</p>
          )}
        </article>

        <article className="detailPanel wide">
          <h2>Source Evidence 来源证据</h2>
          <Info label="Last checked 检查日期" value={product.lastChecked} />
          <Info label="Data quality 数据质量" value={product.dataQuality} />
          <Info label="Notes 备注" value={product.notes} />
          <div className="sourceStack">
            {product.sourceUrls.map((url) => (
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

function getConsumerPositives(product: { keySellingPoints: string; fabric: string; fit: string }) {
  const text = `${product.keySellingPoints} ${product.fabric} ${product.fit}`.toLowerCase();
  return [
    text.includes("soft") || text.includes("modal") ? "Softness 柔软" : "",
    text.includes("fit") ? "Fit 合身" : "",
    text.includes("breath") ? "Breathability 透气" : "",
    text.includes("waistband") || text.includes("no-dig") ? "Waistband comfort 腰带舒适" : ""
  ].filter(Boolean);
}

function getConsumerNegatives(product: { reviewPainPoints: string }) {
  return isKnown(product.reviewPainPoints) ? product.reviewPainPoints : "Unknown";
}

function inferFabricSignal(product: { fabric: string; keySellingPoints: string }, keyword: string) {
  const text = `${product.fabric} ${product.keySellingPoints}`.toLowerCase();
  if (keyword === "soft" && (text.includes("soft") || text.includes("modal"))) return "Verified signal from product copy";
  if (keyword === "breathable" && text.includes("breath")) return "Verified signal from product copy";
  return "Unknown";
}

function inferStretch(product: { composition: string }) {
  return product.composition.toLowerCase().includes("spandex") || product.composition.toLowerCase().includes("elastane") ? "Stretch fiber present" : "Unknown";
}

function inferPremium(product: { fabric: string; priceRange: string }) {
  if (product.fabric.toLowerCase().includes("modal") || product.priceRange === "$$$" || product.priceRange === "$$$$") return "Premium signal visible";
  return "Unknown";
}

function getDevelopmentOpportunity(product: { fabric: string; productCategory: string; reviewPainPoints: string; keySellingPoints: string }) {
  if (product.fabric.toLowerCase().includes("modal") && product.productCategory === "Boxer Briefs") {
    return "Develop a more breathable premium modal boxer brief with softer waistband, improved sizing, and better pouch/comfort validation.";
  }
  if (isKnown(product.reviewPainPoints)) return `Improve around recorded pain points: ${product.reviewPainPoints}`;
  return `Use verified selling points as reference, then research comfort, sizing, fabric and construction gaps before sample development. Current signal: ${product.keySellingPoints}`;
}

function isKnown(value: string) {
  return Boolean(value && value !== "Unknown" && value !== "Not checked");
}
