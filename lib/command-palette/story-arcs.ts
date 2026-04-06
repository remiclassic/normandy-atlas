import { atlasStoryBeats } from '@/data/atlas/story-beats';

export interface StoryArcSummary {
  arcId: string | null;
  /** First beat title in arc — good enough for palette labels */
  label: string;
}

/** Unique arcs (including `null` = full chronological timeline). */
export function listStoryArcSummaries(): StoryArcSummary[] {
  const seen = new Set<string>();
  const out: StoryArcSummary[] = [];
  for (const b of atlasStoryBeats) {
    const key = b.arcId ?? '__full__';
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ arcId: b.arcId ?? null, label: b.copy.title });
  }
  return out;
}
