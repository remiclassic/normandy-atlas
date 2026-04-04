'use client';

import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  subscribeShareMomentQueue,
  dequeueShareMoment,
  peekShareMoment,
  type ShareMomentPayload,
} from '@/lib/progress/share-moment-queue';
import { shareOrCopy, buildPublicShareUrl } from '@/lib/progress/share';
import { resolveEntityLabel } from '@/lib/progress/discovery-label';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

function ShareMomentModal() {
  const locale = useLocale();
  const [current, setCurrent] = useState<ShareMomentPayload | null>(null);
  const processingRef = useRef(false);

  const processNext = useCallback(() => {
    const next = peekShareMoment();
    if (!next) {
      processingRef.current = false;
      setCurrent(null);
      return;
    }
    dequeueShareMoment();
    processingRef.current = true;
    setCurrent(next);
  }, []);

  useEffect(() => {
    const unsub = subscribeShareMomentQueue(() => {
      if (!processingRef.current) processNext();
    });
    if (!processingRef.current && peekShareMoment()) processNext();
    return unsub;
  }, [processNext]);

  const handleContinue = useCallback(() => {
    setCurrent(null);
    setTimeout(processNext, 200);
  }, [processNext]);

  const label =
    current?.kind === 'first-exploration'
      ? resolveEntityLabel(current.eventType, current.entityId, locale)
      : '';

  const handleShare = useCallback(async () => {
    if (!current || current.kind !== 'first-exploration') return;
    const url = buildPublicShareUrl({});
    await shareOrCopy({
      title: 'Norman Atlas',
      text: t('share.firstExploration.shareBody', locale).replace('{label}', label),
      url,
    });
  }, [current, label, locale]);

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <AnimatePresence>
      {current && current.kind === 'first-exploration' && (
        <motion.div
          key="first-exploration-share"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.05 : 0.25 }}
          className="fixed inset-0 z-[81] flex items-center justify-center bg-black/50 backdrop-blur-sm"
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
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold/60 mb-1.5">
              {t('share.firstExploration.sealed', locale)}
            </p>
            <h3 className="text-lg font-display font-bold text-parchment mb-2 tracking-[-0.01em]">
              {t('share.firstExploration.title', locale).replace('{label}', label)}
            </h3>
            <p className="text-[13px] leading-relaxed text-text-muted mb-5">
              {t('share.firstExploration.subtitle', locale)}
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleContinue}
                className="rounded-lg border border-chrome-border px-5 py-2 text-[13px] font-medium text-text-muted hover:bg-chrome-fill hover:text-parchment transition-colors"
              >
                {t('milestone.modal.continue', locale)}
              </button>
              <button
                type="button"
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

export default memo(ShareMomentModal);
