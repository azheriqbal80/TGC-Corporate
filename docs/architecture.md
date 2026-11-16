# Website Architecture

## Application model

The website is a Vite-built React single-page application that exposes six public pathname routes plus one unlisted design-system reference route. Route selection currently happens in `src/App.jsx` using `window.location.pathname`; React Router is not installed.

| Route           | Component         | Responsibility                                                                                                 |
| --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `/`             | `HomePage`        | Proposition, verified recognition, platform preview, technology preview, company preview, and contact close    |
| `/platform`     | `PlatformPage`    | Access problem, player-to-cloud journey, platform layers, ecosystem value, and technology transition           |
| `/technology`   | `TechnologyPage`  | Delivery context, engineering focus, infrastructure criteria, evidence context, and contact close              |
| `/company`      | `CompanyPage`     | Purpose, origin, location, operating principles, and leadership model                                          |
| `/leadership`   | `LeadershipPage`  | Core Team and Advisory Team                                                                                    |
| `/contact`      | `ContactPage`     | Enquiry form, routing guidance, location, and submission state                                                 |
| `/design-guide` | `DesignGuidePage` | Unlisted, noindex presentation of the canonical `docs/DESIGN.md`, including live tokens and component examples |

Hosting must provide an SPA fallback so direct visits and refreshes on nested routes return `index.html`.

Each route component lives in `src/pages/<route>/`. A component used by exactly one route belongs in that route folder, not in `components/`; promote it only when a second route needs it.

`gsap.registerPlugin(ScrollTrigger)` runs once in `src/motion/usePageMotion.js`. Every page imports that module, so registration always precedes any page timeline.

## Implementation ownership

```text
src/
  App.jsx
    Route switch only
  pages/<route>/
    One folder per route: the page component and any component only it uses
  components/layout/
    SiteHeader: fixed header, menu panel, focus and scroll-lock behavior
    PageHero: the one hero every interior route opens with
    SiteFooter: the one footer every route renders
    ClosingSection: the one closing call to action every route ends with
  components/actions/
    Arrow and LinkButton
  components/figures/
    Composed section figures, each a pure SVG component with no motion of its own
  components/figures/primitives/
    IsometricBlock and CapabilityCylinder, the three-face building blocks
  content/
    Page data arrays, beside the briefs in docs/content/pages that own their copy
  styles.css
    Entry sheet: font and Tailwind imports, then every stylesheet in cascade order
  styles/base.css
    Tokens, reset, focus, skip link, keyframes
  styles/shared.css
    Rules used by more than one route
  <component>/<Name>.css and pages/<route>/<route>.css
    Each file holds its own rules and every one of its responsive overrides
  components/ui/
    ShaderMetal and its stylesheet: homepage WebGL metallic-ribbon visual and fallback behavior
  motion/usePageMotion.js
    Shared Lenis lifecycle, reduced-motion gate, GSAP context, and teardown
  siteMeta.js
    Route table and the single owner of document title and route metadata

public/
  brand/
    Approved black, green, and white TGC logo variants
  images/
    Content-related imagery for Home, Platform, Technology, and Company
```

`App.jsx` is being extracted by ownership rather than by arbitrary file length. The agreed destination is:

- `components/layout/` — header, navigation panel, footer, skip link
- `components/actions/` — buttons, text links, arrows, contact rail
- `components/figures/` — isometric primitives and the composed section figures
- `components/media/` — WebGL and other heavy visual components
- `pages/<route>/` — one folder per route, holding the page, its sections, and its CSS
- `motion/` — shared scroll, reveal, and figure-loop behavior
- `content/` — page data arrays, kept beside the briefs they implement

Extraction order, each step verified on every route before the next: dead code removal, shared motion, page data, figures, layout and actions, then pages with their CSS. The JavaScript extraction is complete. `App.jsx` is the route switch alone, and every page, figure, action, layout component and data array has its own module. The extraction is complete. `src/styles.css` is now an entry sheet of imports; the rules live beside the component or route that owns them.

Do not refactor solely to create more files. Preserve behavior and verify every route after structural changes.

## Shared systems

### Page opening

Every interior route opens with `PageHero` from `components/layout/`, directly below the header: a masked headline, a copy column, an action pair, a media plane and a three-part foot strip, in that order. Structure, layout, type scale, spacing and tone are fixed in `PageHero.css`; only the text, the media and `tone` vary. `line` names the data attribute the owning page animates on each headline line.

The media slot takes an image descriptor (`name`, `alt`, dimensions, `sizes`, `label`, `caption`). `name` is the base filename in `public/images/`; the component builds the AVIF, WebP and PNG sources from it, so a new hero image must also be added to `scripts/optimize-images.mjs` and its variants generated.

Home and Contact keep their own heroes: the home hero carries the WebGL plane and the contact hero carries the enquiry form. Neither uses `PageHero`, and neither should be given page-specific hero CSS beyond what those two pages already own. For every other route, extend `PageHero` rather than adding page-specific hero markup or CSS.

