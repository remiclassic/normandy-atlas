'use client';

import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  subscribeToastQueue,
  dequeueToast,
  peekQueue,
  type ToastPayload,
} from '@/lib/progress/toast-queue';
import { shareOrCopy, buildPublicShareUrl } from '@/lib/progress/share';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import type { MilestoneDef } from '@/data/atlas/milestones';

const TIER_BADGE: Record<number, string> = {
  2: '★★',
  3: '★★★',
};

function MilestoneCelebrationModal() {
  const locale = useLocale();
  const [current, setCurrent] = useState<MilestoneDef | null>(null);
  const [queueCount, setQueueCount] = useState(0);
  const processingRef = useRef(false);

  const processNext = useCallback(() => {
    const next = peekQueue();
    if (!next || next.kind !== 'milestone' || !next.milestone || next.milestone.def.tier < 2) {
      processingRef.current = false;
      setCurrent(null);
      return;
    }
    const payload = dequeueToast()!;
    processingRef.current = true;
    setCurrent(payload.milestone!.def);
    // Count remaining tier 2+ milestones in queue
    let count = 0;
    let peek = peekQueue();
    while (peek && peek.kind === 'milestone' && peek.milestone && peek.milestone.def.tier >= 2) {
      count++;
      break;
    }
    setQueueCount(count);
  }, []);

  useEffect(() => {
    return subscribeToastQueue(() => {
      if (!processingRef.current) processNext();
    });
  }, [processNext]);

  const handleContinue = useCallback(() => {
    setCurrent(null);
    setTimeout(processNext, 200);
  }, [processNext]);

  const handleShare = useCallback(async () => {
    if (!current) return;
    const url = buildPublicShareUrl({});
    const title = pickI18n(current.title, locale);
    await shareOrCopy({
      title: 'Norman Atlas',
      text: t('milestone.share.text', locale).replace('{title}', title),
      url,
    });
  }, [current, locale]);

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.05 : 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleContinue}
        >
          <motion.div
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.92, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.96, y: reducedMotion ? 0 : 8 }}
            transition={{ duration: reducedMotion ? 0.05 : 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-2xl border border-gold/20 bg-chrome-popover/95 backdrop-blur-xl shadow-2xl max-w-sm w-[calc(100vw-2rem)] p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-2xl mb-2 select-none">{TIER_BADGE[current.tier] ?? '★'}</div>

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold/60 mb-1.5">
              {t('milestone.modal.sealed', locale)}
            </p>
            <h3 className="text-lg font-display font-bold text-parchment mb-2 tracking-[-0.01em]">
              {pickI18n(current.title, locale)}
            </h3>
            <p className="text-[13px] leading-relaxed text-text-muted mb-5">
              {pickI18n(current.description, locale)}
            </p>

            {queueCount > 0 && (
              <p className="text-[11px] text-text-dim mb-3">
                +{queueCount} {t('milestone.modal.more', locale)}
              </p>
            )}

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleContinue}
                className="rounded-lg border border-chrome-border px-5 py-2 text-[13px] font-medium text-text-muted hover:bg-chrome-fill hover:text-parchment transition-colors"
              >
                {t('milestone.modal.continue', locale)}
              </button>
              <button
                onClick={handleShare}
                className="rounded-lg border border-gold/20 bg-gold/8 px-5 py-2 text-[13px] font-medium text-gold hover:bg-gold/15 hover:border-gold/30 transition-colors"
              >
                {t('milestone.modal.share', locale)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(MilestoneCelebrationModal);
