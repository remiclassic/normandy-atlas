'use client';

import { useMemo } from 'react';
import { useProgress } from '@/hooks/useAtlasProgress';

// ---------------------------------------------------------------------------
// Provides region/place engagement data suitable for driving map visual
// feedback (e.g. opacity, glow, label muting) without triggering map-wide
// rerenders. Consumers should read this once per era change, not per frame.
// ---------------------------------------------------------------------------

export interface EngagementOverlay {
  /** Set of region IDs the user has engaged with. */
  engagedRegionIds: Set<string>;
  /** Set of place IDs the user has engaged with. */
  engagedPlaceIds: Set<string>;
  /** Set of segment IDs the user has engaged with. */
  engagedSegmentIds: Set<string>;
  /** Weighted score per region (opens + dwell). */
  regionWeights: Record<string, number>;
}

export function useEngagementOverlay(): EngagementOverlay {
  const progress = useProgress();

  return useMemo(() => {
    const { aggregates } = progress;

    const engagedRegionIds = new Set(Object.keys(aggregates.regions));
    const engagedPlaceIds = new Set(Object.keys(aggregates.places));
    const engagedSegmentIds = new Set(Object.keys(aggregates.segments));

    const regionWeights: Record<string, number> = {};
    for (const [id, eng] of Object.entries(aggregates.regions)) {
      regionWeights[id] = Math.min(1, eng.opens * 0.15 + (eng.dwellMs / 120_000) * 0.85);
    }

    return { engagedRegionIds, engagedPlaceIds, engagedSegmentIds, regionWeights };
  }, [progress]);
}
