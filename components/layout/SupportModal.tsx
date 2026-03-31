'use client';

import { memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Heart } from 'lucide-react';
import type { AtlasLocale } from '@/core/types';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { SUPPORT_CHECKOUT_URL } from '@/lib/support-checkout';

const SupportScrollContent = memo(function SupportScrollContent({
  locale,
}: {
  locale: AtlasLocale;
}) {
  return (
    <div className="px-6 pb-8 pt-14 sm:px-8 sm:pb-10">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1">
        {t('support.modal.sectionLabel', locale)}
      </p>
      <h2
        id="support-dialog-title"
        className="font-display text-xl font-semibold leading-snug text-parchment sm:text-2xl mb-6"
      >
        {t('support.modal.title', locale)}
      </h2>

      <div className="accent-line-gold mb-8 opacity-80" />

      <div className="space-y-4 mb-10">
        <p className="text-[13px] leading-relaxed text-text-muted">
          {t('support.modal.body1', locale)}
        </p>
        <p className="text-[13px] leading-relaxed text-text-muted">
          {t('support.modal.body2', locale)}
        </p>
        <p className="text-[13px] leading-relaxed text-parchment/90 font-medium">
          {t('support.modal.body3', locale)}
        </p>
      </div>

      <a
        href={SUPPORT_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gold/30 bg-gold/8 px-6 py-2.5 text-[13px] font-semibold text-gold transition-all duration-150 hover:border-gold/50 hover:bg-gold/15 hover:text-gold-bright"
      >
        <Heart className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        {t('support.modal.cta', locale)}
      </a>
    </div>
  );
});

export const SupportModal = memo(function SupportModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const locale = useLocale();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="support-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(8,10,14,0.72)] p-0 sm:p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-dialog-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-chrome-border-strong glass-panel-elevated shadow-atlas-modal max-sm:rounded-none max-sm:border-0 max-sm:max-w-none max-sm:h-full"
            style={{ maxHeight: 'min(90dvh, 640px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-transparent bg-chrome-fill text-text-dim transition-all duration-150 hover:border-chrome-border hover:bg-chrome-fill-active hover:text-text-muted touch-target"
              aria-label={t('support.aria.close', locale)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="overflow-y-auto scrollbar-thin h-full" style={{ maxHeight: 'min(90dvh, 640px)' }}>
              <SupportScrollContent locale={locale} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});
