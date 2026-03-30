'use client';

import { memo } from 'react';
import { formatYear } from '@/lib/era-selector-model';

interface EraTooltipProps {
  label: string;
  yearRange: [number, number];
  summary: string;
  children: React.ReactNode;
}

export const EraTooltip = memo(function EraTooltip({
  label,
  yearRange,
  summary,
  children,
}: EraTooltipProps) {
  return (
    <div className="relative group/tip">
      {children}

      <div
        role="tooltip"
        className="
          pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2.5
          z-50 w-56 rounded-lg glass-panel border border-white/[0.06]
          px-3.5 py-2.5 opacity-0 scale-95
          group-hover/tip:opacity-100 group-hover/tip:scale-100
          group-focus-within/tip:opacity-100 group-focus-within/tip:scale-100
          transition-all duration-150 ease-out
        "
      >
        <p className="text-[12px] font-semibold text-parchment leading-tight">
          {label}
        </p>
        <p className="text-[10px] text-text-dim mt-0.5">
          {formatYear(yearRange[0])} – {formatYear(yearRange[1])}
        </p>
        {summary && (
          <p className="text-[10px] text-text-dim/70 mt-1.5 leading-snug">
            {summary}
          </p>
        )}
      </div>
    </div>
  );
});
