const STORAGE_KEY = 'norman-atlas-pending-legacy-atlantic-story-v1';

/** Clears a stale pending step so it cannot override a later curated-arc launch after navigating home. */
export function clearPendingLegacyAtlanticStoryStepIndex(): void {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function setPendingLegacyAtlanticStoryStepIndex(index: number): void {
  if (typeof sessionStorage === 'undefined') return;
  if (!Number.isFinite(index) || index < 0) return;
  sessionStorage.setItem(STORAGE_KEY, String(Math.floor(index)));
}

/** Returns and clears the pending step index, if any. */
export function consumePendingLegacyAtlanticStoryStepIndex(): number | null {
  if (typeof sessionStorage === 'undefined') return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (raw == null) return null;
  sessionStorage.removeItem(STORAGE_KEY);
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
}
