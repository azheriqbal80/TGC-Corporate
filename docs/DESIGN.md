---
name: The Game Company
description: A live dispatch network for AI-powered cloud gaming infrastructure.
colors:
  signal-green: "#a6f432"
  operational-ink: "#0a0b09"
  editorial-paper: "#eef0e9"
  pure-white: "#ffffff"
  line-on-dark: "rgba(255,255,255,.17)"
  muted-on-dark: "#aeb6a6"
  link-on-dark: "#d7ddcf"
  field-error: "#a52c24"
  feedback-success: "#dcebc4"
  feedback-error: "#f1d6d2"
  diagram-ink-top: "#1e271a"
  diagram-ink-left: "#0b0f0b"
  diagram-ink-right: "#172015"
  diagram-paper-top: "#f4f5ef"
  diagram-paper-left: "#d9ddd4"
  diagram-paper-right: "#c5ccc0"
  diagram-green-left: "#72ad22"
  diagram-green-right: "#8bd328"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.5rem, 7.6vw, 7.2rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.1rem, 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(27px, 3vw, 46px)"
    fontWeight: 400
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  sharp: "0px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "18px"
  md: "20px"
  lg: "24px"
  edge-desktop: "3vw"
  edge-mobile: "20px"
  section-y: "140px"
  section-y-compact: "90px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.operational-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "0 18px"
    height: "56px"
    width: "188px"
  button-primary-hover:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.operational-ink}"
  button-light:
    backgroundColor: "{colors.editorial-paper}"
    textColor: "{colors.operational-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "0 18px"
    height: "56px"
    width: "188px"
  signal-node-source:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.operational-ink}"
    rounded: "{rounded.sharp}"
    padding: "16px"
    size: "155px"
  signal-node-target:
    backgroundColor: "{colors.editorial-paper}"
    textColor: "{colors.operational-ink}"
    rounded: "{rounded.sharp}"
    padding: "16px"
    size: "155px"
  text-link:
    textColor: "{colors.link-on-dark}"
    rounded: "{rounded.sharp}"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.operational-ink}"
    borderColor: "#70756c"
    rounded: "{rounded.sharp}"
    padding: "12px 0"
  input-field-error:
    borderColor: "{colors.field-error}"
    textColor: "{colors.field-error}"
  navigation:
    textColor: "{colors.pure-white}"
    rounded: "{rounded.sharp}"
  route-status:
    textColor: "{colors.signal-green}"
  contact-action:
    textColor: "{colors.signal-green}"
    rounded: "{rounded.sharp}"
    height: "82px"
---

# Design System: The Game Company

## Overview

**Creative North Star: "The Live Dispatch Network"**

The visual system treats cloud gaming as an operating network already in motion: a near-black control field, a single electric route signal, and cool paper surfaces that let corporate evidence read with editorial clarity. Its confidence comes from scale, alignment, and instrumentation rather than game-like spectacle.

The world is precise, spacious, and controlled. Overscale Archivo statements establish the proposition; compact Manrope labels behave like route annotations; rules, nodes, paths, indices, and cropped network frames make infrastructure visible without turning it into decorative sci-fi. Bright color is scarce and therefore meaningful.

**Key Characteristics:**

- Near-black operations fields alternate with cool editorial paper and signal-green evidence bands.
- Overscale, tightly tracked headlines are balanced by small uppercase manifest labels.
- Thin rules, coordinate lines, circular nodes, cinematic shader ribbons, and isometric system figures visualize infrastructure.
- Isometric figures use a few large three-tone objects; visible labels and routes appear only when the relationship cannot be understood without them.
- Motion is smooth and low-amplitude, with a complete reduced-motion fallback.

### Scope and Ownership

