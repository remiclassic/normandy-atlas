'use client';

import { memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, Feather } from 'lucide-react';
import type { AtlasLocale } from '@/core/types';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

const LINKEDIN_URL = 'https://www.linkedin.com/in/remicouture/';

/* ─── Section heading (reused across sections) ─────────── */
const SectionHeading = memo(function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">
      {children}
    </h3>
  );
});

const SectionDivider = memo(function SectionDivider() {
  return <div className="border-t border-chrome-border/40 my-8" />;
});

/* ─── Scroll content (hero + sections) ─────────────────── */
const CreditsScrollContent = memo(function CreditsScrollContent({
  locale,
  onOpenSupport,
}: {
  locale: AtlasLocale;
  onOpenSupport?: () => void;
}) {
  return (
    <div className="px-6 pb-10 pt-14 sm:px-8 sm:pb-12">
      {/* ── Hero ──────────────────────────────────── */}
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1">
        {t('credits.eyebrow', locale)}
      </p>
      <h2
        id="credits-dialog-title"
        className="font-display text-xl font-semibold leading-snug text-parchment sm:text-2xl mb-2"
      >
        {t('credits.title', locale)}
      </h2>
      <p className="text-[13px] leading-relaxed text-text-muted mb-4">
        {t('credits.role', locale)}
      </p>
      <span className="inline-block rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-[10px] font-semibold tracking-wide text-gold/80">
        {t('credits.statusPill', locale)}
      </span>

      <div className="accent-line-gold mt-6 mb-4 opacity-80" />

      <p className="text-[13px] italic leading-relaxed text-parchment/80">
        {t('credits.thesis', locale)}
      </p>

      <SectionDivider />

      {/* ── About the Creator ─────────────────────── */}
      <section>
        <SectionHeading>{t('credits.aboutTitle', locale)}</SectionHeading>
        <p className="text-[13px] leading-relaxed text-text-muted">
          {t('credits.about1', locale)}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-text-muted">
          {t('credits.about2', locale)}
        </p>
      </section>

      <SectionDivider />

      {/* ── Why This Atlas Exists ──────────────────── */}
      <section>
        <SectionHeading>{t('credits.whyTitle', locale)}</SectionHeading>
        <p className="text-[13px] leading-relaxed text-text-muted">
          {t('credits.why1', locale)}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-text-muted">
          {t('credits.why2', locale)}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-text-muted">
          {t('credits.why3', locale)}
        </p>
      </section>

      <SectionDivider />

      {/* ── What This Project Shows ────────────────── */}
      <section>
        <SectionHeading>{t('credits.showsTitle', locale)}</SectionHeading>
        <p className="text-[13px] leading-relaxed text-text-muted mb-3">
          {t('credits.showsIntro', locale)}
        </p>
        <ul className="list-disc pl-5 text-[13px] leading-relaxed text-text-muted space-y-1.5">
          <li>{t('credits.showsL1', locale)}</li>
          <li>{t('credits.showsL2', locale)}</li>
          <li>{t('credits.showsL3', locale)}</li>
          <li>{t('credits.showsL4', locale)}</li>
        </ul>
        <p className="mt-4 text-[13px] leading-relaxed text-parchment/80 font-medium">
          {t('credits.showsOutro', locale)}
        </p>
      </section>

      <SectionDivider />

      {/* ── Work With Me ───────────────────────────── */}
      <section>
        <SectionHeading>{t('credits.workTitle', locale)}</SectionHeading>
        <p className="text-[13px] leading-relaxed text-text-muted mb-5">
          {t('credits.workIntro', locale)}
        </p>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gold/25 bg-gold/5 px-5 py-2.5 text-[12px] font-semibold text-gold/90 transition-all duration-150 hover:border-gold/40 hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          {t('credits.workCta', locale)}
        </a>
        <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-text-dim/70">
          {t('credits.workAvailable', locale)}
        </p>
        <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12px] leading-relaxed text-text-muted">
          <li>{t('credits.workL1', locale)}</li>
          <li>{t('credits.workL2', locale)}</li>
          <li>{t('credits.workL3', locale)}</li>
          <li>{t('credits.workL4', locale)}</li>
        </ul>
      </section>

      {onOpenSupport ? (
        <>
          <SectionDivider />
          {/* ── Support the Atlas ──────────────────────── */}
          <section>
            <SectionHeading>{t('credits.supportTitle', locale)}</SectionHeading>
            <p className="text-[13px] leading-relaxed text-text-muted mb-5">
              {t('credits.supportIntro', locale)}
            </p>
            <button
              type="button"
              onClick={onOpenSupport}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold/25 bg-gold/5 px-4 py-2 text-[12px] font-semibold text-gold/90 transition-all duration-150 hover:border-gold/40 hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Heart className="h-3 w-3" strokeWidth={2} aria-hidden />
              {t('credits.supportCta', locale)}
            </button>
          </section>
        </>
      ) : null}

      <SectionDivider />

      {/* ── Ongoing Project ────────────────────────── */}
      <section>
        <SectionHeading>{t('credits.ongoingTitle', locale)}</SectionHeading>
        <p className="text-[13px] leading-relaxed text-text-muted">
          {t('credits.ongoing1', locale)}
        </p>
      </section>
    </div>
  );
});

/* ─── Header button (row 1, next to Support) ──────────── */
export const CreatorAboutHeaderButton = memo(function CreatorAboutHeaderButton({
  onOpen,
  ariaLabel,
}: {
  onOpen: () => void;
  ariaLabel: string;
}) {
  const locale = useLocale();
  return (
    <button
      type="button"
      onClick={onOpen}
      className="hidden shrink-0 items-center gap-1.5 rounded-full border border-chrome-border bg-chrome-fill px-3 py-1 text-[10px] font-bold text-text-muted transition-colors duration-200 hover:border-chrome-border-strong hover:bg-chrome-fill-active hover:text-parchment focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent sm:inline-flex"
      aria-label={ariaLabel}
    >
      <Feather className="h-3 w-3 opacity-60" strokeWidth={2} aria-hidden />
      <span className="md:hidden">{t('credits.headerButton', locale)}</span>
      <span className="hidden md:inline">{t('credits.headerButtonFull', locale)}</span>
    </button>
  );
});

/* ─── Legacy small icon button (kept for mobile drawer) ── */
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
      <Feather className="h-[14px] w-[14px]" strokeWidth={1.5} aria-hidden />
    </button>
  );
});

/* ─── Modal ────────────────────────────────────────────── */
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
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-chrome-border-strong glass-panel-elevated shadow-atlas-modal max-sm:rounded-none max-sm:border-0 max-sm:max-w-none max-sm:h-full"
            style={{ maxHeight: 'min(88dvh, 780px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-transparent bg-chrome-fill text-text-dim transition-all duration-150 hover:border-chrome-border hover:bg-chrome-fill-active hover:text-text-muted touch-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
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
            <div className="overflow-y-auto scrollbar-thin h-full" style={{ maxHeight: 'min(88dvh, 780px)' }}>
              <CreditsScrollContent locale={locale} onOpenSupport={onOpenSupport} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});
