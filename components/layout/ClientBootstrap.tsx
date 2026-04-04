'use client';

import { useHydrateLocale, useHydrateUiTheme, useHydrateTextSize } from '@/hooks/use-atlas';

/** Runs locale/theme/text-size hydration once for every route (avoids SSR mismatch + duplicate hooks in shells). */
export default function ClientBootstrap(): null {
  useHydrateLocale();
  useHydrateUiTheme();
  useHydrateTextSize();
  return null;
}
