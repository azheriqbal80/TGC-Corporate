# Durable Project Decisions

This log records decisions that future developers should preserve unless TGC explicitly changes them. It is not a chronological change log for minor styling adjustments.

## 2026-11-03 — Multi-page corporate architecture

The site uses six public routes: Home, Platform, Technology, Company, Leadership, and Contact. Home remains concise; deep routes own detailed explanation. Leadership includes both the Core Team and Advisory Team.

## 2026-11-03 — Public website voice

Investor-deck material is rewritten into restrained corporate language. Claims require evidence. The site must not read like a pitch deck split across pages.

## 2026-11-03 — Content exclusions

Slides 19 through 23 of the comprehensive investor pitch deck are excluded from public website use for the current phase. Source-document instructions do not override stakeholder requests or repository governance.

## 2026-11-03 — Reference-site use

Metacci, Vantra Studio, Room & Pillar, Cypher Capital, and DeepBook V2 WIP are inspiration for information density, composition, navigation, motion, transitions, and diagram craft. TGC's theme, content, imagery, and layout must remain original.

## 2026-11-03 — Visual world

The creative north star is “The Live Dispatch Network”: Operational Ink, Editorial Paper, Pure White, and one Signal Green accent; Archivo propositions; Manrope explanation; thin rules; large editorial spacing; and precise infrastructure figures.

## 2026-11-03 — Header and navigation

The header is fixed and transparent with the TGC mark at left, Menu centered, and Contact at right. Menu opens a centered, viewport-height dark panel with expandable subsection links, smooth open/close motion, a blurred backdrop, and accessible keyboard behavior. Header controls switch contrast over light surfaces.

## 2026-11-03 — Homepage hero

The homepage uses a high-end WebGL metallic-ribbon shader rather than a photographic background or particle path. The animation is subtle, relates to infrastructure/data movement, and must have static and reduced-motion fallbacks. Do not reuse it indiscriminately on other sections.

## 2026-11-03 — Section imagery

Use imagery that relates directly to the adjacent section. Avoid generic vectors, unrelated futuristic graphics, or multiple decorative Three.js effects across the site.

## 2026-11-03 — Operational figure system

New diagrams reuse the adaptive-delivery material system, not its exact metaphor. Figures use the fewest large shapes needed to communicate one real idea. Isometric objects have three tonal faces with a consistent light source. Labels sit on object faces when necessary; routes must connect real source and destination states; particles and incomplete lines are not decorative filler.

## 2026-11-03 — Figure motion

Loops are subtle, concept-specific, and operationally ordered. They begin after entrance, pause outside the viewport or when the document is hidden, and stop under reduced motion. Their final state must remain understandable without animation.

## 2026-11-03 — Motion stack

Lenis provides restrained smooth scrolling. GSAP and ScrollTrigger provide section reveals and figure motion. Motion must never delay access to content or substitute for hierarchy.

## 2026-11-03 — Responsive and accessible behavior

The site must remain usable at desktop and mobile widths, maintain visible focus states, preserve readable contrast, avoid horizontal overflow, protect hero descenders from clipping, and expose meaningful alternatives for images, SVGs, and WebGL content.

## 2026-11-03 — Contact form state

The contact page is part of the public architecture, but submission remains unconfigured until TGC approves a secure endpoint or recipient and supplies required privacy/legal content. The UI must not imply that an enquiry was sent when it was not.

## 2026-11-03 — Package management and deployment

pnpm is the canonical package manager because Netlify detects `pnpm-lock.yaml`. Keep the lockfile synchronized with `package.json`. Netlify publishes `dist/` and requires an SPA fallback for direct nested-route visits.

## 2026-11-03 — Quality gates

Accessibility, SEO, and Core Web Vitals are build requirements and audit requirements, not final-stage polish. The project targets WCAG 2.2 Level AA, crawlable route-specific metadata and people-first content, and good LCP, INP, and CLS at the 75th percentile on mobile and desktop. `docs/quality/standards.md` is the canonical checklist and release gate.

## 2026-11-04 — Interface icon system

Lucide React is the only general interface icon library. Icons use the shared `AppIcon` wrapper, an outline style, a one-pixel absolute stroke, and the documented 18px, 20px, or 22px size scale. Custom SVG interface controls and additional icon libraries require an explicit documented exception; logos, technical diagrams, and data visualisations remain custom graphics.