This file is the canonical source for TGC's visual and interaction language. It governs tokens, spatial rhythm, responsive behavior, imagery, interface components, diagrams, and motion. Product positioning belongs in `PRODUCT.md`; page copy belongs in `docs/content/pages/`; accessibility, SEO, security, and performance release gates belong in `docs/quality/standards.md`; implementation ownership belongs in `docs/architecture.md`.

Every visual-system change updates this file and `.impeccable/design.json` in the same change. When implementation and this document disagree, verify the latest stakeholder decision, then reconcile the implementation and design records instead of silently allowing two systems to develop.

**The Single Visual Source Rule.** Define a reusable visual decision once in `DESIGN.md`; other documents and code should reference or implement it rather than restating a competing version.

## Colors

The palette is deliberately narrow: operational dark, editorial light, pure white, and one live signal color.

### Primary

- **Signal Green:** The sole active accent. Use it for primary actions, live route states, proof fields, emphasis within display copy, focus outlines, and selected network paths.

### Neutral

- **Operational Ink:** The default dark field and dark text on green or paper surfaces.
- **Editorial Paper:** The cool light field for explanatory and company sections, plus the light action variant.
- **Pure White:** High-contrast display copy, the white logo, mobile menu strokes, and the primary-action hover state.
- **Line on Dark:** The low-contrast structural rule used in navigation panels, diagram frames, and dark-section dividers.
- **Muted on Dark:** Supporting body copy on Operational Ink when Pure White would compete with the main proposition.
- **Link on Dark:** Higher-contrast secondary action text on dark fields.
- **Field Error:** Error borders and error copy on light form surfaces; never the only indication that a field is invalid.
- **Feedback Success / Feedback Error:** Quiet light status fields used behind explanatory submission feedback.

### Accessible Pairings

- Operational Ink text may sit on Signal Green, Editorial Paper, Pure White, Feedback Success, and Feedback Error.
- Pure White is the default display color on Operational Ink. Muted on Dark is limited to supporting copy at normal body sizes only after its rendered contrast has been verified.
- Signal Green may identify actions, focus, and active system states on Operational Ink; it is not approved as paragraph text on Editorial Paper or Pure White.
- Structural rules may be intentionally low contrast only when they are decorative. Boundaries, form states, text, and essential diagram relationships must meet the relevant WCAG 2.2 AA requirement in `docs/quality/standards.md`.

### Named Rules

**The One Live Signal Rule.** Signal Green is the only chromatic accent; its rarity identifies what is active, actionable, or operationally important.

**The Alternating Field Rule.** Move between Operational Ink, Editorial Paper, and full Signal Green sections to create rhythm; do not introduce extra surface colors.

**The Legible Pairing Rule.** Every text and essential-state color must use an approved surface pairing and pass the required contrast gate; color never carries state by itself.

## Typography

**Display Font:** Archivo (with sans-serif fallback)  
**Body Font:** Manrope (with sans-serif fallback)  
**Label Font:** Manrope (with sans-serif fallback)

**Character:** Archivo provides a wide, infrastructural display voice with compressed line spacing and assertive scale. Manrope keeps explanatory copy and operational annotations calm, legible, and contemporary.

### Hierarchy

- **Display** (400, `clamp(3.5rem, 7.6vw, 7.2rem)`, 0.88): Hero propositions only; use tight negative tracking and allow the final line to carry Signal Green. Overflow masks must include responsive descender clearance so letters such as g, p, and y are never clipped.
- **Headline** (400, `clamp(3.1rem, 6vw, 6rem)`, 0.98): Major section statements on both dark and light fields.
- **Title** (400, `clamp(27px, 3vw, 46px)`): Technology rows and strong local headings.
- **Body** (400, 16px, 1.65): Explanatory copy; keep key paragraphs between approximately 42ch and 62ch.
- **Label** (600, 12px, 0.08em): Primary action labels. Navigation and manifest annotations use the same family at lighter weight, 9–12px, and 0.10–0.14em tracking.

### Named Rules

