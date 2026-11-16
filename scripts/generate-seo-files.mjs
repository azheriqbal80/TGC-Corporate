import { mkdir, writeFile } from "node:fs/promises";
import { ROUTES } from "../src/siteMeta.js";

const rawSiteUrl =
  process.env.SITE_URL ||
  process.env.URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:4173";

const siteUrl = (
  /^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`
).replace(/\/$/, "");
const publicDir = new URL("../public/", import.meta.url);
await mkdir(publicDir, { recursive: true });

const urls = Object.keys(ROUTES)
  .filter((path) => ROUTES[path].robots !== "noindex, follow")
  .map(
    (path) => `  <url><loc>${siteUrl}${path === "/" ? "/" : path}</loc></url>`,
  )
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

await writeFile(new URL("sitemap.xml", publicDir), sitemap, "utf8");
await writeFile(new URL("robots.txt", publicDir), robots, "utf8");
