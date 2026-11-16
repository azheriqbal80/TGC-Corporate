import { readFile, stat } from "node:fs/promises";

const required = ["dist/index.html", "dist/robots.txt", "dist/sitemap.xml"];
for (const file of required) {
  const info = await stat(file);
  if (!info.isFile() || info.size === 0)
    throw new Error(`${file} is missing or empty.`);
}

const [robots, sitemap] = await Promise.all([
  readFile("dist/robots.txt", "utf8"),
  readFile("dist/sitemap.xml", "utf8"),
]);
if (!robots.includes("User-agent:") || !robots.includes("Sitemap:"))
  throw new Error("robots.txt is invalid.");
if (!sitemap.includes("<urlset") || !sitemap.includes("<loc>"))
  throw new Error("sitemap.xml is invalid.");

const assets = await stat("dist/assets");
if (!assets.isDirectory())
  throw new Error("Production assets were not generated.");
console.log("Public-file and SEO build checks passed.");
