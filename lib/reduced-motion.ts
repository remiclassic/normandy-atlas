export const REDUCE_MOTION_STORAGE_KEY = 'normanAtlas.reduceMotion';
const HTML_CLASS = 'atlas-reduced-motion';

export function readStoredReduceMotionForced(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(REDUCE_MOTION_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function persistReduceMotionForced(forced: boolean): void {
  try {
    if (forced) localStorage.setItem(REDUCE_MOTION_STORAGE_KEY, 'true');
    else localStorage.removeItem(REDUCE_MOTION_STORAGE_KEY);
  } catch { /* quota */ }
}

export function getSystemPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/** True when motion should be suppressed (user forced OR OS preference). */
export function computeEffectiveReducedMotion(forced: boolean): boolean {
  return forced || getSystemPrefersReducedMotion();
}

export function applyReducedMotionToDocument(effective: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle(HTML_CLASS, effective);
}
