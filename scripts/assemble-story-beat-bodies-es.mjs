import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chunkA from './story-beat-es-chunk-a.mjs';
import chunkB from './story-beat-es-chunk-b.mjs';
import titlesEs from './story-beat-es-titles.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ex = JSON.parse(fs.readFileSync(join(root, 'data/atlas/story-beat-en-extract.json'), 'utf8'));
const ES = { ...chunkA, ...chunkB };

for (const { id } of ex) {
  if (!ES[id]) throw new Error(`Missing Spanish body for ${id}`);
  if (!titlesEs[id]) throw new Error(`Missing Spanish title for ${id}`);
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '');
}

let out =
  '/** Spanish story copy when locale is `es`. Regenerate: `node scripts/assemble-story-beat-bodies-es.mjs`. */\n' +
  'export const STORY_BEAT_BODIES_ES: Readonly<Record<string, string>> = {\n';

for (const { id } of ex) {
  out += `  '${id}': '${esc(ES[id])}',\n`;
}
out += '};\n\nexport const STORY_BEAT_TITLES_ES: Readonly<Record<string, string>> = {\n';

for (const { id } of ex) {
  out += `  '${id}': '${esc(titlesEs[id])}',\n`;
}
out += '};\n';

fs.writeFileSync(join(root, 'data/atlas/story-beat-bodies-es.ts'), out);
console.log('Wrote', ex.length, 'body + title entries to data/atlas/story-beat-bodies-es.ts');
