'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { pickI18n } from '@/lib/locale';
import { publicAssetUrl } from '@/lib/public-asset-url';
import { t } from '@/lib/ui-strings';
import type { StoryBeatIllustration as IllustrationMeta } from '@/core/types';
import type { AtlasLocale } from '@/core/types';

// ─── Gallery lightbox (multi-item) ──────────────────────────────────

interface GalleryItem {
  src: string;
  alt: string;
  credit: string | null;
}

interface GalleryLightboxProps {
  open: boolean;
  items: GalleryItem[];
  index: number;
  locale: AtlasLocale;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export const IllustrationGalleryLightbox = memo(function IllustrationGalleryLightbox({
  open,
  items,
  index,
  locale,
  onIndexChange,
  onClose,
}: GalleryLightboxProps) {
  const total = items.length;
  const item = items[index] ?? items[0];

  const goPrev = useCallback(() => {
    if (index > 0) onIndexChange(index - 1);
  }, [index, onIndexChange]);

  const goNext = useCallback(() => {
    if (index < total - 1) onIndexChange(index + 1);
  }, [index, total, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, goPrev, goNext]);

  if (typeof document === 'undefined' || !item) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex max-h-[85vh] max-w-[92vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={item.src}
                src={item.src}
                alt={item.alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="max-h-[75vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              />
            </AnimatePresence>

            {item.credit && (
              <p className="mt-3 max-w-[90vw] text-center text-[11px] leading-relaxed text-white/60">
                {item.credit}
              </p>
            )}

            {total > 1 && (
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={index === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-150"
                  aria-label="Previous image"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className="text-[12px] text-white/60 tabular-nums">
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={index === total - 1}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-150"
                  aria-label="Next image"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label={t('story.illustration.close', locale)}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});

// ─── Legacy single-image lightbox (kept for non-gallery callers) ────

interface LightboxProps {
  open: boolean;
  src: string;
  alt: string;
  credit: string | null;
  locale: AtlasLocale;
  onClose: () => void;
}

export const IllustrationLightbox = memo(function IllustrationLightbox(props: LightboxProps) {
  const item: GalleryItem = { src: props.src, alt: props.alt, credit: props.credit };
  return (
    <IllustrationGalleryLightbox
      open={props.open}
      items={[item]}
      index={0}
      locale={props.locale}
      onIndexChange={() => {}}
      onClose={props.onClose}
    />
  );
});

// ─── Inline trigger (full-width 16:9 preview in story bar) ──────────

interface Props {
  illustration: IllustrationMeta;
  locale: AtlasLocale;
  /** Total slides for this beat (shows "+N" badge when > 1). */
  slideCount?: number;
  /** When set, clicking opens the gallery via this callback instead of the local lightbox. */
  onOpenOverride?: () => void;
}

export default memo(function StoryBeatIllustration({ illustration, locale, slideCount, onOpenOverride }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const src = publicAssetUrl(illustration.src);
  const alt = pickI18n(illustration.alt, locale);
  const credit = illustration.credit ? pickI18n(illustration.credit, locale) : null;

  const handleOpen = useCallback(() => {
    if (onOpenOverride) {
      onOpenOverride();
    } else {
      setOpen(true);
    }
  }, [onOpenOverride]);

  const handleClose = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <>
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
        {(slideCount ?? 0) > 1 && (
          <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white/90 pointer-events-none">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <rect x="5" y="1" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
            {slideCount}
          </span>
        )}
      </button>

      {!onOpenOverride && (
        <IllustrationLightbox
          open={open}
          src={src}
          alt={alt}
          credit={credit}
          locale={locale}
          onClose={handleClose}
        />
      )}
    </>
  );
});

// ─── Map pin trigger (compact thumbnail for MapLibre marker) ────────

interface MapPinProps {
  illustration: IllustrationMeta;
  locale: AtlasLocale;
  /** When set, clicking calls this instead of opening a local lightbox. */
  onOpenOverride?: () => void;
}

export const StoryBeatMapPin = memo(function StoryBeatMapPin({ illustration, locale, onOpenOverride }: MapPinProps) {
  const [open, setOpen] = useState(false);

  const src = publicAssetUrl(illustration.src);
  const alt = pickI18n(illustration.alt, locale);
  const credit = illustration.credit ? pickI18n(illustration.credit, locale) : null;

  const handleOpen = useCallback(() => {
    if (onOpenOverride) {
      onOpenOverride();
    } else {
      setOpen(true);
    }
  }, [onOpenOverride]);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="group relative w-12 h-12 rounded-lg overflow-hidden border-2 border-gold/50 hover:border-gold shadow-lg cursor-zoom-in transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        aria-label={alt}
        style={{ pointerEvents: 'auto' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-200" />
        <svg
          className="absolute bottom-0.5 right-0.5 opacity-0 group-hover:opacity-80 transition-opacity duration-200 drop-shadow"
          width="10" height="10" viewBox="0 0 16 16" fill="none"
        >
          <path d="M6 2H3a1 1 0 00-1 1v3m8-4h3a1 1 0 011 1v3m0 4v3a1 1 0 01-1 1h-3M2 10v3a1 1 0 001 1h3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {!onOpenOverride && (
        <IllustrationLightbox
          open={open}
          src={src}
          alt={alt}
          credit={credit}
          locale={locale}
          onClose={handleClose}
        />
      )}
    </>
  );
});
