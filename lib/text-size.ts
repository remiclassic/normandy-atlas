export type TextSizeMode = 'standard' | 'large';

export const DEFAULT_TEXT_SIZE: TextSizeMode = 'standard';
export const TEXT_SIZE_STORAGE_KEY = 'normanAtlas.textSize';

const CLASSES: Record<TextSizeMode, string> = {
  standard: 'text-size-standard',
  large: 'text-size-large',
};

export function isTextSizeMode(v: unknown): v is TextSizeMode {
  return v === 'standard' || v === 'large';
}

export function readStoredTextSize(): TextSizeMode {
  if (typeof window === 'undefined') return DEFAULT_TEXT_SIZE;
  try {
    const raw = localStorage.getItem(TEXT_SIZE_STORAGE_KEY);
    if (raw && isTextSizeMode(raw)) return raw;
  } catch {
    /* SSR / quota */
  }
  return DEFAULT_TEXT_SIZE;
}

export function persistTextSize(mode: TextSizeMode): void {
  try {
    localStorage.setItem(TEXT_SIZE_STORAGE_KEY, mode);
  } catch {
    /* quota */
  }
}

/** Toggle `text-size-standard` / `text-size-large` on `<html>` via classList (preserves font-variable classes). */
export function applyTextSizeToDocument(mode: TextSizeMode): void {
  if (typeof document === 'undefined') return;
  const cl = document.documentElement.classList;
  for (const cls of Object.values(CLASSES)) cl.remove(cls);
  cl.add(CLASSES[mode]);
}
