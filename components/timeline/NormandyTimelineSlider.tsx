'use client';

import { memo, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore, NORMANDY_ERA_IDS } from '@/lib/store';
import { TimelineMarkerGlyph } from '@/lib/timeline-marker-icons';
import type { TimelineMarkerKind } from '@/core/types';

interface NormandyStop {
  year: number;
  label: string;
  kind: TimelineMarkerKind;
}

const STOPS: NormandyStop[] = [
  { year: 911, label: '911 — Rollo', kind: 'treaty' },
  { year: 924, label: '924 — Bessin', kind: 'expansion' },
  { year: 933, label: '933 — Cotentin', kind: 'expansion' },
  { year: 1050, label: '~1050 — Duchy', kind: 'foundation' },
  { year: 1066, label: '1066 — Hastings', kind: 'battle' },
];

const MIN_YEAR = STOPS[0].year;
const MAX_YEAR = STOPS[STOPS.length - 1].year;

function yearToPercent(year: number): number {
  return ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
}

function snapToNearest(raw: number): number {
  let nearest = STOPS[0].year;
  let minDist = Infinity;
  for (const stop of STOPS) {
    const d = Math.abs(stop.year - raw);
    if (d < minDist) {
      minDist = d;
      nearest = stop.year;
    }
  }
  return nearest;
}

const KIND_STROKE: Record<TimelineMarkerKind, string> = {
  battle: 'text-red-400/80',
  treaty: 'text-blue-400/80',
  person: 'text-gold/80',
  foundation: 'text-emerald-400/80',
  expansion: 'text-orange-400/80',
  exploration: 'text-cyan-400/80',
  migration: 'text-purple-400/80',
  story: 'text-gold/80',
};

const StopIcon = memo(function StopIcon({
  stop,
  isActive,
  onClick,
}: {
  stop: NormandyStop;
  isActive: boolean;
  onClick: (year: number) => void;
}) {
  const left = yearToPercent(stop.year);
  return (
    <button
      type="button"
      onClick={() => onClick(stop.year)}
      title={stop.label}
      className="group absolute top-0 flex -translate-x-1/2 flex-col items-center"
      style={{ left: `${left}%` }}
    >
      <span
        className={`flex h-[20px] w-[20px] items-center justify-center rounded-md border transition-all duration-200 ${
          isActive
            ? `${KIND_STROKE[stop.kind]} border-current/20 bg-current/10 drop-shadow-[0_0_4px_rgba(196,169,98,0.3)]`
            : 'text-text-dim/40 border-chrome-border-strong/40 bg-chrome-fill-active/60 group-hover:text-text-dim/60'
        }`}
      >
        <TimelineMarkerGlyph kind={stop.kind} className="h-2.5 w-2.5" />
      </span>
      <span
        className={`mt-2 text-[10px] tabular-nums leading-none transition-all duration-150 sm:text-[11px] ${
          isActive
            ? 'font-semibold text-parchment/90'
            : 'text-text-dim/60 group-hover:text-text-dim/80'
        }`}
      >
        {stop.year}
      </span>
    </button>
  );
});

export default function NormandyTimelineSlider() {
  const eraId = useMapStore((s) => s.eraId);
  const normandySimYear = useMapStore((s) => s.normandySimYear);
  const setNormandySimYear = useMapStore((s) => s.setNormandySimYear);
  const expansionLayerOn = useMapStore((s) => s.layers['normandy-expansion'] ?? false);

  const visible = NORMANDY_ERA_IDS.has(eraId) && expansionLayerOn;

  const railRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [previewYear, setPreviewYear] = useState<number | null>(null);
  const rafId = useRef(0);

  const activeStopIndex = useMemo(() => {
    for (let i = STOPS.length - 1; i >= 0; i--) {
      if (normandySimYear >= STOPS[i].year) return i;
    }
    return 0;
  }, [normandySimYear]);

  const handleStopClick = useCallback(
    (year: number) => setNormandySimYear(year),
    [setNormandySimYear],
  );

  const yearFromClientX = useCallback((clientX: number): number => {
    if (!railRef.current) return MIN_YEAR;
    const rect = railRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    return Math.round(MIN_YEAR + (pct / 100) * (MAX_YEAR - MIN_YEAR));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setPreviewYear(yearFromClientX(e.clientX));
      });
    },
    [yearFromClientX],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setPreviewYear(yearFromClientX(e.clientX));
      });
    },
    [yearFromClientX],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      const raw = yearFromClientX(e.clientX);
      setNormandySimYear(snapToNearest(raw));
      setPreviewYear(null);
    },
    [yearFromClientX, setNormandySimYear],
  );

  const handlePointerCancel = useCallback(() => {
    isDragging.current = false;
    setPreviewYear(null);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  const displayYear = previewYear ?? normandySimYear;
  const fillPct = yearToPercent(displayYear);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-4 border-t border-chrome-border px-4 py-2.5 pointer-events-auto sm:gap-5 sm:px-6">
            <span className="flex-shrink-0 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold/45 sm:text-[10px]">
              Expansion
            </span>

            <div
              ref={railRef}
              className="relative min-h-[44px] min-w-0 flex-1 pt-0.5 touch-none select-none cursor-pointer"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <div className="absolute top-[5px] right-0 left-0 h-[3px] rounded-full bg-chrome-fill-raised" />

              <div
                className="absolute top-[5px] left-0 h-[3px] rounded-full bg-gold/30 transition-all duration-200"
                style={{ width: `${fillPct}%` }}
              />

              {STOPS.map((stop, i) => (
                <StopIcon
                  key={stop.year}
                  stop={stop}
                  isActive={i <= activeStopIndex}
                  onClick={handleStopClick}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
