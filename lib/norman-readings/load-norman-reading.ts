import fs from 'fs';
import path from 'path';

import { getNormanReadingEntry } from './manifest';

export function loadNormanReadingMarkdownBody(slug: string): string {
  const filePath = path.join(process.cwd(), 'content', 'norman-readings', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing Norman reading markdown: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n').trim();
}

export function getNormanReadingPageData(slug: string) {
  const entry = getNormanReadingEntry(slug);
  if (!entry) return null;
  const body = loadNormanReadingMarkdownBody(slug);
  return { entry, body };
}
