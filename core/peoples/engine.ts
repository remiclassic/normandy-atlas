import { pickI18n } from '@/lib/locale';
import { historicalMacroRegionsGeoJson } from '@/data/atlas/historical-macro-regions/macro-regions-geo';
import { historicalGroups } from '@/data/atlas/historical-groups/groups';
import type {
  AtlasLocale,
  HistoricalGroup,
  HistoricalGroupKind,
  HistoricalPresenceView,
  I18nString,
  PresenceProvenance,
  RankedPresenceRow,
  RegionalPresence,
} from '@/core/types';
import type { RegionFeature, RegionFeatureCollection } from '@/types';

export const HISTORICAL_PRESENCE_YEAR_PRESETS = [500, 600, 700, 800, 900, 1000, 1100] as const;
export type HistoricalPresenceYearPreset = (typeof HISTORICAL_PRESENCE_YEAR_PRESETS)[number];

const groupById = new Map<string, HistoricalGroup>(historicalGroups.map((g) => [g.id, g]));

export function getHistoricalGroup(id: string): HistoricalGroup | undefined {
  return groupById.get(id);
}

export function listHistoricalGroups(): HistoricalGroup[] {
  return historicalGroups;
}

function yearOverlaps(year: number, startYear: number, endYear: number): boolean {
  return year >= startYear && year <= endYear;
}

function kindsForView(view: HistoricalPresenceView): HistoricalGroupKind[] {
  switch (view) {
    case 'peoples':
      return ['people', 'cultural-sphere'];
    case 'polities':
      return ['polity', 'cultural-sphere'];
    case 'legacy':
      return ['legacy-population'];
    default:
      return ['people', 'cultural-sphere'];
  }
}

/** Short label for provenance (English; panels localize if needed). */
export function explainProvenance(presence: RegionalPresence): string {
  switch (presence.provenance) {
    case 'polity_control':
      return 'Shown from political control / polity boundaries (simplified)';
    case 'chronicler':
      return 'Shown from chronicles and narrative sources';
    case 'archaeology':
      return 'Shown from archaeological / material patterns';
    case 'inferred_sphere':
      return 'Inferred cultural or economic sphere — avoid reading as exact border';
    default:
      return 'Composite historical presence (interpretive)';
  }
}

export interface ActivePresenceOptions {
  view: HistoricalPresenceView;
}

export function getRankedPresencesForRegion(
  year: number,
  regionId: string,
  options: ActivePresenceOptions,
): RankedPresenceRow[] {
  const kinds = kindsForView(options.view);
  const rows: RankedPresenceRow[] = [];

  for (const group of historicalGroups) {
    if (!kinds.includes(group.kind)) continue;
    if (!yearOverlaps(year, group.startYear, group.endYear)) continue;

    for (const presence of group.presences) {
      if (presence.regionId !== regionId) continue;
      if (!yearOverlaps(year, presence.startYear, presence.endYear)) continue;
      rows.push({ group, presence });
    }
  }

  rows.sort((a, b) => {
    const w = b.presence.weight - a.presence.weight;
    if (w !== 0) return w;
    const conf = rankConfidence(b.presence.confidence) - rankConfidence(a.presence.confidence);
    if (conf !== 0) return conf;
    return a.group.name.en.localeCompare(b.group.name.en);
  });

  return rows;
}

function rankConfidence(c: RegionalPresence['confidence']): number {
  if (c === 'high') return 3;
  if (c === 'medium') return 2;
  return 1;
}

export interface MacroPresenceFeatureProps {
  id: string;
  name: string;
  /** Dominant group fill */
  presenceColor: string;
  /** 0–1 for MapLibre opacity */
  presenceOpacity: number;
  confidenceTier: RegionalPresence['confidence'];
  /** Top groups for hover — plain language */
  hoverSummary: string;
  dominantGroupId: string;
  lowConfidenceHatch: 0 | 1;
}

function confidenceOpacityMultiplier(conf: RegionalPresence['confidence']): number {
  if (conf === 'high') return 1;
  if (conf === 'medium') return 0.88;
  return 0.72;
}

function summarizeTopRows(rows: RankedPresenceRow[], locale: AtlasLocale, max = 4): string {
  const parts = rows.slice(0, max).map((r) => {
    const label = pickI18n(r.group.name, locale);
    const w = Math.round(r.presence.weight * 100);
    const conf =
      r.presence.confidence === 'high' ? 'high confidence' : r.presence.confidence === 'medium' ? 'medium' : 'low';
    return `${label} (~${w}% prominence, ${conf})`;
  });
  return parts.join(' · ');
}

