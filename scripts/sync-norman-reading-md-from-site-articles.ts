/**
 * Regenerates content/norman-readings/{slug}.md for every manifest entry with
 * linkedNodeId, using long-form copy from data/norman-expansion/site-articles.ts.
 *
 * Run from repo root: npx tsx scripts/sync-norman-reading-md-from-site-articles.ts
 */
import fs from 'fs';
import path from 'path';

import { getNormanSiteArticle } from '../data/norman-expansion/site-articles';
import { NORMAN_READINGS } from '../lib/norman-readings/manifest';

function regionTag(id: string): { tag: string; thematic: string } {
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
  ) {
    return { tag: 'Normandy', thematic: 'normandy-from-grant-to-duchy' };
  }
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
  ) {
    return { tag: 'England', thematic: 'norman-england-conquest-and-governance' };
  }
  if (['node-chepstow', 'node-cardiff', 'node-pembroke'].includes(id)) {
    return { tag: 'Wales', thematic: 'normans-in-wales-and-the-march' };
  }
  if (id === 'node-edinburgh') {
    return { tag: 'Scotland', thematic: 'norman-england-conquest-and-governance' };
  }
  if (
    ['node-dublin', 'node-trim', 'node-wexford', 'node-waterford', 'node-carrickfergus-castle'].includes(id)
  ) {
    return { tag: 'Ireland', thematic: 'normans-in-ireland-invasion' };
  }
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
  ) {
    return { tag: 'Italy & Sicily', thematic: 'hautevilles-southern-italy' };
  }
  if (['node-antioch', 'node-tripoli', 'node-edessa'].includes(id)) {
    return { tag: 'Crusader states', thematic: 'normans-crusades-antioch-tripoli' };
  }
  if (['node-tunis', 'node-mahdia'].includes(id)) {
    return { tag: 'Ifriqiya', thematic: 'norman-sicily-kingdom' };
  }
  if (['node-dyrrachium', 'node-lisbon', 'node-tarragona', 'node-limassol'].includes(id)) {
    return { tag: 'Expedition', thematic: 'norman-identity-themes' };
  }
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
  ) {
    return { tag: 'Levant', thematic: 'normans-crusades-antioch-tripoli' };
  }
  if (id === 'node-mdina-norman') {
    return { tag: 'Malta', thematic: 'norman-sicily-kingdom' };
  }
  return { tag: 'Norman world', thematic: 'norman-identity-themes' };
}

function caveatFor(id: string): string | null {
  if (id === 'node-edinburgh') {
    return '**Scope:** “Norman” influence in twelfth-century Scotland is contested and layered; read this as feudal and diplomatic contact, not ethnic replacement.';
  }
  if (
    ['node-tunis', 'node-mahdia', 'node-lisbon', 'node-tarragona', 'node-limassol', 'node-dyrrachium'].includes(
      id,
    )
  ) {
    return '**Scope:** This pin compresses a short episode or mixed contingents. Use chronicles and secondary surveys; avoid treating a raid or crusade episode as stable “Norman rule” unless the dates and administration support it.';
  }
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
  ) {
    return '**Build phases:** Many Levantine castles were enlarged under the Hospitallers, Templars, or later patrons. Attribute masonry and plan to specific phases and orders, not a single “Norman” label.';
  }
  return null;
}

function renderMarkdown(
  title: string,
  linkedNodeId: string,
  art: NonNullable<ReturnType<typeof getNormanSiteArticle>>,
): string {
  const { thematic } = regionTag(linkedNodeId);
  const thematicLinkLabel = thematic.replace(/-/g, ' ');
  const caveat = caveatFor(linkedNodeId);

  const significance =
    art.significance?.length ? `\n### Why it mattered\n\n${art.significance.map((s) => `- ${s}`).join('\n')}\n` : '';

  const architecture =
    art.architecture?.length
      ? `\n### Architecture and the site\n\n${art.architecture.map((s) => `- ${s}`).join('\n')}\n`
      : '';

  const timeline =
    art.timeline?.length
      ? `\n### Chronology (selected)\n\n${art.timeline.map((t) => `- **${t.year}:** ${t.text}`).join('\n')}\n`
      : '';

  const bibliographic =
    art.sources?.length
      ? `\n### Further reading\n\n${art.sources.map((s) => `- ${s}`).join('\n')}\n`
      : '';

  const caveatBlock = caveat ? `\n### Caution\n\n${caveat}\n` : '';

  return `## ${title}

${art.overview}
${significance}${architecture}${timeline}${bibliographic}
### Hub essays

- Region context: [${thematicLinkLabel}](/norman-readings/${thematic}) and the [shared bibliography](/norman-readings/shared-bibliography).
- Castles and fortification: [Norman castles — motte to stone](/norman-readings/norman-castle-motte-to-stone).
${caveatBlock}
### On the map

Use **Open on map** to fly to this pin in the **Norman expansion** era. Layers are teaching overlays — pair them with charters, excavation reports, and the works above.
`.trimEnd() + '\n';
}

const contentDir = path.join(process.cwd(), 'content', 'norman-readings');
let n = 0;
for (const entry of NORMAN_READINGS) {
  if (!entry.linkedNodeId) continue;
  const art = getNormanSiteArticle(entry.linkedNodeId);
  if (!art) {
    console.warn(`Missing site-articles entry for ${entry.linkedNodeId} (${entry.slug})`);
    continue;
  }
  const md = renderMarkdown(entry.title, entry.linkedNodeId, art);
  fs.writeFileSync(path.join(contentDir, `${entry.slug}.md`), md, 'utf8');
  n += 1;
}
console.log(`Wrote ${n} Norman reading markdown files from site-articles.ts`);
