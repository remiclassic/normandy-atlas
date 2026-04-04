'use client';

import { memo, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Signpost } from 'lucide-react';
import type { AtlasLocale } from '@/core/types';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import { atlasChangelog, changelogFootnote } from '@/data/atlas/changelog';

function formatDate(iso: string, locale: AtlasLocale): string {
  const d = new Date(iso + 'T00:00:00');
  const lang = locale === 'en' ? 'en-GB' : locale;
  return d.toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric' });
}

const ChangelogScrollContent = memo(function ChangelogScrollContent({
  locale,
}: {
  locale: AtlasLocale;
}) {
  const entries = useMemo(() => atlasChangelog, []);

  return (
    <div className="px-6 pb-8 pt-14 sm:px-8 sm:pb-10">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1">
        {t('changelog.modal.sectionLabel', locale)}
      </p>
      <h2
        id="changelog-dialog-title"
        className="font-display text-xl font-semibold leading-snug text-parchment sm:text-2xl mb-6"
      >
        {t('changelog.modal.title', locale)}
      </h2>

      <div className="accent-line-gold mb-8 opacity-80" />

      <ol className="space-y-8">
        {entries.map((entry) => (
          <li key={entry.id}>
            <time
              dateTime={entry.date}
              className="block text-[10px] font-medium uppercase tracking-[0.18em] text-gold/40 mb-1"
            >
              {formatDate(entry.date, locale)}
            </time>
            <h3 className="font-display text-[15px] font-semibold text-parchment mb-1.5">
              {pickI18n(entry.title, locale)}
            </h3>
            <p className="text-[13px] leading-relaxed text-text-muted">
              {pickI18n(entry.summary, locale)}
            </p>
          </li>
        ))}
      </ol>

      <p className="text-[12px] leading-relaxed text-text-dim border-t border-chrome-border pt-6 mt-10">
        {pickI18n(changelogFootnote, locale)}
      </p>
    </div>
  );
});

export const ChangelogIconButton = memo(function ChangelogIconButton({
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
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-dim transition-colors duration-200 hover:bg-chrome-fill hover:text-emerald-300/85"
      aria-label={ariaLabel}
    >
      <Signpost className="h-[14px] w-[14px]" strokeWidth={1.5} aria-hidden />
    </button>
  );
});

export const ChangelogModal = memo(function ChangelogModal({
  open,
  onClose,
  onSeen,
}: {
  open: boolean;
  onClose: () => void;
  /** Called once when the modal opens so the parent can mark changelog as read. */
  onSeen?: () => void;
}) {
  const locale = useLocale();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    onSeen?.();
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
  }, [open, onClose, onSeen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="changelog-backdrop"
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
            aria-labelledby="changelog-dialog-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-chrome-border-strong glass-panel-elevated shadow-atlas-modal max-sm:rounded-none max-sm:border-0 max-sm:max-w-none max-sm:h-full"
            style={{ maxHeight: 'min(90dvh, 720px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-transparent bg-chrome-fill text-text-dim transition-all duration-150 hover:border-chrome-border hover:bg-chrome-fill-active hover:text-text-muted touch-target"
              aria-label={t('changelog.aria.close', locale)}
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
            <div className="overflow-y-auto scrollbar-thin h-full" style={{ maxHeight: 'min(90dvh, 720px)' }}>
              <ChangelogScrollContent locale={locale} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});
