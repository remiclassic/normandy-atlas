const STORAGE_KEY = 'norman-atlas-lineage-favorites-v1';

export function readLineageFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function writeLineageFavorites(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* quota */
  }
}

export function toggleLineageFavorite(id: string): string[] {
  const cur = readLineageFavorites();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  writeLineageFavorites(next);
  return next;
}