/**
 * GeoJSON for the historical presence overlay: one feature per macro region with dominant group styling.
 */
export function buildHistoricalPresenceGeoJson(
  year: number,
  view: HistoricalPresenceView,
  locale: AtlasLocale,
): RegionFeatureCollection {
  const features: RegionFeature[] = historicalMacroRegionsGeoJson.features.map((f) => {
    const regionId = f.properties.id;
    const ranked = getRankedPresencesForRegion(year, regionId, { view });
    const name = pickI18n(
      ({ en: f.properties.name, fr: f.properties.name } as I18nString),
      locale,
    );

    if (ranked.length === 0) {
      return {
        ...f,
        properties: {
          ...f.properties,
          presenceColor: '#44403c',
          presenceOpacity: 0.08,
          confidenceTier: 'low' as const,
          hoverSummary: `${name}: no mapped presences for this slice`,
          dominantGroupId: '',
          lowConfidenceHatch: 1 as const,
        },
      };
    }

    const top = ranked[0];
    const mult = confidenceOpacityMultiplier(top.presence.confidence);
    const opacity = Math.min(0.72, 0.22 + top.presence.weight * 0.5 * mult);
    const lowHatch: 0 | 1 = top.presence.confidence === 'low' ? 1 : 0;

    return {
      ...f,
      properties: {
        ...f.properties,
        presenceColor: top.group.color,
        presenceOpacity: opacity,
        confidenceTier: top.presence.confidence,
        hoverSummary: `${name}: ${summarizeTopRows(ranked, locale)}`,
        dominantGroupId: top.group.id,
        lowConfidenceHatch: lowHatch,
      },
    };
  });

  return { type: 'FeatureCollection', features };
}

export function compareRankedPresences(
  yearA: number,
  yearB: number,
  regionId: string,
  view: HistoricalPresenceView,
): { yearA: RankedPresenceRow[]; yearB: RankedPresenceRow[] } {
  return {
    yearA: getRankedPresencesForRegion(yearA, regionId, { view }),
    yearB: getRankedPresencesForRegion(yearB, regionId, { view }),
  };
}

/** How a group’s ranked prominence shifts between two years in one macro region. */
export type PresenceDeltaKind = 'entered_top' | 'left_top' | 'prominence_up' | 'prominence_down';

export interface PresenceDeltaItem {
  group: HistoricalGroup;
  kind: PresenceDeltaKind;
  weightBefore?: number;
  weightAfter?: number;
}

/**
 * Summarize notable changes between two year slices (top-ranked groups + weight swings).
 * Heuristic only — not a formal statistical test.
 */
export function summarizePresenceDelta(
  yearA: number,
  yearB: number,
  regionId: string,
  view: HistoricalPresenceView,
): PresenceDeltaItem[] {
  const rowsA = getRankedPresencesForRegion(yearA, regionId, { view });
  const rowsB = getRankedPresencesForRegion(yearB, regionId, { view });
  const mapA = new Map(rowsA.map((r) => [r.group.id, r.presence.weight]));
  const mapB = new Map(rowsB.map((r) => [r.group.id, r.presence.weight]));
  const topN = 6;
  const topA = new Set(rowsA.slice(0, topN).map((r) => r.group.id));
  const topB = new Set(rowsB.slice(0, topN).map((r) => r.group.id));
  const out: PresenceDeltaItem[] = [];
  const marked = new Set<string>();

  for (const id of topB) {
    if (!topA.has(id)) {
      const row = rowsB.find((r) => r.group.id === id)!;
      out.push({
        group: row.group,
        kind: 'entered_top',
        weightBefore: mapA.get(id),
        weightAfter: mapB.get(id),
      });
      marked.add(id);
    }
  }
  for (const id of topA) {
    if (!topB.has(id)) {
      const row = rowsA.find((r) => r.group.id === id)!;
      out.push({
        group: row.group,
        kind: 'left_top',
        weightBefore: mapA.get(id),
        weightAfter: mapB.get(id),
      });
      marked.add(id);
    }
  }
  for (const id of topA) {
    if (!topB.has(id) || marked.has(id)) continue;
    const wa = mapA.get(id) ?? 0;
    const wb = mapB.get(id) ?? 0;
    if (wb - wa >= 0.12) {
      const row = rowsB.find((r) => r.group.id === id)!;
      out.push({ group: row.group, kind: 'prominence_up', weightBefore: wa, weightAfter: wb });
    } else if (wa - wb >= 0.12) {
      const row = rowsA.find((r) => r.group.id === id)!;
      out.push({ group: row.group, kind: 'prominence_down', weightBefore: wa, weightAfter: wb });
    }
  }
  return out;
}