**The Two-Voice Rule.** Archivo speaks for propositions and structural titles; Manrope carries explanation, navigation, metadata, and actions.

**The Manifest Label Rule.** Small labels are uppercase, widely tracked, and concise; they annotate the system rather than compete with the message.

## Layout

Desktop composition uses a 12-column hero grid with 20px gutters and a shared 3vw page edge. Most editorial sections simplify this into a 1:3 label-to-content grid, while the platform section uses a 5:7 split. Sections are intentionally tall—typically 900–1000px or a full viewport—and use 130–140px vertical padding so the large type and network diagrams can breathe.

The first viewport overlays concise copy and actions over a full-bleed visual field rather than dividing the hero into equal cards. The homepage uses a metallic WebGL ribbon field; deeper routes use restrained contextual imagery or structured fields. Copy remains readable at 38–62ch. Horizontal rules and column borders carry alignment through proof, principle, technology, company, and contact structures.

At 900px and below, the page edge becomes 20px and primary grids stack to one column. The header keeps the same full-width three-part arrangement, while its centered navigation panel remains viewport-height and scrollable. At 620px and below, the contact shortcut is removed, header spacing tightens, menu type reduces, and hero top spacing accounts for the fixed header. At 520px and below, display sizes and actions tighten again while diagrams scale as complete systems and preserve their final operational relationship.

### Responsive Thresholds

| Threshold       | Purpose                    | Required behavior                                                                                                             |
| --------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Above 900px     | Full editorial composition | Preserve 12-column hero logic, split layouts, desktop section spacing, and the three-part header.                             |
| 900px and below | Stacked composition        | Use a 20px page edge, stack primary content grids, keep diagrams complete, and move supporting content below the proposition. |
| 620px and below | Compact header             | Use the 72px header, hide the Contact shortcut, and let the navigation panel fill the viewport width.                         |
| 520px and below | Compact mobile             | Tighten display scale, action width, and section spacing while preserving readable line length and 44px interaction targets.  |

Breakpoints express a change in composition, not a device label. Add a new threshold only when content or interaction fails between the established thresholds; do not create one to repair a single isolated offset.

**The Instrument Grid Rule.** Every expressive element must still align to an edge, column, rule, node, or documented route; apparent freedom is held by a visible system.

**The Responsive Purpose Rule.** A breakpoint must resolve a real composition or usability change; components scale or reflow as complete systems instead of losing labels, paths, controls, or meaning.

## Elevation & Depth

The system is flat by default and uses no card shadows. Depth comes from alternating tonal fields, full-bleed media behind hero copy, three-face values in isometric figures, faint green illumination inside network diagrams, thin structural lines, and the homepage shader's front-to-back ribbon movement. The only interface shadow is a functional live-state glow; the open navigation may use a restrained backdrop blur to separate it from page content.

### Shadow Vocabulary

- **Signal Glow** (`0 0 12px rgba(166,244,50,.55)`): Reserved for the six-pixel live-status indicator.

### Named Rules

**The Flat Infrastructure Rule.** Surfaces stay flat and square; use rules, fields, overlap, and route geometry before reaching for elevation.

**The Three-Face Depth Rule.** Every isometric block uses one hue family across three flat values: the top face is lightest, the left face is darkest, and the right face sits between them. Create depth through tonal faces and precise edges, never gradients or decorative drop shadows.

## Shapes

The dominant form language is sharp and engineered. Actions, panels, lists, and signal-node cards have square corners. Circles are reserved for network nodes, status indicators, orbit diagrams, and technology glyphs. Fluid forms belong only to visual media such as the homepage shader; they are not a container style.

Borders are one-pixel and low contrast. Crosshair lines divide route diagrams at their centers, while green path segments and nodes create focal points. Overscale background lettering may crop beyond the section edge, but interactive content remains within the grid.

**The Node-or-Plane Rule.** Geometry is either a precise circular node or a sharp plane; avoid casual medium-radius cards and pill-shaped controls.

