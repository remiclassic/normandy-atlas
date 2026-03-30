'use client';

import { memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore, NORMANDY_ERA_IDS } from '@/lib/store';

const STOPS: { year: number; label: string }[] = [
  { year: 911, label: '911 — Rollo' },
  { year: 924, label: '924 — Bessin' },
  { year: 933, label: '933 — Cotentin' },
  { year: 1050, label: '~1050 — Duchy' },
  { year: 1066, label: '1066 — Hastings' },
];

const MIN_YEAR = STOPS[0].year;
const MAX_YEAR = STOPS[STOPS.length - 1].year;

function yearToPercent(year: number): number {
  return ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
}

const StopDot = memo(function StopDot({
  year,
  label,
  isActive,
  onClick,
}: {
  year: number;
  label: string;
  isActive: boolean;
  onClick: (year: number) => void;
}) {
  const left = yearToPercent(year);
  return (
    <button
      type="button"
      onClick={() => onClick(year)}
      title={label}
      className="group absolute top-0 flex -translate-x-1/2 flex-col items-center"
      style={{ left: `${left}%` }}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full border-2 transition-all duration-200 ${
          isActive
            ? 'border-gold/60 bg-gold/80 shadow-[0_0_6px_rgba(196,169,98,0.4)]'
            : 'border-white/10 bg-surface group-hover:border-white/20'
        }`}
      />
      <span
        className={`mt-2 text-[10px] tabular-nums leading-none transition-all duration-150 sm:text-[11px] ${
          isActive
            ? 'font-semibold text-parchment/90'
            : 'text-text-dim/60 group-hover:text-text-dim/80'
        }`}
      >
        {year}
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

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = Number(e.target.value);
      let nearest = STOPS[0].year;
      let minDist = Infinity;
      for (const stop of STOPS) {
        const d = Math.abs(stop.year - raw);
        if (d < minDist) {
          minDist = d;
          nearest = stop.year;
        }
      }
      setNormandySimYear(nearest);
    },
    [setNormandySimYear],
  );

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

            <div className="relative min-h-[44px] min-w-0 flex-1 pt-0.5">
              <div className="absolute top-[5px] right-0 left-0 h-[3px] rounded-full bg-chrome-fill-raised" />

              <div
                className="absolute top-[5px] left-0 h-[3px] rounded-full bg-gold/30 transition-all duration-200"
                style={{ width: `${yearToPercent(normandySimYear)}%` }}
              />

              {STOPS.map((stop, i) => (
                <StopDot
                  key={stop.year}
                  year={stop.year}
                  label={stop.label}
                  isActive={i <= activeStopIndex}
                  onClick={handleStopClick}
                />
              ))}

              <input
                type="range"
                min={MIN_YEAR}
                max={MAX_YEAR}
                step={1}
                value={normandySimYear}
                onChange={handleSliderChange}
                className="absolute top-0 left-0 z-10 h-8 w-full cursor-pointer opacity-0"
                aria-label="Norman expansion timeline"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
