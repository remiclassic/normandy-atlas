/**
 * Builds 16:9 JPEG card images for Normandy story-library figure thumbnails.
 * Run from repo root: node scripts/build-normandy-figure-portraits.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'public', 'story', 'normandy-figures');

const OUT_W = 1600;
const OUT_H = 900;
const HALF_W = OUT_W / 2;

async function coverJpeg(src, dest) {
  await sharp(src)
    .rotate()
    .resize(OUT_W, OUT_H, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(dest);
}

async function coverHalfBuffer(src) {
  return sharp(src)
    .rotate()
    .resize(HALF_W, OUT_H, { fit: 'cover', position: 'centre' })
    .toBuffer();
}

async function compositeHalves(leftSrc, rightSrc, dest) {
  const [left, right] = await Promise.all([coverHalfBuffer(leftSrc), coverHalfBuffer(rightSrc)]);
  await sharp({
    create: { width: OUT_W, height: OUT_H, channels: 3, background: { r: 26, g: 21, b: 16 } },
  })
    .composite([
      { input: left, left: 0, top: 0 },
      { input: right, left: HALF_W, top: 0 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(dest);
}

async function main() {
  await coverJpeg(path.join(root, 'champlain-ronjat.jpg'), path.join(root, 'samuel-de-champlain.jpg'));
  await coverJpeg(
    path.join(root, 'marie-de-lincarnation-quebec.jpg'),
    path.join(root, 'marie-de-lincarnation.jpg')
  );
  await compositeHalves(
    path.join(root, 'jean-talon.jpg'),
    path.join(root, 'frontenac.jpg'),
    path.join(root, 'jean-talon-louis-frontenac.jpg')
  );
  await compositeHalves(
    path.join(root, 'poutrincourt-portrait.png'),
    path.join(root, 'lescarbot-portrait.png'),
    path.join(root, 'poutrincourt-marc-lescarbot.jpg')
  );
  await coverJpeg(path.join(root, 'membertou-portrait.png'), path.join(root, 'membertou.jpg'));
  await coverJpeg(path.join(root, 'la-salle-appletons.jpg'), path.join(root, 'rene-robert-cavelier-de-la-salle.jpg'));

  console.log('normandy-figure card JPEGs written to public/story/normandy-figures/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
