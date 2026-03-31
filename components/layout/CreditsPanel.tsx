'use client';

import { memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, ScrollText } from 'lucide-react';
import type { AtlasLocale } from '@/core/types';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

const LINKEDIN_URL = 'https://www.linkedin.com/in/remicouture/';

const CreditsScrollContent = memo(function CreditsScrollContent({
  locale,
  onOpenSupport,
}: {
  locale: AtlasLocale;
  onOpenSupport?: () => void;
}) {
  return (
    <div className="px-6 pb-8 pt-14 sm:px-8 sm:pb-10">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1">
        {t('credits.sectionLabel', locale)}
      </p>
      <h2
        id="credits-dialog-title"
        className="font-display text-xl font-semibold leading-snug text-parchment sm:text-2xl mb-6"
      >
        {t('credits.title', locale)}
      </h2>

      <div className="accent-line-gold mb-8 opacity-80" />

      <section className="mb-10">
        <p className="text-[13px] leading-relaxed text-text-muted">{t('credits.intro1', locale)}</p>
        <p className="mt-4 text-[13px] leading-relaxed text-parchment/90 font-medium">
          {t('credits.intro2', locale)}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-parchment/90 font-medium">
          {t('credits.intro3', locale)}
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">
          {t('credits.whyTitle', locale)}
        </h3>
        <p className="text-[13px] leading-relaxed text-text-muted">{t('credits.why1', locale)}</p>
        <p className="mt-4 text-[13px] leading-relaxed text-text-muted">{t('credits.why2', locale)}</p>
        <p className="mt-4 text-[13px] leading-relaxed text-text-muted">{t('credits.why3', locale)}</p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">
          {t('credits.visionTitle', locale)}
        </h3>
        <p className="text-[13px] leading-relaxed text-text-muted mb-4">
          {t('credits.visionIntro', locale)}
        </p>
        <ul className="list-disc pl-5 text-[13px] leading-relaxed text-text-muted space-y-2">
          <li>{t('credits.visionL1', locale)}</li>
          <li>{t('credits.visionL2', locale)}</li>
          <li>{t('credits.visionL3', locale)}</li>
          <li>{t('credits.visionL4', locale)}</li>
        </ul>
        <p className="mt-4 text-[13px] leading-relaxed text-text-muted">
          {t('credits.visionOutro', locale)}
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">
          {t('credits.builtTitle', locale)}
        </h3>
        <p className="text-[13px] leading-relaxed text-text-muted mb-4">
          {t('credits.builtIntro', locale)}
        </p>
        <ul className="list-disc pl-5 text-[13px] leading-relaxed text-text-muted space-y-2">
          <li>{t('credits.builtL1', locale)}</li>
          <li>{t('credits.builtL2', locale)}</li>
          <li>{t('credits.builtL3', locale)}</li>
          <li>{t('credits.builtL4', locale)}</li>
        </ul>
        <p className="mt-4 text-[13px] leading-relaxed text-text-muted">
          {t('credits.builtOutro', locale)}
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">
          {t('credits.personalTitle', locale)}
        </h3>
        <p className="text-[13px] leading-relaxed text-text-muted">{t('credits.personal1', locale)}</p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">
          {t('credits.workTitle', locale)}
        </h3>
        <p className="text-[13px] leading-relaxed text-text-muted mb-4">
          {t('credits.workIntro', locale)}
        </p>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-[13px] font-medium text-gold hover:text-gold-bright underline underline-offset-2 transition-colors"
        >
          linkedin.com/in/remicouture
        </a>
        <p className="mt-4 text-[12px] leading-relaxed text-text-dim">{t('credits.workAvailable', locale)}</p>
        <ul className="mt-2 list-disc pl-5 text-[13px] leading-relaxed text-text-muted space-y-2">
          <li>{t('credits.workL1', locale)}</li>
          <li>{t('credits.workL2', locale)}</li>
          <li>{t('credits.workL3', locale)}</li>
          <li>{t('credits.workL4', locale)}</li>
        </ul>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">
          {t('credits.supportTitle', locale)}
        </h3>
        <p className="text-[13px] leading-relaxed text-text-muted mb-5">
          {t('credits.supportIntro', locale)}
        </p>
        {onOpenSupport && (
          <button
            type="button"
            onClick={onOpenSupport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gold/25 bg-gold/5 px-4 py-2 text-[12px] font-semibold text-gold/90 transition-all duration-150 hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
          >
            <Heart className="h-3 w-3" strokeWidth={2} aria-hidden />
            {t('credits.supportCta', locale)}
          </button>
        )}
      </section>

      <section>
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">
          {t('credits.ongoingTitle', locale)}
        </h3>
        <p className="text-[13px] leading-relaxed text-text-muted">{t('credits.ongoing1', locale)}</p>
      </section>
    </div>
  );
});

export const CreditsIconButton = memo(function CreditsIconButton({
  onOpen,
  ariaLabel,
}: {
  onOpen: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-dim transition-colors duration-200 hover:bg-chrome-fill hover:text-gold/70"
      aria-label={ariaLabel}
    >
      <ScrollText className="h-[14px] w-[14px]" strokeWidth={1.5} aria-hidden />
    </button>
  );
});

export const CreditsModal = memo(function CreditsModal({
  open,
  onClose,
  onOpenSupport,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSupport?: () => void;
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
          key="credits-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-[rgba(8,10,14,0.72)] p-0 sm:p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="credits-dialog-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-chrome-border-strong glass-panel-elevated shadow-atlas-modal max-sm:rounded-none max-sm:border-0 max-sm:max-w-none max-sm:h-full"
            style={{ maxHeight: 'min(85dvh, 720px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-transparent bg-chrome-fill text-text-dim transition-all duration-150 hover:border-chrome-border hover:bg-chrome-fill-active hover:text-text-muted touch-target"
              aria-label={t('credits.aria.close', locale)}
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
            <div className="overflow-y-auto scrollbar-thin h-full" style={{ maxHeight: 'min(85dvh, 720px)' }}>
              <CreditsScrollContent locale={locale} onOpenSupport={onOpenSupport} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});
