'use client';

import { memo, useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore, NORMANDY_ERA_IDS, VIKING_MOVEMENT_ERA_IDS } from '@/lib/store';
import { getEraRange } from '@/core/era/engine';
import { getMarkersForEra } from '@/data/atlas/timeline-markers';
import { VIKING_MACRO_PHASES } from '@/data/atlas/viking-timeline-phases';
import { HISTORICAL_PRESENCE_YEAR_PRESETS } from '@/core/peoples/engine';
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
  battle: 'text-red-400',
  treaty: 'text-blue-400',
  person: 'text-gold',
  foundation: 'text-emerald-400',
  expansion: 'text-orange-400',
  exploration: 'text-cyan-400',
  migration: 'text-purple-400',
  story: 'text-gold',
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
  battle: 'bg-red-500/25',
  treaty: 'bg-blue-500/25',
  person: 'bg-amber-500/25',
  foundation: 'bg-emerald-500/25',
  expansion: 'bg-orange-500/25',
  exploration: 'bg-cyan-500/25',
  migration: 'bg-purple-500/25',
  story: 'bg-amber-500/25',
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
      style={{ left: `${percent}%`, top: '1px' }}
      onMouseEnter={() => ref.current && onHover(marker, ref.current)}
      onMouseLeave={onLeave}
      onFocus={() => ref.current && onHover(marker, ref.current)}
      onBlur={onLeave}
      onClick={() => onClick(marker)}
      aria-label={`${pickI18n(marker.label, locale)}, ${formatYear(marker.year)}`}
    >
      <span className="absolute -inset-3" aria-hidden />
      <span
        className={`relative flex h-[22px] w-[22px] items-center justify-center rounded-md border-[1.5px] transition-colors duration-200 ${
          isPast
            ? `${KIND_BG[marker.kind]} ${KIND_STROKE[marker.kind]} border-current/50 ${KIND_GLOW[marker.kind]}`
            : 'bg-surface text-text-muted border-border-bright'
        } group-hover:scale-[1.15] group-focus-visible:scale-[1.15] group-focus-visible:ring-1 group-focus-visible:ring-gold/40`}
      >
        <TimelineMarkerGlyph kind={marker.kind} className="h-3.5 w-3.5" />
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
      style={{ left: `${percent}%`, top: '0' }}
    >
      <span className="h-[6px] w-px" style={{ background: 'color-mix(in srgb, var(--color-text-dim) 30%, transparent)' }} />
      <span
        className={`mt-0.5 text-[9px] leading-none whitespace-nowrap tabular-nums sm:text-[10px] ${
          isPast ? 'font-semibold text-parchment/80' : 'text-text-muted/50'
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
        <span className="text-[10px] text-text-muted">
          {KIND_LABELS[marker.kind]}
        </span>
        <span className="text-[10px] text-text-muted/70 tabular-nums ml-auto">
          {formatYear(marker.year)}
        </span>
      </div>
      {(marker.action?.type === 'openPerson' || marker.action?.type === 'flyToCamera' || marker.action?.type === 'flyToPlace') && (
        <p className="text-[9px] text-gold/60 mt-1.5">Click to explore</p>
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
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.1 }}
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed z-[9999] rounded-lg border border-chrome-border bg-chrome-popover px-3 py-2"
      style={{
        left: clampedLeft,
        top: top + 20,
        width: tooltipW,
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
              <span className="text-[9px] text-text-muted truncate leading-tight">
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
      style={{ left: `${percent}%`, top: '0px' }}
    >
      <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full border border-gold/50 bg-chrome-popover shadow-[0_1px_4px_rgba(0,0,0,0.15),0_0_8px_rgba(212,175,55,0.12)]"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <EraGlyph id={eraId} className="h-2.5 w-2.5 text-gold" />
      </span>
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
  const historicalPresenceOn = useMapStore((s) => s.layers['historical-presence'] ?? false);
  const historicalPresenceYear = useMapStore((s) => s.historicalPresenceYear);
  const setHistoricalPresenceYear = useMapStore((s) => s.setHistoricalPresenceYear);
  const selectFeature = useMapStore((s) => s.selectFeature);

  const isNormandyMode = NORMANDY_ERA_IDS.has(eraId) && expansionLayerOn;
  const isViking = VIKING_MOVEMENT_ERA_IDS.has(eraId);
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

  const setPendingFlyTarget = useMapStore((s) => s.setPendingFlyTarget);

  const handleMarkerClick = useCallback(
    (marker: TimelineMarker) => {
      if (isNormandyMode) {
        setNormandySimYear(snapToNormandyStop(marker.year));
      } else {
        setAtlasSimYear(marker.year);
      }

      const action = marker.action;
      if (!action) {
        selectFeature(marker.id, 'atlas-timeline-marker');
        return;
      }

      if (action.type === 'openPerson' && action.personId) {
        selectFeature(action.personId, 'atlas-person');
      } else if (action.type === 'flyToCamera' && action.center) {
        setPendingFlyTarget({ center: action.center, zoom: action.zoom ?? 6 });
        selectFeature(marker.id, 'atlas-timeline-marker');
      } else if (action.type === 'flyToPlace' && action.placeId) {
        selectFeature(action.placeId, 'settlement');
      } else {
        selectFeature(marker.id, 'atlas-timeline-marker');
      }
    },
    [isNormandyMode, setNormandySimYear, setAtlasSimYear, selectFeature, setPendingFlyTarget],
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
      style={{ background: 'var(--color-chrome-fill)' }}
      data-onboarding="timeline"
    >
      <div className="flex flex-col gap-0 px-3 py-1.5 pointer-events-auto sm:px-5">
        {/* Track + markers row */}
        <div
          ref={railRef}
          className="relative min-w-0 touch-none select-none"
          style={{ height: 22, minHeight: 44, paddingBlock: 11 }}
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
          <div
            className="absolute top-[10px] right-0 left-0 h-[2px] rounded-full"
            style={{ background: 'color-mix(in srgb, var(--color-text-dim) 25%, transparent)' }}
          />

          {/* Committed fill */}
          <div
            className="absolute top-[10px] left-0 h-[2px] rounded-full transition-[width] duration-100"
            style={{ width: `${committedPct}%`, background: 'color-mix(in srgb, var(--color-gold) 65%, transparent)' }}
          />

          {/* Preview fill (during drag) */}
          {previewYear != null && (
            <div
              className="absolute top-[10px] left-0 h-[2px] rounded-full"
              style={{ width: `${pct}%`, background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)' }}
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

        {/* Viking macro phase bands */}
        {isViking && (
          <div className="relative h-[18px] mt-0.5">
            {VIKING_MACRO_PHASES.map((mp) => {
              const left = Math.max(0, yearToPercent(Math.max(mp.yearStart, min), min, max));
              const right = Math.min(100, yearToPercent(Math.min(mp.yearEnd, max), min, max));
              if (right <= left) return null;
              const mid = (left + right) / 2;
              const active = simYear >= mp.yearStart && simYear < mp.yearEnd;
              return (
                <div key={mp.id}>
                  <div
                    className={`absolute top-0 h-[5px] rounded-sm transition-opacity duration-200 ${
                      active ? 'opacity-100' : 'opacity-40'
                    }`}
                    style={{
                      left: `${left}%`,
                      width: `${right - left}%`,
                      background: active
                        ? 'linear-gradient(90deg, rgba(196,169,98,0.18), rgba(196,169,98,0.08))'
                        : 'rgba(196,169,98,0.05)',
                    }}
                  />
                  <span
                    className={`absolute text-[7px] leading-none whitespace-nowrap transition-opacity duration-200 -translate-x-1/2 sm:text-[8px] ${
                      active ? 'text-gold/55' : 'text-text-dim/30'
                    }`}
                    style={{ left: `${mid}%`, top: '7px' }}
                  >
                    {pickI18n(mp.label, locale)}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Year labels */}
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[9px] font-medium tabular-nums text-text-muted/60 sm:text-[10px]">
            {formatYear(min)}
          </span>
          <span className="text-[10px] font-semibold tabular-nums text-gold/80 sm:text-[11px]">
            {formatYear(Math.max(min, Math.min(max, simYear)))}
          </span>
          <span className="text-[9px] font-medium tabular-nums text-text-muted/60 sm:text-[10px]">
            {formatYear(max)}
          </span>
        </div>

        {historicalPresenceOn && (
          <div className="mt-1.5 pt-1.5 border-t border-chrome-border/60">
            <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-text-dim/80 mb-1">
              Historical peoples · year slice (CE)
            </p>
            <div className="flex flex-wrap gap-1">
              {HISTORICAL_PRESENCE_YEAR_PRESETS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setHistoricalPresenceYear(y)}
                  className={`min-h-[28px] min-w-[36px] rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums transition-colors ${
                    historicalPresenceYear === y
                      ? 'bg-gold/25 text-gold border border-gold/35'
                      : 'bg-chrome-fill-raised text-text-muted border border-chrome-border/50 hover:border-gold/20'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
