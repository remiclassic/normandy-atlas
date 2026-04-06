import type { I18nString } from '@/core/types';

/** Editorial metadata for the Historical peoples (macro) dataset. */
export const historicalMacroRegionsDatasetMeta = {
  lastReviewed: '2026-04-06',
  methodologyBlurb: {
    en: 'Macro-region polygons are interpretive summaries for teaching, not surveyed borders. Prominence weights are atlas editorial estimates keyed to chronology and provenance tags — never genetic percentages.',
    fr: 'Les polygones de macro-régions sont des synthèses interprétatives pour l’enseignement, pas des frontières levées. Les pondérations de proéminence sont des estimations éditoriales de l’atlas liées à la chronologie et aux étiquettes de provenance — jamais des pourcentages génétiques.',
  } satisfies I18nString,
} as const;
