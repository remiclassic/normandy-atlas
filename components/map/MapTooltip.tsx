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
      className="pointer-events-none absolute z-40 max-w-[240px] rounded-lg px-3 py-2 text-left"
      style={{
        left: data.x + 12,
        top: data.y - 12,
        background: 'rgba(13, 15, 22, 0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      }}
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
