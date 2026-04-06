import { nfYdnaGeoJson } from '@/data/atlas/new-france-ydna';
import type { YdnaMajor } from '@/data/atlas/new-france-ydna-types';

export interface NfYdnaMajorFrequencyRow {
  yMajor: YdnaMajor;
  count: number;
  pct: number;
}

export interface NfYdnaMajorDistribution {
  totalCounted: number;
  rows: NfYdnaMajorFrequencyRow[];
}

let defaultDistributionMemo: NfYdnaMajorDistribution | null = null;

/**
 * Count major Y labels in the Francogene triangulation layer (optionally
 * excluding features hidden from the map). Percents sum to 100 over counted rows.
 */
export function getNfYdnaMajorHaplogroupDistribution(options?: {
  excludeHiddenFromMap?: boolean;
}): NfYdnaMajorDistribution {
  const excludeHidden = options?.excludeHiddenFromMap !== false;

  if (!options && defaultDistributionMemo) {
    return defaultDistributionMemo;
  }

  const counts = new Map<YdnaMajor, number>();
  for (const f of nfYdnaGeoJson.features) {
    if (excludeHidden && f.properties.excludeFromMap) continue;
    const m = f.properties.yMajor;
    counts.set(m, (counts.get(m) ?? 0) + 1);
  }

  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  const rows: NfYdnaMajorFrequencyRow[] = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([yMajor, count]) => ({
      yMajor,
      count,
      pct: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
    }));

  // Fix rounding drift so visible slices sum to ~100
  if (rows.length > 0 && total > 0) {
    const sumPct = rows.reduce((s, r) => s + r.pct, 0);
    const drift = Math.round((100 - sumPct) * 10) / 10;
    rows[0].pct = Math.round((rows[0].pct + drift) * 10) / 10;
  }

  const out = { totalCounted: total, rows };

  if (!options) {
    defaultDistributionMemo = out;
  }

  return out;
}
