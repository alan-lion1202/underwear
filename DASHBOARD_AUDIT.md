# Dashboard Audit

Purpose: audit the current dashboard before code changes. No dashboard feature is deleted in this step.

Evaluation principles:
- Does it help understand the market?
- Does it help decide what products to develop?
- Does it help serve future B2B customers?
- Does it build long-term product knowledge?

Target direction: Product Intelligence Dashboard, not a simple statistics dashboard.

## Current Dashboard Context

Current route: `app/dashboard/page.tsx`

Current structure:
- Page header
- Summary cards
- Brand / lead / product distribution charts
- Brand score rankings
- Product sample priority ranking
- Fabric usage distribution

Primary limitation: the current dashboard shows useful operational counts and rankings, but it does not yet explain why products succeed or how those signals should guide product development.

## Feature Audit

### Feature: Page Header

Purpose: introduce the dashboard as an LGBTQ+ underwear market intelligence workspace.

Current Value: Medium. It correctly frames the dashboard as brand tracking, product comparison, and B2B customer development, but the title still reads like a broad market dashboard rather than a product intelligence decision center.

Related to product decision? Yes.

Recommendation: Modify.

Reason: keep the header, but shift language toward product intelligence, product learning, and development decisions.

### Feature: Total Brands Card

Purpose: show total number of brand records.

Current Value: Low. It helps show database size but does not directly explain product popularity, product success, or development priority.

Related to product decision? No.

Recommendation: Move to detail page.

Reason: useful as database health metadata, but it should not be a primary dashboard card.

### Feature: Verified Brands Card

Purpose: show how many brands have stronger verification coverage.

Current Value: Medium. Data reliability is important because the dashboard is used for product and B2B decisions.

Related to product decision? Yes.

Recommendation: Modify.

Reason: keep data quality visibility, but make it more specific: source completeness, product data verified, records needing research.

### Feature: High-priority B2B Leads Card

Purpose: show number of high-priority sales leads.

Current Value: Medium. Helpful for customer development, but less central to product development decisions.

Related to product decision? Partially.

Recommendation: Move to detail page.

Reason: keep on B2B Leads page. On the main dashboard, show customer potential only when tied to product learning value.

### Feature: High Reference Brands Card

Purpose: show brands with high product reference value.

Current Value: High. This supports learning from brands that can inform product development.

Related to product decision? Yes.

Recommendation: Modify.

Reason: should show why a brand is valuable as a reference, not only count brands above a score threshold.

### Feature: High Customer Potential Card

Purpose: show brands with high potential as future B2B customers.

Current Value: Medium. Useful for B2B customer development, but currently separated from product learning.

Related to product decision? Partially.

Recommendation: Modify.

Reason: combine with brand learning value or customer potential explanation so the metric supports product and sales planning.

### Feature: Sample Candidates Card

Purpose: show products with high sample priority score.

Current Value: High. This is one of the closest current features to product development decisions.

Related to product decision? Yes.

Recommendation: Modify.

Reason: replace simple count with a Product Opportunity Center showing market demand, competition, development difficulty, knowledge depth, and recommendation.

### Feature: Needs Research Card

Purpose: show records with weak data quality.

Current Value: High. Data gaps directly affect confidence in product and B2B decisions.

Related to product decision? Yes.

Recommendation: Keep.

Reason: retain as a core trust signal, ideally with clearer source completeness and missing-field context.

### Feature: Products Benchmarked Card

Purpose: show number of product benchmark records.

Current Value: Medium. It indicates research coverage, but raw count is not enough for decision-making.

Related to product decision? Partially.

Recommendation: Modify.

Reason: replace or support with product knowledge depth, category coverage, and benchmark completeness.

### Feature: Brand Count by Country Chart

Purpose: show brand distribution by country.

Current Value: Low. It is useful market context, but the project goal does not prioritize country statistics on the main dashboard.

Related to product decision? No.

Recommendation: Move to detail page.

Reason: keep for Brand Database / secondary research views, but remove from primary dashboard priority.

### Feature: Brand Count by Category Chart

Purpose: show how many brands cover each priority product category.

Current Value: High. This helps identify product category popularity and market coverage.

Related to product decision? Yes.

Recommendation: Modify.

