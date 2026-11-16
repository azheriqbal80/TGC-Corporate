import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Leadership headshots.
 *
 * Sources live in `assets/team/` and are not served. Each is cropped to the
 * portrait cell's ratio, desaturated so every face carries the same treatment,
 * and written to `public/images/team/` as AVIF, WebP and PNG.
 *
 * The cell is 118x150 CSS pixels, so the output is that at 2x.
 */
const sourceDir = path.resolve("assets/team");
const outputDir = path.resolve("public/images/team");
const width = 236;
const height = 300;

await mkdir(outputDir, { recursive: true });

const sources = (await readdir(sourceDir)).filter((file) =>
  file.endsWith(".png"),
);
if (sources.length === 0) throw new Error("No portrait sources found.");

for (const file of sources) {
  const slug = path.basename(file, ".png");
  const base = sharp(path.join(sourceDir, file))
    .resize({ width, height, fit: "cover", position: "top" })
    .grayscale()
    .linear(1.08, -10);

  await base
    .clone()
    .avif({ quality: 60 })
    .toFile(path.join(outputDir, `${slug}.avif`));
  await base
    .clone()
    .webp({ quality: 84 })
    .toFile(path.join(outputDir, `${slug}.webp`));
  await base
    .clone()
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDir, `${slug}.png`));
}

console.log(`Leadership portraits generated for ${sources.length} people.`);
