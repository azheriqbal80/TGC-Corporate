# The Game Company Corporate Website

Responsive corporate website for The Game Company (TGC), built with React, Vite, Lenis, GSAP, Tailwind tooling, and Three.js/WebGL.

## Start here

The complete project handoff and source-of-truth map is in [docs/README.md](docs/README.md).

Two canonical records intentionally remain at the project root because design and development tooling discovers them there:

- [Product brief](docs/PRODUCT.md) — product purpose, audience, positioning, scope, and constraints
- [Design guide](docs/DESIGN.md) — visual system, responsive behavior, components, figures, and motion

Everything else is organized under `docs/`.

## Local development

Use pnpm as the canonical package manager:

```bash
pnpm install
pnpm dev
```

Production check:

```bash
pnpm quality
pnpm preview
```

Full browser and security gates:

```bash
pnpm test:e2e
pnpm audit:security
pnpm audit:lighthouse
```

`pnpm quality` is the required local and Netlify gate. Pull requests also run desktop/mobile browser checks and automated accessibility checks through the workflow in `.github/workflows/quality.yml`.

The local site normally runs at `http://127.0.0.1:5173/`. Production output is written to `dist/`.

## Current status

Home, Platform, Technology, Company, Leadership, and Contact are implemented and responsive. The contact form remains unconnected until TGC approves a secure submission endpoint and the required privacy/legal content.
