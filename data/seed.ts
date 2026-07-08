export type BrandStatus = "Active" | "Emerging" | "Monitor" | "Dormant";
export type LeadPriority = "High" | "Medium" | "Low";
export type DataQuality = "Verified" | "Partially Verified" | "Needs Research";
export type SourceType = "Verified";
export type LeadStatus = "New" | "Researching" | "Contacted" | "Replied" | "Qualified" | "Not Fit" | "Partner";

export type Brand = {
  id: number;
  slug: string;
  brand: string;
  brandName: string;
  companyName: string;
  country: string;
  headquarters: string;
  website: string;
  region: string;
  brandPositioning: string;
  positioning: string;
  targetCustomer: string;
  lgbtqRelevance: string;
  productCategories: string[];
  priorityProductCategories: string[];
  categories: string[];
  priceRange: "$" | "$$" | "$$$" | "$$$$" | "Unknown";
  sizeRange: string;
  mainMaterials: string[];
  bestsellingSignals: string;
  contactEmail: string;
  wholesaleEmail: string;
  contactPage: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  facebook: string;
  pinterest: string;
  youtube: string;
  manufacturingSignal: string;
  manufacturingCountry: string;
  wholesaleCustomSignal: string;
  wholesaleAvailable: boolean;
  oemPrivateLabelSignal: "Strong" | "Possible" | "Weak" | "Unknown";
  certifications: string[];
  productReferenceValueScore: number;
  customerPotentialScore: number;
  b2bOpportunityScore: number;
  socialScore: number;
  wholesaleFit: number;
  dataQuality: DataQuality;
  verifiedFields: string[];
  missingFields: string[];
  websiteVerified: boolean;
  productDataVerified: boolean;
  contactVerified: boolean;
  socialVerified: boolean;
  sourceType: SourceType;
  sourceUrl?: string;
  sourceUrls: string[];
  lastChecked?: string;
  sourceEvidence?: string;
  notes: string;
  status: BrandStatus;
  leadPriority: LeadPriority;
  channels: string[];
  toneProfile: {
    archetype: string;
    toneTags: string[];
    visualLanguage: string;
    customerPersona: string;
    messagingStyle: string;
    communitySignal: string;
  };
  intelligence: {
    brandSummary: string;
    productFocus: string;
    customerDevelopmentAngle: string;
    b2bFitRationale: string;
    manufacturingSignals: string;
    dataGaps: string[];
    nextResearchSteps: string[];
  };
};

export type Product = {
  id: number;
  product: string;
  productName: string;
  brand: string;
  brandName: string;
  brandSlug: string;
  category: string;
  productCategory: string;
  targetUser: string;
  price: string;
  fabric: string;
  composition: string;
  sizeRange: string;
  colorRange: string;
  fit: string;
  rise: string;
  inseam: string;
  keySellingPoints: string;
  bestsellerSignal: string;
  reviewPainPoints: string;
  developmentDifficulty: string;
  manufacturingDifficulty: string;
  marketDemandScore: number;
  competitiveIntensity: string;
  b2bSalesPotential: number;
  samplePriorityScore: number;
  productUrl: string;
  productImageUrl: string;
  sourceUrls: string[];
  dataQuality: DataQuality;
  lastChecked: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$" | "Unknown";
  material: string;
  tags: string[];
  status: "Validated" | "Testing" | "Gap";
  opportunity: number;
  collection: string;
  fabricComposition: string;
  waistband: string;
  construction: string;
  packingSupport: string;
  tuckingSupport: string;
  colors: string[];
  msrp: string;
  bestseller: boolean;
  sourceUrl: string;
  notes: string;
};

export type Lead = {
  id: number;
  company: string;
  brandSlug: string;
  country: string;
  website: string;
  contactEmail: string;
  wholesaleEmail: string;
  contactPage: string;
  instagram: string;
  linkedin: string;
  buyerType: string;
  status: LeadStatus;
  priority: LeadPriority;
  tags: string[];
  fitScore: number;
  lastContacted: string;
  nextFollowUp: string;
  nextStep: string;
  notes: string;
};

export type SocialAccount = {
  id: number;
  brand: string;
  brandSlug: string;
  platform: "Instagram" | "TikTok" | "LinkedIn" | "Facebook" | "Pinterest" | "YouTube" | "Threads";
  accountUrl: string;
  followers: number | null;
  engagement: string;
  status: "Growing" | "Stable" | "Declining" | "Unknown";
  tags: string[];
  signal: string;
  sourceUrls: string[];
  dataQuality: DataQuality;
  lastChecked: string;
};

export type Opportunity = {
  id: number;
  opportunity: string;
  segment: string;
  market: string;
  priority: LeadPriority;
  status: "Open" | "Sizing" | "Pilot" | "Parked";
  tags: string[];
  evidence: string;
};

const today = "2026-07-08";
const unknown = "Unknown";

type BrandSeed = {
  id: number;
  slug: string;
  name: string;
  website: string;
  country?: string;
  positioning: string;
  lgbtqRelevance: string;
  categories: string[];
  priorityCategories: string[];
  sourceUrls: string[];
  dataQuality: DataQuality;
  priceRange?: Brand["priceRange"];
  sizeRange?: string;
  contactPage?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  notes?: string;
  productDataVerified?: boolean;
  productReferenceValueScore: number;
  customerPotentialScore: number;
};

function brand(seed: BrandSeed): Brand {
  const contactVerified = Boolean(seed.contactPage);
  const socialVerified = Boolean(seed.instagram || seed.facebook || seed.linkedin);
  const productDataVerified = seed.productDataVerified ?? false;
  const verifiedFields = [
    "website",
    seed.country ? "country" : "",
    seed.categories.length ? "productCategories" : "",
    seed.priorityCategories.length ? "priorityProductCategories" : "",
    seed.sizeRange ? "sizeRange" : "",
    seed.priceRange ? "priceRange" : "",
    contactVerified ? "contactPage" : "",
    socialVerified ? "socialAccounts" : "",
    productDataVerified ? "productLevelData" : ""
  ].filter(Boolean);
  const missingFields = [
    seed.sizeRange ? "" : "sizeRange",
    seed.priceRange ? "" : "priceRange",
    contactVerified ? "" : "contactPage",
    "contactEmail",
    "wholesaleEmail",
    socialVerified ? "" : "socialAccounts",
    productDataVerified ? "" : "productLevelData",
    "manufacturingCountry",
    "certifications",
    "wholesaleCustomSignal"
  ].filter(Boolean);

  return {
    id: seed.id,
    slug: seed.slug,
    brand: seed.name,
    brandName: seed.name,
    companyName: seed.name,
    country: seed.country ?? unknown,
    headquarters: unknown,
    website: seed.website,
    region: unknown,
    brandPositioning: seed.positioning,
    positioning: seed.positioning,
    targetCustomer: seed.lgbtqRelevance,
    lgbtqRelevance: seed.lgbtqRelevance,
    productCategories: seed.categories,
    priorityProductCategories: seed.priorityCategories,
    categories: seed.categories,
    priceRange: seed.priceRange ?? "Unknown",
    sizeRange: seed.sizeRange ?? unknown,
    mainMaterials: [unknown],
    bestsellingSignals: unknown,
    contactEmail: unknown,
    wholesaleEmail: unknown,
    contactPage: seed.contactPage ?? unknown,
    instagram: seed.instagram ?? unknown,
    tiktok: unknown,
    linkedin: seed.linkedin ?? unknown,
    facebook: seed.facebook ?? unknown,
    pinterest: unknown,
    youtube: unknown,
    manufacturingSignal: unknown,
    manufacturingCountry: unknown,
    wholesaleCustomSignal: unknown,
    wholesaleAvailable: false,
    oemPrivateLabelSignal: "Unknown",
    certifications: [],
    productReferenceValueScore: seed.productReferenceValueScore,
    customerPotentialScore: seed.customerPotentialScore,
    b2bOpportunityScore: Math.round((seed.productReferenceValueScore + seed.customerPotentialScore) / 2),
    socialScore: 0,
    wholesaleFit: seed.customerPotentialScore,
    dataQuality: productDataVerified && contactVerified && socialVerified ? "Verified" : seed.dataQuality === "Needs Research" ? "Needs Research" : "Partially Verified",
    verifiedFields,
    missingFields,
    websiteVerified: true,
    productDataVerified,
    contactVerified,
    socialVerified,
    sourceType: "Verified",
    sourceUrl: seed.sourceUrls[0],
    sourceUrls: seed.sourceUrls,
    lastChecked: today,
    sourceEvidence: `Public source URLs recorded by field. Homepage verifies brand existence only; unverified fields are set to Unknown.`,
    notes: seed.notes ?? "Manual public-source research record. Unknown fields require future verification.",
    status: "Active",
    leadPriority: seed.customerPotentialScore >= 80 ? "High" : seed.customerPotentialScore >= 65 ? "Medium" : "Low",
    channels: ["DTC"],
    toneProfile: {
      archetype: seed.positioning,
      toneTags: seed.priorityCategories,
      visualLanguage: unknown,
      customerPersona: seed.lgbtqRelevance,
      messagingStyle: unknown,
      communitySignal: seed.lgbtqRelevance
    },
    intelligence: {
      brandSummary: `${seed.name} is included as a real public-source underwear brand record. Unknown fields are intentionally not guessed.`,
      productFocus: seed.categories.join(", "),
      customerDevelopmentAngle: seed.customerPotentialScore >= 80 ? "High-potential B2B research target." : "Needs further B2B qualification.",
      b2bFitRationale: "Score based on visible category relevance and public-source brand/product fit; private business terms remain Unknown.",
      manufacturingSignals: unknown,
      dataGaps: missingFields,
      nextResearchSteps: ["Open official website", "Verify priority categories", "Capture product pages", "Check contact/wholesale path", "Record product-level price and material"]
    }
  };
}

