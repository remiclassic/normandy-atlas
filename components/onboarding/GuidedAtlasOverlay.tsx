'use client';

import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from '@/hooks/use-atlas';
import { useIsCompact } from '@/hooks/use-responsive';
import { t } from '@/lib/ui-strings';
import type { UiStringKey } from '@/lib/ui-strings';

type Placement = 'center' | 'map-inset' | 'below-anchor' | 'beside-anchor';

interface StepDef {
  titleKey: UiStringKey;
  bodyKey: UiStringKey;
  anchor?: string;
  placement: Placement;
}

const STEP_DEFS: StepDef[] = [
  { titleKey: 'tour.step1.title', bodyKey: 'tour.step1.body', placement: 'center' },
  { titleKey: 'tour.step2.title', bodyKey: 'tour.step2.body', anchor: 'map', placement: 'map-inset' },
  { titleKey: 'tour.step3.title', bodyKey: 'tour.step3.body', anchor: 'timeline', placement: 'below-anchor' },
  { titleKey: 'tour.step4.title', bodyKey: 'tour.step4.body', anchor: 'stories', placement: 'below-anchor' },
  { titleKey: 'tour.step5.title', bodyKey: 'tour.step5.body', anchor: 'theme', placement: 'below-anchor' },
  { titleKey: 'tour.step6.title', bodyKey: 'tour.step6.body', anchor: 'layers', placement: 'beside-anchor' },
  { titleKey: 'tour.step7.title', bodyKey: 'tour.step7.body', placement: 'center' },
];

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MASK_ID = 'onboarding-spotlight';
const CUTOUT_PAD = 6;
const GLOW_PAD = 8;

function useMeasureAnchor(anchor: string | undefined) {
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (!anchor) {
      setRect(null);
      return;
    }
    const el = document.querySelector(`[data-onboarding="${anchor}"]`);
    if (!el) return;

    const measure = () => {
      const r = el.getBoundingClientRect();
      setRect({ x: r.x, y: r.y, width: r.width, height: r.height });
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    const vv = window.visualViewport;
    vv?.addEventListener('resize', measure);
    vv?.addEventListener('scroll', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      vv?.removeEventListener('resize', measure);
      vv?.removeEventListener('scroll', measure);
    };
  }, [anchor]);

  return rect;
}

const VIEW_MARGIN = 16;
const PANEL_EST_HEIGHT = 360;
const PANEL_WIDTH = 340;
/** Mobile/tablet: dock + layer stack + safe inset — keep the card above persistent bottom chrome. */
const COMPACT_BOTTOM_RESERVE = 120;
const COMPACT_EDGE_MARGIN = 12;

/** Tour card layout uses visual viewport when available (mobile chrome, pinch-zoom). */
function useVisualViewportSize() {
  const [dims, setDims] = useState(() => {
    if (typeof window === 'undefined') return { vw: 390, vh: 844 };
    const vv = window.visualViewport;
    return {
      vw: Math.max(1, vv?.width ?? window.innerWidth),
      vh: Math.max(1, vv?.height ?? window.innerHeight),
    };
  });

  useEffect(() => {
    const read = () => {
      const vv = window.visualViewport;
      setDims({
        vw: Math.max(1, vv?.width ?? window.innerWidth),
        vh: Math.max(1, vv?.height ?? window.innerHeight),
      });
    };
    read();
    window.addEventListener('resize', read);
    const vv = window.visualViewport;
    vv?.addEventListener('resize', read);
    vv?.addEventListener('scroll', read);
    return () => {
      window.removeEventListener('resize', read);
      vv?.removeEventListener('resize', read);
      vv?.removeEventListener('scroll', read);
    };
  }, []);

  return dims;
}

