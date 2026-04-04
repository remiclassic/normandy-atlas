'use client';

import {
  useHydrateLocale,
  useHydrateUiTheme,
  useHydrateBasemapMode,
  useHydrateTextSize,
  useHydrateReduceMotion,
  useHydrateHighContrast,
} from '@/hooks/use-atlas-hydration';
import { useUiThemeAuto } from '@/hooks/use-ui-theme-auto';
import { useBasemapAuto } from '@/hooks/use-basemap-auto';

/** Runs locale/theme/text-size/reduce-motion/high-contrast hydration once for every route (avoids SSR mismatch + duplicate hooks in shells). */
export default function ClientBootstrap(): null {
  useHydrateLocale();
  useHydrateUiTheme();
  useHydrateBasemapMode();
  useUiThemeAuto();
  useBasemapAuto();
  useHydrateTextSize();
  useHydrateReduceMotion();
  useHydrateHighContrast();
  return null;
}
