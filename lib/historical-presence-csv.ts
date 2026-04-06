import { listHistoricalGroups } from '@/core';
import type { AtlasLocale, HistoricalGroupKind, HistoricalPresenceView } from '@/core/types';

function yearOverlaps(year: number, startYear: number, endYear: number): boolean {
  return year >= startYear && year <= endYear;
}

function csvEscape(s: string): string {
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/**
 * Flatten all group presences that intersect `year` and `view` into a CSV string.
 * Columns: groupId, groupKind, regionId, startYear, endYear, weight, confidence, provenance, notes
 */
export function buildHistoricalPresenceCsv(year: number, view: HistoricalPresenceView, locale: AtlasLocale): string {
  const kinds: Record<HistoricalPresenceView, HistoricalGroupKind[]> = {
    peoples: ['people', 'cultural-sphere'],
    polities: ['polity', 'cultural-sphere'],
    legacy: ['legacy-population'],
  };
  const allow = new Set(kinds[view]);

  const header = [
    'groupId',
    'groupName',
    'groupKind',
    'regionId',
    'presenceStartYear',
    'presenceEndYear',
    'weight',
    'confidence',
    'provenance',
    'notes',
  ].join(',');

  const rows: string[] = [header];

  for (const group of listHistoricalGroups()) {
    if (!allow.has(group.kind)) continue;
    if (!yearOverlaps(year, group.startYear, group.endYear)) continue;

    const name = (locale === 'fr' ? group.name.fr : group.name.en) ?? group.name.en;

    for (const p of group.presences) {
      if (!yearOverlaps(year, p.startYear, p.endYear)) continue;
      rows.push(
        [
          csvEscape(group.id),
          csvEscape(name),
          csvEscape(group.kind),
          csvEscape(p.regionId),
          String(p.startYear),
          String(p.endYear),
          String(p.weight),
          csvEscape(p.confidence),
          csvEscape(p.provenance ?? ''),
          csvEscape(p.notes ?? ''),
        ].join(','),
      );
    }
  }

  return rows.join('\n') + '\n';
}
