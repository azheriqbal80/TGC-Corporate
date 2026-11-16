# Quality Standards

## Enforced commands

- `pnpm quality` — formatting, linting, unit tests, production build, robots/sitemap and public-file validation.
- `pnpm test:e2e` — desktop and mobile route, responsive-shell, navigation-focus and serious/critical axe accessibility checks.
  Axe scans run with reduced motion emulated, so a continuous animation cannot starve the scan or push it into the test timeout. The scanned DOM is unchanged. Separate tests cover the motion-enabled state, including WebGL initialisation on the homepage. Do not raise the Playwright timeout in place of this.
- `pnpm audit:security` — production dependency vulnerability gate.
- `pnpm audit:lighthouse` — performance, accessibility, best-practice and SEO budgets.

The GitHub workflow runs the first three gates on every pull request and main-branch push. Netlify runs `pnpm quality` before publishing. Lighthouse remains a deliberate release/staging gate because its results require a stable browser and representative network conditions.

These requirements apply whenever a page, component, interaction, diagram, animation, or content block is built, changed, reviewed, or prepared for deployment. They are release gates, not optional polish.

## Standards baseline

- Accessibility target: WCAG 2.2 Level AA.
- Search target: crawlable, descriptive, people-first pages following Google Search Essentials.
- Performance target: all three Core Web Vitals in the “good” range at the 75th percentile, evaluated separately for mobile and desktop.
- Audit evidence must distinguish automated checks, manual checks, lab data, and real-user field data.

Primary references:

- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- Google Search Essentials: <https://developers.google.com/search/docs/essentials>
- Google SEO Starter Guide: <https://developers.google.com/search/docs/fundamentals/seo-starter-guide>
- Core Web Vitals: <https://web.dev/articles/vitals>

## Accessibility — UX checklist

- Every page has a clear purpose, predictable sequence, and one obvious primary action.
- Navigation labels describe their destination and remain consistent across routes.
- Users can reach all routes and complete all available tasks using only a keyboard.
- Opening the menu moves interaction into a logical state; closing it restores focus to the trigger.
- Escape closes modal or overlay navigation where expected.
- Fixed headers, menus, and overlays never completely hide the focused control.
- Forms explain what information is required before submission.
- Validation messages identify the field, explain the problem, and state how to correct it.
- Success, error, pending, and offline states are announced without relying on color alone.
- No action implies success when data was not sent. The current contact form must retain its configuration notice until a real endpoint is approved.
- Content remains understandable without animation, hover, sound, or WebGL.
- Motion does not interrupt reading, focus, or task completion.
- Touch interactions do not require precision gestures; provide a simple pointer alternative for any complex gesture.

## Accessibility — UI checklist

- Normal text contrast is at least 4.5:1. Large text and meaningful UI graphics are at least 3:1.
- Focus indicators are always visible, are not clipped, and have at least 3:1 contrast against adjacent states.
- Color is never the only indicator of state, selection, error, or meaning.
- Interactive targets meet WCAG 2.2 minimum target requirements and should provide at least a 44 × 44 CSS-pixel touch area wherever the layout permits.
- Text can zoom to 200% without loss of content or function.
- Layout remains usable at 320 CSS pixels wide and with increased text spacing.
- Hover states also have keyboard-focus equivalents.
- Disabled, active, expanded, selected, error, and loading states are visually distinguishable.
- The header maintains readable logo and control contrast over both light and dark sections.
- Hero masks provide enough descender space for letters such as g, p, q, and y.
- Animations use transform and opacity where possible; avoid flashing, large rapid movement, and unnecessary parallax.
- Every reversible visual state has a subtle transition in both directions. Hover/rest, open/closed, expanded/collapsed, active/inactive, and visible/dismissed states are checked for abrupt changes. Default compact transitions remain approximately 180–280ms; larger overlays may use 360–580ms without delaying access or focus.
- Do not use `transition: all`. Accessibility state and focus update immediately, and reduced-motion mode removes spatial travel and long interpolation while preserving an unmistakable final state.
- Interface icons use Lucide through the shared `AppIcon` wrapper: 18px, 20px, or 22px with a one-pixel absolute outline stroke. Icons accompanying visible labels are decorative; icon-only controls expose an accessible name and retain an adequately sized interaction target.
- Custom SVG interface icons, emoji, Unicode symbols, and additional icon libraries require a documented exception. Brand marks, operational diagrams, and data visualisations are not interface icons.
- `prefers-reduced-motion: reduce` produces a deliberate static experience rather than merely making durations extremely short.

