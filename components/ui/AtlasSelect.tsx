'use client';

import { memo, useCallback, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export type AtlasSelectOption = { value: string; label: string };

type AtlasSelectProps = {
  value: string;
  onValueChange: (next: string) => void;
  options: readonly AtlasSelectOption[];
  /** Classes for the trigger (closed state), e.g. width + chrome field look */
  triggerClassName?: string;
  /** Accessible name when not wrapped in a <label> */
  'aria-label'?: string;
};

const defaultTriggerClass =
  'mt-1 flex w-full items-center justify-between gap-2 rounded-md border border-chrome-border bg-chrome-fill-raised px-2 py-1.5 text-left text-[12px] text-parchment focus:border-gold/35 focus:outline-none';

function AtlasSelectInner({
  value,
  onValueChange,
  options,
  triggerClassName = defaultTriggerClass,
  'aria-label': ariaLabel,
}: AtlasSelectProps) {
  const listId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const optionValuesKey = options.map((o) => o.value).join('|');

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const selectedLabel = options[selectedIndex]?.label ?? value;

  const close = useCallback(() => {
    setOpen(false);
    btnRef.current?.focus();
  }, []);

  const pick = useCallback(
    (v: string) => {
      onValueChange(v);
      setOpen(false);
      btnRef.current?.focus();
    },
    [onValueChange],
  );

  const toggle = useCallback(() => {
    setOpen((was) => {
      const next = !was;
      if (next && btnRef.current) setRect(btnRef.current.getBoundingClientRect());
      return next;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const updateRect = () => {
      if (btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const idx = Math.max(0, optionsRef.current.findIndex((o) => o.value === value));
    setActiveIndex(idx);
    const id = requestAnimationFrame(() => optionRefs.current[idx]?.focus());
    return () => cancelAnimationFrame(id);
  }, [open, value, optionValuesKey]);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        listRef.current?.contains(e.target as Node) ||
        btnRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener('mousedown', onClickOutside, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousedown', onClickOutside, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [close, open]);

  const onTriggerKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        if (btnRef.current) setRect(btnRef.current.getBoundingClientRect());
        setOpen(true);
      }
    },
    [open],
  );

  const onListKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (options.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => {
          const n = Math.min(i + 1, options.length - 1);
          requestAnimationFrame(() => optionRefs.current[n]?.focus());
          return n;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => {
          const n = Math.max(i - 1, 0);
          requestAnimationFrame(() => optionRefs.current[n]?.focus());
          return n;
        });
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveIndex(0);
        requestAnimationFrame(() => optionRefs.current[0]?.focus());
      } else if (e.key === 'End') {
        e.preventDefault();
        const last = options.length - 1;
        setActiveIndex(last);
        requestAnimationFrame(() => optionRefs.current[last]?.focus());
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const i = activeIndexRef.current;
        const opt = options[i];
        if (opt) pick(opt.value);
      }
    },
    [options, pick],
  );

  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => {
    setPortalReady(true);
  }, []);

  const dropdown =
    portalReady && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {open && rect ? (
              <motion.div
                ref={listRef}
                key="atlas-select-list"
                id={listId}
                role="listbox"
                aria-label={ariaLabel}
                tabIndex={-1}
                onKeyDown={onListKeyDown}
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.14 }}
                className="fixed z-[9999] overflow-hidden rounded-lg border border-chrome-border-strong bg-chrome-popover py-1 shadow-[0_8px_32px_var(--color-chrome-tooltip-shadow),0_0_0_1px_var(--color-chrome-tooltip-ring)]"
                style={{
                  left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)),
                  top: rect.bottom + 4,
                  width: Math.min(Math.max(rect.width, 140), window.innerWidth - 16),
                  backdropFilter: 'blur(24px) saturate(1.2)',
                }}
              >
                {options.map((opt, i) => {
                  const selected = opt.value === value;
                  const active = i === activeIndex;
                  return (
                    <button
                      key={opt.value}
                      ref={(el) => {
                        optionRefs.current[i] = el;
                      }}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      tabIndex={-1}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => pick(opt.value)}
                      className={`flex w-full px-2.5 py-2 text-left text-[12px] transition-colors duration-150 ${
                        selected
                          ? 'bg-gold/[0.08] font-medium text-gold'
                          : active
                            ? 'bg-chrome-fill-hover text-parchment'
                            : 'text-text-muted hover:bg-chrome-fill-hover hover:text-parchment'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
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
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
        className={triggerClassName}
      >
        <span className="min-w-0 flex-1 truncate">{selectedLabel}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
          aria-hidden
        />
      </button>
      {dropdown}
    </>
  );
}

export default memo(AtlasSelectInner);