Reason: keep, but rename and reframe as Product Category Coverage / Market Trend Intelligence.

### Feature: Lead Priority Distribution Chart

Purpose: show distribution of B2B lead priority.

Current Value: Medium. Useful for sales planning, but not a primary product intelligence signal.

Related to product decision? Partially.

Recommendation: Move to detail page.

Reason: keep on B2B Leads page. On dashboard, customer potential should appear inside Brand Learning Value.

### Feature: Product Category Distribution Chart

Purpose: show distribution of benchmarked products by category.

Current Value: High. Directly supports understanding which product categories have benchmark evidence.

Related to product decision? Yes.

Recommendation: Modify.

Reason: keep, but pair with product coverage and knowledge depth, not only record count.

### Feature: Product Reference Value Ranking

Purpose: rank brands by product reference value score.

Current Value: High. Helps identify which brands are worth studying.

Related to product decision? Yes.

Recommendation: Modify.

Reason: keep as Brand Learning Value, adding explanation fields such as product innovation, design value, market influence, representative products, and customer potential.

### Feature: Customer Potential Ranking

Purpose: rank brands by B2B customer potential score.

Current Value: Medium. Helps B2B customer development, but does not explain product success by itself.

Related to product decision? Partially.

Recommendation: Modify.

Reason: combine with Brand Learning Value instead of showing as a standalone vanity ranking.

### Feature: Sample Priority Ranking

Purpose: rank benchmark products by sample priority score.

Current Value: High. Directly supports product development prioritization.

Related to product decision? Yes.

Recommendation: Modify.

Reason: promote into Product Opportunity Center. The dashboard should show the reason for each recommendation, not only the score.

### Feature: Fabric Usage Distribution

Purpose: show fabric themes among benchmark products.

Current Value: High. Fabric is a key product DNA signal and can guide sample development.

Related to product decision? Yes.

Recommendation: Modify.

Reason: keep, but evolve into Fabric DNA with composition, softness, breathability, stretch, and premium-feeling notes where data exists.

## Missing From Current Dashboard

### Missing Feature: Market Trend Intelligence

Purpose: show which product categories appear important or growing.

Current Value: Not present as a dedicated section.

Related to product decision? Yes.

Recommendation: Add after approval.

Notes: should include product category popularity, brand coverage, price range, and market signals.

### Missing Feature: Product Opportunity Center

Purpose: identify products worth developing and explain why.

Current Value: only partially present through sample priority ranking.

Related to product decision? Yes.

Recommendation: Add after approval.

Notes: should show Product, Market Demand, Competition, Development Difficulty, Knowledge Depth, and Recommendation.

### Missing Feature: Brand Learning Value

Purpose: explain why certain brands are useful references.

Current Value: only partially present through product reference and customer potential rankings.

Related to product decision? Yes.

Recommendation: Add after approval.

Notes: should include product innovation, design value, market influence, representative products, and customer potential.

### Missing Feature: Product Intelligence Detail Page

Purpose: explain why a product sells, not only that it exists.

Current Value: not present.

Related to product decision? Yes.

Recommendation: Add after approval.

Notes: should include Product Overview, Fabric DNA, Fit DNA, Construction DNA, Consumer Insight, Market Benchmark, and Development Opportunity.

## Recommended Dashboard Direction

Recommended primary dashboard sections:

1. Market Trend Intelligence
   - Product category popularity
   - Product coverage among brands
   - Price range
   - Market signals

2. Product Opportunity Center
   - Product
   - Market Demand
   - Competition
   - Development Difficulty
   - Knowledge Depth
   - Recommendation

3. Brand Learning Value
   - Product innovation
   - Design value
   - Market influence
   - Representative products
   - Customer potential

4. Data Quality
   - Verified data
   - Source completeness
   - Last updated information
   - Records needing research

Recommended secondary dashboard or page-level items:

- Total brand count
- Total product count
- Brand count by country
- Lead priority distribution
- Simple country statistics

## Approval Needed Before Implementation

No code has been changed in this audit step.

Before implementation, confirm whether to:

1. Modify the existing `/dashboard` route into a Product Intelligence Dashboard.
2. Add a new product intelligence detail route for product knowledge.
3. Move low-priority statistics out of the main dashboard but keep them available in secondary pages.
