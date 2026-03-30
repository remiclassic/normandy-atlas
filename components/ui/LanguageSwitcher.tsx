'use client';

import { memo, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { ENABLED_UI_LOCALES, LOCALE_LABELS } from '@/lib/locale';
import type { AtlasLocale } from '@/core/types';

function LanguageSwitcher() {
  const locale = useMapStore((s) => s.locale);
  const setLocale = useMapStore((s) => s.setLocale);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  const select = useCallback(
    (code: AtlasLocale) => {
      setLocale(code);
      setOpen(false);
    },
    [setLocale],
  );

  const handleBlur = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  const handleFocus = useCallback(() => {
    clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div
      className="relative inline-flex"
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label="Select language"
        aria-expanded={open}
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

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            aria-label="Languages"
            className="absolute right-0 top-full mt-1.5 z-50 min-w-[130px] overflow-hidden rounded-lg border border-chrome-border bg-chrome-popover backdrop-blur-md shadow-atlas-popover"
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
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(LanguageSwitcher);
