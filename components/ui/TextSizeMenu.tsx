'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import type { UiStringKey } from '@/lib/ui-strings';
import type { TextSizeMode } from '@/lib/text-size';
import { readStoredTextSize, persistTextSize, applyTextSizeToDocument } from '@/lib/text-size';

const MENU_WIDTH = 200;

interface TextSizeMenuProps {
  /** When true, the menu trigger + dropdown is rendered standalone (no Zustand). Used in the journal page. */
  standalone?: boolean;
}

function TextSizeMenuInner({ standalone }: TextSizeMenuProps) {
  const locale = useLocale();
  const textSizeFromStore = useMapStore((s) => s.textSize);
  const setTextSizeStore = useMapStore((s) => s.setTextSize);

  const [standaloneMode, setStandaloneMode] = useState<TextSizeMode>('standard');

  useEffect(() => {
    if (!standalone) return;
    setStandaloneMode(readStoredTextSize());
  }, [standalone]);

  const textSize = standalone ? standaloneMode : textSizeFromStore;

  const setTextSize = useCallback(
    (mode: TextSizeMode) => {
      if (standalone) {
        persistTextSize(mode);
        applyTextSizeToDocument(mode);
        setStandaloneMode(mode);
      } else {
        setTextSizeStore(mode);
      }
    },
    [standalone, setTextSizeStore],
  );

  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const toggle = useCallback(() => {
    if (!open && btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen((v) => !v);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current?.contains(e.target as Node) ||
        btnRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousedown', onClickOutside, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [open]);

  const pick = useCallback(
    (mode: TextSizeMode) => {
      setTextSize(mode);
      setOpen(false);
    },
    [setTextSize],
  );

  const options: { mode: TextSizeMode; labelKey: UiStringKey }[] = [
    { mode: 'standard', labelKey: 'textSize.standard' },
    { mode: 'large', labelKey: 'textSize.large' },
  ];

  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => { setPortalReady(true); }, []);

  const dropdown =
    portalReady && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {open && rect ? (
              <motion.div
                ref={menuRef}
                key="text-size-menu"
                role="menu"
                aria-label={t('textSize.tooltip.label', locale)}
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.14 }}
                className="fixed z-[9999] rounded-lg border border-chrome-border-strong bg-chrome-popover py-1"
                style={{
                  left: Math.max(
                    8,
                    Math.min(
                      rect.left + rect.width / 2 - MENU_WIDTH / 2,
                      window.innerWidth - MENU_WIDTH - 8,
                    ),
                  ),
                  top: rect.bottom + 6,
                  width: MENU_WIDTH,
                  backdropFilter: 'blur(24px) saturate(1.2)',
                  boxShadow:
                    '0 8px 32px var(--color-chrome-tooltip-shadow), 0 0 0 1px var(--color-chrome-tooltip-ring)',
                }}
              >
                {options.map(({ mode, labelKey }) => (
                  <button
                    key={mode}
                    type="button"
                    role="menuitem"
                    onClick={() => pick(mode)}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left transition-colors hover:bg-chrome-fill-hover"
                  >
                    <span className="w-4 shrink-0">
                      {textSize === mode && (
                        <Check className="h-3.5 w-3.5 text-gold" strokeWidth={2} aria-hidden />
                      )}
                    </span>
                    <span
                      className={`text-[12px] ${textSize === mode ? 'font-semibold text-parchment' : 'text-text-muted'}`}
                    >
                      {t(labelKey, locale)}
                    </span>
                  </button>
                ))}

                <div className="mx-2.5 my-1 h-px bg-chrome-divider" />

                <div className="flex w-full items-center gap-2 px-3 py-1.5 opacity-40 cursor-default" aria-disabled="true">
                  <span className="w-4 shrink-0" />
                  <span className="text-[11px] text-text-dim">{t('textSize.highContrast', locale)}</span>
                </div>
                <div className="flex w-full items-center gap-2 px-3 py-1.5 opacity-40 cursor-default" aria-disabled="true">
                  <span className="w-4 shrink-0" />
                  <span className="text-[11px] text-text-dim">{t('textSize.reducedMotion', locale)}</span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('textSize.tooltip.label', locale)}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
          open
            ? 'bg-chrome-fill-pressed text-parchment border-gold/35'
            : 'text-text-muted border-transparent hover:bg-chrome-fill-hover hover:text-text'
        }`}
      >
        <span className="text-[13px] font-semibold leading-none select-none" aria-hidden>
          Aa
        </span>
      </button>
      {dropdown}
    </>
  );
}

export default memo(TextSizeMenuInner);
