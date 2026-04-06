'use client';

import { memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { AtlasLocale } from '@/core/types';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { getNormanOverviewForLocale, type NormanOverviewSection } from '@/lib/norman-overview';

function SectionBlock({
  section,
  blockKey,
}: {
  section: NormanOverviewSection;
  blockKey: string;
}) {
  return (
    <section className="mb-10">
      {section.heading ? (
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">{section.heading}</h3>
      ) : null}
      {section.paragraphs.map((p, i) => (
        <p
          key={`${blockKey}-p-${i}`}
          className="text-[13px] leading-relaxed text-text-muted mt-3 first:mt-0"
        >
          {p}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 ? (
        <ul className="list-disc pl-5 text-[13px] leading-relaxed text-text-muted space-y-2 mt-3">
          {section.bullets.map((item, bi) => (
            <li key={`${blockKey}-li-${bi}`}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.paragraphsAfterBullets?.map((p, i) => (
        <p
          key={`${blockKey}-after-${i}`}
          className="text-[13px] leading-relaxed text-text-muted mt-3"
        >
          {p}
        </p>
      ))}
      {section.relatedLink ? (
        <p className="mt-4 text-[13px] leading-relaxed text-text-muted">
          <Link
            href={section.relatedLink.href}
            className="font-medium text-gold/90 underline decoration-gold/25 underline-offset-2 hover:text-gold"
          >
            {section.relatedLink.label}
          </Link>
        </p>
      ) : null}
    </section>
  );
}

const NormanOverviewScrollContent = memo(function NormanOverviewScrollContent({
  locale,
}: {
  locale: AtlasLocale;
}) {
  const { title, subtitle, sections } = getNormanOverviewForLocale(locale);

  return (
    <div className="px-6 pb-8 pt-14 sm:px-8 sm:pb-10">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1">
        {t('normanOverview.sectionLabel', locale)}
      </p>
      <h2
        id="norman-overview-dialog-title"
        className="font-display text-xl font-semibold leading-snug text-parchment sm:text-2xl mb-1"
      >
        {title}
      </h2>
      <p className="text-[13px] font-medium text-parchment/85 leading-snug mb-6">{subtitle}</p>

      <div className="accent-line-gold mb-8 opacity-80" />

      {sections.map((section, index) => {
        const blockKey = section.heading ?? `lead-${index}`;
        return <SectionBlock key={blockKey} blockKey={blockKey} section={section} />;
      })}

      <div className="accent-line-gold mb-6 opacity-60" />
      <Link
        href="/journal#norman-surnames"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-gold hover:text-gold-bright transition-colors"
      >
        <BookOpen className="h-[14px] w-[14px]" strokeWidth={1.5} />
        {locale === 'fr' ? 'Explorer les patronymes normands →' : 'Explore Norman names →'}
      </Link>
    </div>
  );
});

export const NormanOverviewIconButton = memo(function NormanOverviewIconButton({
  onOpen,
  ariaLabel,
  className: extraClassName,
}: {
  onOpen: () => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-muted/70 transition-colors duration-200 hover:bg-chrome-fill ${extraClassName || 'hover:text-parchment'}`}
      aria-label={ariaLabel}
    >
      <BookOpen className="h-[14px] w-[14px]" strokeWidth={1.5} aria-hidden />
    </button>
  );
});

export const NormanOverviewModal = memo(function NormanOverviewModal({
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
          key="norman-overview-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(8,10,14,0.72)] p-0 sm:p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="norman-overview-dialog-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-chrome-border-strong glass-panel-elevated shadow-atlas-modal max-sm:rounded-none max-sm:border-0 max-sm:max-w-none max-sm:h-full"
            style={{ maxHeight: 'min(90dvh, 820px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-transparent bg-chrome-fill text-text-dim transition-all duration-150 hover:border-chrome-border hover:bg-chrome-fill-active hover:text-text-muted touch-target"
              aria-label={t('normanOverview.aria.close', locale)}
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
            <div className="overflow-y-auto scrollbar-thin h-full" style={{ maxHeight: 'min(90dvh, 820px)' }}>
              <NormanOverviewScrollContent locale={locale} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});
