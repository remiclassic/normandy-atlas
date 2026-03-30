import { eras } from '@/data/eras';
import { getAtlasEras } from '@/core';
import type { AtlasEra } from '@/core/types';

export interface EraItem {
  id: string;
  label: string;
  yearRange: [number, number];
  summary: string;
}

export interface EraGroup {
  label: string;
  items: EraItem[];
}

export interface EraSelectorModel {
  groups: EraGroup[];
  flatIds: string[];
  byId: Map<string, EraItem>;
}

const TIMELINE_GROUP_LABELS: Record<string, string> = {
  'deep-time': 'Ancient',
  medieval: 'Medieval',
  atlantic: 'Atlantic',
};

const SUMMARY_MAX = 140;

function truncate(s: string): string {
  if (s.length <= SUMMARY_MAX) return s;
  return s.slice(0, SUMMARY_MAX).replace(/\s+\S*$/, '') + '...';
}

function buildAtlasModel(atlasEras: AtlasEra[]): EraSelectorModel {
  const groups: EraGroup[] = [];
  let current: EraGroup | null = null;

  for (const era of atlasEras) {
    const key = era.timelineGroup ?? '';
    const label = TIMELINE_GROUP_LABELS[key] ?? key;
    if (!current || current.label !== label) {
      current = { label, items: [] };
      groups.push(current);
    }
    current.items.push({
      id: era.id,
      label: era.label.en,
      yearRange: [era.range.start, era.range.end],
      summary: truncate(era.summary?.en ?? ''),
    });
  }

  const flatIds = groups.flatMap((g) => g.items.map((i) => i.id));
  const byId = new Map(groups.flatMap((g) => g.items).map((i) => [i.id, i]));
  return { groups, flatIds, byId };
}

function buildLegacyModel(): EraSelectorModel {
  const groups: EraGroup[] = [];
  let current: EraGroup | null = null;

  for (const era of eras) {
    const label = era.timelineGroup ?? '';
    if (!current || current.label !== label) {
      current = { label, items: [] };
      groups.push(current);
    }
    current.items.push({
      id: era.id,
      label: era.label,
      yearRange: era.yearRange,
      summary: truncate(era.summary ?? ''),
    });
  }

  const flatIds = groups.flatMap((g) => g.items.map((i) => i.id));
  const byId = new Map(groups.flatMap((g) => g.items).map((i) => [i.id, i]));
  return { groups, flatIds, byId };
}

let cachedAtlas: EraSelectorModel | null = null;
let cachedLegacy: EraSelectorModel | null = null;

export function getEraSelectorModel(atlasMode: boolean): EraSelectorModel {
  if (atlasMode) {
    if (!cachedAtlas) cachedAtlas = buildAtlasModel(getAtlasEras());
    return cachedAtlas;
  }
  if (!cachedLegacy) cachedLegacy = buildLegacyModel();
  return cachedLegacy;
}

export function formatYear(y: number): string {
  if (y < 0) return `${Math.abs(y)} BC`;
  return `${y}`;
}
