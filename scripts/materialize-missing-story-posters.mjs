/**
 * Creates minimal JPEG/PNG poster files for story library paths that are
 * referenced in data but missing on disk — avoids broken thumbnails in the UI.
 * Palette is seeded from the filename so each arc looks distinct.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'public');

/** Paths referenced by `data/atlas/story-library-meta.ts` (deduped). */
const REL_PATHS = [
  'story/thumbs/full-atlas.jpg',
  'story/thumbs/normandy-to-new-world.jpg',
  'story/thumbs/neolithic-normandy.jpg',
  'story/thumbs/bronze-age-channel.jpg',
  'story/thumbs/leif-erikson.jpg',
  'story/thumbs/iron-age-gaul.jpg',
  'story/thumbs/roman-gaul.jpg',
  'story/thumbs/post-roman-gaul.jpg',
  'story/thumbs/neustria.jpg',
  'story/thumbs/frankish-carolingian.jpg',
  'story/thumbs/viking-age.jpg',
  'story/thumbs/norman-origins.jpg',
  'story/thumbs/norman-expansion.jpg',
  'story/thumbs/new-france.jpg',
  'story/thumbs/rollo-lifetime.jpg',
  'story/new-france-foundations/la-rochelle-vieux-port-lisch.jpg',
  'story/guillaume-couture/rouen-gomboust-1655.jpg',
  'story/guillaume-couture/habitation-quebec.jpg',
  'story/guillaume-couture/voyageur-canoe.jpg',
  'story/william-conqueror/bayeux-tapestry-fleet.jpg',
  'story/norman-expansion/monreale-cathedral.jpg',
  'story/norman-expansion/melfi-castle-apulia.jpg',
  'story/norman-expansion/siege-antioch-1098.jpg',
  'story/norman-expansion/salerno-medieval-cityscape.jpg',
  'story/guillaume-couture/champlain-map-1632.jpg',
  'story/new-france-foundations/chateau-richer-beauce-st-lawrence.jpg',
  'story/new-france-foundations/mortagne-sous-prefecture.jpg',
  'story/guillaume-couture/trois-rivieres.jpg',
  'story/new-france-foundations/vieux-port-montreal.jpg',
  'story/royal-new-france/st-louis-mississippi-night.jpg',
  'story/william-conqueror/bayeux-tapestry-hastings.jpg',
  'story/william-conqueror/tower-of-london.jpg',
  'story/william-conqueror/bayeux-tapestry-knights.jpg',
  'story/william-conqueror/domesday-book.jpg',
  'story/william-conqueror/bayeux-tapestry-coronation.jpg',
];

function hueFromKey(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 360;
}

function posterSvg(width, height, hue) {
  const h2 = (hue + 48) % 360;
  const h3 = (hue + 112) % 360;
  const c1 = `hsl(${hue} 42% 22%)`;
  const c2 = `hsl(${h2} 36% 30%)`;
  const c3 = `hsl(${h3} 28% 14%)`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="52%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
    <radialGradient id="v" cx="50%" cy="85%" r="75%">
      <stop offset="0%" stop-color="rgba(0,0,0,0.55)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#v)"/>
</svg>`;
}

async function writePoster(rel) {
  const abs = path.join(ROOT, rel);
  if (fs.existsSync(abs)) return 'skip';

  fs.mkdirSync(path.dirname(abs), { recursive: true });

  const stem = path.basename(rel, path.extname(rel));
  const hue = hueFromKey(stem);
  const width = 1280;
  const height = 720;
  const svg = posterSvg(width, height, hue);
  const buf = Buffer.from(svg);

  if (rel.endsWith('.png')) {
    await sharp(buf).png({ compressionLevel: 9 }).toFile(abs);
  } else {
    await sharp(buf).jpeg({ quality: 88, mozjpeg: true }).toFile(abs);
  }
  return 'write';
}

async function main() {
  let wrote = 0;
  let skipped = 0;
  for (const rel of REL_PATHS) {
    const r = await writePoster(rel);
    if (r === 'write') wrote += 1;
    else skipped += 1;
  }
  console.log(`Story posters: wrote ${wrote}, skipped (exists) ${skipped}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
