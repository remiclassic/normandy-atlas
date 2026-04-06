import type { AtlasLocale } from '@/core/types';
import type { StoryTone } from '@/data/atlas/story-library-meta';
import type { SelectionKind } from '@/types';

// ---------------------------------------------------------------------------
// Story Launcher – data model
// ---------------------------------------------------------------------------

/** Slice of map state the launcher reads to build contextual recommendations. */
export interface StoryLauncherContextInput {
  eraId: string;
  locale: AtlasLocale;
  selectionKind?: SelectionKind | null;
  selectedFeatureId?: string | null;
  /** If user is already inside a story, used to suppress "start" suggestions. */
  storyMode?: boolean;
  storyArc?: string | null;
}

// -- Launch actions ---------------------------------------------------------

export type StoryLaunchAction =
  | { type: 'story'; arcId: string | null; resumeStep?: number }
  | { type: 'flythrough'; presetId: string };

// -- Item -------------------------------------------------------------------

export type StoryLauncherItemKind =
  | 'contextual'
  | 'story_arc'
  | 'full_journey'
  | 'flythrough';

export interface StoryLauncherItem {
  id: string;
  title: string;
  /** Arc name without “Continue” prefix — for poster hero headline. */
  heroHeadline?: string;
  subtitle?: string;
  kind: StoryLauncherItemKind;
  launch: StoryLaunchAction;
  badge?: string;
  thumb?: string | null;
  /** Wide hero art (thumb or first illustrated beat), for launcher featured treatment. */
  posterSrc?: string | null;
  tone?: StoryTone;
  estimatedMinutes?: number;
}

// -- Section ----------------------------------------------------------------

export type StoryLauncherSectionVariant = 'hero' | 'list';

/** Era-scoped sections (arcs + flythroughs for current era) vs broader atlas catalog. */
export type StoryLauncherSectionEmphasis = 'era' | 'atlas';

export interface StoryLauncherSection {
  sectionId: string;
  title: string;
  variant: StoryLauncherSectionVariant;
  items: StoryLauncherItem[];
  /** Visual grouping: stronger chrome for current-era content, muted for catalog. */
  emphasis?: StoryLauncherSectionEmphasis;
}

// -- Top-level model --------------------------------------------------------

export interface StoryLauncherModel {
  sections: StoryLauncherSection[];
}
