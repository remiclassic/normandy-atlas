'use client';

import { useSyncExternalStore, useCallback } from 'react';

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

function subscribeToMediaQuery(query: string) {
  return (cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
  };
}

function getSnapshot(query: string) {
  return () => window.matchMedia(query).matches;
}

const serverFalse = () => false;

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (cb: () => void) => subscribeToMediaQuery(query)(cb),
    [query],
  );
  const snap = useCallback(() => getSnapshot(query)(), [query]);
  return useSyncExternalStore(subscribe, snap, serverFalse);
}

export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.mobile - 1}px)`);
}

export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  );
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.tablet}px)`);
}

export function useIsLandscape(): boolean {
  return useMediaQuery('(orientation: landscape)');
}

export function useIsCompact(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.tablet - 1}px)`);
}

export type DeviceClass = 'mobile' | 'tablet' | 'desktop';

export function useDeviceClass(): DeviceClass {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  return 'desktop';
}
