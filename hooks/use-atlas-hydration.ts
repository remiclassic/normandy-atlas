'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useMapStore } from '@/lib/store';
import { readStoredLocale } from '@/lib/locale';
import { readStoredUiTheme, applyUiThemeToDocument } from '@/lib/ui-theme';
import { readStoredTextSize, applyTextSizeToDocument } from '@/lib/text-size';
import {
  readStoredReduceMotionForced,
  computeEffectiveReducedMotion,
  applyReducedMotionToDocument,
} from '@/lib/reduced-motion';
import { readStoredHighContrast, applyHighContrastToDocument } from '@/lib/high-contrast';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Hydrate locale from localStorage once on the client — call in a top-level shell. */
export function useHydrateLocale(): void {
  const setLocale = useMapStore((s) => s.setLocale);
  useIsoLayoutEffect(() => {
    const stored = readStoredLocale();
    if (stored !== useMapStore.getState().locale) {
      setLocale(stored);
    }
  }, [setLocale]);
}

/** Sync UI theme from localStorage with Zustand (blocking script already set `data-ui-theme`). */
export function useHydrateUiTheme(): void {
  useIsoLayoutEffect(() => {
    const stored = readStoredUiTheme();
    applyUiThemeToDocument(stored);
    useMapStore.setState({ uiTheme: stored });
  }, []);
}

/** Sync text-size preference from localStorage with Zustand (blocking script already set classList). */
export function useHydrateTextSize(): void {
  useIsoLayoutEffect(() => {
    const stored = readStoredTextSize();
    applyTextSizeToDocument(stored);
    useMapStore.setState({ textSize: stored });
  }, []);
}

/** Sync reduced-motion preference + subscribe to OS changes so the html class stays current. */
export function useHydrateReduceMotion(): void {
  useIsoLayoutEffect(() => {
    const forced = readStoredReduceMotionForced();
    applyReducedMotionToDocument(computeEffectiveReducedMotion(forced));
    useMapStore.setState({ reduceMotionForced: forced });

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onchange = () => {
      const f = useMapStore.getState().reduceMotionForced;
      applyReducedMotionToDocument(computeEffectiveReducedMotion(f));
    };
    mql.addEventListener('change', onchange);
    return () => mql.removeEventListener('change', onchange);
  }, []);
}

/** Sync high-contrast preference from localStorage with Zustand (blocking script already set dataset). */
export function useHydrateHighContrast(): void {
  useIsoLayoutEffect(() => {
    const stored = readStoredHighContrast();
    applyHighContrastToDocument(stored);
    useMapStore.setState({ highContrast: stored });
  }, []);
}
