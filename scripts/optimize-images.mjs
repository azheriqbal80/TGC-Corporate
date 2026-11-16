import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageDir = path.resolve("public/images");
const images = [
  "achievements-hero",
  "company-dubai",
  "leadership-team",
  "platform-anywhere",
  "technology-infrastructure",
];
const widths = [960, 1600];

await mkdir(imageDir, { recursive: true });
for (const name of images) {
  const source = path.join(imageDir, `${name}.png`);
  for (const width of widths) {
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(imageDir, `${name}-${width}.webp`));
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 55 })
      .toFile(path.join(imageDir, `${name}-${width}.avif`));
  }
}

console.log("Responsive WebP and AVIF image variants generated.");
