'use client';

import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { subscribeToastQueue, dequeueToast, peekQueue, type ToastPayload } from '@/lib/progress/toast-queue';
import { resolveEntityLabel } from '@/lib/progress/discovery-label';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';

interface ToastItem {
  key: number;
  line1: string;
  line2: string;
  kind: 'discovery' | 'milestone';
}

const TOAST_DURATION_MS = 3500;
const GAP_MS = 600;

let toastKeySeq = 0;

function CuratorToast() {
  const locale = useLocale();
  const [toast, setToast] = useState<ToastItem | null>(null);
  const processingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const buildToastItem = useCallback(
    (payload: ToastPayload): ToastItem => {
      if (payload.kind === 'milestone' && payload.milestone) {
        return {
          key: ++toastKeySeq,
          line1: t('toast.milestone', locale),
          line2: pickI18n(payload.milestone.def.title, locale),
          kind: 'milestone',
        };
      }
      const label = payload.entityId && payload.eventType
        ? resolveEntityLabel(payload.eventType, payload.entityId, locale)
        : payload.entityId ?? '';
      return {
        key: ++toastKeySeq,
        line1: t('toast.discovered', locale),
        line2: label,
        kind: 'discovery',
      };
    },
    [locale],
  );

  const processNext = useCallback(() => {
    const next = peekQueue();
    if (!next) {
      processingRef.current = false;
      return;
    }
    // Tier 2+ milestones are handled by MilestoneCelebrationModal — skip as toast
    if (next.kind === 'milestone' && next.milestone && next.milestone.def.tier >= 2) {
      dequeueToast();
      // Immediately try next item
      processNext();
      return;
    }
    const payload = dequeueToast()!;
    processingRef.current = true;
    setToast(buildToastItem(payload));
    timerRef.current = setTimeout(() => {
      setToast(null);
      timerRef.current = setTimeout(processNext, GAP_MS);
    }, TOAST_DURATION_MS);
  }, [buildToastItem]);

  useEffect(() => {
    return subscribeToastQueue(() => {
      if (!processingRef.current) processNext();
    });
  }, [processNext]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="fixed top-16 right-4 z-[70] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.key}
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-auto rounded-xl border border-chrome-border bg-chrome-popover/95 backdrop-blur-lg px-4 py-3 shadow-lg max-w-[280px]"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/60 mb-0.5">
              {toast.line1}
            </p>
            <p className="text-[13px] font-medium text-parchment leading-snug">
              {toast.line2}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(CuratorToast);
