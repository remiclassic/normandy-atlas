'use client';

import { memo, useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore, NORMANDY_ERA_IDS } from '@/lib/store';
import { getEraRange } from '@/core/era/engine';
import { getMarkersForEra } from '@/data/atlas/timeline-markers';
import { formatYear, yearToPercent } from '@/lib/timeline-utils';
import { pickI18n } from '@/lib/locale';
import { TimelineMarkerGlyph } from '@/lib/timeline-marker-icons';
import { EraGlyph } from '@/lib/era-selector-icons';
import type { TimelineMarker, TimelineMarkerKind, AtlasLocale } from '@/core/types';

const MAX_VISIBLE_MARKERS = 12;
const MIN_MARKER_SPACING_PCT = 3;
const TICK_COUNT = 5;
const NORMANDY_STOPS = [911, 924, 933, 1050, 1066];
const NEARBY_YEAR_WINDOW = 0.06; // fraction of total span

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

function percentToYear(pct: number, min: number, max: number): number {
  return Math.round(min + (pct / 100) * (max - min));
}

function findNearbyMarkers(
  allMarkers: TimelineMarker[],
  year: number,
  span: number,
): TimelineMarker[] {
  const window = span * NEARBY_YEAR_WINDOW;
  return allMarkers
    .filter((m) => Math.abs(m.year - year) <= window)
    .sort((a, b) => Math.abs(a.year - year) - Math.abs(b.year - year))
    .slice(0, 2);
}

// ─── Kind styling ───────────────────────────────────────────────────

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

const KIND_GLOW: Record<TimelineMarkerKind, string> = {
  battle: 'drop-shadow-[0_0_3px_rgba(248,113,113,0.4)]',
  treaty: 'drop-shadow-[0_0_3px_rgba(96,165,250,0.4)]',
  person: 'drop-shadow-[0_0_3px_rgba(196,169,98,0.4)]',
  foundation: 'drop-shadow-[0_0_3px_rgba(52,211,153,0.4)]',
  expansion: 'drop-shadow-[0_0_3px_rgba(251,146,60,0.4)]',
  exploration: 'drop-shadow-[0_0_3px_rgba(34,211,238,0.4)]',
  migration: 'drop-shadow-[0_0_3px_rgba(192,132,252,0.4)]',
  story: 'drop-shadow-[0_0_3px_rgba(196,169,98,0.4)]',
};

