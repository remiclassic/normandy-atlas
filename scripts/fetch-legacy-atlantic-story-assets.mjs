/**
 * Fetches PD images used by `data/stories.ts` (legacy Atlantic chronicle map pins).
 */
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

function fetchBuf(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': UA,
            Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          },
        },
        (res) => {
          if (res.statusCode === 301 || res.statusCode === 302) {
            const loc = res.headers.location;
            if (!loc) return reject(new Error('Redirect without location'));
            return resolve(fetchBuf(new URL(loc, url).href));
          }
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          }
          const chunks = [];
          res.on('data', (c) => chunks.push(c));
          res.on('end', () => resolve(Buffer.concat(chunks)));
          res.on('error', reject);
        },
      )
      .on('error', reject);
  });
}

const storyRoot = join(fileURLToPath(new URL('../public/story/', import.meta.url)));

const jobs = [
  [
    'viking-age/oseberg-ship-viking-longship.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Oseberg_Ship_-_Viking_Ship_Museum_%28Oslo%29.jpg',
  ],
  [
    'william-conqueror/bayeux-tapestry-fleet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/31/Invasion_fleet_on_Bayeux_Tapestry.jpg',
  ],
  [
    'atlantic-imprint/benjamin-west-death-of-general-wolfe.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c6/Benjamin_West_-_The_Death_of_General_Wolfe_-_WGA25558.jpg',
  ],
];

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

for (const [rel, url] of jobs) {
  const dest = join(storyRoot, rel);
  await mkdir(dirname(dest), { recursive: true });
  try {
    const st = await stat(dest);
    if (st.size > 1000) {
      process.stdout.write(`${rel} ... skip (exists, ${st.size} bytes)\n`);
      continue;
    }
  } catch {
    /* fetch */
  }
  process.stdout.write(`${rel} ... `);
  let lastErr;
  for (let attempt = 0; attempt < 5; attempt++) {
    if (attempt > 0) await delay(2500 * attempt);
    try {
      const buf = await fetchBuf(url);
      await writeFile(dest, buf);
      process.stdout.write(`${buf.length} bytes ok\n`);
      lastErr = null;
      break;
    } catch (e) {
      lastErr = e;
      if (!String(e.message).includes('HTTP 429')) throw e;
    }
  }
  if (lastErr) throw lastErr;
  await delay(1500);
}
