'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MoreHorizontal, Share2, Signpost } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { startGuidedTourFromCleanState } from '@/lib/guided-tour-ui';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';

const MENU_WIDTH = 208;

type Props = {
  onShare: () => void | Promise<void>;
  onOpenChangelog: () => void;
  storyLibraryOpen: boolean;
};

export default memo(function AtlasHeaderMoreMenu({
  onShare,
  onOpenChangelog,
  storyLibraryOpen,
}: Props) {
  const locale = useLocale();
  const phase = useMapStore((s) => s.onboardingPhase);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const showReplay = !storyLibraryOpen && phase === 'complete';

  const toggle = useCallback(() => {
    if (!open && btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen((v) => !v);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const handleReplay = useCallback(() => {
    close();
    void startGuidedTourFromCleanState('intro');
  }, [close]);

  const handleChangelog = useCallback(() => {
    close();
    onOpenChangelog();
  }, [close, onOpenChangelog]);

  const handleShare = useCallback(() => {
    close();
    void onShare();
  }, [close, onShare]);

  useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
    first?.focus();
    const onClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current?.contains(e.target as Node) ||
        btnRef.current?.contains(e.target as Node)
      )
        return;
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        btnRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onClickOutside, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousedown', onClickOutside, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [open, close]);

  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => {
    setPortalReady(true);
  }, []);

  const left =
    rect && typeof window !== 'undefined'
      ? Math.max(8, Math.min(rect.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8))
      : 0;
  const top = rect ? rect.bottom + 6 : 0;

  const dropdown =
    portalReady && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {open && rect ? (
              <motion.div
                ref={menuRef}
                key="header-more-menu"
                role="menu"
                aria-label={t('header.moreTools', locale)}
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.14 }}
                className="fixed z-[9999] overflow-hidden rounded-lg border border-chrome-border-strong bg-chrome-popover py-1"
                style={{
                  left,
                  top,
                  width: MENU_WIDTH,
                  backdropFilter: 'blur(24px) saturate(1.2)',
                  boxShadow:
                    '0 8px 32px var(--color-chrome-tooltip-shadow), 0 0 0 1px var(--color-chrome-tooltip-ring)',
                }}
              >
                {showReplay && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleReplay}
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[12px] text-text-muted transition-colors hover:bg-chrome-fill-hover hover:text-parchment"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-chrome-fill/80 text-text-dim">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                        <text
                          x="8"
                          y="11.5"
                          textAnchor="middle"
                          fill="currentColor"
                          fontSize="9"
                          fontFamily="sans-serif"
                          fontWeight="600"
                        >
                          ?
                        </text>
                      </svg>
                    </span>
                    {t('header.moreTools.replayTour', locale)}
                  </button>
                )}
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleChangelog}
                  className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[12px] text-text-muted transition-colors hover:bg-chrome-fill-hover hover:text-parchment"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-chrome-fill/80 text-emerald-300/70">
                    <Signpost className="h-[14px] w-[14px]" strokeWidth={1.5} aria-hidden />
                  </span>
                  {t('changelog.tooltip.label', locale)}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleShare}
                  className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[12px] text-text-muted transition-colors hover:bg-chrome-fill-hover hover:text-parchment"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-chrome-fill/80 text-text-dim">
                    <Share2 className="h-[14px] w-[14px]" strokeWidth={1.5} aria-hidden />
                  </span>
                  {t('shareView.tooltip.label', locale)}
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <ChromeIconTooltip
        label={t('header.moreTools', locale)}
        hint={t('header.moreTools.hint', locale)}
      >
        <button
          ref={btnRef}
          type="button"
          onClick={toggle}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={t('header.moreTools', locale)}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-text-muted/70 transition-colors duration-200 hover:bg-chrome-fill hover:text-parchment ${
            open ? 'bg-chrome-fill text-parchment' : ''
          }`}
        >
          <MoreHorizontal className="h-[15px] w-[15px]" strokeWidth={1.5} aria-hidden />
        </button>
      </ChromeIconTooltip>
      {dropdown}
    </>
  );
});
