'use client';

import { memo } from 'react';

export interface TooltipData {
  x: number;
  y: number;
  title: string;
  subtitle?: string;
  detail?: string;
}

const MapTooltip = memo(function MapTooltip({ data }: { data: TooltipData | null }) {
  if (!data) return null;

  return (
    <div
      className="map-atlas-tooltip pointer-events-none absolute z-40 max-w-[240px] rounded-lg px-3 py-2 text-left"
      style={{ left: data.x + 12, top: data.y - 12 }}
    >
      <p className="text-[12px] font-semibold text-parchment leading-tight">{data.title}</p>
      {data.subtitle && (
        <p className="text-[10px] text-gold/60 mt-0.5 uppercase tracking-wide">{data.subtitle}</p>
      )}
      {data.detail && (
        <p className="text-[11px] text-text-muted mt-1 leading-snug">{data.detail}</p>
      )}
    </div>
  );
});

export default MapTooltip;
