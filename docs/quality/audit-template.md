# Quality Audit Record

Copy this template for a formal accessibility, SEO, or performance audit. Store completed reports under `docs/quality/audits/YYYY-MM-DD-name.md`.

## Audit details

- Date:
- Auditor:
- Build or commit:
- Environment and URL:
- Routes tested:
- Desktop viewport/browser:
- Mobile viewport/device profile:
- Reduced-motion state tested:
- Scope exclusions:

## Executive summary

- Release recommendation: Pass / Conditional pass / Fail
- P0 blocking findings:
- P1 major findings:
- P2 minor findings:
- Positive findings to preserve:

## Accessibility

### Automated checks

- Tool and version:
- Routes checked:
- Violations:

### Manual UX and keyboard

- Skip link and landmarks:
- Focus order and visibility:
- Menu open, close, Escape, and focus return:
- Forms, validation, and live status:
- Zoom, text spacing, and narrow viewport:
- Reduced motion and non-WebGL fallback:

### Screen-reader smoke test

- Screen reader/browser:
- Page title and landmarks:
- Heading outline:
- Navigation and expanded states:
- Images, figures, canvas, and alternatives:
- Form labels, instructions, errors, and status:

## SEO

| Route         | Status | Title | Description | Canonical | H1  | Crawlable links | Indexing |
| ------------- | ------ | ----- | ----------- | --------- | --- | --------------- | -------- |
| `/`           |        |       |             |           |     |                 |          |
| `/platform`   |        |       |             |           |     |                 |          |
| `/technology` |        |       |             |           |     |                 |          |
| `/company`    |        |       |             |           |     |                 |          |
| `/leadership` |        |       |             |           |     |                 |          |
| `/contact`    |        |       |             |           |     |                 |          |

- `robots.txt`:
- XML sitemap:
- Structured-data validation:
- Social preview validation:
- Rendered-HTML or Search Console inspection:

## Core Web Vitals and performance

### Lab evidence

| Route/template | Profile | LCP | INP or TBT proxy | CLS | JS transferred | Image transferred | Notes |
| -------------- | ------- | --: | ---------------: | --: | -------------: | ----------------: | ----- |
|                | Mobile  |     |                  |     |                |                   |       |
|                | Desktop |     |                  |     |                |                   |       |

### Field evidence

- Source: CrUX / PageSpeed Insights / Search Console / RUM / Not yet available
- Date range:
- Mobile LCP p75:
- Mobile INP p75:
- Mobile CLS p75:
- Desktop LCP p75:
- Desktop INP p75:
- Desktop CLS p75:

### Performance implementation review

- LCP element and priority:
- Image sizing, format, and lazy loading:
- Font loading:
- Main-thread long tasks:
- WebGL resolution, pause, and fallback behavior:
- Layout shifts and reserved space:
- Bundle and third-party review:

## Findings

For each finding record:

### [P0/P1/P2/P3] Finding title

- Category: Accessibility / SEO / LCP / INP / CLS / General performance
- Route/component:
- Standard or threshold:
- Evidence:
- User or business impact:
- Required remediation:
- Owner:
- Status: Open / In progress / Ready to retest / Closed
- Retest evidence:

## Final sign-off

- Accessibility gate: Pass / Fail
- SEO gate: Pass / Fail
- Core Web Vitals gate: Pass / Fail / Field data pending
- Production build: Pass / Fail
- Remaining accepted risks and approver:
