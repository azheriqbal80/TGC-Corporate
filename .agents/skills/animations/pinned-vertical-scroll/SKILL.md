---
name: pinned-vertical-scroll
description: Implement or repair a scroll-driven vertical sequence where a section pins in place, a stable title pane updates as detail panels advance, then the section releases into normal page flow. Use for GSAP and ScrollTrigger website sections; preserve mobile and reduced-motion fallbacks.
---

# Pinned Vertical Scroll Sequence

Use this pattern when a short set of related subsections should be read one at a time while a title or category pane stays visible. Vertical scrolling advances the detail panel; after the last panel, the page continues normally. If a sticky title and naturally flowing content meet the design need, prefer that simpler layout over pinning.

## Before changing code

- Inspect the page structure, shared motion hook, existing smooth-scroll integration, design rules, content source, and neighboring section styles.
- Keep each subsection as semantic content in normal DOM reading order. The moving track is a visual presentation of that order.
- Confirm that the content benefits from one-at-a-time focus. Keep the sequence short and do not pin a whole page.

## Structure and layout

- Separate the section trigger, pinned stage, stable title pane, detail viewport, and moving detail track.
- Keep the section's main heading inside the pinned stage if it must remain visible throughout the sequence. Keep the active subsection title in its own stable pane; update it only when the active panel changes.
- Put one semantic article per subsection in the detail track. Preserve the article heading in the DOM even if a separate visual title pane mirrors the active heading.
- Clip overflow only at the detail viewport. Keep panel content and keyboard focus indicators visible.
- Size the stage to the available viewport (`100svh`) with a practical minimum height. Account for fixed navigation and reserve enough space for the heading, active title, details, and any progress cue.
- If panels share a height, move the track by exactly `(n - 1)` detail viewport heights. For variable-height panels, calculate each panel's actual scroll position and snap point instead of assuming equal steps.
- Keep progress cues supplementary. A stable active title can provide orientation without a large timeline graphic.

## ScrollTrigger behavior

- Use one ScrollTrigger to pin the stage and scrub the vertical detail track. Derive active index and progress from this animation's progress or `onUpdate`; do not create a second trigger that pins the same stage.
- Compute travel from the rendered track height minus the detail viewport's client height. Use that same distance as the tween endpoint and ScrollTrigger end distance, so the last panel aligns before the stage releases.
- For `n` equal-height panels, snap to `n` evenly spaced positions. Keep settling subtle and avoid fighting the user's wheel or touch input.
- Update active title state only when the active index changes, not on every animation frame. Animate the title change with a short, low-amplitude transition.
- Activate pinned styling only after motion setup succeeds. This leaves a complete normal-flow layout if JavaScript or ScrollTrigger is unavailable.
- Use `gsap.matchMedia()` or the project's equivalent to enable pinning only at suitable desktop widths and heights, and only when reduced motion is not requested. Revert media-specific animations, attributes, and listeners on teardown.
- Scope selectors to the page root or component. Respect existing smooth-scroll/ScrollTrigger synchronization and refresh measurements after responsive changes or content/font loading.
- Never create multiple triggers that pin the same element. Conflicting pins can move the title or details out of view, release the stage early, or produce blank space.

## Accessibility and fallback

- Preserve semantic headings and article order in the DOM; do not duplicate full content for the visual sequence.
- If a visual active-title pane mirrors the article headings, keep the source article headings available to assistive technology and avoid announcing duplicated headings on every scroll update.
- Keep all detail text available to assistive technology. Never apply `aria-hidden` to the semantic articles or their content.
- If panels contain links or controls, make sure keyboard focus cannot move to content clipped outside the viewport. Add deliberate focus management only when needed.
- On mobile, short viewports, reduced motion, or failed animation setup, show every subsection in a vertical stack with its own visible heading and details.
- Ensure the static stack is also the initial HTML/CSS state before JavaScript activates.

## Verify the interaction

Check in a browser at the actual route and target viewport sizes:

1. At section entry, the main heading, first active title, and first detail panel are visible together.
2. Scrolling advances the detail panels while the title pane and stage remain in place; the active title updates at each panel boundary.
3. The final detail panel reaches its resting position before the pin releases and the next section appears without a jump or gap.
4. Scrolling upward reverses the sequence and restores each matching title/detail pair.
5. Resize across width and height breakpoints, test a narrow viewport, emulate reduced motion, and verify the complete vertical stack in each fallback.
6. Check console errors, duplicate pin warnings, clipped text/focus, and layout shifts after fonts and images load.

Do not add automated tests unless requested by the user or required by the repository's existing workflow. Report any environment limitation that prevents browser verification.
