# AB Studio mobile Lighthouse optimization — 2026-11-20

## Reported baseline (Moto G Power, Lighthouse 13.6, simulated slow 4G)
- Performance **69**, Accessibility **100**, Best Practices **100**, SEO **100**.
- FCP **2.3 s**; LCP **7.4 s**; TBT **50 ms**; CLS **0**; Speed Index **5.6 s**.
- LCP was an entrance-door window `#ab-entry .ab-entry-window`.
- An offscreen third-party iframe for La Patarata eagerly consumed resources during the initial audit despite `loading="lazy"`, including a 520 KB hero image and a 154 KB dog image.
- AB Studio's nav logo was 102 KB for a ~39x39 mobile display.

## Changes
1. **Fully defer La Patarata's iframe navigation**: the markup uses `data-src` instead of `src`; an IntersectionObserver assigns `src` when the project card approaches within 120 px. The native `loading="lazy"` attribute remains as an additional safeguard. The fallback visual and external demo links remain available while the iframe loads. The same is true for `/proyectos/`.
2. **Optimize brand images**: original full-size images are preserved. The mobile nav, footer, and entrance logo use `logo-96.webp` (~1.8 KB) instead of the 102 KB JPEG. The entrance uses a portrait-specific WebP on narrow viewports (~70 KB instead of the 119 KB desktop image).
3. **LCP discovery and priority**: first-visit inline script preloads the correct entrance background (mobile or desktop) before the stylesheets and assigns high fetch priority. Revisits skip the preload.
4. **Reduce entrance render-blocking**: while the full-screen intro covers the app, main-site CSS downloads asynchronously; on revisits, normal main-site CSS loading is restored so the page does not flash unstyled.
5. **Avoid first-paint forced layout**: initial intro button focus runs after two animation frames instead of immediately following inert-background updates.
6. **Regression tests**: validate DOM mirrors, image presence and size limits, no immediate third-party iframe `src`, and navigation/CRM tests remain part of `npm test`.

## Notes
These are code and asset optimizations; do not claim a new Lighthouse score until running the test again on the new Production deployment. For comparable results, use the same Moto G Power/slow-4G Lighthouse settings and compare FCP, LCP, TBT, CLS, and transferred bytes. The La Patarata **site itself** is unchanged; its own separate Lighthouse score is not addressed by this PR.
