'use client';

import { memo, useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore, NORMANDY_ERA_IDS } from '@/lib/store';
import { getEraRange } from '@/core/era/engine';
import { getMarkersForEra } from '@/data/atlas/timeline-markers';
import { formatYear, yearToPercent } from '@/lib/timeline-utils';
import { pickI18n } from '@/lib/locale';
import type { TimelineMarker, TimelineMarkerKind, AtlasLocale } from '@/core/types';

const MAX_VISIBLE_MARKERS = 12;
const MIN_MARKER_SPACING_PCT = 3;
const TICK_COUNT = 5;
const NORMANDY_STOPS = [911, 924, 933, 1050, 1066];

function snapToNormandyStop(raw: number): number {
  let nearest = NORMANDY_STOPS[0];
  let minDist = Infinity;
  for (const stop of NORMANDY_STOPS) {
    const d = Math.abs(stop - raw);
    if (d < minDist) {
      minDist = d;
      nearest = stop;
    }
  }
  return nearest;
}

function selectVisibleMarkers(
  markers: TimelineMarker[],
  min: number,
  max: number,
): TimelineMarker[] {
  const sorted = [...markers].sort((a, b) => a.year - b.year);
  if (sorted.length <= MAX_VISIBLE_MARKERS) return sorted;
  const result: TimelineMarker[] = [];
  let lastPct = -Infinity;
  for (const m of sorted) {
    const pct = yearToPercent(m.year, min, max);
    if (pct - lastPct >= MIN_MARKER_SPACING_PCT || result.length === 0) {
      result.push(m);
      lastPct = pct;
      if (result.length >= MAX_VISIBLE_MARKERS) break;
    }
  }
  return result;
}

const KIND_COLORS: Record<TimelineMarkerKind, string> = {
  battle: 'bg-red-400/70 border-red-400/40',
  treaty: 'bg-blue-400/70 border-blue-400/40',
  person: 'bg-gold/70 border-gold/40',
  foundation: 'bg-emerald-400/70 border-emerald-400/40',
  expansion: 'bg-orange-400/70 border-orange-400/40',
  exploration: 'bg-cyan-400/70 border-cyan-400/40',
  migration: 'bg-purple-400/70 border-purple-400/40',
  story: 'bg-gold/70 border-gold/40',
};

const KIND_GLOW: Record<TimelineMarkerKind, string> = {
  battle: 'shadow-[0_0_4px_rgba(248,113,113,0.3)]',
  treaty: 'shadow-[0_0_4px_rgba(96,165,250,0.3)]',
  person: 'shadow-[0_0_4px_rgba(196,169,98,0.3)]',
  foundation: 'shadow-[0_0_4px_rgba(52,211,153,0.3)]',
  expansion: 'shadow-[0_0_4px_rgba(251,146,60,0.3)]',
  exploration: 'shadow-[0_0_4px_rgba(34,211,238,0.3)]',
  migration: 'shadow-[0_0_4px_rgba(192,132,252,0.3)]',
  story: 'shadow-[0_0_4px_rgba(196,169,98,0.3)]',
};

const KIND_LABELS: Record<TimelineMarkerKind, string> = {
  battle: 'Battle',
  treaty: 'Treaty',
  person: 'Figure',
  foundation: 'Foundation',
  expansion: 'Expansion',
  exploration: 'Exploration',
  migration: 'Migration',
  story: 'Story',
};

// ─── Marker dot ─────────────────────────────────────────────────────