const KIND_BG: Record<TimelineMarkerKind, string> = {
  battle: 'bg-red-400/10',
  treaty: 'bg-blue-400/10',
  person: 'bg-gold/10',
  foundation: 'bg-emerald-400/10',
  expansion: 'bg-orange-400/10',
  exploration: 'bg-cyan-400/10',
  migration: 'bg-purple-400/10',
  story: 'bg-gold/10',
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

const KIND_TOOLTIP_DOT: Record<TimelineMarkerKind, string> = {
  battle: 'bg-red-400/70',
  treaty: 'bg-blue-400/70',
  person: 'bg-gold/70',
  foundation: 'bg-emerald-400/70',
  expansion: 'bg-orange-400/70',
  exploration: 'bg-cyan-400/70',
  migration: 'bg-purple-400/70',
  story: 'bg-gold/70',
};

// ─── Marker icon ────────────────────────────────────────────────────

const MarkerIcon = memo(function MarkerIcon({
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
      className="absolute -translate-x-1/2 flex items-center justify-center z-[2] group"
      style={{ left: `${percent}%`, top: '-6px' }}
      onMouseEnter={() => ref.current && onHover(marker, ref.current)}
      onMouseLeave={onLeave}
      onFocus={() => ref.current && onHover(marker, ref.current)}
      onBlur={onLeave}
      onClick={() => onClick(marker)}
      aria-label={`${pickI18n(marker.label, locale)}, ${formatYear(marker.year)}`}
    >
      <span className="absolute -inset-2" aria-hidden />
      <span
        className={`relative flex h-[22px] w-[22px] items-center justify-center rounded-md border transition-all duration-200 ${
          isPast
            ? `${KIND_BG[marker.kind]} ${KIND_STROKE[marker.kind]} border-current/20 ${KIND_GLOW[marker.kind]}`
            : 'bg-chrome-fill-active/60 text-text-dim/40 border-chrome-border-strong/40'
        } group-hover:scale-[1.25] group-focus-visible:scale-[1.25] group-focus-visible:ring-1 group-focus-visible:ring-gold/40`}
      >
        <TimelineMarkerGlyph kind={marker.kind} className="h-3 w-3" />
      </span>
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

// ─── Portal tooltips ────────────────────────────────────────────────

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
        <span className={`inline-flex h-3.5 w-3.5 items-center justify-center flex-shrink-0 ${KIND_STROKE[marker.kind]}`}>
          <TimelineMarkerGlyph kind={marker.kind} className="h-3 w-3" />
        </span>
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

function ScrubTooltip({
  year,
  nearby,
  left,
  top,
  locale,
}: {
  year: number;
  nearby: TimelineMarker[];
  left: number;
  top: number;
  locale: AtlasLocale;
}) {
  if (typeof document === 'undefined') return null;

  const tooltipW = 200;
  const clampedLeft = Math.max(8, Math.min(left - tooltipW / 2, window.innerWidth - tooltipW - 8));

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.1 }}
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed z-[9999] rounded-lg border border-chrome-border bg-chrome-popover px-3 py-2"
      style={{
        left: clampedLeft,
        top: top - 8,
        width: tooltipW,
        transform: 'translateY(-100%)',
        backdropFilter: 'blur(24px) saturate(1.2)',
        boxShadow:
          '0 8px 32px var(--color-chrome-tooltip-shadow), 0 0 0 1px var(--color-chrome-tooltip-ring)',
      }}
    >
      <p className="text-[11px] font-semibold text-parchment tabular-nums">
        {formatYear(year)}
      </p>
      {nearby.length > 0 && (
        <div className="mt-1.5 space-y-1">
          {nearby.map((m) => (
            <div key={m.id} className="flex items-center gap-1.5">
              <span className={`inline-flex h-3 w-3 items-center justify-center flex-shrink-0 ${KIND_STROKE[m.kind]}`}>
                <TimelineMarkerGlyph kind={m.kind} className="h-2.5 w-2.5" />
              </span>
              <span className="text-[9px] text-text-dim/70 truncate leading-tight">
                {pickI18n(m.label, locale)}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  );
}

// ─── Playhead ───────────────────────────────────────────────────────

const Playhead = memo(function Playhead({
  percent,
  eraId,
}: {
  percent: number;
  eraId: string;
}) {
  return (
    <div
      className="absolute z-[3] pointer-events-none -translate-x-1/2 flex flex-col items-center"
      style={{ left: `${percent}%`, top: '-10px' }}
    >
      <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full border border-gold/30 bg-chrome-popover/90 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <EraGlyph id={eraId} className="h-3 w-3 text-gold/80" />
      </span>
      <span className="h-[14px] w-[1.5px] bg-gold/30 mt-[-1px]" />
    </div>
  );
});

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

  // Drag/scrub state
  const railRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [previewYear, setPreviewYear] = useState<number | null>(null);
  const [scrubPos, setScrubPos] = useState<{ left: number; top: number } | null>(null);
  const [railHovered, setRailHovered] = useState(false);
  const rafId = useRef(0);

  const markers = useMemo(() => {
    if (!range) return [];
    return selectVisibleMarkers(getMarkersForEra(eraId), range.start, range.end);
  }, [eraId, range]);

  const allMarkers = useMemo(() => {
    if (!range) return [];
    return getMarkersForEra(eraId);
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

  const yearFromClientX = useCallback(
    (clientX: number): number | null => {
      if (!railRef.current || !range) return null;
      const rect = railRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      return percentToYear(pct, range.start, range.end);
    },
    [range],
  );

  const commitYear = useCallback(
    (year: number) => {
      if (isNormandyMode) {
        setNormandySimYear(snapToNormandyStop(year));
      } else {
        setAtlasSimYear(year);
      }
    },
    [isNormandyMode, setNormandySimYear, setAtlasSimYear],
  );

  const updateScrub = useCallback(
    (clientX: number, clientY: number) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const year = yearFromClientX(clientX);
        if (year == null) return;
        setPreviewYear(year);
        setScrubPos({ left: clientX, top: clientY });
      });
    },
    [yearFromClientX],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      updateScrub(e.clientX, e.clientY);
    },
    [updateScrub],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current && !railHovered) return;
      updateScrub(e.clientX, e.clientY);
    },
    [updateScrub, railHovered],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      const year = yearFromClientX(e.clientX);
      if (year != null) commitYear(year);
      setPreviewYear(null);
      setScrubPos(null);
    },
    [yearFromClientX, commitYear],
  );

  const handlePointerCancel = useCallback(() => {
    isDragging.current = false;
    setPreviewYear(null);
    setScrubPos(null);
  }, []);

  const handleRailEnter = useCallback(() => setRailHovered(true), []);
  const handleRailLeave = useCallback(() => {
    if (!isDragging.current) {
      setRailHovered(false);
      setPreviewYear(null);
      setScrubPos(null);
    }
  }, []);

  // Keyboard a11y: arrows nudge the committed year directly
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!range) return;
      const { start: min, end: max } = range;
      const step = isNormandyMode ? 1 : Math.max(1, Math.round((max - min) / 200));
      let next: number | null = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        next = Math.min(max, simYear + step);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        next = Math.max(min, simYear - step);
      } else if (e.key === 'Home') {
        next = min;
      } else if (e.key === 'End') {
        next = max;
      }
      if (next != null) {
        e.preventDefault();
        commitYear(next);
      }
    },
    [range, isNormandyMode, simYear, commitYear],
  );

  // Cleanup rAF on unmount
  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  if (!atlasMode || !range) return null;

  const { start: min, end: max } = range;
  const displayYear = previewYear ?? simYear;
  const clampedYear = Math.max(min, Math.min(max, displayYear));
  const pct = yearToPercent(clampedYear, min, max);
  const committedPct = yearToPercent(Math.max(min, Math.min(max, simYear)), min, max);
  const showPlayhead = railHovered || isDragging.current || previewYear != null;

  const nearbyMarkers = useMemo(() => {
    if (previewYear == null) return [];
    return findNearbyMarkers(allMarkers, previewYear, max - min);
  }, [previewYear, allMarkers, max, min]);

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
          {formatYear(Math.max(min, Math.min(max, simYear)))}
        </span>

        <div
          ref={railRef}
          className="relative min-h-[44px] min-w-0 flex-1 pt-2 touch-none select-none"
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={Math.max(min, Math.min(max, simYear))}
          aria-valuetext={formatYear(Math.max(min, Math.min(max, simYear)))}
          aria-label={`Timeline: ${formatYear(min)} to ${formatYear(max)}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onMouseEnter={handleRailEnter}
          onMouseLeave={handleRailLeave}
          onKeyDown={handleKeyDown}
        >
          {/* Track background */}
          <div className="absolute top-[10px] right-0 left-0 h-[3px] rounded-full bg-chrome-fill-raised sm:h-[3px]" />

          {/* Committed fill */}
          <div
            className="absolute top-[10px] left-0 h-[3px] rounded-full bg-gold/30 transition-all duration-100"
            style={{ width: `${committedPct}%` }}
          />

          {/* Preview fill (during drag) */}
          {previewYear != null && (
            <div
              className="absolute top-[10px] left-0 h-[3px] rounded-full bg-gold/15"
              style={{ width: `${pct}%` }}
            />
          )}

          {markers.map((m) => (
            <MarkerIcon
              key={m.id}
              marker={m}
              percent={yearToPercent(m.year, min, max)}
              isPast={Math.max(min, Math.min(max, simYear)) >= m.year}
              locale={locale}
              onHover={handleMarkerHover}
              onLeave={handleMarkerLeave}
              onClick={handleMarkerClick}
            />
          ))}

          {/* Playhead */}
          {showPlayhead && (
            <Playhead percent={pct} eraId={eraId} />
          )}

          <div className="absolute top-[20px] right-0 left-0">
            {ticks.map((t) => (
              <TickLabel
                key={t.year}
                year={t.year}
                percent={t.percent}
                isPast={Math.max(min, Math.min(max, simYear)) >= t.year}
              />
            ))}
          </div>

          <AnimatePresence>
            {hoveredMarker && anchorRect && (
              <MarkerTooltip marker={hoveredMarker} anchorRect={anchorRect} locale={locale} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {previewYear != null && scrubPos && !hoveredMarker && (
              <ScrubTooltip
                year={previewYear}
                nearby={nearbyMarkers}
                left={scrubPos.left}
                top={scrubPos.top}
                locale={locale}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
