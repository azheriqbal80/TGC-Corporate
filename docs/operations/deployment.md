# Deployment Guide

## Current target

Netlify is the intended demo and review host. The site is a Vite-generated static application with client-side pathname routing.

## Build settings

| Setting                  | Value                            |
| ------------------------ | -------------------------------- |
| Package manager          | pnpm                             |
| Install                  | `pnpm install --frozen-lockfile` |
| Build command            | `pnpm quality`                   |
| Publish directory        | `dist`                           |
| Local development        | `pnpm dev`                       |
| Local production preview | `pnpm preview`                   |

Netlify detects pnpm because `pnpm-lock.yaml` is present. Whenever `package.json` changes, run `pnpm install` and commit the updated lockfile. An out-of-sync lockfile causes `ERR_PNPM_OUTDATED_LOCKFILE` during dependency installation.

## Runtime version

The repository pins Node 24 through `.nvmrc` and the `engines` field, and pins pnpm through `packageManager`. Keep Netlify aligned with those values.

## SPA route fallback

The application handles these paths itself:

- `/platform`
- `/technology`
- `/company`
- `/leadership`
- `/contact`

Direct visits and browser refreshes on these routes are rewritten to `/index.html` through both `netlify.toml` and `public/_redirects`. Unknown application paths then render the site's noindex not-found experience.

```text
/* /index.html 200
```

Netlify also provides its production `URL` environment variable to the prebuild script, which generates canonical sitemap and robots URLs. For another host, set `SITE_URL` to the canonical HTTPS origin.

## Environment and integrations

The current front end does not require public runtime environment variables. The contact form is intentionally not connected to a live endpoint. Do not place private email credentials, API keys, or service tokens in client-side Vite variables.

When the form is connected:

- Use an approved server-side or managed-form endpoint.
- Add abuse protection and server-side validation.
- Publish the required privacy/legal notice.
- Keep success, error, offline, and pending states accessible.
- Document the integration without exposing secrets.

## Pre-deploy checklist

- `pnpm-lock.yaml` matches `package.json`.
- `pnpm quality`, `pnpm test:e2e`, and `pnpm audit:security` complete successfully.
- Home, Platform, Technology, Company, Leadership, and Contact load directly.
- Refreshing every nested route does not return 404.
- Desktop and mobile navigation work with keyboard and touch.
- The header remains readable over dark and light sections.
- Reduced-motion mode removes smooth scrolling and continuous animation.
- WebGL failure shows a usable static hero.
- Recognition links open the intended official sources.
- Contact submission remains disabled until its endpoint and legal requirements are approved.
- No excluded slide 19–23 material or unverified claims are present.
- The accessibility, SEO, and Core Web Vitals gates in `docs/quality/standards.md` have been completed and recorded.

## Rollback

Use Netlify's previous successful deploy as the first rollback option. Do not overwrite source files or discard uncommitted work to recover a deployment.
