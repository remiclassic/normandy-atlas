import { atlasEras, DEFAULT_ATLAS_ERA_ID } from '@/data/atlas/eras';
import type { AtlasEra, EraTransition } from '@/core/types';

const eraMap = new Map<string, AtlasEra>(atlasEras.map((e) => [e.id, e]));

export function getAtlasEra(eraId: string): AtlasEra | undefined {
  return eraMap.get(eraId);
}

export function getAtlasEras(): AtlasEra[] {
  return atlasEras;
}

export function getAtlasEraIds(): string[] {
  return atlasEras.map((e) => e.id);
}

export function getDefaultAtlasEraId(): string {
  return DEFAULT_ATLAS_ERA_ID;
}

export function getAvailableTransitions(eraId: string): EraTransition[] {
  return eraMap.get(eraId)?.transitions ?? [];
}

export function isValidAtlasEra(eraId: string): boolean {
  return eraMap.has(eraId);
}

export function getEraLabel(eraId: string, lang: 'en' | 'fr' = 'en'): string {
  const era = eraMap.get(eraId);
  if (!era) return eraId;
  return era.label[lang];
}

export function getEraRange(eraId: string): { start: number; end: number } | undefined {
  return eraMap.get(eraId)?.range;
}
