'use client';

import { memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore, DEEP_TIME_ERA_IDS, COLONIAL_ERA_IDS, VIKING_MOVEMENT_ERA_IDS } from '@/lib/store';
import { getEraRange } from '@/core/era/engine';
import { NEW_FRANCE_PHASES, COLONIAL_SIM_YEAR_RANGE, getPhaseForYear } from '@/data/atlas/new-france-timeline';
import { VIKING_PHASES, getVikingPhaseForYear } from '@/data/atlas/viking-timeline-phases';

function formatYear(y: number): string {
  if (y < 0) return `${Math.abs(y)} BC`;
  return `${y} AD`;
}

function yearToPercent(year: number, min: number, max: number): number {
  if (max === min) return 50;
  return ((year - min) / (max - min)) * 100;
}

const TICK_COUNT = 5;

const Tick = memo(function Tick({
  year,
  percent,
  isPast,
}: {
  year: number;
  percent: number;
  isPast: boolean;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 flex flex-col items-center"
      style={{ left: `${percent}%`, top: 0 }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full border transition-all duration-200 ${
          isPast
            ? 'bg-gold/60 border-gold/40'
            : 'bg-surface border-white/10'
        }`}
      />
      <span
        className={`mt-2 text-[9px] leading-none whitespace-nowrap tabular-nums transition-opacity duration-150 sm:text-[10px] ${
          isPast ? 'font-medium text-parchment/75' : 'text-text-dim/45'
        }`}
      >
        {formatYear(year)}
      </span>
    </div>
  );
});

export default function AtlasEraYearSlider() {
  const eraId = useMapStore((s) => s.eraId);
  const atlasSimYear = useMapStore((s) => s.atlasSimYear);
  const setAtlasSimYear = useMapStore((s) => s.setAtlasSimYear);

  const isDeepTime = DEEP_TIME_ERA_IDS.has(eraId);
  const isColonial = COLONIAL_ERA_IDS.has(eraId);
  const isViking = VIKING_MOVEMENT_ERA_IDS.has(eraId);
  const visible = isDeepTime || isColonial || isViking;

  const range = useMemo(() => {
    if (isColonial) return COLONIAL_SIM_YEAR_RANGE;
    return getEraRange(eraId);
  }, [eraId, isColonial]);

  const phaseLabel = useMemo(() => {
    if (isColonial) return getPhaseForYear(atlasSimYear)?.label.en ?? null;
    if (isViking) return getVikingPhaseForYear(atlasSimYear)?.label.en ?? null;
    return null;
  }, [isColonial, isViking, atlasSimYear]);

  const ticks = useMemo(() => {
    if (!range) return [];
    const { start, end } = range;
    const span = end - start;
    const result: { year: number; percent: number }[] = [];
    for (let i = 0; i < TICK_COUNT; i++) {
      const year = Math.round(start + (span * i) / (TICK_COUNT - 1));
      result.push({ year, percent: yearToPercent(year, start, end) });
    }
    return result;
  }, [range]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAtlasSimYear(Number(e.target.value));
    },
    [setAtlasSimYear],
  );

  if (!range) return null;

  const { start: min, end: max } = range;
  const pct = yearToPercent(atlasSimYear, min, max);

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
          <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2.5 pointer-events-auto sm:gap-5 sm:px-6">
            <div className="flex flex-shrink-0 flex-col items-start gap-0.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gold/45 tabular-nums sm:text-[10px]">
                {formatYear(atlasSimYear)}
              </span>
              {phaseLabel && (
                <span className="text-[8px] leading-none text-parchment/50 sm:text-[9px]">
                  {phaseLabel}
                </span>
              )}
            </div>

            <div className="relative min-h-[44px] min-w-0 flex-1 pt-0.5">
              <div className="absolute top-[5px] right-0 left-0 h-[3px] rounded-full bg-white/[0.05]" />

              <div
                className="absolute top-[5px] left-0 h-[3px] rounded-full bg-gold/30 transition-all duration-100"
                style={{ width: `${pct}%` }}
              />

              {ticks.map((t) => (
                <Tick
                  key={t.year}
                  year={t.year}
                  percent={t.percent}
                  isPast={atlasSimYear >= t.year}
                />
              ))}

              {isColonial && NEW_FRANCE_PHASES.map((phase) => {
                const p = yearToPercent(phase.yearStart, min, max);
                if (p < 0 || p > 100) return null;
                return (
                  <div
                    key={phase.id}
                    className="absolute -translate-x-1/2 flex flex-col items-center z-[1]"
                    style={{ left: `${p}%`, top: '-1px' }}
                  >
                    <span className="h-3 w-[1.5px] bg-cyan-400/30" />
                  </div>
                );
              })}

              {isViking && VIKING_PHASES.map((phase) => {
                const p = yearToPercent(phase.yearStart, min, max);
                if (p < 0 || p > 100) return null;
                return (
                  <div
                    key={phase.id}
                    className="absolute -translate-x-1/2 flex flex-col items-center z-[1]"
                    style={{ left: `${p}%`, top: '-1px' }}
                  >
                    <span className="h-3 w-[1.5px] bg-cyan-400/30" />
                  </div>
                );
              })}

              <input
                type="range"
                min={min}
                max={max}
                step={Math.max(1, Math.round((max - min) / 200))}
                value={atlasSimYear}
                onChange={handleChange}
                className="absolute top-0 left-0 z-10 h-8 w-full cursor-pointer opacity-0"
                aria-label="Era year within range"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