## Accessibility — frontend behavior checklist

- Native elements are preferred: `<button>` for actions, `<a>` for navigation, and native form controls where possible.
- Custom controls expose correct accessible name, role, value, state, and keyboard behavior.
- Menu triggers expose `aria-expanded` and `aria-controls`; hidden navigation is removed from the interaction order.
- Focus is never trapped accidentally and does not move unexpectedly on route load.
- Body scroll locking does not prevent keyboard or assistive-technology access to the active menu.
- Scroll and animation code respects reduced motion and cleans up observers, event listeners, animation frames, Lenis, GSAP contexts, and ScrollTriggers.
- Continuous WebGL and figure loops pause outside the viewport and while the document is hidden.
- Pointer events do not replace click or keyboard activation.
- Form errors use programmatic associations such as `aria-describedby`; status updates use an appropriate live region.
- Dynamic content updates retain logical focus and reading order.
- Automated accessibility checks are followed by manual keyboard and screen-reader checks.

## Accessibility — markup checklist

- Each route has one meaningful `<h1>` and a logical heading hierarchy without skipped levels used only for styling.
- Use landmarks such as `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` appropriately.
- Repeated navigation has an accessible label.
- A keyboard-accessible skip link reaches the main content.
- Page language is declared on the root HTML element.
- Images have useful alt text when informative and empty alt text when decorative.
- Decorative SVGs and canvas elements are hidden from assistive technology; explanatory figures have concise titles and descriptions or an adjacent text equivalent.
- Form fields have persistent visible labels. Placeholder text is not the label.
- Required state, autocomplete purpose, input type, and error relationships are marked correctly.
- Lists, tables, quotations, addresses, and time information use their semantic elements when applicable.
- Link text makes sense outside its surrounding paragraph; avoid ambiguous repeated “Learn more” links.
- IDs are unique, ARIA references resolve, and invalid ARIA is not used to repair non-semantic markup.
- The DOM reading order matches the visual reading order at every breakpoint.

## SEO checklist

### Crawlability and routing

- Every meaningful screen has a stable, descriptive URL.
- All public routes are reachable through crawlable `<a href>` links.
- Direct visits return a successful HTML response through the SPA fallback.
- Production provides a valid `robots.txt` and XML sitemap containing canonical public URLs.
- Staging and private review deployments must not be indexed; production must not accidentally inherit a `noindex` directive.
- Broken links, redirect chains, soft 404s, and orphan routes are release blockers.

### Page metadata

- Every route has a unique, concise, descriptive `<title>`.
- Every route has a useful meta description aligned with visible page content.
- Every route declares its canonical production URL.
- Open Graph and social-sharing metadata use approved titles, descriptions, URLs, and imagery.
- Favicon and application icons use approved TGC assets.
- Metadata must update correctly on direct route load, navigation, and social crawler requests.

### Content and markup

- Each route has one descriptive H1 that aligns with its title and page purpose.
- Visible copy is useful, reliable, people-first, and based on approved evidence.
- Important concepts appear naturally in titles, headings, body copy, link text, and image descriptions; do not keyword-stuff.
- Internal links use descriptive anchor text and connect related Platform, Technology, Company, Leadership, and Contact content.
- Images use descriptive filenames, appropriate alt text, explicit dimensions, and efficient formats.
- Add valid `Organization` structured data using only approved company details. Add other schema types only when the visible content supports them.
- Structured data must validate and must not describe hidden, invented, or unapproved information.
- Do not expose excluded pitch-deck material, private data, duplicate boilerplate pages, or thin placeholder routes.

### JavaScript rendering

The current site is a client-rendered React SPA. Before production SEO sign-off, verify rendered content and metadata in Google Search Console URL Inspection or an equivalent rendered-HTML test. If route-specific metadata or reliable crawling cannot be achieved, add prerendering or server-side rendering rather than assuming JavaScript execution is sufficient.

## Core Web Vitals and performance checklist

### Required field targets

Measure at the 75th percentile, separately for mobile and desktop:

| Metric                          |        Good target | What it protects           |
| ------------------------------- | -----------------: | -------------------------- |
| Largest Contentful Paint (LCP)  |      ≤ 2.5 seconds | Loading experience         |
| Interaction to Next Paint (INP) | ≤ 200 milliseconds | Interaction responsiveness |
| Cumulative Layout Shift (CLS)   |              ≤ 0.1 | Visual stability           |

