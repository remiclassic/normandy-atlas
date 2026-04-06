'use client';

import { memo } from 'react';
import type { LineageConfidenceLevel } from '@/core/types';

const STYLES: Record<LineageConfidenceLevel, { dot: string; label: string }> = {
  high: { dot: 'bg-emerald-400/70', label: 'High' },
  medium: { dot: 'bg-amber-400/70', label: 'Med' },
  low: { dot: 'bg-red-400/50', label: 'Low' },
};

export const LineageConfidenceDot = memo(function LineageConfidenceDot({
  level,
}: {
  level: LineageConfidenceLevel;
}) {
  const style = STYLES[level];
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`}
      title={`Confidence: ${style.label}`}
    />
  );
});
