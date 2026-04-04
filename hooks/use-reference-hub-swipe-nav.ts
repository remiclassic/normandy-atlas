'use client';

import { useLayoutEffect, useRef, type RefObject } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/hooks/use-atlas';
import { useIsMobile } from '@/hooks/use-responsive';
import { getReferenceHubTabDefs } from '@/lib/reference-hub-tabs';

const MIN_SWIPE_PX = 52;
/** Horizontal movement must dominate vertical (avoids firing while scrolling). */
const DOMINANCE_RATIO = 1.45;

/**
 * On narrow viewports, swipe horizontally on the scroll container to move between
 * Digital guides / Atlas Journal / Companion (same order as hub tabs).
 */
export function useReferenceHubSwipeNav(
  containerRef: RefObject<HTMLElement | null>,
  options?: { disabled?: boolean },
) {
  const router = useRouter();
  const pathname = usePathname() ?? '';
  const locale = useLocale();
  const isMobile = useIsMobile();
  const disabled = options?.disabled ?? false;

  const pathnameRef = useRef(pathname);
  const localeRef = useRef(locale);
  pathnameRef.current = pathname;
  localeRef.current = locale;

  const routerRef = useRef(router);
  routerRef.current = router;

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || !isMobile || disabled) return;

    let touchStart: { x: number; y: number } | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      touchStart = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStart;
      touchStart = null;
      if (!start || e.changedTouches.length !== 1) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;

      if (Math.abs(dx) < MIN_SWIPE_PX) return;
      if (Math.abs(dx) < Math.abs(dy) * DOMINANCE_RATIO) return;

      const tabs = getReferenceHubTabDefs(localeRef.current);
      const path = pathnameRef.current;
      const idx = tabs.findIndex((tab) => tab.match(path));
      if (idx < 0) return;

      if (dx < 0) {
        if (idx < tabs.length - 1) routerRef.current.push(tabs[idx + 1].href);
      } else if (idx > 0) {
        routerRef.current.push(tabs[idx - 1].href);
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [containerRef, isMobile, disabled]);
}
