'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useMapStore } from '@/lib/store';
import { useAncestryStore } from '@/lib/ancestry-store';
import { readMapBounds } from '@/lib/map-view-reader';
import { getAtlasEra } from '@/core/era/engine';
import { getAtlasRegion } from '@/core/regions/engine';
import { getPlaceEraState } from '@/core/places/engine';
import { getPerson } from '@/core/people/engine';
import { getSegment, getJourney } from '@/core/routes/engine';
import { getNormanSiteArticle } from '@/data/norman-expansion/site-articles';
import { pickI18n } from '@/lib/locale';
import { listRegionIdsIntersectingBounds } from '@/lib/command-palette/regions-in-bounds';
import { regionsGeoJsonForCommandPalette } from '@/lib/command-palette/regions-geo-for-era';
import type {
  CommandContext,
  CommandAtlasMode,
  CommandRegionSummary,
  CommandSelectedEntity,
} from '@/lib/command-palette/types';
import type { AtlasLocale } from '@/core/types';
import type { SelectionKind } from '@/types';

function deriveMode(pathname: string, storyMode: boolean): CommandAtlasMode {
  if (storyMode) return 'story';
  if (pathname.startsWith('/ancestry') || pathname.startsWith('/lineage-explorer')) {
    return 'genealogy';
  }
  return 'explore';
}

function labelForSelection(
  id: string,
  kind: SelectionKind,
  eraId: string,
  locale: AtlasLocale,
): CommandSelectedEntity {
  const fallback = id;
  const label = (() => {
    switch (kind) {
      case 'region': {
        const r = getAtlasRegion(id);
        return r ? pickI18n(r.name, locale) : fallback;
      }
      case 'settlement':
      case 'evidence':
      case 'prehistoric-site': {
        const st = getPlaceEraState(id, eraId);
        return st?.label ?? fallback;
      }
      case 'norman-site': {
        const art = getNormanSiteArticle(id);
        if (!art) return fallback;
        return art.id
          .replace(/^node-/, '')
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      }
      case 'atlas-person':
        return getPerson(id)?.displayName ?? fallback;
      case 'atlas-route': {
        const seg = getSegment(id);
        if (!seg) return fallback;
        if (seg.segmentTooltip) return pickI18n(seg.segmentTooltip, locale);
        if (seg.segmentDetail) return pickI18n(seg.segmentDetail, locale);
        return fallback;
      }
      case 'atlas-journey': {
        const j = getJourney(id);
        return j ? pickI18n(j.name, locale) : fallback;
      }
      case 'historical-macro-region': {
        const r = getAtlasRegion(id);
        return r ? pickI18n(r.name, locale) : fallback;
      }
      default:
        return fallback;
    }
  })();

  return { id, kind, label };
}

export function useCommandContext(): CommandContext {
  const pathname = usePathname() ?? '';
  const locale = useMapStore((s) => s.locale);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const eraId = useMapStore((s) => s.eraId);
  const atlasSimYear = useMapStore((s) => s.atlasSimYear);
  const storyMode = useMapStore((s) => s.storyMode);
  const storyArc = useMapStore((s) => s.storyArc);
  const storyStepIndex = useMapStore((s) => s.storyStepIndex);
  const selectedFeatureId = useMapStore((s) => s.selectedFeatureId);
  const selectionKind = useMapStore((s) => s.selectionKind);

  const yDnaRaw = useAncestryStore((s) => s.profile.yDnaRaw);
  const mtDnaRaw = useAncestryStore((s) => s.profile.mtDnaRaw);

  return useMemo(() => {
    const currentEra = atlasMode ? getAtlasEra(eraId) ?? null : null;
    const mode = deriveMode(pathname, storyMode);
    const viewportBounds = readMapBounds();

    const fc = regionsGeoJsonForCommandPalette(eraId, atlasSimYear, atlasMode);
    const idsInView = viewportBounds ? listRegionIdsIntersectingBounds(fc, viewportBounds, 8) : [];

    const regionsInViewport: CommandRegionSummary[] = idsInView.map((rid) => {
      const r = getAtlasRegion(rid);
      return { id: rid, label: r ? pickI18n(r.name, locale) : rid };
    });

    let currentRegion: CommandRegionSummary | null = null;
    if (selectionKind === 'region' && selectedFeatureId) {
      const r = getAtlasRegion(selectedFeatureId);
      currentRegion = {
        id: selectedFeatureId,
        label: r ? pickI18n(r.name, locale) : selectedFeatureId,
      };
    } else if (regionsInViewport.length > 0) {
      currentRegion = regionsInViewport[0];
    }

    const selectedEntity =
      selectedFeatureId && selectionKind
        ? labelForSelection(selectedFeatureId, selectionKind, eraId, locale)
        : null;

    const y = yDnaRaw?.trim();
    const m = mtDnaRaw?.trim();
    const userHaplogroup =
      [y && `Y-${y}`, m && `mt-${m}`].filter(Boolean).join(' · ') || undefined;

    return {
      locale,
      atlasMode,
      eraId,
      currentEra,
      mode,
      pathname,
      viewportBounds,
      regionsInViewport,
      currentRegion,
      selectedEntity,
      userHaplogroup,
      selectedFeatureId,
      selectionKind,
      storyMode,
      storyArc,
      storyStepIndex,
    };
  }, [
    locale,
    atlasMode,
    eraId,
    atlasSimYear,
    storyMode,
    storyArc,
    storyStepIndex,
    pathname,
    selectedFeatureId,
    selectionKind,
    yDnaRaw,
    mtDnaRaw,
  ]);
}