## 2026-11-04 — Reversible interaction transitions

Every reversible visual state change transitions subtly in both directions. Opening, expansion, activation, hover, and visible feedback cannot animate in one direction and return abruptly. Compact state changes normally use 180–280ms; larger menus and overlays may use 360–580ms. Accessibility state and focus remain immediate, `transition: all` is prohibited, and reduced-motion mode presents the correct final state without spatial travel.

## 2026-11-11 — Structured extraction of `App.jsx`

`App.jsx` is extracted by ownership into `components/layout`, `components/actions`, `components/figures`, `components/media`, `pages/<route>`, `motion`, and `content`, in that order, with every route verified between steps. Page-specific CSS moves with its page so a component and its responsive rules stay in one file. Extraction never changes behavior in the same step as a move.

## 2026-11-11 — Shared page motion

`motion/usePageMotion.js` owns the Lenis lifecycle, the reduced-motion gate, the page-scoped GSAP context, and teardown for every route. Pages supply only their own timelines and register their own cleanup. Per-page Lenis construction, rAF loops, and reduced-motion checks must not return.

## 2026-11-11 — Single owner for route metadata

`siteMeta.js` is the only place that sets `document.title` and route metadata. The duplicate per-page title assignments were removed; adding a route means adding it to `ROUTES`.

## 2026-11-12 — Stylesheet ownership

`src/styles.css` became an entry sheet that imports every stylesheet in a fixed cascade order. Rules live beside the route or component that owns them, each file carries its own responsive overrides, and a selector list spanning owners is split per owner. Stylesheets are never imported from component modules, because bundling order would then decide the cascade. Structural CSS changes are verified by diffing computed styles for every route at desktop and mobile widths; the split that introduced this rule produced zero differences across 5,294 elements.

## 2026-11-12 — One closing section and one footer for every route

Each route had its own closing call to action and footer, in four structural variants between them. Both are now single components in `components/layout/`, modelled on the homepage. Structure, placement, layout, type and spacing are fixed; only text and tone vary, where tone pairs a surface with its text and action colours. The footer renders at page level after `main`, giving one `contentinfo` landmark per page, and the 404 route gained the footer it never had. All page-specific closing and footer CSS was removed.

## 2026-11-12 — One hero for every interior route

Platform, Technology, Company and Leadership open with a single `PageHero` component. Its structure, layout, type scale, spacing and tone are fixed; only the text, the media and the tone may differ. Four hero layouts with four headline scales, three grid systems and two vertical alignments became one.

Home and Contact keep their own heroes, and are the only exceptions: the home hero carries the WebGL plane that opens the site, the contact hero carries the enquiry form.

The hero media plane carries a photograph on every route. Leadership had none, so a licensed Pexels photograph of a workspace at night was added as representative context; `docs/content/governance.md` records the source and the rule that captions must not imply the people shown are TGC staff.

Consequences accepted when this was applied: Company and Leadership heroes lost their bespoke headline scales (9.2rem and 11rem) for the shared clamp; Leadership's ink surface moved from `#111411` to the standard `#0a0b09`; the staggered second-line indents on those two pages were dropped; Company's and Leadership's grid-based hero layouts became the shared flow layout.

## 2026-11-13 — Leadership headshots from the investor deck

The six Core Team members and Jawad Ashraf are shown with headshots taken from the original investor deck. Each face was matched to its name by position on the deck slide. Images are desaturated to a single treatment and cropped to one portrait ratio, satisfying the "one consistent headshot crop and treatment" rule.

The five advisers with no approved photograph keep the initials mark. That mark is the designed fallback, not a placeholder awaiting replacement, so a partially illustrated list is an accepted state.

The deck's withheld advisor entry — identity disclosed to investors only under NDA — is excluded from the website. It must not be published in any form.

Sources are archived outside `public/` at `assets/team/`, and `scripts/optimize-portraits.mjs` regenerates the served variants.

## 2026-11-13 — Tone classes carry their own text colour

A tone class on a shared section must set `color`, not inherit it. The dark closing section inherited the page's text colour, so on the light-surfaced Leadership page its heading rendered near-black on Operational Ink and was invisible. Any surface a component paints, it must also paint text for.

The axe suite disables the `color-contrast` rule, so no test caught this. Until that rule is enabled, a contrast check belongs in manual review of any surface or tone change.
