import type { StoryProgressRecord } from '@/lib/story-progress';

// ---------------------------------------------------------------------------
// Progress V2 — unified schema for the atlas gamification layer.
// All data is stored in a single localStorage blob.
// ---------------------------------------------------------------------------

export const PROGRESS_STORAGE_KEY = 'norman-atlas-progress-v2';
export const LEGACY_STORY_STORAGE_KEY = 'norman-atlas-story-progress-v1';
export const SCHEMA_VERSION = 2;

/** Cap the event tail to keep the blob under ~60 KB. */
export const MAX_EVENT_TAIL = 300;

// --- Event types -----------------------------------------------------------

export type AtlasEventType =
  | 'place_open'
  | 'region_open'
  | 'segment_open'
  | 'journey_open'
  | 'story_step'
  | 'story_arc_complete'
  | 'era_visit'
  | 'journal_section_view';

export interface AtlasEvent {
  t: AtlasEventType;
  id: string;
  /** Era context when event was emitted. */
  eraId?: string;
  /** Dwell time in ms (place/region panels). */
  dwellMs?: number;
  /** Story-specific: step index. */
  step?: number;
  /** Epoch ms. */
  at: number;
}

// --- Aggregates ------------------------------------------------------------

export interface EntityEngagement {
  /** Number of distinct opens. */
  opens: number;
  /** Cumulative dwell time in ms. */
  dwellMs: number;
  /** First-seen epoch ms. */
  firstSeen: number;
}

export interface Aggregates {
  places: Record<string, EntityEngagement>;
  regions: Record<string, EntityEngagement>;
  segments: Record<string, EntityEngagement>;
  journeys: Record<string, EntityEngagement>;
  eraCoverage: Record<string, number>;
  totalSessionMs: number;
}

// --- Milestones ------------------------------------------------------------

export interface MilestoneRecord {
  unlockedAt: number;
}

// --- Root blob -------------------------------------------------------------

export interface ProgressV2 {
  schemaVersion: typeof SCHEMA_VERSION;
  story: Record<string, StoryProgressRecord>;
  aggregates: Aggregates;
  milestones: Record<string, MilestoneRecord>;
  events: AtlasEvent[];
  /** ISO date of last persist, for session resumption. */
  lastPersistedAt: string;
}

// --- Defaults --------------------------------------------------------------

export function createEmptyAggregates(): Aggregates {
  return {
    places: {},
    regions: {},
    segments: {},
    journeys: {},
    eraCoverage: {},
    totalSessionMs: 0,
  };
}

export function createEmptyProgress(): ProgressV2 {
  return {
    schemaVersion: SCHEMA_VERSION,
    story: {},
    aggregates: createEmptyAggregates(),
    milestones: {},
    events: [],
    lastPersistedAt: new Date().toISOString(),
  };
}
