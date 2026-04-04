import { buildStoryLibraryRows, type StoryLibraryRowModel } from '@/lib/story-library-build';
import { readStoryProgressMap, type StoryProgressRecord } from '@/lib/story-progress';
import type { AtlasLocale } from '@/core/types';

/**
 * Return in-progress (not completed, lastStep > 0) story rows sorted by most-recently-played.
 * Mirrors the `continueWatchingRows` logic in StoryLibraryPanel so behavior stays consistent.
 */
export function listResumableStoryRows(locale: AtlasLocale): StoryLibraryRowModel[] {
  const rows = buildStoryLibraryRows(locale);
  const progressMap = readStoryProgressMap();

  return rows
    .filter((r) => {
      const p: StoryProgressRecord | undefined = progressMap[r.progressKey];
      return Boolean(p && !p.completed && p.lastStep > 0);
    })
    .sort(
      (a, b) =>
        (progressMap[b.progressKey]?.lastPlayedAt ?? 0) -
        (progressMap[a.progressKey]?.lastPlayedAt ?? 0),
    );
}
