'use client';

import { memo } from 'react';

export interface TooltipData {
  x: number;
  y: number;
  title: string;
  subtitle?: string;
  detail?: string;
  /** Short CTA (e.g. click-to-open detail panel) */
  hint?: string;
}

const MapTooltip = memo(function MapTooltip({ data }: { data: TooltipData | null }) {
  if (!data) return null;

  return (
    <div
      role="tooltip"
      className="map-atlas-tooltip pointer-events-none absolute z-40 max-w-[240px] rounded-lg px-3 py-2 text-left"
      style={{ left: data.x + 12, top: data.y - 12 }}
    >
      <p className="font-semibold text-parchment leading-tight" style={{ fontSize: 'var(--atlas-text-base)' }}>{data.title}</p>
      {data.subtitle && (
        <p className="text-gold/60 mt-0.5 uppercase tracking-wide" style={{ fontSize: 'var(--atlas-text-sm)' }}>{data.subtitle}</p>
      )}
      {data.detail && (
        <p className="text-text-muted mt-1 leading-snug" style={{ fontSize: 'var(--atlas-text-sm)' }}>{data.detail}</p>
      )}
      {data.hint && (
        <p className="text-gold/55 mt-1.5 leading-snug border-t border-gold/10 pt-1.5" style={{ fontSize: 'var(--atlas-text-sm)' }}>
          {data.hint}
        </p>
      )}
    </div>
  );
});

export default MapTooltip;
