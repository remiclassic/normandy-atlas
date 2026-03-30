'use client';

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

const TOOLTIP_WIDTH = 220;

export const ChromeIconTooltip = memo(function ChromeIconTooltip({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const updateRect = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    setRect(el.getBoundingClientRect());
  }, []);

  const show = useCallback(() => {
    clearHideTimer();
    updateRect();
    setVisible(true);
  }, [clearHideTimer, updateRect]);

  const scheduleHide = useCallback(() => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      hideTimerRef.current = null;
      setVisible(false);
    }, 100);
  }, [clearHideTimer]);

  useEffect(() => () => clearHideTimer(), [clearHideTimer]);

  useEffect(() => {
    if (!visible) return;
    const onScrollOrResize = () => updateRect();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [visible, updateRect]);

  const onBlurCapture = useCallback(
    (e: React.FocusEvent<HTMLSpanElement>) => {
      const next = e.relatedTarget as Node | null;
      if (next && wrapRef.current?.contains(next)) return;
      scheduleHide();
    },
    [scheduleHide],
  );

  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => {
    setPortalReady(true);
  }, []);

  const tip =
    portalReady && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {visible && rect ? (
              <motion.div
                key="chrome-tip"
                initial={{ opacity: 0, y: -4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.96 }}
                transition={{ duration: 0.12 }}
                role="tooltip"
                className="pointer-events-none fixed z-[9999] rounded-lg border border-white/[0.08] px-3.5 py-2.5"
                style={{
                  left: Math.max(
                    8,
                    Math.min(
                      rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2,
                      window.innerWidth - TOOLTIP_WIDTH - 8,
                    ),
                  ),
                  top: rect.bottom + 8,
                  width: TOOLTIP_WIDTH,
                  background: 'rgba(13, 15, 22, 0.97)',
                  backdropFilter: 'blur(24px) saturate(1.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                <p className="text-[12px] font-semibold leading-tight text-parchment">{label}</p>
                {hint ? (
                  <p className="mt-1.5 text-[10px] leading-snug text-text-dim/70">{hint}</p>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <span
        ref={wrapRef}
        className="inline-flex items-center"
        onPointerEnter={show}
        onPointerLeave={scheduleHide}
        onFocusCapture={show}
        onBlurCapture={onBlurCapture}
      >
        {children}
      </span>
      {tip}
    </>
  );
});