const MarkerDot = memo(function MarkerDot({
  marker,
  percent,
  isPast,
  locale,
  onHover,
  onLeave,
  onClick,
}: {
  marker: TimelineMarker;
  percent: number;
  isPast: boolean;
  locale: AtlasLocale;
  onHover: (marker: TimelineMarker, el: HTMLElement) => void;
  onLeave: () => void;
  onClick: (marker: TimelineMarker) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      className="absolute -translate-x-1/2 flex flex-col items-center z-[2] group"
      style={{ left: `${percent}%`, top: '-3px' }}
      onMouseEnter={() => ref.current && onHover(marker, ref.current)}
      onMouseLeave={onLeave}
      onFocus={() => ref.current && onHover(marker, ref.current)}
      onBlur={onLeave}
      onClick={() => onClick(marker)}
      aria-label={`${pickI18n(marker.label, locale)}, ${formatYear(marker.year)}`}
    >
      {/* Larger invisible hit area */}
      <span className="absolute -inset-2" aria-hidden />
      <span
        className={`relative h-[10px] w-[10px] rounded-full border-[1.5px] transition-all duration-200 ${
          isPast
            ? `${KIND_COLORS[marker.kind]} ${KIND_GLOW[marker.kind]}`
            : 'bg-chrome-fill-active border-chrome-border-strong'
        } group-hover:scale-[1.6] group-focus-visible:scale-[1.6] group-focus-visible:ring-1 group-focus-visible:ring-gold/40`}
      />
    </button>
  );
});

// ─── Tick label ─────────────────────────────────────────────────────

const TickLabel = memo(function TickLabel({
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
      className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-none"
      style={{ left: `${percent}%`, bottom: 0 }}
    >
      <span
        className={`text-[9px] leading-none whitespace-nowrap tabular-nums transition-opacity duration-150 sm:text-[10px] ${
          isPast ? 'font-medium text-parchment/60' : 'text-text-dim/35'
        }`}
      >
        {formatYear(year)}
      </span>
    </div>
  );
});

// ─── Portal tooltip ─────────────────────────────────────────────────

function MarkerTooltip({
  marker,
  anchorRect,
  locale,
}: {
  marker: TimelineMarker;
  anchorRect: DOMRect;
  locale: AtlasLocale;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted || typeof document === 'undefined') return null;

  const tooltipW = 220;
  const left = Math.max(8, Math.min(
    anchorRect.left + anchorRect.width / 2 - tooltipW / 2,
    window.innerWidth - tooltipW - 8,
  ));
  const top = anchorRect.top - 8;

  return createPortal(
    <motion.div
      key={marker.id}
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.95 }}
      transition={{ duration: 0.12 }}
      role="tooltip"
      className="pointer-events-none fixed z-[9999] rounded-lg border border-chrome-border bg-chrome-popover px-3.5 py-2.5"
      style={{
        left,
        top,
        width: tooltipW,
        transform: 'translateY(-100%)',
        backdropFilter: 'blur(24px) saturate(1.2)',
        boxShadow:
          '0 8px 32px var(--color-chrome-tooltip-shadow), 0 0 0 1px var(--color-chrome-tooltip-ring)',
      }}
    >
      <p className="text-[12px] font-semibold text-parchment leading-snug">
        {pickI18n(marker.label, locale)}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span className={`inline-block h-2 w-2 rounded-full flex-shrink-0 ${KIND_COLORS[marker.kind].split(' ')[0]}`} />
        <span className="text-[10px] text-text-dim/70">
          {KIND_LABELS[marker.kind]}
        </span>
        <span className="text-[10px] text-text-dim/50 tabular-nums ml-auto">
          {formatYear(marker.year)}
        </span>
      </div>
      {marker.action && (
        <p className="text-[9px] text-gold/40 mt-1.5">Click to explore</p>
      )}
    </motion.div>,
    document.body,
  );
}

// ─── Main rail ──────────────────────────────────────────────────────

