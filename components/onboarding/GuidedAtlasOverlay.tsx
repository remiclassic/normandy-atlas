'use client';

import { memo, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from '@/hooks/use-atlas';
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
  { titleKey: 'tour.step4.title', bodyKey: 'tour.step4.body', anchor: 'map', placement: 'map-inset' },
  { titleKey: 'tour.step5.title', bodyKey: 'tour.step5.body', anchor: 'layers', placement: 'beside-anchor' },
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
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [anchor]);

  return rect;
}

const VIEW_MARGIN = 16;
/** Approximate max height of step card (copy + actions); used to clamp vertical position. */
const PANEL_EST_HEIGHT = 360;

function panelStyle(placement: StepDef['placement'], rect: Rect | null): React.CSSProperties {
  if (placement === 'center' || !rect) {
    return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
  }
  if (placement === 'map-inset') {
    return { left: rect.x + 28, top: rect.y + rect.height * 0.35, transform: 'translateY(-50%)' };
  }
  if (placement === 'below-anchor') {
    return { left: '50%', top: rect.y + rect.height + 16, transform: 'translateX(-50%)' };
  }
  // beside-anchor — right of layers stack; clamp top so the card stays above the viewport bottom
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
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
  const def = STEP_DEFS[stepIndex];
  const isLast = stepIndex === STEP_DEFS.length - 1;
  const rect = useMeasureAnchor(def.anchor);

  const step = useMemo(() => ({
    title: t(def.titleKey, locale),
    body: t(def.bodyKey, locale),
    placement: def.placement,
  }), [def, locale]);

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
      className="fixed inset-0 z-[90]"
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
        <rect width="100%" height="100%" fill="rgba(10,12,18,0.62)" mask={`url(#${MASK_ID})`} />
        {rect && (
          <rect
            x={rect.x - GLOW_PAD}
            y={rect.y - GLOW_PAD}
            width={rect.width + GLOW_PAD * 2}
            height={rect.height + GLOW_PAD * 2}
            fill="none"
            stroke="rgba(196,169,98,0.18)"
            strokeWidth="1"
          />
        )}
      </svg>

      {/* Click-through backdrop advances step */}
      <div className="absolute inset-0" onClick={next} />

      {/* Step panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute z-10 flex w-[340px] max-w-[90vw] flex-col overflow-hidden"
          style={panelStyle(step.placement, rect)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="glass-panel-elevated flex max-h-full flex-col overflow-y-auto p-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-2">
              {stepIndex + 1} / {STEP_DEFS.length}
            </p>
            <h3 className="font-display text-[17px] font-semibold leading-snug text-parchment mb-2">
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
                  className="px-4 py-1.5 text-[11px] tracking-[0.08em] uppercase text-gold border border-gold/30 hover:border-gold/50 hover:bg-gold/[0.04] transition-all duration-200"
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
