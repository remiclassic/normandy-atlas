'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { pickI18n } from '@/lib/locale';
import { publicAssetUrl } from '@/lib/public-asset-url';
import { t } from '@/lib/ui-strings';
import type { StoryBeatIllustration as IllustrationMeta } from '@/core/types';
import type { AtlasLocale } from '@/core/types';

interface Props {
  illustration: IllustrationMeta;
  locale: AtlasLocale;
}

export default memo(function StoryBeatIllustration({ illustration, locale }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const src = publicAssetUrl(illustration.src);
  const alt = pickI18n(illustration.alt, locale);
  const credit = illustration.credit ? pickI18n(illustration.credit, locale) : null;

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  return (
    <>
      {/* Inline preview */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="group relative w-full aspect-[16/9] overflow-hidden rounded-lg border border-border/30 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={t('story.illustration.enlarge', locale)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H3a1 1 0 00-1 1v3m8-4h3a1 1 0 011 1v3m0 4v3a1 1 0 01-1 1h-3M2 10v3a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('story.illustration.enlarge', locale)}
        </span>
      </button>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex max-h-[85vh] max-w-[92vw] flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-h-[75vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              />
              {credit && (
                <p className="mt-3 max-w-[90vw] text-center text-[11px] leading-relaxed text-white/60">
                  {credit}
                </p>
              )}
            </motion.div>

            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={t('story.illustration.close', locale)}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