### Figures and Diagrams

All new or revised figures inherit the adaptive-delivery diagram language. Use crisp isometric blocks, thin structural strokes, restrained circular nodes, and deliberate connecting paths. Inactive infrastructure uses green-tinted Operational Ink faces; the active or adapting state may use Signal Green faces; a destination or output may use the Editorial Paper face ramp. Keep one consistent implied light source across the entire figure.

Reuse the material system, not the metaphor. Every figure must derive its object structure, hierarchy, and motion from the meaning of its adjacent section; a visual that only matches the style but does not explain that section is not acceptable.

Start with the minimum possible vector vocabulary and make the resulting object visually large. Prefer one memorable object, three to seven major parts, and generous negative space over a dense miniature schematic. Visible labels are optional: omit them when adjacent section copy and the SVG title and description already carry the meaning. When labels are essential, place them on a visible face, align them to its angle, and shorten the wording as the plane becomes smaller.

Signal paths use a thin Signal Green stroke and must visibly connect their source and destination when routing is the actual subject of the figure. Do not add a route merely to make a static object look technical. Circular packets or nodes may mark progress, but generic particles, unconnected line fragments, and ornamental orbiting motion are not part of this system. Animate diagrams in their logical operational order; the final state must show the complete relationship. The reduced-motion state displays that complete final composition immediately.

Capability loops remain low-amplitude and concept-specific: prepared elements advance in sequence, a selected resource gently confirms its state, and separate data channels move at distinct rhythms. Loops begin only after the entrance reveal, pause outside the viewport or while the document is hidden, and never run under reduced motion.

**The Operational Figure Rule.** A figure must communicate one real system idea through the fewest large, aligned shapes possible. Text and routes are optional evidence, not required decoration; the figure must never become a dense miniature schematic or generic futuristic ornament.

### Section and Item Reveal Motion

Every page section receives motion treatment: the hero uses its entrance sequence, and each subsequent section receives a subtle scroll-triggered reveal as it enters the viewport. Within a section, meaningful nested groups and sibling items reveal in reading order with a restrained stagger, so rows, steps, and related subsections arrive as one coherent sequence. Use one reveal for a single content block; do not animate every text node independently or stack nested triggers into a long cascade. Reveal each group once by default.

Use transform and opacity, a small vertical travel of about 24px or less, a 0.9–1.15s reveal, and an 80–120ms stagger between related items. Keep motion subordinate to the content and consistent across sections. Keep content in the document and make the full static composition visible when motion is unavailable or reduced.

Every visual state change receives a subtle transition in both directions. Hover, focus-supporting, selected, expanded, loading, success, and error states must settle without bounce; semantic state and focus update immediately. Under `prefers-reduced-motion: reduce`, show the correct final state without spatial travel or long interpolation.

**The Scroll-Triggered Stagger Rule.** Reveal every section and its meaningful nested content in a restrained, ordered sequence; animate content as groups rather than as isolated fragments.

### Imagery and Media

Photography and generated imagery must show a credible relationship to cloud gaming, infrastructure, access, devices, operators, or the people behind TGC. Favor cinematic framing, controlled dark values, real spatial depth, and a clear subject. Avoid generic esports arenas, anonymous neon server rooms, decorative controllers, crypto imagery, stock-photo handshakes, and unrelated futuristic landscapes.

Full-bleed hero media must leave a deliberate low-detail or darkened region for copy and maintain legibility without placing text inside opaque cards. Section imagery should add evidence or context that the adjacent copy cannot provide alone. Crop for the subject at each responsive threshold rather than relying on one desktop crop everywhere. Images declare intrinsic dimensions, use responsive formats where practical, and never become the largest-contentful element without an optimized loading strategy.

The homepage WebGL field is a signature expression, not a reusable section background. It remains non-interactive, pauses when hidden or outside the viewport, exposes a static fallback, and may never compromise the hero's text contrast or Core Web Vitals budget.