### Page closure

Every route ends with `ClosingSection` followed by `SiteFooter`, both from `components/layout/`. The closing section takes its text slots, a `tone`, and `reveal`, which names the data attribute the owning page animates. The footer takes a `tone` and its text. Neither accepts layout or geometry overrides.

The footer renders at page level, after `main`, so it is a single `contentinfo` landmark rather than part of a section.

`components/layout/SiteFooter.jsx` is the only footer in the site. Pages render `<SiteFooter />` with no props. Do not add a page-specific footer or closing section, or page-specific CSS for either; extend the component and its stylesheet instead.

### Navigation

`components/layout/SiteHeader.jsx` owns the fixed three-part header, centered menu trigger, expandable navigation groups, light-surface contrast switching, menu backdrop, body scroll lock, and closing behavior.

Route and subsection links are data in `src/content/navigation.js`. Adding a route or an in-page section means editing that module, not the header component.

### Scrolling and reveal motion

Every route calls `usePageMotion(rootRef, setup)` from `src/motion/usePageMotion.js`. The hook owns the Lenis lifecycle, the reduced-motion gate, the GSAP context scoped to the page root, and teardown. Under `prefers-reduced-motion: reduce` no Lenis instance is created and `setup` never runs, so the page presents its final composition immediately.

A page passes its own timelines through `setup`, and registers teardown it owns through `registerCleanup`, which the hook runs before reverting the context. Every page section receives motion treatment: the hero uses its entrance sequence; subsequent sections use subtle scroll-triggered reveals, with meaningful sibling items staggered in reading order. Prefer one reveal for a single content block and one restrained stagger for a related list; do not animate every text node independently. Reveal groups once by default. Continuous loops pause outside the viewport or while the document is hidden.

Every reversible visual state change transitions subtly in both directions while semantic state and focus update immediately. Under reduced motion, show the complete static composition without spatial travel or long interpolation. Do not reintroduce per-page Lenis construction, rAF loops, or reduced-motion checks. Page components must not set `document.title`; `siteMeta.js` owns route metadata.

### Figures

Reusable isometric primitives in `components/figures/primitives/` provide three-face blocks and cylinders. Section figures in `components/figures/` compose these primitives into concept-specific diagrams. Figure design rules belong exclusively to `docs/DESIGN.md`.

Figures are pure SVG components. They hold no hooks, no GSAP, and no motion of their own; they expose `data-` hooks that the owning page animates through its `usePageMotion` setup. Keep that boundary: a figure must render correctly as a static image on its own.

### Page content

Page data arrays live in `src/content/`, one module per route. A copy change updates the owning brief in `docs/content/pages/` and its `src/content/` module in the same change. Components must not hold page copy inline.

### Homepage WebGL

`ShaderMetal` is a homepage signature visual. It is non-interactive, sits behind readable copy, observes visibility, and provides a static failure state. Do not use it as a generic replacement for section imagery.

### Content

Public page copy is recorded in `docs/content/pages/`. Internal verification, exclusion, visual, and implementation notes must never be rendered as public content.

### Contact

The contact form validates and displays interface states but intentionally does not submit externally. A live integration requires an approved server-side or managed endpoint plus privacy/legal review.

## Stylesheet ownership

`src/styles.css` imports every stylesheet in a fixed order. CSS is one global cascade, so that order is the cascade: a stylesheet is never imported from a component module, where bundling or route splitting could reorder it.

A rule belongs to the route or component that uses its classes, and a rule used by more than one route belongs to `styles/shared.css`. A selector list that spans owners is split so each owner keeps its own copy in its own file; leaving it in `shared.css` silently moves one owner’s rule in the cascade.

Every responsive override lives in the same file as the rule it overrides, inside a `@media` block in that file. Do not collect breakpoints into one shared block.

When changing stylesheet structure, verify by comparing computed styles for every route at desktop and mobile widths before and after. Equal output is the only proof that a cascade change was safe.

## Responsive ownership

- `900px`: primary editorial grids stack and page-edge spacing tightens.
- `620px`: header and menu become compact; the right-side Contact shortcut is hidden.
- `520px`: display type, actions, figures, and dense secondary information tighten again.

Do not add route-specific breakpoints without checking whether the shared breakpoint system can express the requirement.

## Accessibility and resilience

- Keep native links, buttons, headings, labels, and form semantics.
- Maintain visible keyboard focus.
- Keep header controls readable over light and dark surfaces.
- Preserve hero descender clearance inside reveal masks.
- Supply useful image alt text and concise SVG titles/descriptions.
- Ensure the final composition is understandable without animation.
- Avoid horizontal overflow at compact widths.

The complete implementation and audit gates are owned by `docs/quality/standards.md`. Accessibility, SEO, and Core Web Vitals must be considered during construction rather than deferred to final QA.