function panelStyle(
  placement: StepDef['placement'],
  rect: Rect | null,
  compact: boolean,
  vw: number,
  vh: number,
  isLast: boolean,
): React.CSSProperties {
  const margin = compact ? COMPACT_EDGE_MARGIN : VIEW_MARGIN;
  const desktopCenterW = Math.min(isLast ? 380 : PANEL_WIDTH, vw - VIEW_MARGIN * 2);
  const compactCardW = Math.min(PANEL_WIDTH, Math.max(260, vw - margin * 2));

  if (placement === 'center' || !rect) {
    if (compact) {
      const topPos = Math.min(vh * 0.44, vh * 0.5 - 20);
      return {
        // Avoid translateX(-50%): Framer Motion’s y transform overwrites `transform` and was clipping the card.
        left: `calc(50% - ${compactCardW / 2}px)`,
        top: topPos,
        transform: 'translateY(-50%)',
        width: compactCardW,
        maxWidth: compactCardW,
        boxSizing: 'border-box',
        maxHeight: Math.min(
          380,
          vh - COMPACT_BOTTOM_RESERVE - 40,
        ),
      };
    }
    return {
      left: `calc(50% - ${desktopCenterW / 2}px)`,
      top: '50%',
      transform: 'translateY(-50%)',
      width: desktopCenterW,
      boxSizing: 'border-box',
    };
  }

  if (placement === 'map-inset') {
    if (compact) {
      const topShift = Math.round(COMPACT_BOTTOM_RESERVE * 0.25);
      const topPos = vh * 0.5 - topShift;
      return {
        left: `calc(50% - ${compactCardW / 2}px)`,
        top: topPos,
        transform: 'translateY(-50%)',
        width: compactCardW,
        maxWidth: compactCardW,
        boxSizing: 'border-box',
        maxHeight: Math.min(340, vh - COMPACT_BOTTOM_RESERVE - 32),
      };
    }
    return { left: rect.x + 28, top: rect.y + rect.height * 0.35, transform: 'translateY(-50%)' };
  }

  if (placement === 'below-anchor') {
    const panelW = Math.min(PANEL_WIDTH, vw - margin * 2);
    const anchorCenterX = rect.x + rect.width / 2;
    const idealLeft = anchorCenterX - panelW / 2;
    const clampedLeft = Math.max(margin, Math.min(idealLeft, vw - panelW - margin));
    let top = rect.y + rect.height + 16;
    if (compact) {
      const maxTop = vh - PANEL_EST_HEIGHT - margin - COMPACT_BOTTOM_RESERVE;
      top = Math.min(top, Math.max(margin + 8, maxTop));
    }
    return {
      left: clampedLeft,
      top,
      width: compact ? panelW : undefined,
      maxWidth: compact ? panelW : undefined,
      boxSizing: 'border-box',
      maxHeight: compact
        ? vh - top - COMPACT_BOTTOM_RESERVE - 8
        : undefined,
    };
  }

  if (compact) {
    const panelW = Math.min(PANEL_WIDTH, vw - margin * 2);
    const left = Math.max(margin, Math.min((vw - panelW) / 2, vw - panelW - margin));
    const maxTop = vh - PANEL_EST_HEIGHT - margin - COMPACT_BOTTOM_RESERVE;
    const topClamped = Math.max(margin + 8, Math.min(rect.y, maxTop));
    return {
      left,
      top: topClamped,
      width: panelW,
      maxWidth: panelW,
      boxSizing: 'border-box',
      maxHeight: vh - topClamped - margin - 8,
    };
  }

  const maxTop = vh - PANEL_EST_HEIGHT - VIEW_MARGIN;
  const topClamped = Math.max(VIEW_MARGIN, Math.min(rect.y, maxTop));
  return {
    left: rect.x + rect.width + 16,
    top: topClamped,
    maxHeight: `calc(100vh - ${VIEW_MARGIN * 2}px)`,
  };
}