**The Evidence Before Atmosphere Rule.** Use imagery to clarify the company, technology, people, or operating context; atmosphere supports that evidence but never substitutes for it.

## Components

### Buttons

Tactile, direct, and rectangular.

- **Shape:** Sharp corners and fixed rectangular proportions (188px × minimum 56px on desktop; 160px × minimum 50px on compact mobile).
- **Primary:** Signal Green field with Operational Ink uppercase label and arrow; horizontal padding is 18px.
- **Hover / Focus:** Hover switches the field to Pure White in 250ms; focus uses a two-pixel Signal Green outline with a five-pixel offset. The arrow advances four pixels.
- **Light:** Editorial Paper field with Operational Ink text for use on dark platform sections.
- **Text Link:** No container; compact uppercase label plus arrow, using a muted light neutral on dark fields.

### Icons

Lucide React is the canonical interface icon library. Use its outline icons through `src/components/ui/AppIcon.jsx` so size, stroke, alignment, and accessibility remain consistent.

- **Style:** Outline only, `currentColor`, rounded Lucide geometry, and a one-pixel absolute stroke. Do not mix filled and outlined icon families.
- **Sizes:** 18px (`sm`) for metadata and compact inline actions; 20px (`md`) for standard links, buttons, navigation, and form controls; 22px (`lg`) for prominent standalone controls. The surrounding interactive target remains at least 44 × 44px where practical.
- **Stroke:** Use `1` as the interface default. A `0.75` stroke is permitted only for a 22px-or-larger non-critical decorative icon on a high-contrast surface; never use it for navigation, form, status, or icon-only controls.
- **Alignment:** Icons align optically with the text baseline or control center and never determine button height. Use consistent gap tokens rather than manual offsets.
- **Accessibility:** Icons beside visible text are decorative and hidden from assistive technology. An icon-only button must carry a concise accessible name on the button. Informative standalone icons require a text alternative and must not communicate meaning through color alone.
- **Motion:** Hover motion stays within three or four pixels and follows the control's direction. Do not spin, bounce, or continuously animate interface icons.
- **Exceptions:** TGC logos, isometric diagrams, system figures, data paths, and the WebGL hero are branded graphics rather than interface icons and remain custom assets.

**The One Icon Family Rule.** Use Lucide for interface symbols; do not introduce another icon package, emoji, Unicode arrows, or one-off inline SVG controls unless the required brand or technical symbol does not exist in Lucide and the exception is documented.

### Interaction Transitions

Every reversible visual state change must have a subtle, deliberate transition in both directions. Opening and closing, expanding and collapsing, activating and deactivating, hovering and returning to rest, and showing or dismissing interface feedback must never jump abruptly between visual states.

- **Default timing:** Use 180–280ms for color, border, icon, hover, focus-supporting, and compact control changes; 240ms is the normal starting point.
- **Larger transitions:** Menus, overlays, accordions, and substantial layout reveals may use 360–580ms when the additional travel is perceptible. Do not make users wait for state or content access.
- **Easing:** Use `cubic-bezier(.16, 1, .3, 1)` for entrances and expansions. Use a restrained `ease` or matching reversible curve for returns. Motion should settle cleanly without bounce or overshoot.
- **Properties:** Prefer transform, opacity, color, background-color, border-color, clip-path, and grid-track transitions. Avoid `transition: all` and avoid animating large layout properties when a composited alternative exists.
- **State integrity:** Accessibility state, focus management, validation, and control availability update immediately; visual interpolation must not delay the underlying state. Focus indicators and urgent errors must be perceivable immediately even when a supporting surface transitions.
- **Reduced motion:** Under `prefers-reduced-motion: reduce`, remove spatial travel and long interpolation. Present the correct final state immediately while preserving clear state differences.

