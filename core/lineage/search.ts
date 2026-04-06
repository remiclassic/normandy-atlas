import type {
  HaplogroupProfile,
  LineageDepthFilter,
  LineageLineageFilter,
  ResolvedHaplogroupMatch,
} from '@/core/types';
import {
  buildHaplogroupAliasMap,
  getHaplogroupProfile,
  listHaplogroupProfiles,
  normalizeHaplogroupQuery,
} from '@/core/lineage/engine';

const aliasMap = buildHaplogroupAliasMap();
const profiles = listHaplogroupProfiles();

function lineageFilterOk(p: HaplogroupProfile, f: LineageLineageFilter): boolean {
  if (f === 'all') return true;
  return p.lineageType === (f === 'paternal' ? 'paternal' : 'maternal');
}

function depthFilterOk(p: HaplogroupProfile, f: LineageDepthFilter): boolean {
  if (f === 'all') return true;
  const tier = p.tier ?? 'sub';
  if (f === 'major') return tier === 'major';
  return tier === 'sub';
}

function scoreProfileAgainstNorm(q: string, p: HaplogroupProfile): number {
  const idN = normalizeHaplogroupQuery(p.id.replace(/^y-|mt-/i, ''));
  const nameN = normalizeHaplogroupQuery(p.name);
  if (q === normalizeHaplogroupQuery(p.id)) return 1000;
  if (q === nameN) return 950;
  if (q === idN) return 940;
  for (const a of p.aliases ?? []) {
    if (q === normalizeHaplogroupQuery(a)) return 920;
  }
  if (nameN && (nameN.startsWith(q) || q.startsWith(nameN))) return 800 - Math.abs(nameN.length - q.length);
  if (idN && q.startsWith(idN)) return 780 - Math.abs(idN.length - q.length);
  for (const a of p.aliases ?? []) {
    const an = normalizeHaplogroupQuery(a);
    if (an && (an.startsWith(q) || q.startsWith(an))) return 760 - Math.abs(an.length - q.length);
  }
  if (nameN.includes(q) || q.includes(nameN)) return 500;
  return 0;
}

/** Prefix walk: R1B-U106-XYZ → try XYZ removed stepwise against names/aliases. */
function resolveByPrefixWalk(q: string): { profile: HaplogroupProfile; fallbackFromQuery: string } | undefined {
  const parts = q.split('-').filter(Boolean);
  for (let i = parts.length; i >= 1; i--) {
    const candidate = parts.slice(0, i).join('-');
    const idHit = aliasMap.get(candidate);
    if (idHit) {
      const p = getHaplogroupProfile(idHit);
      if (p && i < parts.length) return { profile: p, fallbackFromQuery: q };
      if (p) return { profile: p, fallbackFromQuery: '' };
    }
  }
  for (let i = parts.length; i >= 1; i--) {
    const candidate = parts.slice(0, i).join('-');
    let best: HaplogroupProfile | undefined;
    let bestScore = 0;
    for (const p of profiles) {
      const sc = scoreProfileAgainstNorm(candidate, p);
      if (sc > bestScore) {
        bestScore = sc;
        best = p;
      }
    }
    if (best && bestScore >= 800) {
      return { profile: best, fallbackFromQuery: i < parts.length ? q : '' };
    }
  }
  return undefined;
}

export type HaplogroupSearchFilters = {
  lineage: LineageLineageFilter;
  depth: LineageDepthFilter;
  limit?: number;
};

/** Ranked search for autocomplete and hub results. */
export function searchHaplogroupProfiles(query: string, filters: HaplogroupSearchFilters): ResolvedHaplogroupMatch[] {
  const q = normalizeHaplogroupQuery(query);
  if (!q) {
    return profiles
      .filter((p) => lineageFilterOk(p, filters.lineage) && depthFilterOk(p, filters.depth))
      .slice(0, filters.limit ?? 50)
      .map((profile) => ({ profile, matchRank: 1 }));
  }

  const scored: ResolvedHaplogroupMatch[] = [];
  for (const p of profiles) {
    if (!lineageFilterOk(p, filters.lineage)) continue;
    if (!depthFilterOk(p, filters.depth)) continue;
    const rank = scoreProfileAgainstNorm(q, p);
    if (rank > 0) scored.push({ profile: p, matchRank: rank });
  }
  scored.sort((a, b) => b.matchRank - a.matchRank);

  const directId = aliasMap.get(q);
  if (directId) {
    const p = getHaplogroupProfile(directId);
    if (p && lineageFilterOk(p, filters.lineage) && depthFilterOk(p, filters.depth)) {
      const without = scored.filter((s) => s.profile.id !== p.id);
      return [{ profile: p, matchRank: 2000 }, ...without].slice(0, filters.limit ?? 25);
    }
  }

  const lim = filters.limit ?? 25;
  if (scored.length > 0) return scored.slice(0, lim);

  const walked = resolveByPrefixWalk(q);
  if (walked && lineageFilterOk(walked.profile, filters.lineage) && depthFilterOk(walked.profile, filters.depth)) {
    return [
      {
        profile: walked.profile,
        fallbackFromQuery: walked.fallbackFromQuery || undefined,
        matchRank: 100,
      },
    ];
  }

  return [];
}

/** Single best resolution (detail route / deep link). */
export function resolveHaplogroupQuery(
  query: string,
  filters: HaplogroupSearchFilters = { lineage: 'all', depth: 'all' }
): ResolvedHaplogroupMatch | undefined {
  const results = searchHaplogroupProfiles(query, { ...filters, limit: 1 });
  return results[0];
}
