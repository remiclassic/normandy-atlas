import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, '..', 'app');
const sourcePath = path.join(__dirname, 'favicon-source.png');

/** Trim black padding, then center-crop to a square (tighter favicon at 16×16). */
async function squaredLogoPng() {
  const trimmed = await sharp(sourcePath)
    .trim({ background: '#000000' })
    .toBuffer({ resolveWithObject: true });
  const w = trimmed.info.width;
  const h = trimmed.info.height;
  const side = Math.min(w, h);
  const left = Math.max(0, Math.floor((w - side) / 2));
  const top = Math.max(0, Math.floor((h - side) / 2));
  return sharp(trimmed.data)
    .extract({ left, top, width: side, height: side })
    .png()
    .toBuffer();
}

if (!fs.existsSync(sourcePath)) {
  console.error(`Missing ${sourcePath} — add a square PNG (e.g. your logo) and run npm run favicon`);
  process.exit(1);
}

const squarePng = await squaredLogoPng();

const png16 = await sharp(squarePng)
  .resize(16, 16, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();
const png32 = await sharp(squarePng)
  .resize(32, 32, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();
const ico = await pngToIco([png16, png32]);

const icon512 = await sharp(squarePng)
  .resize(512, 512, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();

fs.mkdirSync(appDir, { recursive: true });
fs.writeFileSync(path.join(appDir, 'favicon.ico'), ico);
fs.writeFileSync(path.join(appDir, 'icon.png'), icon512);

console.log('Wrote app/favicon.ico and app/icon.png');