**The Reversible Transition Rule.** If a visual element animates from state A to state B, its return from B to A must be equally intentional, subtle, and free of abrupt jumps.

### Component State Matrix

| Component                    | Default                                                 | Hover / pointer                                     | Keyboard focus                                        | Active / selected                                                         | Disabled / unavailable                                           | Error                                                                            |
| ---------------------------- | ------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Primary and light actions    | Approved surface and label pairing                      | Field or arrow changes within 180–280ms             | Two-pixel Signal Green outline with five-pixel offset | Immediate semantic action; restrained pressed feedback only               | Visually muted, no pointer affordance, native disabled semantics | Not used                                                                         |
| Text and navigation links    | Surface-appropriate text                                | Color or directional arrow changes within 180–280ms | Visible Signal Green outline                          | Current route remains distinguishable without relying only on green       | Remove from interaction when genuinely unavailable               | Not used                                                                         |
| Menu and subsection controls | Clear closed state                                      | Color acknowledgement only                          | Visible outline and stable accessible name            | `aria-expanded` changes immediately; visual open/close transition follows | Native disabled semantics if necessary                           | Not used                                                                         |
| Form fields                  | Transparent field with persistent label and bottom rule | No decorative lift                                  | Dark rule plus restrained Signal Green focus support  | Entered value remains high contrast                                       | Reduced contrast while preserving label legibility               | Error-colored rule, written error message, and `aria-invalid`; never color alone |
| Diagram selectors            | Inactive node and readable label                        | Optional state preview only when meaningful         | Visible outline if interactive                        | Larger or filled node plus label contrast                                 | Remains visible but cannot imply action                          | Not used                                                                         |

Every new interactive component must define all applicable states before handoff. Omitting a state is not an acceptable default.

**The Complete State Rule.** A component is complete only when its pointer, keyboard, active, reverse, disabled, error, and reduced-motion behavior have been considered and the applicable states are implemented.

### Cards / Containers

The system avoids generic cards; containers are operational diagrams or ruled editorial rows.

- **Corner Style:** Square by default. Media may crop fluid or cinematic imagery, but interface containers remain sharp.
- **Background:** Operational Ink for network fields, Editorial Paper for light sections, and Signal Green for proof and technology fields.
- **Shadow Strategy:** None at rest; depth follows the Flat Infrastructure Rule.
- **Border:** One-pixel structural rules, low contrast against the current field.
- **Internal Padding:** Signal nodes use 16px; proof and list rows use 16–24px depending on density.

### Inputs / Fields

Form controls use a transparent background, Operational Ink text, persistent external labels, and a one-pixel bottom rule. Horizontal padding stays at zero so the field aligns with the editorial grid; vertical padding is 12px. Textareas may resize vertically and begin at a minimum height of 120px. Select controls preserve native keyboard and platform behavior.

- **Focus:** The rule darkens and receives a restrained two-pixel Signal Green supporting edge. The focus indicator appears immediately and is never replaced by a color-only change.
- **Error:** The field uses Field Error for the rule and a written error immediately associated through `aria-describedby`; `aria-invalid` communicates the state programmatically.
- **Disabled:** Use native disabled semantics, remove pointer affordance, and reduce emphasis without making the label or current value unreadable.
- **Labels:** Required state is written for assistive technology. Placeholders may provide an example but never replace a visible label.
- **Feedback:** Submission status uses Feedback Success or Feedback Error behind concise text. Live-region behavior must match urgency, and visual appearance must not claim that data was sent when no endpoint is configured.

### Navigation

The shared full-width header uses a three-part arrangement: white TGC mark at left, a centered text trigger, and Contact at right. A restrained dark translucent glass field with a 12px backdrop blur and thin white rule keeps the same high-contrast treatment over every route surface. The glass field is a square, full-width navigation surface, not a card; it uses no shadow. Opening the trigger reveals a centered, viewport-height dark panel with large Archivo route rows, expandable subsection groups, a persistent contact action, and a softly blurred backdrop. Rows reveal in a short stagger and submenu groups expand smoothly. At 620px and below, the contact shortcut is hidden, the header becomes 72px high, and the navigation panel fills the viewport width.