function GuidedAtlasOverlay({ onComplete }: { onComplete: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const locale = useLocale();
  const isCompact = useIsCompact();
  const { vw, vh } = useVisualViewportSize();
  const def = STEP_DEFS[stepIndex];
  const isLast = stepIndex === STEP_DEFS.length - 1;
  const rect = useMeasureAnchor(def.anchor);

  const step = useMemo(() => ({
    title: t(def.titleKey, locale),
    body: t(def.bodyKey, locale),
    placement: def.placement,
  }), [def, locale]);

  const cardPositionStyle = useMemo(
    () => panelStyle(step.placement, rect, isCompact, vw, vh, isLast),
    [step.placement, rect, isCompact, vw, vh, isLast],
  );

  const next = useCallback(() => {
    if (isLast) onComplete();
    else setStepIndex((i) => i + 1);
  }, [isLast, onComplete]);

  const prev = useCallback(() => setStepIndex((i) => Math.max(0, i - 1)), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 ${isCompact ? 'z-[95]' : 'z-[90]'}`}
    >
      {/* Dim + cutout */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <mask id={MASK_ID}>
            <rect width="100%" height="100%" fill="white" />
            {rect && (
              <rect
                x={rect.x - CUTOUT_PAD}
                y={rect.y - CUTOUT_PAD}
                width={rect.width + CUTOUT_PAD * 2}
                height={rect.height + CUTOUT_PAD * 2}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="var(--color-guided-overlay)" mask={`url(#${MASK_ID})`} />
        {rect && (
          <rect
            x={rect.x - GLOW_PAD}
            y={rect.y - GLOW_PAD}
            width={rect.width + GLOW_PAD * 2}
            height={rect.height + GLOW_PAD * 2}
            fill="none"
            stroke="var(--color-guided-stroke)"
            strokeWidth="1"
          />
        )}
      </svg>

      {/* Click-through backdrop advances step */}
      <div className="absolute inset-0" onClick={next} />

      {/* Step panel */}
      <AnimatePresence mode="wait">
        {/*
          Opacity-only on this positioned node: Framer Motion’s translateY enter/exit overwrites inline
          `transform` (e.g. translate(-50%,-50%)), which was pinning the card by its left edge and clipping it on mobile.
        */}
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className={`absolute z-10 flex flex-col overflow-hidden pointer-events-auto ${
            isCompact ? 'max-w-none' : 'max-w-[90vw]'
          } ${isCompact ? '' : isLast ? 'w-[380px]' : 'w-[340px]'}`}
          style={cardPositionStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="glass-panel-elevated flex max-h-full min-h-0 w-full flex-col overflow-y-auto overflow-x-hidden p-5">
            {/* Progress dots */}
            <div className="flex items-center gap-1.5 mb-3">
              {STEP_DEFS.map((_, i) => (
                <div
                  key={i}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i <= stepIndex
                      ? 'bg-gold/60 flex-[2]'
                      : 'bg-text-dim/20 flex-1'
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-2">
              {stepIndex + 1} / {STEP_DEFS.length}
            </p>
            <h3 className={`font-display font-semibold leading-snug text-parchment mb-2 ${
              isLast ? 'text-[19px]' : 'text-[17px]'
            }`}>
              {step.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-text-muted whitespace-pre-line">
              {step.body}
            </p>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={onComplete}
                className="text-[10px] tracking-[0.12em] uppercase text-text-dim hover:text-text-muted transition-colors duration-200"
              >
                {t('tour.skip', locale)}
              </button>
              <div className="flex gap-2">
                {stepIndex > 0 && (
                  <button
                    onClick={prev}
                    className="px-3 py-1.5 text-[11px] tracking-[0.08em] uppercase text-text-muted border border-border hover:border-border-bright transition-colors duration-200"
                  >
                    {t('tour.back', locale)}
                  </button>
                )}
                <button
                  onClick={next}
                  className={`px-4 py-1.5 text-[11px] tracking-[0.08em] uppercase transition-all duration-200 ${
                    isLast
                      ? 'text-gold border border-gold/40 bg-gold/[0.06] hover:border-gold/60 hover:bg-gold/[0.1] hover:shadow-[0_0_20px_rgba(196,169,98,0.1)]'
                      : 'text-gold border border-gold/30 hover:border-gold/50 hover:bg-gold/[0.04]'
                  }`}
                >
                  {isLast ? t('tour.begin', locale) : t('tour.next', locale)}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(GuidedAtlasOverlay);
