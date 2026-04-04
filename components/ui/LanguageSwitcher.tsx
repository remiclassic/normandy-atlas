'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { ENABLED_UI_LOCALES, LOCALE_LABELS } from '@/lib/locale';
import type { AtlasLocale } from '@/core/types';

const MENU_WIDTH = 130;

function LanguageSwitcher() {
  const locale = useMapStore((s) => s.locale);
  const setLocale = useMapStore((s) => s.setLocale);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const toggle = useCallback(() => {
    if (!open && btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen((v) => !v);
  }, [open]);

  const select = useCallback(
    (code: AtlasLocale) => {
      setLocale(code);
      setOpen(false);
    },
    [setLocale],
  );

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
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onClickOutside, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousedown', onClickOutside, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [open]);

  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => { setPortalReady(true); }, []);

  const dropdown =
    portalReady && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {open && rect ? (
              <motion.ul
                ref={menuRef}
                initial={{ opacity: 0, y: -4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                role="listbox"
                aria-label="Languages"
                className="fixed z-[9999] min-w-[130px] overflow-hidden rounded-lg border border-chrome-border-strong bg-chrome-popover py-1"
                style={{
                  left: Math.max(
                    8,
                    Math.min(
                      rect.right - MENU_WIDTH,
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
                {ENABLED_UI_LOCALES.map((code) => (
                  <li key={code} role="option" aria-selected={code === locale}>
                    <button
                      type="button"
                      onClick={() => select(code)}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-[12px] transition-colors duration-150 ${
                        code === locale
                          ? 'bg-gold/[0.08] text-gold'
                          : 'text-text-muted hover:bg-chrome-fill hover:text-parchment'
                      }`}
                    >
                      <span className="w-5 text-[10px] font-semibold uppercase tracking-wide opacity-50">
                        {code}
                      </span>
                      {LOCALE_LABELS[code]}
                    </button>
                  </li>
                ))}
              </motion.ul>
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
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 rounded-full border border-chrome-border-strong bg-chrome-fill px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-parchment/80 backdrop-blur-sm transition-all duration-200 hover:border-gold/30 hover:text-parchment"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {locale.toUpperCase()}
        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" className="opacity-40">
          <path d="M1.5 3L4 5.5L6.5 3" />
        </svg>
      </button>
      {dropdown}
    </>
  );
}

export default memo(LanguageSwitcher);
