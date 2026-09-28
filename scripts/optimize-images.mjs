import { mkdir, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import { portfolio } from "../site-data.js";

// Build-time only. Originals stay available for evidence and downloads.
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE_PATH || "sharp");
const images = new Set(
  [...portfolio.projects, ...portfolio.achievements].flatMap((entry) =>
    ["photos", "graphics", "certificateImages"].flatMap((group) =>
      entry.media[group].map((item) => item.src),
    ),
  ),
);
await mkdir("public/assets/optimized", { recursive: true });
let originalBytes = 0;
let optimizedBytes = 0;
for (const src of images) {
  originalBytes += (await stat(src)).size;
  for (const width of [640, 1200]) {
    const target =
      "public/assets/optimized/" +
      src.replace("./public/assets/", "").replace(/[/.]/g, "-") +
      "-" +
      width +
      ".webp";
    await sharp(src)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(target);
    optimizedBytes += (await stat(target)).size;
  }
}
const preview =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#082c40"/><circle cx="1050" cy="300" r="230" fill="none" stroke="#356273" stroke-width="2"/><circle cx="1050" cy="300" r="180" fill="none" stroke="#356273" stroke-width="2"/><text x="80" y="110" font-family="Arial" font-size="25" fill="#8bdfdf">TANKHUN SRICHANKAEW / STUDENT PORTFOLIO</text><text x="80" y="290" font-family="Arial" font-weight="bold" font-size="74" fill="#edf6f8">Computer vision.</text><text x="80" y="380" font-family="Arial" font-weight="bold" font-size="74" fill="#edf6f8">Connected prototypes.</text><text x="80" y="530" font-family="Arial" font-size="28" fill="#acc5cf">Projects, research, and the work behind the competition.</text></svg>';
await sharp(Buffer.from(preview))
  .png()
  .toFile("public/assets/social-preview.png");
console.log(
  JSON.stringify({ images: images.size, originalBytes, optimizedBytes }),
);
