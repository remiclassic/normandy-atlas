import type { AtlasIconId } from './atlasIconId';
import type { PlaceKind } from '@/core/types';
import type { SettlementCategory } from '@/types';

// Input accepted by the resolver — callers pass whichever fields are available.
export interface FeatureIconInput {
  kind?: PlaceKind | string;
  category?: SettlementCategory | string;
  siteKind?: string;
  evidenceKind?: string;
  tags?: string[];
  label?: string;
}

// Direct mapping tables for structured fields.

const PLACE_KIND_MAP: Record<string, AtlasIconId> = {
  city: 'city',
  port: 'port',
  fort: 'fortress',
  settlement: 'settlement',
  abstract_node: 'generic',
  megalith: 'megalith',
  hillfort: 'hillfort',
};

const SETTLEMENT_CATEGORY_MAP: Record<string, AtlasIconId> = {
  city: 'city',
  fort: 'fortress',
  mission: 'religious',
  colony: 'settlement',
  port: 'port',
  trading_post: 'trade',
  other: 'generic',
};

const SITE_KIND_MAP: Record<string, AtlasIconId> = {
  city: 'city',
  castle: 'fortress',
  fortress: 'fortress',
  port: 'port',
  crusader: 'battle',
  monastery: 'religious',
  battlefield: 'battle',
};

const EVIDENCE_KIND_MAP: Record<string, AtlasIconId> = {
  burial: 'burial',
  weapon: 'artifact',
  fortification: 'fortress',
};

// Keyword → icon for fuzzy resolution from labels / tags.
const KEYWORD_MAP: [string[], AtlasIconId][] = [
  [['castle', 'keep', 'stronghold', 'fortress', 'fortification', 'motte', 'citadel'], 'fortress'],
  [['abbey', 'priory', 'monastery', 'cathedral', 'church', 'chapel', 'episcopal', 'monastic', 'basilica'], 'religious'],
  [['port', 'harbor', 'harbour', 'anchorage', 'landing', 'naval', 'maritime'], 'port'],
  [['battle', 'siege', 'conflict', 'sack', 'raid', 'sacked'], 'battle'],
  [['dolmen', 'menhir', 'megalith', 'stone row', 'stone circle', 'tumulus', 'cairn', 'neolithic'], 'megalith'],
  [['palace', 'court', 'ducal', 'royal residence', 'administrative'], 'palace'],
  [['trade', 'market', 'emporium', 'fair', 'mercantile', 'trading'], 'trade'],
  [['burial', 'tomb', 'cemetery', 'necropolis', 'grave'], 'burial'],
  [['expedition', 'crossing', 'voyage', 'exploration'], 'expedition'],
  [['person', 'ruler', 'king', 'duke', 'emperor', 'crowned'], 'person'],
  [['camp', 'outpost', 'garrison', 'barracks'], 'militaryCamp'],
  [['school', 'scriptorium', 'university', 'cultural'], 'cultural'],
  [['artifact', 'archaeological', 'relic', 'find'], 'artifact'],
  [['hillfort', 'oppidum', 'oppida', 'hill fort'], 'hillfort'],
];

// Precompute a flat keyword→icon lookup.
const keywordLookup = new Map<string, AtlasIconId>();
for (const [words, icon] of KEYWORD_MAP) {
  for (const w of words) keywordLookup.set(w, icon);
}

function matchKeywords(text: string): AtlasIconId | undefined {
  const lower = text.toLowerCase();
  for (const [keyword, icon] of keywordLookup) {
    if (lower.includes(keyword)) return icon;
  }
  return undefined;
}

/**
 * Resolve the best atlas icon for a feature based on structured metadata
 * and optional keyword fallback on labels/tags.
 */
export function getFeatureIconType(input: FeatureIconInput): AtlasIconId {
  // 1. Structured field lookups (most specific wins).
  if (input.evidenceKind) {
    const ev = EVIDENCE_KIND_MAP[input.evidenceKind];
    if (ev) return ev;
  }
  if (input.siteKind) {
    const sk = SITE_KIND_MAP[input.siteKind];
    if (sk) return sk;
  }
  if (input.kind) {
    const pk = PLACE_KIND_MAP[input.kind];
    if (pk) return pk;
  }
  if (input.category) {
    const sc = SETTLEMENT_CATEGORY_MAP[input.category];
    if (sc) return sc;
  }

  // 2. Keyword search in tags.
  if (input.tags) {
    for (const tag of input.tags) {
      const hit = matchKeywords(tag);
      if (hit) return hit;
    }
  }

  // 3. Keyword search in label.
  if (input.label) {
    const hit = matchKeywords(input.label);
    if (hit) return hit;
  }

  return 'generic';
}

// Coarse mapping from TimelineMarkerKind → AtlasIconId (for era summaries).
const MARKER_KIND_MAP: Record<string, AtlasIconId> = {
  battle: 'battle',
  treaty: 'palace',
  person: 'person',
  foundation: 'religious',
  expansion: 'fortress',
  exploration: 'expedition',
  migration: 'expedition',
  story: 'generic',
};

export function markerKindToIconType(kind: string): AtlasIconId {
  return MARKER_KIND_MAP[kind] ?? 'generic';
}
