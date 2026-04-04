import type { StoryProgressRecord } from '@/lib/story-progress';
import type { ProgressV2 } from './schema';
import { SCHEMA_VERSION, MAX_EVENT_TAIL, createEmptyProgress } from './schema';

function mergeStoryRecord(
  a: StoryProgressRecord | undefined,
  b: StoryProgressRecord | undefined,
): StoryProgressRecord | undefined {
  if (!a) return b;
  if (!b) return a;
  const completed = Boolean(a.completed || b.completed);
  const lastPlayedAt = Math.max(a.lastPlayedAt, b.lastPlayedAt);
  const lastStep = Math.max(a.lastStep, b.lastStep);
  return { completed, lastPlayedAt, lastStep };
}

/**
 * Merges remote progress into local: per-arc story state uses max step / completion union;
 * milestones keep the later `unlockedAt`; aggregates prefer higher numeric coverage;
 * events are concatenated and tail-trimmed.
 */
export function mergeProgressV2(local: ProgressV2, remote: ProgressV2): ProgressV2 {
  if (remote.schemaVersion !== SCHEMA_VERSION) return local;
  const story: Record<string, StoryProgressRecord> = { ...local.story };
  for (const [k, rec] of Object.entries(remote.story)) {
    story[k] = mergeStoryRecord(story[k], rec) ?? rec;
  }

  const milestones = { ...local.milestones };
  for (const [id, rec] of Object.entries(remote.milestones)) {
    const prev = milestones[id];
    if (!prev || rec.unlockedAt > prev.unlockedAt) milestones[id] = rec;
  }

  const eraCoverage = { ...local.aggregates.eraCoverage };
  for (const [k, v] of Object.entries(remote.aggregates.eraCoverage)) {
    eraCoverage[k] = Math.max(eraCoverage[k] ?? 0, v);
  }

  const merged: ProgressV2 = {
    schemaVersion: SCHEMA_VERSION,
    story,
    milestones,
    aggregates: {
      ...local.aggregates,
      eraCoverage,
      totalSessionMs: Math.max(
        local.aggregates.totalSessionMs,
        remote.aggregates.totalSessionMs,
      ),
    },
    events: [...local.events, ...remote.events]
      .sort((x, y) => x.at - y.at)
      .slice(-MAX_EVENT_TAIL),
    lastPersistedAt: new Date().toISOString(),
  };

  return merged;
}

export function parseProgressV2Json(json: string): ProgressV2 | null {
  try {
    const obj = JSON.parse(json) as ProgressV2;
    if (obj?.schemaVersion !== SCHEMA_VERSION) return null;
    return obj;
  } catch {
    return null;
  }
}

export function safeProgressOrEmpty(raw: unknown): ProgressV2 {
  if (
    raw &&
    typeof raw === 'object' &&
    (raw as ProgressV2).schemaVersion === SCHEMA_VERSION
  ) {
    return raw as ProgressV2;
  }
  return createEmptyProgress();
}
