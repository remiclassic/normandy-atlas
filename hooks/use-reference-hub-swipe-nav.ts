'use client';

import { useLayoutEffect, type RefObject } from 'react';

/**
 * Previously: horizontal swipe on mobile to switch hub tabs. Hub chrome now uses a bottom tab bar
 * on narrow viewports, so this hook is a deliberate no-op (call sites kept for API stability).
 */
export function useReferenceHubSwipeNav(
  _containerRef: RefObject<HTMLElement | null>,
  _options?: { disabled?: boolean },
) {
  useLayoutEffect(() => {}, []);
}
