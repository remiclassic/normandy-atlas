const STORAGE_KEY = 'norman-atlas-story-progress-v1';

/** Stable key for `storyArc === null` (full chronological timeline). */
export const FULL_TIMELINE_PROGRESS_KEY = '__full__';

export function arcIdToProgressKey(arcId: string | null): string {
  return arcId ?? FULL_TIMELINE_PROGRESS_KEY;
}

export interface StoryProgressRecord {
  lastStep: number;
  lastPlayedAt: number;
  completed?: boolean;
}

export function readStoryProgressMap(): Record<string, StoryProgressRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as Record<string, StoryProgressRecord>;
  } catch {
    return {};
  }
}

function writeStoryProgressMap(map: Record<string, StoryProgressRecord>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* quota */
  }
}

export function readStoryProgress(arcKey: string): StoryProgressRecord | undefined {
  return readStoryProgressMap()[arcKey];
}

export function persistStoryProgress(
  arcKey: string,
  patch: Partial<StoryProgressRecord> & Pick<StoryProgressRecord, 'lastStep'>,
): void {
  const map = readStoryProgressMap();
  const prev = map[arcKey];
  const done =
    patch.lastStep === 0 ? false : patch.completed ?? prev?.completed;
  map[arcKey] = {
    lastStep: patch.lastStep,
    lastPlayedAt: patch.lastPlayedAt ?? prev?.lastPlayedAt ?? Date.now(),
    completed: done,
  };
  writeStoryProgressMap(map);
}

export function markStoryArcCompleted(arcKey: string, totalSteps: number): void {
  const map = readStoryProgressMap();
  map[arcKey] = {
    lastStep: Math.max(0, totalSteps - 1),
    lastPlayedAt: Date.now(),
    completed: true,
  };
  writeStoryProgressMap(map);
}
