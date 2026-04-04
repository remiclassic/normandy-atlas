'use client';

import { useHydrateLocale, useHydrateUiTheme, useHydrateTextSize, useHydrateReduceMotion, useHydrateHighContrast } from '@/hooks/use-atlas';

/** Runs locale/theme/text-size/reduce-motion/high-contrast hydration once for every route (avoids SSR mismatch + duplicate hooks in shells). */
export default function ClientBootstrap(): null {
  useHydrateLocale();
  useHydrateUiTheme();
  useHydrateTextSize();
  useHydrateReduceMotion();
  useHydrateHighContrast();
  return null;
}
