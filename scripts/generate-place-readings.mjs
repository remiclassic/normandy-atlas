/**
 * Generates place-based Norman reading markdown files and catalog.generated.ts
 * from data/norman-expansion/nodes.ts (run from repo root after edits to nodes).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const nodesPath = path.join(root, 'data', 'norman-expansion', 'nodes.ts');
const contentDir = path.join(root, 'content', 'norman-readings');
const outTs = path.join(root, 'lib', 'norman-readings', 'catalog.generated.ts');

const nodesSrc = fs.readFileSync(nodesPath, 'utf8');
const blocks = nodesSrc.split('properties: {').slice(1);
const parsed = [];
for (const block of blocks) {
  const id = block.match(/id: '([^']+)'/)?.[1];
  const name = block.match(/name: '([^']+)'/)?.[1];
  const roleM = block.match(/role: '((?:[^'\\]|\\.)*)'/);
  const role = roleM ? roleM[1].replace(/\\'/g, "'") : '';
  if (id && name) parsed.push({ id, name, role });
}

function regionTag(id) {
  if (
    [
      'node-rouen',
      'node-caen',
      'node-falaise',
      'node-bayeux',
      'node-mont-saint-michel',
      'node-avranches',
      'node-chateau-gaillard',
      'node-gisors',
      'node-pirou',
    ].includes(id)
  )
    return { tag: 'Normandy', thematic: 'normandy-from-grant-to-duchy' };
  if (
    [
      'node-london',
      'node-hastings',
      'node-windsor',
      'node-dover',
      'node-york',
      'node-durham',
      'node-norwich',
      'node-warwick',
      'node-lincoln',
      'node-colchester-castle',
      'node-rochester-castle',
      'node-arundel-castle',
    ].includes(id)
  )
    return { tag: 'England', thematic: 'norman-england-conquest-and-governance' };
  if (['node-chepstow', 'node-cardiff', 'node-pembroke'].includes(id))
    return { tag: 'Wales', thematic: 'normans-in-wales-and-the-march' };
  if (id === 'node-edinburgh')
    return { tag: 'Scotland', thematic: 'norman-england-conquest-and-governance' };
  if (
    ['node-dublin', 'node-trim', 'node-wexford', 'node-waterford', 'node-carrickfergus-castle'].includes(
      id,
    )
  )
    return { tag: 'Ireland', thematic: 'normans-in-ireland-invasion' };
  if (
    [
      'node-palermo',
      'node-melfi',
      'node-bari',
      'node-salerno',
      'node-messina',
      'node-naples',
      'node-catania',
      'node-reggio-calabria',
      'node-aversa',
      'node-cefalu',
      'node-monreale',
      'node-palazzo-normanni',
      'node-caccamo-castle',
      'node-aci-castello',
      'node-erice-castle-of-venus',
    ].includes(id)
  )
    return { tag: 'Italy & Sicily', thematic: 'hautevilles-southern-italy' };
  if (['node-antioch', 'node-tripoli', 'node-edessa'].includes(id))
    return { tag: 'Crusader states', thematic: 'normans-crusades-antioch-tripoli' };
  if (['node-tunis', 'node-mahdia'].includes(id))
    return { tag: 'Ifriqiya', thematic: 'norman-sicily-kingdom' };
  if (['node-dyrrachium', 'node-lisbon', 'node-tarragona', 'node-limassol'].includes(id))
    return { tag: 'Expedition', thematic: 'norman-identity-themes' };
  if (
    [
      'node-krak-des-chevaliers',
      'node-sahyun-saladin-castle',
      'node-margat-marqab',
      'node-safita-chastel-blanc',
      'node-bagras-gaston',
      'node-anavarza',
      'node-kerak',
    ].includes(id)
  )
    return { tag: 'Levant', thematic: 'normans-crusades-antioch-tripoli' };
  if (id === 'node-mdina-norman') return { tag: 'Malta', thematic: 'norman-sicily-kingdom' };
  return { tag: 'Norman world', thematic: 'norman-identity-themes' };
}

function bodyFor(n) {
  const { id, name, role } = n;
  const { tag, thematic } = regionTag(id);
  const thematicLink = `[${thematic.replace(/-/g, ' ')}](/norman-readings/${thematic})`;
  const caveat =
    id === 'node-edinburgh'
      ? '\n\n**Scope:** “Norman” influence in twelfth-century Scotland is contested and layered; read this as feudal and diplomatic contact, not ethnic replacement.\n'
      : ['node-tunis', 'node-mahdia', 'node-lisbon', 'node-tarragona', 'node-limassol', 'node-dyrrachium'].includes(
            id,
          )
        ? '\n\n**Scope:** This pin compresses a short episode or mixed contingents. Open with chronicles and secondary surveys; avoid turning a raid or crusade segment into stable “Norman rule” unless the dates support it.\n'
        : [
              'node-krak-des-chevaliers',
              'node-sahyun-saladin-castle',
              'node-margat-marqab',
              'node-safita-chastel-blanc',
              'node-bagras-gaston',
              'node-anavarza',
              'node-kerak',
            ].includes(id)
          ? '\n\n**Build phases:** Many Levantine castles were enlarged under Hospitaller or other orders after the first generation of Crusader lords. Attribute fabric to patrons and phases, not a single “Norman” label.\n'
          : '';

  return `## ${name}

The atlas summarizes this site as: **${role || 'Norman Expansion pin'}**. This essay is a **reading companion**: it frames what “Norman” can mean politically and architecturally here, without replacing specialist monographs or excavation reports.

**Identity:** Use lordship, charters, and phases of building—not modern categories of “blood.” The map shows geography and modeled movement; nuance lives in the sources.

### Hub essays

- Region cluster: see ${thematicLink} and the [shared bibliography](/norman-readings/shared-bibliography).
- Castles generally: [Norman castle — motte to stone](/norman-readings/norman-castle-motte-to-stone).
${caveat}
### On the map

Use **Open on map** when this reading is tied to a pin. Keep the era strip and Norman Expansion layers in view as teaching overlays, not exhaustive settlement lists.
`;
}

const placeEntries = [];
for (const n of parsed) {
  if (n.id === 'node-rouen') continue;
  const slug = n.id;
  const { tag } = regionTag(n.id);
  const title = `${n.name}`;
  const description = `${n.role}. Long-form companion to the Norman Expansion pin (${tag}).`;
  const md = bodyFor(n);
  fs.writeFileSync(path.join(contentDir, `${slug}.md`), md, 'utf8');
  placeEntries.push({
    slug,
    title,
    description,
    linkedNodeId: n.id,
    defaultEraId: 'norman-expansion',
    tags: [tag],
  });
}

const ts =
  `/* eslint-disable */\n` +
  `/** Auto-generated by scripts/generate-place-readings.mjs — do not edit by hand. */\n` +
  `import type { NormanReadingEntry } from './types';\n\n` +
  `export const PLACE_READING_ENTRIES: NormanReadingEntry[] = ${JSON.stringify(placeEntries, null, 2)};\n`;

fs.writeFileSync(outTs, ts, 'utf8');
console.log(`Wrote ${placeEntries.length} place markdown files and ${outTs}`);
