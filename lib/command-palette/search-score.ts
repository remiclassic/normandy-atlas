export function normalizeSearch(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Higher is better. Returns 0 when query non-empty and no token matches. */
export function scoreSearchTokens(query: string, text: string, keywords?: string[]): number {
  const q = normalizeSearch(query);
  if (!q) return 1;
  const t = normalizeSearch(text);
  const tokens = q.split(' ').filter(Boolean);
  let score = 0;
  for (const tok of tokens) {
    if (t.includes(tok)) score += 4;
    else if (t.startsWith(tok)) score += 3;
    if (keywords?.some((k) => normalizeSearch(k).includes(tok))) score += 2;
  }
  return score;
}