export default function AtlasTimelineRail() {
  const eraId = useMapStore((s) => s.eraId);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const locale = useMapStore((s) => s.locale);
  const atlasSimYear = useMapStore((s) => s.atlasSimYear);
  const normandySimYear = useMapStore((s) => s.normandySimYear);
  const setAtlasSimYear = useMapStore((s) => s.setAtlasSimYear);
  const setNormandySimYear = useMapStore((s) => s.setNormandySimYear);
  const expansionLayerOn = useMapStore((s) => s.layers['normandy-expansion'] ?? false);
  const selectFeature = useMapStore((s) => s.selectFeature);

  const isNormandyMode = NORMANDY_ERA_IDS.has(eraId) && expansionLayerOn;
  const range = useMemo(() => getEraRange(eraId), [eraId]);
  const simYear = isNormandyMode ? normandySimYear : atlasSimYear;

  const [hoveredMarker, setHoveredMarker] = useState<TimelineMarker | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const markers = useMemo(() => {
    if (!range) return [];
    return selectVisibleMarkers(getMarkersForEra(eraId), range.start, range.end);
  }, [eraId, range]);

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

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = Number(e.target.value);
      if (isNormandyMode) {
        setNormandySimYear(snapToNormandyStop(raw));
      } else {
        setAtlasSimYear(raw);
      }
    },
    [isNormandyMode, setNormandySimYear, setAtlasSimYear],
  );

  const handleMarkerHover = useCallback(
    (marker: TimelineMarker, el: HTMLElement) => {
      setHoveredMarker(marker);
      setAnchorRect(el.getBoundingClientRect());
    },
    [],
  );

  const handleMarkerLeave = useCallback(() => {
    setHoveredMarker(null);
    setAnchorRect(null);
  }, []);

  const handleMarkerClick = useCallback(
    (marker: TimelineMarker) => {
      if (isNormandyMode) {
        setNormandySimYear(snapToNormandyStop(marker.year));
      } else {
        setAtlasSimYear(marker.year);
      }

      if (marker.action?.type === 'openPerson' && marker.action.personId) {
        selectFeature(marker.action.personId, 'atlas-person');
      }
    },
    [isNormandyMode, setNormandySimYear, setAtlasSimYear, selectFeature],
  );

  if (!atlasMode || !range) return null;

  const { start: min, end: max } = range;
  const clampedYear = Math.max(min, Math.min(max, simYear));
  const pct = yearToPercent(clampedYear, min, max);
  const step = isNormandyMode ? 1 : Math.max(1, Math.round((max - min) / 200));

  return (
    <motion.div
      key={eraId}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden border-t border-chrome-border"
      data-onboarding="timeline"
    >
      <div className="flex items-center gap-3 px-3 py-2 pointer-events-auto sm:gap-5 sm:px-6 sm:py-2.5">
        <span className="flex-shrink-0 text-[9px] font-semibold uppercase tracking-[0.14em] text-gold/45 tabular-nums sm:text-[10px]">
          {formatYear(clampedYear)}
        </span>

        <div className="relative min-h-[44px] min-w-0 flex-1 pt-2">
          <div className="absolute top-[10px] right-0 left-0 h-[3px] rounded-full bg-chrome-fill-raised sm:h-[3px]" />

          <div
            className="absolute top-[10px] left-0 h-[3px] rounded-full bg-gold/30 transition-all duration-100"
            style={{ width: `${pct}%` }}
          />

          {markers.map((m) => (
            <MarkerDot
              key={m.id}
              marker={m}
              percent={yearToPercent(m.year, min, max)}
              isPast={clampedYear >= m.year}
              locale={locale}
              onHover={handleMarkerHover}
              onLeave={handleMarkerLeave}
              onClick={handleMarkerClick}
            />
          ))}

          <div className="absolute top-[20px] right-0 left-0">
            {ticks.map((t) => (
              <TickLabel
                key={t.year}
                year={t.year}
                percent={t.percent}
                isPast={clampedYear >= t.year}
              />
            ))}
          </div>

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={clampedYear}
            onChange={handleSliderChange}
            className="absolute top-0 left-0 z-10 h-10 w-full cursor-pointer opacity-0 touch-action-pan-x"
            style={{ touchAction: 'pan-x' }}
            aria-label={`Timeline: ${formatYear(min)} to ${formatYear(max)}`}
            aria-valuetext={formatYear(clampedYear)}
          />

          <AnimatePresence>
            {hoveredMarker && anchorRect && (
              <MarkerTooltip marker={hoveredMarker} anchorRect={anchorRect} locale={locale} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
