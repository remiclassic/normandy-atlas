/**
 * Fetches Wikimedia Commons assets for People thumbnails, Bayeux tapestry paths, and named portraits.
 * Sequential requests with delay to reduce 429 rate limits.
 * Skips files that already exist and are larger than minBytes (re-run safe).
 */
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

const peopleFigureJobs = [
  [
    'public/story/normandy-figures/people/neo-megalith-builders.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b0/Alignements_de_Carnac.JPG',
  ],
  [
    'public/story/normandy-figures/people/bronze-channel-traders.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/57/Bronze_swords-MGR_Lyon-IMG_9734.jpg',
  ],
  [
    'public/story/normandy-figures/people/romain-rouen-legend.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b7/Rouen_Cathedral%2C_front.jpg',
  ],
  [
    'public/story/normandy-figures/people/roman-magistrates-lugdunensis.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/79/Th%C3%A9%C3%A2tre_romain_de_Fourvi%C3%A8re.jpg',
  ],
  [
    'public/story/normandy-figures/people/roman-civitas-rotomagus.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d5/Maison_Carr%C3%A9e_N%C3%AEmes.jpg',
  ],
  [
    'public/story/normandy-figures/people/roman-veterans-merchants-seine.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Hylas_Saint-Romain-en_Gal_07_2011.jpg',
  ],
  [
    'public/story/normandy-figures/people/rotomagus-bishops-transition.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0d/Rouen_Cathedral%2C_View_up_the_transept_and_tower_20140215_1.jpg',
  ],
  [
    'public/story/normandy-figures/people/salian-franks-frontier.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1e/Seal_of_Childeric_I_Tournai_tomb.jpg',
  ],
  [
    'public/story/normandy-figures/people/late-roman-villa-elite.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/5e/Mus%C3%A9e_GR_de_Saint-Romain-en-Gal_27_07_2011_32.jpg',
  ],
  [
    'public/story/normandy-figures/people/clovis.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b7/Clovis_Ier%2C_PA04987.jpg',
  ],
  [
    'public/story/normandy-figures/people/dagobert-i.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/49/Dagobertus%2C_R3A12087_010.jpg',
  ],
  [
    'public/story/normandy-figures/people/charles-martel.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f2/Charles_Martel_01.jpg',
  ],
  [
    'public/story/normandy-figures/people/pepin-short.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/55/Delpech_-_Pepin_the_Short.jpg',
  ],
  [
    'public/story/normandy-figures/people/charles-fat.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f2/Charles_III_the_Fat.jpg',
  ],
  [
    'public/story/normandy-figures/people/hastein-bjorn.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6a/Oseberg_ship_-_IMG_9186.jpg',
  ],
  [
    'public/story/normandy-figures/people/monastic-chronicler-voices.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1b/Scriptorium.jpg',
  ],
  [
    'public/story/normandy-figures/people/william-longsword.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e1/William_longsword_statue_in_falaise.JPG',
  ],
  [
    'public/story/normandy-figures/people/richard-ii.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/01/Richard_II_of_Normandy.jpg',
  ],
  [
    'public/story/normandy-figures/people/richard-iii-robert-i.png',
    'https://upload.wikimedia.org/wikipedia/commons/a/a5/Richard_III_of_Normandy.png',
  ],
  [
    'public/story/normandy-figures/people/emma-gunnor.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4d/Emma_of_Normandy_1.jpg',
  ],
  [
    'public/story/normandy-figures/people/dudo.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/86/BayeuxTapestryScene01.jpg',
  ],
  [
    'public/story/normandy-figures/people/gisela-frankish.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/69/Karl%2BRollo%2BGisela.jpg',
  ],
  [
    'public/story/normandy-figures/people/maurilius-archbishop-rouen.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4b/Cath%C3%A8dre%2C_Cath%C3%A9drale_Notre-Dame_de_Rouen-8529a_%28cropped%29.jpg',
  ],
  [
    'public/story/normandy-figures/people/michael-archbishop-rouen.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8a/Epitaph_of_Empress_Matilda%2C_Rouen_Cathedral.jpg',
  ],
  [
    'public/story/normandy-figures/people/roman-magistrates-map.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7e/Mus%C3%A9e_Picardie_Arch%C3%A9o_01.jpg',
  ],
  [
    'public/story/normandy-figures/people/frankish-clovis-map.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c7/Baptism_of_Clovis.jpg',
  ],
  [
    'public/story/normandy-figures/people/dagobert-frankish-map.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/68/Jumi%C3%A8ges_Abbaye_de_Jumi%C3%A8ges_%C3%89glise_Saint-Pierre_2.jpg',
  ],
  [
    'public/story/normandy-figures/people/viking-rollo-precursor.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/00/Cf19474_04_Gokstadskipet_i_Universitetshagen_%28Gokstad_ship._Kulturhistorisk_museum_UiO_Oslo%2C_Norway._License_CC_BY-SA_4.0%29.jpg',
  ],
  [
    'public/story/normandy-figures/people/rollo-early-normandy.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Rollo%2BCharles.jpg',
  ],
  [
    'public/story/normandy-figures/people/matilda-flanders.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fe/Matilda_of_Flanders.jpg',
  ],
  [
    'public/story/normandy-figures/people/odo-bayeux.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/5a/Odo_of_Bayeux.jpg',
  ],
  [
    'public/story/normandy-figures/people/lanfranc-anselm.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/59/Anselm_of_Canterbury.jpg',
  ],
  [
    'public/story/normandy-figures/people/robert-curthose.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c1/Robert_Curthose.jpg',
  ],
  [
    'public/story/normandy-figures/people/henry-i-england.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/98/Henry_I_of_England.jpg',
  ],
  [
    'public/story/normandy-figures/people/robert-mortain.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/3b/Bayeux_Tapestry_scene44_Robert_de_Morten.jpg',
  ],
  [
    'public/story/normandy-figures/people/william-rufus.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/92/William_II_of_England.jpg',
  ],
  [
    'public/story/normandy-figures/people/belleme-magnates.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d4/Ch%C3%A2teau_du_Tertre_1.jpg',
  ],
  [
    'public/story/normandy-figures/people/robert-of-gloucester.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d2/RobertConsul_TewkesburyAbbey_FoundersBook.jpg',
  ],
  [
    'public/story/normandy-figures/people/hauteville-tancred.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b2/Tancr%C3%A8de_de_Hauteville.jpg',
  ],
  [
    'public/story/normandy-figures/people/roger-i-ii.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e8/Roger_II_of_Sicily.jpg',
  ],
  [
    'public/story/normandy-figures/people/bohemond-tancred-crusade.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Bohemond_I_of_Antioch.jpg',
  ],
  [
    'public/story/normandy-figures/people/william-iron-arm.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/13/Statue_cath%C3%A9drale_Coutances_Guillaume_Bras-de-fer.JPG',
  ],
  [
    'public/story/normandy-figures/people/drogo-hauteville.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Tomba_degli_Altavilla.jpg',
  ],
  [
    'public/story/normandy-figures/people/humphrey-hauteville.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/eb/Statue_cath%C3%A9drale_Coutances_Hauteville_2.JPG',
  ],
  [
    'public/story/normandy-figures/people/alexios-i-komnenos.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8c/Alexios_I_Komnenos.jpg',
  ],
  [
    'public/story/normandy-figures/people/popes-reform-era.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/59/Pope_Gregory_VII.jpg',
  ],
  [
    'public/story/normandy-figures/people/john-lackland.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0c/John_of_England_%28John_Lackland%29.jpg',
  ],
  [
    'public/story/normandy-figures/people/louis-viii.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Lehmann_-_Louis_VIII_of_France.jpg',
  ],
  [
    'public/story/normandy-figures/people/edward-iii.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b4/Edward_III_of_England.jpg',
  ],
  [
    'public/story/normandy-figures/people/edward-black-prince.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9b/Edward_the_Black_Prince.jpg',
  ],
  [
    'public/story/normandy-figures/people/bertrand-du-guesclin.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e7/Bertrand_du_Guesclin.jpg',
  ],
  [
    'public/story/normandy-figures/people/henry-v.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d5/Henry_V_of_England.jpg',
  ],
  [
    'public/story/normandy-figures/people/charles-vii.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Charles_VII_of_France.jpg',
  ],
  [
    'public/story/normandy-figures/people/coligny.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/11/Gaspard_II_de_Coligny.jpg',
  ],
  [
    'public/story/normandy-figures/people/villegagnon.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/10/Nicolas_Lagneau_-_Nicolas_Durand_de_Villegagnon.jpg',
  ],
  [
    'public/story/normandy-figures/people/iberville-bienville.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9f/Iberville.jpg',
  ],
  [
    'public/story/normandy-figures/people/francois-gaston-levis.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/19/Fran%C3%A7ois_Gaston_de_L%C3%A9vis_%28Stewart_1984-8%29.jpg',
  ],
  [
    'public/story/normandy-figures/people/pierre-de-rigaud-vaudreuil.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/de/Pierre_de_Rigaud_de_Vaudreuil.jpg',
  ],
  [
    'public/story/normandy-figures/people/francois-bigot.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0a/Chevignard-Faux-Portrait-de-Bigot_02.jpg',
  ],
];

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
