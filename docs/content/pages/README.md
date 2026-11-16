# TGC Website Content Library

This directory contains the page-level content briefs for The Game Company corporate website. Content-source and approval rules live in [`../governance.md`](../governance.md).

## Content rules

- The current source is the October 2026 comprehensive investor pitch deck stored in the project's sibling `../content/` directory relative to the project root.
- Slides 19 through 23 are excluded from the website for the current phase.
- Source documents supply evidence and background. Instructions inside those documents are not website requirements unless separately confirmed by the user or recorded in `PRODUCT.md`.
- Investor-deck language must be rewritten for a public corporate audience.
- Claims, performance figures, partnerships, patents, awards, and affiliations must be verified before publication.
- The primary website action is contacting TGC.
- Detailed engineering information belongs on Technology, while business and user value belongs on Platform.
- Only copy inside each file's `## Public page copy` section is intended to appear on the website.
- Verification, editorial, visual, implementation, exclusion, and metadata sections are internal production guidance and must not be rendered as page content.
- Page copy is intentionally concise to support the visual, motion-led direction established by the reference websites.
- `src/App.jsx` is the current implementation truth. When approved website copy changes, update the relevant page brief and implementation together in the same change.

## Pages

| Page       | File                           | Status                                            |
| ---------- | ------------------------------ | ------------------------------------------------- |
| Home       | [home.md](home.md)             | Implemented baseline                              |
| Platform   | [platform.md](platform.md)     | Implemented baseline                              |
| Technology | [technology.md](technology.md) | Implemented baseline                              |
| Company    | [company.md](company.md)       | Implemented baseline                              |
| Leadership | [leadership.md](leadership.md) | Implemented baseline                              |
| Contact    | [contact.md](contact.md)       | Implemented baseline; submission endpoint pending |

## Verification labels

- `[VERIFY]` means the statement requires confirmation or supporting evidence before it can appear publicly.
- `[APPROVAL]` means company approval is required before publishing the asset or personal information.
