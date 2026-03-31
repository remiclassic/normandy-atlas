import { readProgress, updateProgress } from '@/lib/progress/storage';

// ---------------------------------------------------------------------------
// Thin wrappers over the unified progress-v2 blob.
// External API is unchanged so callers (StoryModeBar, StoryLibrary) keep
// working without modification.
// ---------------------------------------------------------------------------

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
  return readProgress().story;
}

export function readStoryProgress(arcKey: string): StoryProgressRecord | undefined {
  return readProgress().story[arcKey];
}

export function persistStoryProgress(
  arcKey: string,
  patch: Partial<StoryProgressRecord> & Pick<StoryProgressRecord, 'lastStep'>,
): void {
  const progress = readProgress();
  const prev = progress.story[arcKey];
  const done =
    patch.lastStep === 0 ? false : patch.completed ?? prev?.completed;
  progress.story[arcKey] = {
    lastStep: patch.lastStep,
    lastPlayedAt: patch.lastPlayedAt ?? prev?.lastPlayedAt ?? Date.now(),
    completed: done,
  };
  updateProgress(progress);
}

export function markStoryArcCompleted(arcKey: string, totalSteps: number): void {
  const progress = readProgress();
  progress.story[arcKey] = {
    lastStep: Math.max(0, totalSteps - 1),
    lastPlayedAt: Date.now(),
    completed: true,
  };
  updateProgress(progress);
}
