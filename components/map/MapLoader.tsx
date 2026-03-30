'use client';

import dynamic from 'next/dynamic';

const MapCanvas = dynamic(() => import('@/components/map/MapCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border border-gold/10 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-gold/20 border-t-gold/60 animate-spin" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[13px] text-text-dim font-medium tracking-wide">Loading map</span>
          <span className="text-[10px] text-text-dim/50 uppercase tracking-[0.2em]">Preparing atlas</span>
        </div>
      </div>
    </div>
  ),
});

export default function MapLoader() {
  return <MapCanvas />;
}
