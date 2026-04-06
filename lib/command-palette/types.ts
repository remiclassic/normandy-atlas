import type { SelectionKind } from '@/types';
import type { MapLngLatBounds } from '@/lib/map-view-reader';
import type { AtlasEra, AtlasLocale } from '@/core/types';

export type CommandAtlasMode = 'explore' | 'story' | 'genealogy';

export type CommandGroupId = 'navigation' | 'explore' | 'story' | 'genealogy' | 'ai';

export interface CommandRegionSummary {
  id: string;
  label: string;
}

export interface CommandSelectedEntity {
  id: string;
  kind: SelectionKind;
  label: string;
}

/** Snapshot used for visibility, search, and previews — no side-effect helpers. */
export interface CommandContext {
  locale: AtlasLocale;
  /** True on main atlas map experience */
  atlasMode: boolean;
  eraId: string;
  currentEra: AtlasEra | null;
  mode: CommandAtlasMode;
  pathname: string;
  viewportBounds: MapLngLatBounds | null;
  /** Regions overlapping viewport (heuristic); capped */
  regionsInViewport: CommandRegionSummary[];
  /** Primary region context: explicit selection or first viewport hit */
  currentRegion: CommandRegionSummary | null;
  selectedEntity: CommandSelectedEntity | null;
  /** Combined haplogroup hint from user profile */
  userHaplogroup: string | undefined;
  selectedFeatureId: string | null;
  selectionKind: SelectionKind | null;
  storyMode: boolean;
  storyArc: string | null;
  storyStepIndex: number;
}

export interface CommandRuntime {
  navigate: (path: string) => void;
  /** AI commands (stub) surface a short message in the palette shell */
  notifyAIStub?: (message: string) => void;
}

export interface Command {
  id: string;
  label: string;
  description?: string;
  keywords?: string[];
  icon?: string;
  group: CommandGroupId;
  isVisible: (ctx: CommandContext) => boolean;
  action: (ctx: CommandContext, runtime: CommandRuntime) => void;
  /** Reserved for multi-step command flows */
  chain?: string[];
}

export type PaletteResultKind = 'command' | 'place' | 'person' | 'story';

export interface CommandHit {
  kind: 'command';
  id: string;
  command: Command;
  score: number;
}

export interface PlaceHit {
  kind: 'place';
  id: string;
  label: string;
  score: number;
}

export interface PersonHit {
  kind: 'person';
  id: string;
  label: string;
  score: number;
}

export interface StoryHit {
  kind: 'story';
  id: string;
  arcId: string | null;
  label: string;
  score: number;
}

export type PaletteResult = CommandHit | PlaceHit | PersonHit | StoryHit;
