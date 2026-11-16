---
name: pinned-horizontal-scroll
description: Implement or repair a scroll-driven horizontal sequence that pins a full-height section, advances through one panel at a time, then releases back to vertical page flow. Use for GSAP and ScrollTrigger website sections; preserve mobile and reduced-motion fallbacks.
---

# Pinned Horizontal Scroll

Use this pattern when a desktop section should stay in view while vertical scrolling advances through a short horizontal sequence. The section must release naturally after the final panel.

## Before changing code

- Inspect the page structure, shared motion hook, existing smooth-scroll integration, design rules, and neighboring section styles.
- Keep the content in normal DOM reading order. Treat the horizontal movement as a presentation of sequential content, not as a replacement for accessible reading order.
- Decide whether this pattern improves the content. Keep a short sequence; do not pin an entire page or introduce horizontal movement just for decoration.

## Structure and layout

- Separate the section trigger from the viewport stage and the moving track. The stage is the pinned element; the track contains one full viewport-width panel per step.
- Keep the section heading and progress indicator fixed in the stage while the track moves.
- Clip overflow only at the horizontal viewport. Keep panel content inside the stage and check that headings, descriptions, and focus outlines are not clipped.
- Size the stage to the viewport (`100svh`) with a practical minimum height. Account for fixed navigation and leave enough room for readable content.
- On mobile and narrow layouts, render the same panels as a vertical stack. Do not require horizontal gestures or pinning to reach content.
- Under `prefers-reduced-motion: reduce`, render the complete static vertical sequence. Do not hide or defer any panel.

## ScrollTrigger behavior

- Use one ScrollTrigger to pin the stage and scrub the horizontal track. A second progress animation may share a trigger only if the architecture guarantees a single pin; otherwise derive progress in the pinned tween's `onUpdate` callback.
- Never create multiple triggers that pin the same element. Conflicting pins can release the stage early or move panels out of view.
- Compute horizontal travel from the track's rendered width minus the viewport's client width. Use that same distance for the tween endpoint and ScrollTrigger end distance so the last panel aligns before the pin releases.
- For `n` equal-width panels, travel exactly `(n - 1)` viewport widths. If using snap, snap to `n` evenly spaced panel positions; keep the easing and settling subtle and avoid fighting the user's scroll input.
- Use `gsap.matchMedia()` or the project's equivalent to create pinning only at suitable desktop widths and when reduced motion is not requested. Revert media-specific animations and listeners on teardown.
- Scope selectors to the page root or component. Respect the app's existing smooth-scroll/ScrollTrigger synchronization; do not add a competing scroll loop or duplicate global integration.
- Recalculate dimensions on refresh and after responsive changes. Avoid hardcoded pixel travel distances.

## Accessibility and fallback

- Preserve semantic headings and article order in the DOM; do not duplicate content for visual slides.
- Keep all text available to assistive technology. Use `aria-hidden` only for decorative progress graphics, never for the content panels.
- If panels contain links, buttons, or other focusable controls, verify keyboard focus cannot move to a visually clipped panel. Prefer keeping the sequence text-only or provide deliberate focus handling.
- Make the progress cue supplementary. It must not be the only indication of sequence position.
- Ensure the vertical fallback works when JavaScript fails or animation setup is skipped.

## Verify the interaction

Check in a browser at the actual route and target viewport sizes:

1. At section entry, the heading, first panel, and progress cue are visible together.
2. Scrolling advances through every panel while the stage remains pinned; each settled state shows one complete panel.
3. Scrolling beyond the final panel releases the pin and reveals the next page section without a jump or blank gap.
4. Scrolling upward reverses through the sequence and returns to the previous section cleanly.
5. Resize across the desktop breakpoint, test a narrow viewport, and emulate reduced motion. No panel should disappear in any fallback.
6. Check console errors, duplicate pin warnings, clipped text, and layout shifts after fonts and images load.

Do not add automated tests unless requested by the user or required by the repository's existing workflow. Report any environment limitation that prevents browser verification.
