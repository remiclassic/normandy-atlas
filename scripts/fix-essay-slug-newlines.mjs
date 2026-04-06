import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const p = path.join(root, 'data', 'norman-expansion', 'site-articles.ts');
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/essaySlug: '([^']+)',    overview:/g, "essaySlug: '$1',\n    overview:");
fs.writeFileSync(p, s);
