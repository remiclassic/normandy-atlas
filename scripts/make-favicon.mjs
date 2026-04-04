import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, '..', 'app');

function starSvg(size) {
  const fsz = Math.max(7, Math.round(size * 0.34));
  const y = Math.round(size * 0.62);
  const x1 = Math.round(size * 0.28);
  const x2 = Math.round(size * 0.58);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="#0d1117"/>
  <text x="${x1}" y="${y}" font-size="${fsz}" fill="#c9b081" font-family="Georgia,serif">★</text>
  <text x="${x2}" y="${y}" font-size="${fsz}" fill="#c9b081" font-family="Georgia,serif">★</text>
</svg>`;
}

const png16 = await sharp(Buffer.from(starSvg(16))).png().toBuffer();
const png32 = await sharp(Buffer.from(starSvg(32))).png().toBuffer();
const ico = await pngToIco([png16, png32]);

fs.mkdirSync(appDir, { recursive: true });
fs.writeFileSync(path.join(appDir, 'favicon.ico'), ico);