export const brands: Brand[] = [
  brand({ id: 1, slug: "tomboyx", name: "TomboyX", website: "https://tomboyx.com/", country: "United States", positioning: "Gender-inclusive essentials", lgbtqRelevance: "LGBTQ-friendly, gender-inclusive positioning.", categories: ["Briefs", "Trunks", "Boyshorts", "Boxer Briefs", "Gender-neutral Boxer Briefs"], priorityCategories: ["Briefs", "Trunks", "Boyshorts", "Gender-neutral Boxer Briefs"], sourceUrls: ["https://tomboyx.com/", "https://tomboyx.com/pages/contact-us", "https://www.instagram.com/tomboyx/", "https://www.facebook.com/TomboyX", "https://www.linkedin.com/company/tomboyx/"], dataQuality: "Partially Verified", priceRange: "$$", sizeRange: "3XS-6X", contactPage: "https://tomboyx.com/pages/contact-us", instagram: "https://www.instagram.com/tomboyx/", facebook: "https://www.facebook.com/TomboyX", linkedin: "https://www.linkedin.com/company/tomboyx/", productReferenceValueScore: 92, customerPotentialScore: 88 }),
  brand({ id: 2, slug: "woxer", name: "Woxer", website: "https://woxer.com/", country: "United States", positioning: "Women’s boxer briefs and comfort underwear", lgbtqRelevance: "Queer-relevant women’s boxer briefs and Pride collection visible on official site.", categories: ["Boxer Briefs", "Boyshorts", "Bikinis", "Bralettes", "Swim"], priorityCategories: ["Boyshorts", "Gender-neutral Boxer Briefs"], sourceUrls: ["https://woxer.com/", "https://woxer.com/products/star-black", "https://woxer.com/products/baller-black", "https://woxer.com/products/ballerflex-black", "https://woxer.com/pages/contact-us", "https://www.instagram.com/woxer/"], dataQuality: "Partially Verified", priceRange: "$$", sizeRange: "XS-4XL", contactPage: "https://woxer.com/pages/contact-us", instagram: "https://www.instagram.com/woxer/", productDataVerified: true, productReferenceValueScore: 94, customerPotentialScore: 90 }),
  brand({ id: 3, slug: "nasty-pig", name: "Nasty Pig", website: "https://store.nastypig.com/", country: "United States", positioning: "Gay-owned gear and sportswear", lgbtqRelevance: "Gay-owned, queer nightlife and gear relevance.", categories: ["Briefs", "Jockstraps", "Thongs", "Swim", "Harnesses"], priorityCategories: ["Briefs", "Jockstraps"], sourceUrls: ["https://store.nastypig.com/", "https://store.nastypig.com/pages/contact", "https://www.instagram.com/nastypig/", "https://www.facebook.com/nastypig"], dataQuality: "Partially Verified", priceRange: "$$", contactPage: "https://store.nastypig.com/pages/contact", instagram: "https://www.instagram.com/nastypig/", facebook: "https://www.facebook.com/nastypig", productReferenceValueScore: 88, customerPotentialScore: 82 }),
  brand({ id: 4, slug: "andrew-christian", name: "Andrew Christian", website: "https://www.andrewchristian.com/", country: "United States", positioning: "Men’s underwear, swimwear, sportswear", lgbtqRelevance: "Queer-relevant men’s underwear brand with gay-market visibility.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks", "Swim"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], sourceUrls: ["https://www.andrewchristian.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 90, customerPotentialScore: 78 }),
  brand({ id: 5, slug: "c-in2", name: "C-IN2", website: "https://www.c-in2.com/", country: "United States", positioning: "Men’s underwear: briefs, boxers, jocks and more", lgbtqRelevance: "Men’s underwear brand relevant for gay-friendly category benchmarking.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], sourceUrls: ["https://www.c-in2.com/"], dataQuality: "Verified", priceRange: "Unknown", productReferenceValueScore: 90, customerPotentialScore: 76 }),
  brand({ id: 6, slug: "aussiebum", name: "aussieBum", website: "https://www.aussiebum.com/", country: "Australia", positioning: "Men’s underwear and swimwear", lgbtqRelevance: "Men’s underwear/swim brand with gay-market relevance.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks", "Swim"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], sourceUrls: ["https://www.aussiebum.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 88, customerPotentialScore: 76 }),
  brand({ id: 7, slug: "2eros", name: "2EROS", website: "https://www.2eros.com/", country: "Australia", positioning: "Men’s underwear and swimwear", lgbtqRelevance: "Queer-relevant men’s underwear/swimwear brand.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks", "Swim"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], sourceUrls: ["https://www.2eros.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 86, customerPotentialScore: 72 }),
  brand({ id: 8, slug: "pump", name: "PUMP!", website: "https://wearpump.com/", country: "Canada", positioning: "Men’s underwear and athletic styling", lgbtqRelevance: "Queer-relevant men’s underwear brand.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], sourceUrls: ["https://wearpump.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 86, customerPotentialScore: 72 }),
  brand({ id: 9, slug: "tof-paris", name: "TOF Paris", website: "https://www.tof-paris.com/", country: "France", positioning: "French men’s underwear and clubwear", lgbtqRelevance: "Queer-relevant French underwear/clubwear brand.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks", "Swim"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], sourceUrls: ["https://www.tof-paris.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 84, customerPotentialScore: 70 }),
  brand({ id: 10, slug: "modus-vivendi", name: "Modus Vivendi", website: "https://e-modusvivendi.com/", country: "Greece", positioning: "Men’s underwear and swimwear", lgbtqRelevance: "Queer-relevant men’s underwear/swimwear brand.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks", "Swim"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], sourceUrls: ["https://e-modusvivendi.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 84, customerPotentialScore: 70 }),
  brand({ id: 11, slug: "rufskin", name: "Rufskin", website: "https://www.rufskin.com/", country: "United States", positioning: "Men’s athletic, underwear, swimwear and sportswear", lgbtqRelevance: "Gay-market relevance reported in public sources.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Swim", "Sportswear"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps"], sourceUrls: ["https://www.rufskin.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 84, customerPotentialScore: 70 }),
  brand({ id: 12, slug: "cellblock13", name: "CellBlock 13", website: "https://cellblock13.net/", country: "Unknown", positioning: "Men’s underwear and gear", lgbtqRelevance: "Queer-relevant gear/underwear market.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Gear"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps"], sourceUrls: ["https://cellblock13.net/"], dataQuality: "Needs Research", priceRange: "Unknown", productReferenceValueScore: 80, customerPotentialScore: 66 }),
  brand({ id: 13, slug: "breedwell", name: "Breedwell", website: "https://breedwell.com/", country: "Unknown", positioning: "Queer nightlife apparel and underwear", lgbtqRelevance: "Queer nightlife and Pride market relevance.", categories: ["Briefs", "Jockstraps", "Gear"], priorityCategories: ["Briefs", "Jockstraps"], sourceUrls: ["https://breedwell.com/"], dataQuality: "Needs Research", priceRange: "Unknown", productReferenceValueScore: 78, customerPotentialScore: 66 }),
  brand({ id: 14, slug: "addicted", name: "Addicted", website: "https://addicted.es/", country: "Spain", positioning: "Men’s underwear and swimwear", lgbtqRelevance: "Queer-relevant men’s underwear/swimwear brand.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks", "Swim"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], sourceUrls: ["https://addicted.es/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 86, customerPotentialScore: 74 }),
  brand({ id: 15, slug: "es-collection", name: "ES Collection", website: "https://escollection.es/", country: "Spain", positioning: "Men’s underwear and swimwear", lgbtqRelevance: "Queer-relevant men’s underwear/swimwear brand.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks", "Swim"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], sourceUrls: ["https://escollection.es/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 86, customerPotentialScore: 74 }),
  brand({ id: 16, slug: "cocksox", name: "Cocksox", website: "https://www.cocksox.com/", country: "Australia", positioning: "Men’s underwear and swimwear", lgbtqRelevance: "Queer-relevant men’s underwear brand.", categories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks", "Swim"], priorityCategories: ["Briefs", "Boxer Briefs", "Jockstraps", "Trunks"], sourceUrls: ["https://www.cocksox.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 82, customerPotentialScore: 68 }),
  brand({ id: 17, slug: "rodeoh", name: "RodeoH", website: "https://rodeoh.com/", country: "United States", positioning: "Harness underwear and gender-expression products", lgbtqRelevance: "Queer and trans-relevant underwear brand.", categories: ["Briefs", "Boxer Briefs", "Harness underwear", "Packing underwear"], priorityCategories: ["Briefs", "Boxer Briefs"], sourceUrls: ["https://rodeoh.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 78, customerPotentialScore: 68, notes: "Packing-related products should be Phase 2 / specialized product." }),
  brand({ id: 18, slug: "playout-apparel", name: "Playout Apparel", website: "https://www.playoutapparel.com/", country: "United States", positioning: "Gender-equal underwear and apparel", lgbtqRelevance: "Gender-inclusive / LGBTQ-relevant underwear brand.", categories: ["Boxer Briefs", "Briefs", "Bralettes", "Gender-neutral Boxer Briefs"], priorityCategories: ["Briefs", "Gender-neutral Boxer Briefs"], sourceUrls: ["https://www.playoutapparel.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 82, customerPotentialScore: 74 }),
  brand({ id: 19, slug: "origami-customs", name: "Origami Customs", website: "https://origamicustoms.com/", country: "Canada", positioning: "Custom gender-affirming garments", lgbtqRelevance: "Trans and gender-diverse relevance.", categories: ["Briefs", "Swim", "Tucking underwear", "Packing underwear", "Binders"], priorityCategories: ["Briefs"], sourceUrls: ["https://origamicustoms.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 72, customerPotentialScore: 62, notes: "Tucking, packing and binders are Phase 2 / specialized product." }),
  brand({ id: 20, slug: "cantiq-la", name: "Cantiq LA", website: "https://www.cantiqla.com/", country: "United States", positioning: "Gender-fluid lingerie and underwear", lgbtqRelevance: "Queer and gender-fluid relevance.", categories: ["Briefs", "Bralettes", "Lingerie", "Gender-neutral underwear"], priorityCategories: ["Briefs", "Gender-neutral Boxer Briefs"], sourceUrls: ["https://www.cantiqla.com/"], dataQuality: "Partially Verified", priceRange: "Unknown", productReferenceValueScore: 76, customerPotentialScore: 66 })
];

export const brandCsvHeaders = [
  "brandName",
  "companyName",
  "country",
  "headquarters",
  "website",
  "brandPositioning",
  "targetCustomer",
  "lgbtqRelevance",
  "productCategories",
  "priorityProductCategories",
  "priceRange",
  "sizeRange",
  "mainMaterials",
  "contactEmail",
  "wholesaleEmail",
  "contactPage",
  "instagram",
  "manufacturingSignal",
  "wholesaleCustomSignal",
  "productReferenceValueScore",
  "customerPotentialScore",
  "dataQuality",
  "lastChecked",
  "sourceUrls",
  "verifiedFields",
  "missingFields",
  "websiteVerified",
  "productDataVerified",
  "contactVerified",
  "socialVerified",
  "notes"
];

export const products: Product[] = [
  {
    id: 1,
    product: "Star Black",
    productName: "Star Black",
    brand: "Woxer",
    brandName: "Woxer",
    brandSlug: "woxer",
    category: "Boxer Briefs",
    productCategory: "Boxer Briefs",
    targetUser: "Women and gender-inclusive boxer brief customers",
    price: "$24.00 sale / $48.00 regular",
    fabric: "Everyday Modal",
    composition: "95% modal, 5% spandex",
    sizeRange: "XS-4XL",
    colorRange: "Black plus additional limited/core colors shown on product page",
    fit: "Close fit; true to size",
    rise: "Mid-rise",
    inseam: "3\"",
    keySellingPoints: "Soft modal boxer brief, no-dig waistband, lined front and inside leg panels, OEKO-TEX certified.",
    bestsellerSignal: "11,328 reviews shown on official product page at last check.",
    reviewPainPoints: unknown,
    developmentDifficulty: "Medium",
    manufacturingDifficulty: "Medium",
    marketDemandScore: 92,
    competitiveIntensity: "High",
    b2bSalesPotential: 90,
    samplePriorityScore: 94,
    productUrl: "https://woxer.com/products/star-black",
    productImageUrl: unknown,
    sourceUrls: ["https://woxer.com/products/star-black"],
    dataQuality: "Verified",
    lastChecked: today,
    priceRange: "$$",
    material: "Modal / spandex",
    tags: ["Boxer Briefs", "Modal", "Verified"],
    status: "Validated",
    opportunity: 94,
    collection: "Star",
    fabricComposition: "95% modal, 5% spandex",
    waistband: "Signature no-dig waistband; jacquard waistband 64% nylon, 27% polyester, 9% spandex",
    construction: "Lined front and inside leg panels; tag-free care label",
    packingSupport: unknown,
    tuckingSupport: unknown,
    colors: ["Black"],
    msrp: "$48.00",
    bestseller: true,
    sourceUrl: "https://woxer.com/products/star-black",
    notes: "Official product page verifies product name, price, size options, inseam/rise, fabric and composition."
  },
  {
    id: 2,
    product: "Baller Black",
    productName: "Baller Black",
    brand: "Woxer",
    brandName: "Woxer",
    brandSlug: "woxer",
    category: "Boxer Briefs",
    productCategory: "Boxer Briefs",
    targetUser: "Women and gender-inclusive boxer brief customers",
    price: "$24.00 sale / $48.00 regular",
    fabric: "Everyday Modal",
    composition: "95% modal, 5% spandex",
    sizeRange: "XS-4XL",
    colorRange: "Black plus additional colors shown on product page",
    fit: "Close fit",
    rise: unknown,
    inseam: "5\"",
    keySellingPoints: "5\" modal boxer brief in soft modal fabric.",
    bestsellerSignal: "19,262 reviews shown on official product page at last check.",
    reviewPainPoints: unknown,
    developmentDifficulty: "Medium",
    manufacturingDifficulty: "Medium",
    marketDemandScore: 94,
    competitiveIntensity: "High",
    b2bSalesPotential: 90,
    samplePriorityScore: 95,
    productUrl: "https://woxer.com/products/baller-black",
    productImageUrl: unknown,
    sourceUrls: ["https://woxer.com/products/baller-black"],
    dataQuality: "Verified",
    lastChecked: today,
    priceRange: "$$",
    material: "Modal / spandex",
    tags: ["Boxer Briefs", "Modal", "Verified"],
    status: "Validated",
    opportunity: 95,
    collection: "Baller",
    fabricComposition: "95% modal, 5% spandex",
    waistband: "Unknown",
    construction: "Unknown",
    packingSupport: unknown,
    tuckingSupport: unknown,
    colors: ["Black"],
    msrp: "$48.00",
    bestseller: true,
    sourceUrl: "https://woxer.com/products/baller-black",
    notes: "Official product page verifies product name, price, 5 inch boxer brief description and review-count bestseller signal."
  },
  {
    id: 3,
    product: "Baller Flex Black",
    productName: "Baller Flex Black",
    brand: "Woxer",
    brandName: "Woxer",
    brandSlug: "woxer",
    category: "Boxer Briefs",
    productCategory: "Boxer Briefs",
    targetUser: "Active underwear customers",
    price: "$28.00 sale / $56.00 regular",
    fabric: "Active fabric",
    composition: unknown,
    sizeRange: "Unknown",
    colorRange: "Black",
    fit: unknown,
    rise: unknown,
    inseam: "5\"",
    keySellingPoints: "5\" active boxer brief listed from Woxer product recommendations and product page.",
    bestsellerSignal: "465 reviews shown in Woxer product recommendation module at last check.",
    reviewPainPoints: unknown,
    developmentDifficulty: "Medium",
    manufacturingDifficulty: "Medium",
    marketDemandScore: 86,
    competitiveIntensity: "Medium",
    b2bSalesPotential: 82,
    samplePriorityScore: 88,
    productUrl: "https://woxer.com/products/ballerflex-black",
    productImageUrl: unknown,
    sourceUrls: ["https://woxer.com/products/ballerflex-black", "https://woxer.com/products/star-black"],
    dataQuality: "Partially Verified",
    lastChecked: today,
    priceRange: "$$",
    material: "Unknown",
    tags: ["Boxer Briefs", "Active", "Partially Verified"],
    status: "Validated",
    opportunity: 88,
    collection: "Baller Flex",
    fabricComposition: unknown,
    waistband: unknown,
    construction: unknown,
    packingSupport: unknown,
    tuckingSupport: unknown,
    colors: ["Black"],
    msrp: "$56.00",
    bestseller: false,
    sourceUrl: "https://woxer.com/products/ballerflex-black",
    notes: "Official product URL exists and product summary/price were visible through Woxer product links; composition still needs direct verification."
  }
];

export const productCsvHeaders = [
  "productName",
  "brandName",
  "brandSlug",
  "productCategory",
  "targetUser",
  "price",
  "fabric",
  "composition",
  "sizeRange",
  "colorRange",
  "fit",
  "rise",
  "inseam",
  "keySellingPoints",
  "bestsellerSignal",
  "reviewPainPoints",
  "developmentDifficulty",
  "manufacturingDifficulty",
  "marketDemandScore",
  "competitiveIntensity",
  "b2bSalesPotential",
  "samplePriorityScore",
  "productUrl",
  "productImageUrl",
  "sourceUrls",
  "dataQuality",
  "lastChecked",
  "notes"
];

export const leads: Lead[] = brands.map((item) => ({
  id: item.id,
  company: item.brandName,
  brandSlug: item.slug,
  country: item.country,
  website: item.website,
  contactEmail: item.contactEmail,
  wholesaleEmail: item.wholesaleEmail,
  contactPage: item.contactPage,
  instagram: item.instagram,
  linkedin: item.linkedin,
  buyerType: item.customerPotentialScore >= 80 ? "High-fit B2B prospect" : "Research target",
  status: "Researching",
  priority: item.leadPriority,
  tags: [item.country, item.dataQuality],
  fitScore: item.customerPotentialScore,
  lastContacted: unknown,
  nextFollowUp: unknown,
  nextStep: "Verify contact / wholesale path from public sources",
  notes: item.notes
}));

export const socialAccounts: SocialAccount[] = brands.flatMap((item) => {
  const records = [
    { platform: "Instagram" as const, url: item.instagram },
    { platform: "TikTok" as const, url: item.tiktok },
    { platform: "LinkedIn" as const, url: item.linkedin },
    { platform: "Facebook" as const, url: item.facebook },
    { platform: "Pinterest" as const, url: item.pinterest },
    { platform: "YouTube" as const, url: item.youtube }
  ].filter((record) => isKnown(record.url));

  return records.map((record, index) => ({
    id: item.id * 10 + index + 1,
    brand: item.brandName,
    brandSlug: item.slug,
    platform: record.platform,
    accountUrl: record.url,
    followers: null,
    engagement: unknown,
    status: "Unknown" as const,
    tags: [item.dataQuality, record.platform],
    signal: "Verified public social URL; follower count not recorded to avoid guessing.",
    sourceUrls: [record.url],
    dataQuality: "Partially Verified" as DataQuality,
    lastChecked: today
  }));
});

function isKnown(value: string) {
  return Boolean(value && value !== unknown && value !== "Not checked");
}

export const opportunities: Opportunity[] = [
  {
    id: 1,
    opportunity: "Gender-neutral boxer briefs and boyshorts",
    segment: "Priority category",
    market: "Global",
    priority: "High",
    status: "Sizing",
    tags: ["Boyshorts", "Gender-neutral Boxer Briefs", "Woxer", "TomboyX"],
    evidence: "Woxer and TomboyX public sites show strong relevance for boxer brief / boyshort style research."
  },
  {
    id: 2,
    opportunity: "Men’s briefs, trunks and boxer briefs",
    segment: "High-volume men’s basics",
    market: "Global",
    priority: "High",
    status: "Sizing",
    tags: ["Briefs", "Trunks", "Boxer Briefs"],
    evidence: "Multiple real brands in database publicly operate in men’s underwear categories."
  },
  {
    id: 3,
    opportunity: "Men’s jockstraps",
    segment: "Queer-relevant men’s underwear",
    market: "Global",
    priority: "Medium",
    status: "Sizing",
    tags: ["Jockstraps"],
    evidence: "Nasty Pig, C-IN2, Andrew Christian and similar public brands show category relevance."
  }
];
