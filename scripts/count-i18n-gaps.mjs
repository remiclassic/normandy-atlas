import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function collect(sf, node) {
  let n = 0;
  if (ts.isObjectLiteralExpression(node)) {
    const props = node.properties.filter(ts.isPropertyAssignment);
    const by = new Map(props.map((p) => [p.name.getText(sf), p]));
    if (by.has('en') && !by.has('de')) {
      const en = by.get('en');
      const fr = by.get('fr');
      const src =
        fr && ts.isStringLiteralLike(fr.initializer)
          ? fr.initializer.text
          : en && ts.isStringLiteralLike(en.initializer)
            ? en.initializer.text
            : '';
      if (src && src.length) n++;
    }
  }
  ts.forEachChild(node, (ch) => {
    n += collect(sf, ch);
  });
  return n;
}

const files = process.argv.slice(2);
for (const rel of files.length ? files : []) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) continue;
  const txt = fs.readFileSync(abs, 'utf8');
  const sf = ts.createSourceFile(abs, txt, ts.ScriptTarget.Latest, true);
  console.log(rel, collect(sf, sf));
}
