import { atlasEras } from '@/data/atlas/eras';
import { eras } from '@/data/eras';
import { normanAtlanticStory } from '@/data/stories';
import type { AtlasLocale } from '@/core/types';
import type { NormandyStoryFigure } from '@/types';
import { pickI18n } from '@/lib/locale';

const eraLabelCache = new Map<string, string>();

export function resolveNormandyFigureEraLabel(figure: NormandyStoryFigure, locale: AtlasLocale): string {
  const cacheKey = `${figure.eraSource}:${figure.eraId}:${locale}`;
  const hit = eraLabelCache.get(cacheKey);
  if (hit) return hit;

  let label: string;
  if (figure.eraSource === 'map') {
    label = eras.find((e) => e.id === figure.eraId)?.label ?? figure.eraId;
  } else {
    const atlas = atlasEras.find((e) => e.id === figure.eraId);
    label = atlas ? pickI18n(atlas.label, locale) : figure.eraId;
  }
  eraLabelCache.set(cacheKey, label);
  return label;
}

export function legacyAtlanticStepIndexForFigure(figure: NormandyStoryFigure): number | null {
  const id = figure.legacyAtlanticStoryStepId;
  if (!id) return null;
  const idx = normanAtlanticStory.findIndex((s) => s.id === id);
  return idx >= 0 ? idx : null;
}

export function reliabilityLabelKey(
  reliability: NormandyStoryFigure['reliability'],
): 'storyLibrary.normandyFigures.reliability.documentary' | 'storyLibrary.normandyFigures.reliability.chronicler' | 'storyLibrary.normandyFigures.reliability.legend' | 'storyLibrary.normandyFigures.reliability.composite' {
  switch (reliability) {
    case 'documentary':
      return 'storyLibrary.normandyFigures.reliability.documentary';
    case 'chronicler':
      return 'storyLibrary.normandyFigures.reliability.chronicler';
    case 'legend':
      return 'storyLibrary.normandyFigures.reliability.legend';
    default:
      return 'storyLibrary.normandyFigures.reliability.composite';
  }
}
