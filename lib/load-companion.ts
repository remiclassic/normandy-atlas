import fs from 'fs';
import path from 'path';

const COMPANION_FILES = [
  '00-front-matter.md',
  'part-i.md',
  'part-ii.md',
  'part-iii.md',
  'part-iv.md',
] as const;

export function getCompanionSource(): string {
  const base = path.join(process.cwd(), 'content', 'companion');
  return COMPANION_FILES.map((f) => fs.readFileSync(path.join(base, f), 'utf8')).join('\n\n');
}

export interface CompanionTocItem {
  id: string;
  label: string;
}

function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Table of contents from level-2 headings only (`## ...`). */
export function extractCompanionToc(markdown: string): CompanionTocItem[] {
  const toc: CompanionTocItem[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    if (line.startsWith('###')) continue;
    if (line.startsWith('## ')) {
      const label = line.slice(3).trim();
      if (label) toc.push({ id: slugifyHeading(label), label });
    }
  }
  return toc;
}