Passing requires all three metrics to meet the good threshold. Lighthouse is useful lab evidence but does not replace Chrome User Experience Report, Search Console, PageSpeed Insights field data, or real-user monitoring.

### Loading and LCP

- Identify the LCP element on every route and viewport class.
- Do not lazy-load the LCP image. Give it appropriate priority and preload only when measurement supports it.
- Compress and resize raster images; provide responsive sources and modern formats where practical.
- Declare image width and height or an equivalent aspect ratio.
- Keep critical fonts local or efficiently hosted, subset when practical, and use a display strategy that avoids invisible text.
- Avoid render-blocking third-party scripts and unnecessary CSS.
- Keep the first viewport concise; defer below-the-fold media and nonessential work.
- WebGL initialization must not block headline, navigation, or primary action rendering.

### Responsiveness and INP

- Keep main-thread tasks short and split expensive initialization work.
- Avoid synchronous layout reads and writes inside loops or animation frames.
- Use passive listeners for scroll and touch where appropriate.
- Do not attach duplicate global listeners on route changes or React Strict Mode remounts.
- Keep menu, form, and navigation feedback immediate even while animations are active.
- Limit JavaScript shipped to the route; consider code splitting if bundle growth becomes material.
- Cap WebGL device-pixel ratio and rendering resolution; pause rendering outside the viewport and on hidden tabs.
- Use transform and opacity for motion instead of layout-triggering properties.

### Stability and CLS

- Reserve space for images, figures, canvas, fonts, form messages, and asynchronously revealed content.
- Never insert banners, errors, consent controls, or status messages above existing content without reserved space or an intentional user action.
- Ensure font loading does not materially change line wrapping or hero height.
- Animations must not change layout dimensions after initial paint unless initiated by the user.
- The fixed header and opening menu must not cause page content to jump.

### Supporting performance requirements

- Remove unused dependencies, assets, CSS, observers, and animation code.
- Lazy-load below-the-fold images and noncritical media.
- Use long-lived immutable caching for hashed assets and appropriate caching for HTML.
- Keep third-party scripts to an approved minimum.
- Test on a mid-range mobile profile and throttled network, not only a development desktop.
- Investigate regressions route by route; a passing average must not hide a failing page.

## Build-time checklist

For every component or page change:

1. Confirm semantic ownership and heading structure before styling.
2. Test keyboard behavior and visible focus while building.
3. Check contrast, target size, zoom, and narrow-width behavior.
4. Add reduced-motion and no-WebGL behavior with the primary implementation, not afterward.
5. Add route metadata and internal links with the page content.
6. Reserve media dimensions and avoid unnecessary initial JavaScript.
7. Update the owning documentation when a durable rule or route behavior changes.

## Audit procedure

Use [`audit-template.md`](audit-template.md) for every formal audit.

An audit must include:

- Automated accessibility scan plus manual keyboard review.
- Screen-reader smoke test of navigation, headings, figures, and forms.
- Contrast, zoom, text-spacing, and mobile overflow checks.
- Semantic HTML and ARIA inspection.
- Route-specific title, description, canonical, crawlable-link, robots, sitemap, and structured-data checks.
- Lighthouse mobile and desktop runs for every route or every distinct page template.
- Field Core Web Vitals evidence when the site has sufficient traffic.
- Bundle and asset review when JavaScript, images, fonts, Three.js, GSAP, or third-party code changes.
- Severity, owner, evidence, remediation, and retest state for every finding.

## Definition of done

A change is not complete until:

- No known WCAG 2.2 A or AA blocker remains in the changed experience.
- Keyboard, focus, reduced motion, zoom, and compact-width behavior are verified.
- Metadata and crawlability are correct for affected routes.
- The change does not regress LCP, INP, or CLS beyond the good thresholds or the approved performance budget.
- Production build passes.
- The relevant audit evidence is recorded and all P0/P1 issues are resolved or explicitly blocked from release.

### Colour contrast

The axe runs in `tests/e2e/site.spec.js` disable the `color-contrast` rule, so contrast regressions do not fail CI. Known open failure: `.journey-node` labels on Platform at 3.48:1. The shared header now uses a dark translucent glass field with the white logo and controls across all routes; the prior Contact contrast failure has been corrected. Check contrast by hand whenever a surface, tone, or text colour changes.