### Brand Marks

Use the project-owned vector assets in `public/brand/` for interface and production output. The white mark belongs on Operational Ink, dark media, and the open navigation. The black mark belongs on Editorial Paper, Pure White, and Signal Green. The green mark is reserved for a deliberate brand moment on Operational Ink and must not replace the higher-contrast navigation variants.

Preserve the supplied aspect ratio, use `object-fit: contain`, and never redraw, stretch, outline, shadow, rotate, crop, or place the mark inside a decorative badge. Maintain clear space of at least half the rendered mark height on every side. The interface mark must not render below 36px wide; larger brand applications should increase clear space proportionally.

A linked logo receives an accessible link name such as “The Game Company home”; the nested image may use an empty alternative to avoid duplication. A non-linked standalone logo that communicates identity uses “The Game Company” as its alternative.

**The Brand Mark Integrity Rule.** Choose the approved logo variant for contrast, preserve its geometry and clear space, and never treat the mark as a decorative background texture.

### Hero Visual

The homepage uses the `ShaderMetal` WebGL component as a full-bleed cinematic background. Its green metallic ribbons suggest data movement and infrastructure without illustrating a literal game scene. The shader is non-interactive, remains behind readable copy, stops when hidden or outside the viewport, and resolves to a static fallback when WebGL or motion is unavailable. Other sections use content-relevant imagery or operational SVG figures rather than repeating the hero effect.

### Route Status

A compact live-status pattern pairs a six-pixel green node and soft Signal Glow with a 10px uppercase label. It belongs inside network diagrams and communicates active state; it is not a decorative badge.

### Signal Nodes

Source and target are 155px square dispatch cards with 16px padding and three information levels: small operation label, Archivo object name, and uppercase descriptor. The source is Signal Green; the target is Editorial Paper. On compact layouts they reduce to 130px and then 112px while retaining the same hierarchy.

### Operational Figures

Use the adaptive-delivery stack as the canonical depth pattern, then distill each concept into one large object made from the fewest useful parts. Compose figures from isometric blocks or cylinders with explicit face values and one-pixel structural outlines. Add face-aligned labels, Signal Green routes, or circular nodes only when they explain information absent from the adjacent copy. Every SVG retains a concise title and description. Scale the complete figure as one system on smaller screens. Motion may reveal operational order, but the figure must remain fully understandable as a static image.

### Contact Rail

The closing action is a full-width 82px rail defined by a single green top rule, Signal Green Archivo type, and a diagonal arrow. It carries no bottom rule: the footer's own top rule closes the page, and a second line directly above it reads as a doubled border. Hover translates the entire rail eight pixels; compact mobile reduces the rail to 70px high.

### Leadership headshots

Published headshots share one treatment: a single portrait crop, desaturated, on the portrait cell. A person without an approved photograph keeps the initials mark, which is a designed state rather than a gap to apologise for, so a list may mix the two. Never substitute a stock or representative photograph for a named person.

### Page hero

Every interior route opens with the same hero. It is one component. Its structure, placement, layout, type scale and spacing are identical on every route: a masked headline in Archivo with the emphasis clause in Signal Green, a copy column at roughly a third of the measure, a Signal Green action beside a quiet text link, a clipped media plane held to the lower right, and a three-part foot strip on the baseline. The hero has no eyebrow or location strip above its headline. Only the text, the media and the tone may change. Do not give a route its own hero geometry.

Hero summaries must explain the specific page proposition in plain language instead of repeating the headline or falling back to generic company copy. Keep short summaries visually balanced across their wrapped lines; use `text-wrap: balance` and tune the wording or measure rather than inserting desktop-only line breaks. Check the wrap at desktop and mobile widths.

