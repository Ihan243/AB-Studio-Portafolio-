# AB Studio — Pricing Center

The primary pricing overview is `/pricing/` (Spanish convenience redirect: `/precios/`). Service pages remain separate: `/sitios-web/`, `/business-management/`, `/crm/`, `/seo/`, and `/sistemas/`.

## Edit rates in one place

Update **`abPrices` at the start of `public/assets/js/site.js`**. The web, Business Management, CRM, SEO, and NFC figures are consumed by the interactive pricing overview, shared estimate calculations, dynamic CRM plans, website pricing, and the website + add-on calculators. Initial rates are displayed with **From / Desde**, and maintenance is displayed separately.

The separate `quoteData`, `crmText`, `websitePageCopy`, and `priceCopy` dictionaries are mainly copy and descriptions. They must remain aligned with the services sold. Some static HTML includes starting prices for search/no-JavaScript fallback; adjust those static values if published rates change.

## Current starting prices (USD)

| Category | One-time | Monthly |
|---|---:|---:|
| Web Basic | 1,100 | Separately agreed |
| Web Professional | 1,500 | Separately agreed |
| Web Premium | 2,500 | Separately agreed |
| Business Management base | 450 | 25 |
| Product catalog | 250 | 10 |
| Inventory | 400 | 20 |
| Orders | 450 | 20 |
| Sales reports | 250 | 10 |
| Simple reservations | 450 | 20 |
| Basic customer follow-up | 300 | 15 |
| CRM Starter | 900–1,500 | 39 |
| CRM Growth | 1,500–3,000 | 89 |
| CRM Enterprise | 3,000+ | 199+ |
| SEO / Local | 200 | 30 |
| NFC + QR plaque | 49+ | None published |

## Customer estimate behavior

- Customers can choose **an existing site** or **a new web plan**.
- The dashboard base and its modules are charged only if Business Management is selected.
- The simple customer follow-up module is not charged with a full CRM selection. Choosing one removes the other from the estimate.
- CRM ranges show both minimum and maximum setup estimates; Enterprise shows open-ended `+`.
- Initial setup and monthly service totals are always separate.
- The breakdown is included in a **prepared** WhatsApp or email message, never submitted automatically.
- Custom migrations, hosting, domains, third parties, taxes, and special integrations are **not** included in estimated totals.
- The current estimator does not process payments or create a binding offer.

## Tests and maintenance

Review `scripts/smoke-test.js` after editing rates or routes. Verify English/Spanish, existing vs. new website, all modules, CRM overlap, SEO, keyboard navigation, dark mode, phone/tablet/desktop widths, and deployed Vercel rewrite behavior. Run `npm test` in the repository if your environment has Node and the full code checked out.
