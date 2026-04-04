import type { StoryProgressRecord } from '@/lib/story-progress';
import {
  PROGRESS_STORAGE_KEY,
  LEGACY_STORY_STORAGE_KEY,
  SCHEMA_VERSION,
  MAX_EVENT_TAIL,
  createEmptyProgress,
  type ProgressV2,
} from './schema';

// ---------------------------------------------------------------------------
// localStorage read / write with quota handling and v1→v2 migration.
// ---------------------------------------------------------------------------

let cachedProgress: ProgressV2 | null = null;
let persistTimer: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 800;

function isSSR(): boolean {
  return typeof window === 'undefined';
}

/** Attempt to parse the legacy story-only blob from v1. */
function readLegacyStory(): Record<string, StoryProgressRecord> {
  try {
    const raw = localStorage.getItem(LEGACY_STORY_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as Record<string, StoryProgressRecord>;
  } catch {
    return {};
  }
}

/** Migrate legacy v1 story data into a fresh v2 blob. */
function migrateFromV1(): ProgressV2 {
  const progress = createEmptyProgress();
  const legacyStory = readLegacyStory();
  progress.story = legacyStory;

  for (const [arcKey, rec] of Object.entries(legacyStory)) {
    if (rec.completed) {
      progress.aggregates.eraCoverage[arcKey] =
        (progress.aggregates.eraCoverage[arcKey] ?? 0) + 1;
    }
  }
  return progress;
}

/** Validate and deserialize a raw blob. */
function parseBlob(raw: string): ProgressV2 | null {
  try {
    const obj = JSON.parse(raw);
    if (obj?.schemaVersion === SCHEMA_VERSION) return obj as ProgressV2;
  } catch { /* corrupt */ }
  return null;
}

/** Read the progress blob from localStorage, migrating if needed. */
export function readProgress(): ProgressV2 {
  if (isSSR()) return createEmptyProgress();
  if (cachedProgress) return cachedProgress;

  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw) {
      const parsed = parseBlob(raw);
      if (parsed) {
        cachedProgress = parsed;
        return parsed;
      }
    }
  } catch { /* SSR / SecurityError */ }

  const migrated = migrateFromV1();
  cachedProgress = migrated;
  writeProgressImmediate(migrated);

  try { localStorage.removeItem(LEGACY_STORY_STORAGE_KEY); } catch { /* ok */ }

  return migrated;
}

/** Replace the in-memory cache and schedule a debounced persist. */
export function updateProgress(next: ProgressV2): void {
  cachedProgress = next;
  schedulePersist();
}

/** Immediately write to localStorage (bypass debounce). */
function writeProgressImmediate(progress: ProgressV2): void {
  if (isSSR()) return;

  if (progress.events.length > MAX_EVENT_TAIL) {
    progress.events = progress.events.slice(-MAX_EVENT_TAIL);
  }
  progress.lastPersistedAt = new Date().toISOString();

  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    try {
      progress.events = progress.events.slice(-50);
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch { /* quota: give up */ }
  }
}

function schedulePersist(): void {
  if (persistTimer) return;
  persistTimer = setTimeout(() => {
    persistTimer = null;
    if (cachedProgress) writeProgressImmediate(cachedProgress);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('norman-atlas-progress-flush'));
    }
  }, DEBOUNCE_MS);
}

/** Force-flush any pending writes (e.g. before page unload). */
export function flushProgress(): void {
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = null;
  }
  if (cachedProgress) writeProgressImmediate(cachedProgress);
}

/** Clear all gamification data (dev / reset). */
export function resetProgress(): void {
  cachedProgress = null;
  if (!isSSR()) {
    try { localStorage.removeItem(PROGRESS_STORAGE_KEY); } catch { /* ok */ }
  }
}

// --- Export / import -------------------------------------------------------

export function exportProgressJSON(): string {
  return JSON.stringify(readProgress(), null, 2);
}

export function importProgressJSON(json: string): boolean {
  const parsed = parseBlob(json);
  if (!parsed) return false;
  cachedProgress = parsed;
  writeProgressImmediate(parsed);
  return true;
}
