/**
 * Adds essaySlug to NormanSiteArticle entries in site-articles.ts when missing.
 * Rouen keeps slug rouen-ducal-capital; other nodes use id as slug (e.g. node-caen).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const p = path.join(root, 'data', 'norman-expansion', 'site-articles.ts');
let s = fs.readFileSync(p, 'utf8');
s = s.replace(
  /(\n)    id: '(node-[^']+)',\n(?!    essaySlug:)/g,
  (_, lead, id) => {
    const slug = id === 'node-rouen' ? 'rouen-ducal-capital' : id;
    return `${lead}    id: '${id}',\n    essaySlug: '${slug}',\n`;
  },
);
fs.writeFileSync(p, s);
console.log('Patched essaySlug entries in site-articles.ts');
