export const HIGH_CONTRAST_STORAGE_KEY = 'normanAtlas.highContrast';

export function readStoredHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function persistHighContrast(enabled: boolean): void {
  try {
    if (enabled) localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, 'true');
    else localStorage.removeItem(HIGH_CONTRAST_STORAGE_KEY);
  } catch { /* quota */ }
}

export function applyHighContrastToDocument(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  if (enabled) {
    document.documentElement.dataset.highContrast = 'true';
  } else {
    delete document.documentElement.dataset.highContrast;
  }
}
