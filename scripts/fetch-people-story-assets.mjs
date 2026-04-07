/**
 * Fetches Wikimedia Commons assets for People thumbnails, Bayeux tapestry paths, and named portraits.
 * Sequential requests with delay to reduce 429 rate limits.
 * Skips files that already exist and are larger than minBytes (re-run safe).
 */
import { readFileSync } from 'node:fs';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const MIN_BYTES = 8000;

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function shouldSkip(dest) {
  try {
    const s = await stat(dest);
    return s.size >= MIN_BYTES;
  } catch {
    return false;
  }
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': UA,
          Accept: 'image/*,*/*;q=0.8',
        },
      },
      (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          const loc = res.headers.location;
          if (!loc) return reject(new Error('Redirect without location'));
          return resolve(fetchBuffer(loc));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      }
    );
    req.on('error', reject);
  });
}

async function fetchBufferWithRetry(url, attempt = 0) {
  try {
    return await fetchBuffer(url);
  } catch (e) {
    if (attempt < 6 && String(e.message).includes('429')) {
      await delay(55000 + attempt * 8000);
      return fetchBufferWithRetry(url, attempt + 1);
    }
    throw e;
  }
}

const peopleCommonsPath = path.join(root, 'data/normandy-figure-portrait-commons-urls.json');
const peopleCommons = JSON.parse(readFileSync(peopleCommonsPath, 'utf8'));
const peopleFigureJobs = Object.entries(peopleCommons).map(([id, url]) => {
  const u = String(url);
  const ext = u.toLowerCase().split('?')[0].endsWith('.png') ? 'png' : 'jpg';
  return [`public/story/normandy-figures/people/${id}.${ext}`, u];
});

const jobs = [
  [
    'public/story/normandy-figures/vercingetorix-alesia.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f3/Vercing%C3%A9torix_Al%C3%A9sia.jpg',
  ],
  [
    'public/story/normandy-figures/julius-caesar-bust.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/dc/Retrato_de_Julio_C%C3%A9sar_%2826724093101%29.jpg',
  ],
  [
    'public/story/william-conqueror/bayeux-tapestry-fleet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/87/BayeuxTapestryScene36.jpg',
  ],
  [
    'public/story/william-conqueror/bayeux-tapestry-hastings.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/aa/Bayeux_Tapestry_scene57_Harold_death_%28cropped%29.jpg',
  ],
  [
    'public/story/william-conqueror/bayeux-tapestry-knights.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/07/BayeuxTapestryScene55.jpg',
  ],
  [
    'public/story/william-conqueror/bayeux-tapestry-oath.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b9/BayeuxTapestryScene23.jpg',
  ],
  [
    'public/story/william-conqueror/bayeux-tapestry-coronation.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/84/BayeuxTapestryScene38.jpg',
  ],
  [
    'public/story/normandy-figures/jacques-cartier-portrait.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6a/Jacques_Cartier.jpg',
  ],
  [
    'public/story/normandy-figures/joan-of-arc-miniature.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c3/Joan_of_Arc_miniature_graded.jpg',
  ],
  [
    'public/story/normandy-figures/rollo-falaise-statue.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/85/Rollo_statue_in_falaise.JPG',
  ],
  [
    'public/story/normandy-figures/charles-the-simple.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/20/Charles_III_le_Simple.jpg',
  ],
  [
    'public/story/normandy-figures/richard-i-normandy.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/bc/Richard_I_of_Normandy.jpg',
  ],
  [
    'public/story/normandy-figures/robert-guiscard-blondel.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e3/Robert_Guiscard_%28by_Merry-Joseph_Blondel%29.jpg',
  ],
  [
    'public/story/normandy-figures/odo-count-paris.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/09/Odo_king_of_France.jpg',
  ],
  [
    'public/story/normandy-figures/merovingian-bnf-brunehaut.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/91/Mariage_de_Sigebert_et_Brunehaut_-_Grandes_Chroniques_de_France_BNF_Fr2610_f31r.jpg',
  ],
  [
    'public/story/normandy-figures/viking-siege-paris-885.jpeg',
    'https://upload.wikimedia.org/wikipedia/commons/4/49/Siege_of_Paris_%28885%E2%80%93886%29.jpeg',
  ],
  [
    'public/story/normandy-figures/veliocasses-coin.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bronze_au_cheval_frapp%C3%A9_par_les_V%C3%A9liocasses.jpg',
  ],
  [
    'public/story/normandy-figures/caletes-coin.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d6/Iron_Age_Coin%2C_Quarter_stater_Gallic_import_Caletes_tribe_%28FindID_711648%29.jpg',
  ],
  [
    'public/story/normandy-figures/jean-ango-bust.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8f/Eug%C3%A8ne_B%C3%A9net_%28sculpt%29_76200_Dieppe%2C_Jehan_Ango%2C_buste%2C_Mus%C3%A9e_Ch%C3%A2teau_de_Dieppe.jpg',
  ],
  [
    'public/story/normandy-figures/philip-ii-augustus-wikimedia.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/26/Philip_II_of_France.jpg',
  ],
  ...peopleFigureJobs,
];

for (let i = 0; i < jobs.length; i++) {
  const [rel, url] = jobs[i];
  if (i > 0) await delay(14000);
  const dest = path.join(root, rel);
  await mkdir(path.dirname(dest), { recursive: true });
  process.stdout.write(`${rel} ... `);
  if (await shouldSkip(dest)) {
    process.stdout.write('skip (exists)\n');
    continue;
  }
  try {
    const buf = await fetchBufferWithRetry(url);
    if (buf.length < MIN_BYTES) {
      process.stdout.write(`skip (too small ${buf.length})\n`);
      continue;
    }
    await writeFile(dest, buf);
    process.stdout.write(`ok (${buf.length})\n`);
  } catch (e) {
    process.stdout.write(`FAIL: ${e.message}\n`);
    process.exitCode = 1;
  }
}