The media plane carries a photograph, dimmed left to right so the copy column stays legible across it. Photography is licensed stock used as representative context, never presented as TGC’s own people, offices, or facilities; `docs/content/governance.md` records each source.

Home and Contact are the two exceptions, and the only ones. The home hero carries the WebGL plane that opens the site; the contact hero carries the enquiry form. Both keep their own structure.

### Footer

Every route ends with the same two elements in the same order: one closing call to action, then the footer. Both are single components. Their structure, placement, layout, type scale and spacing are identical on every route; only the text and the tone may change. Tone pairs a surface with its text and action colours — muted light on Operational Ink, or Operational Ink on Signal Green. Do not give a route its own closing section or footer, and do not vary their geometry to suit a page.

Footers are quiet editorial closures rather than promotional panels. Use Manrope at no less than 12px, weight 600, line-height 1.4, and restrained tracking. Maintain an approved surface/text pairing, preserve readable bottom clearance, and keep “Back to top” keyboard accessible. Do not place an oversized or low-contrast logo watermark behind footer content.

## Do's and Don'ts

### Do:

- **Do** reserve Signal Green for active routes, primary actions, focus, evidence fields, and a limited display emphasis.
- **Do** use Archivo at decisive scale and Manrope for all explanatory and operational copy.
- **Do** build hierarchy with spacing, thin rules, alignment, and alternating fields before adding decoration.
- **Do** keep motion controlled: 250ms state transitions, 0.9–1.15s reveal sequences, and slow low-amplitude route movement.
- **Do** provide reciprocal transitions for every reversible visual state and verify both directions, including menu close, accordion collapse, hover exit, inactive selection, and dismissed feedback.
- **Do** preserve the implemented 900px, 620px, and 520px responsive transitions and the reduced-motion static fallback.
- **Do** apply the Three-Face Depth Rule and Operational Figure Rule whenever creating or revising figures, shapes, system maps, or technical diagrams.
- **Do** keep figures visually large and use the minimum number of vector parts needed to express one idea.
- **Do** use SVG titles and descriptions when a figure is intentionally textless.
- **Do** use only the approved logo assets and select the black or white variant according to surface contrast.
- **Do** define every applicable component state and test pointer, keyboard, reverse, error, disabled, and reduced-motion behavior.
- **Do** crop and optimize imagery for each responsive composition while preserving a quiet region for overlaid copy.
- **Do** update `DESIGN.md` and `.impeccable/design.json` together whenever the reusable visual system changes.
- **Do** keep page copy, implementation, and the matching `content/pages` brief synchronized in the same change.

### Don't:

- **Don't** add neon gradients, glowing orbs, glass cards, or game-interface chrome; the network itself is the visual metaphor.
- **Don't** introduce rounded card systems or pill buttons into the sharp-plane and circular-node language.
- **Don't** use Signal Green as ambient decoration across an entire composition; it must retain operational meaning.
- **Don't** add decorative shadows to sections, cards, or actions.
- **Don't** let animation delay access to content or survive a reduced-motion preference.
- **Don't** use `transition: all`, delay keyboard focus, or animate only the entrance while leaving the reverse state abrupt.
- **Don't** shrink figures into dense mini-schematics or add labels and routes merely to make them look technical.
- **Don't** use flat single-value boxes, floating labels, incomplete paths, gradients, or decorative particles in operational figures.
- **Don't** repeat the homepage shader as a generic background on unrelated sections.
- **Don't** use placeholders as field labels, remove visible focus, or communicate an error or selected state through color alone.
- **Don't** stretch, recolor, crop, shadow, rotate, or use the TGC logo as an ambient footer or section background.
- **Don't** add generic gaming, crypto, neon-server, or futuristic imagery that does not add evidence about the adjacent section.
- **Don't** create a competing visual-system rule in another document; link back to this file and update the canonical rule here.
