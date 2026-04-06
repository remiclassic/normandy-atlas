import type { AncestryJourneyStep } from '@/core/ancestry/types';
import type { AtlasLocale, LineageEraLens } from '@/core/types';
import { getEraLabel } from '@/core/era/engine';
import { getPlace } from '@/core/places/engine';
import { getBeat } from '@/core/story/engine';
import { getHaplogroupProfile } from '@/core/lineage/engine';
import { layerConfigs } from '@/data/layers';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';

const layerIdToLabel = new Map<string, string>(layerConfigs.map((c) => [c.id, c.label]));

function eraLang(locale: AtlasLocale): 'en' | 'fr' {
  return locale === 'fr' ? 'fr' : 'en';
}

function resolvePlaceLabel(placeId: string | undefined): string | null {
  if (!placeId) return null;
  const p = getPlace(placeId);
  if (!p) return null;
  for (const st of Object.values(p.eraStates)) {
    if (st.label?.trim()) return st.label;
  }
  return null;
}

function getLineageLensLabel(lens: LineageEraLens, locale: AtlasLocale): string {
  switch (lens) {
    case 'deep':
      return t('ancestryJourney.lineageLens.deep', locale);
    case 'antiquity':
      return t('ancestryJourney.lineageLens.antiquity', locale);
    case 'early_medieval':
      return t('ancestryJourney.lineageLens.early_medieval', locale);
    case 'high_medieval':
      return t('ancestryJourney.lineageLens.high_medieval', locale);
    case 'colonial':
      return t('ancestryJourney.lineageLens.colonial', locale);
    default:
      return lens;
  }
}

function formatLayerPatchList(patch: Record<string, boolean>): string {
  const labels: string[] = [];
  for (const [id, on] of Object.entries(patch)) {
    if (!on) continue;
    const lbl = layerIdToLabel.get(id) ?? id;
    labels.push(lbl);
  }
  return labels.join(', ');
}

/**
 * Human-readable title + body for the ancestry journey dock for every step kind.
 */
export function getAncestryJourneyStepPresentation(
  step: AncestryJourneyStep,
  locale: AtlasLocale): { title: string; body?: string } {
  switch (step.kind) {
    case 'narrativeCard':
      return { title: step.title, body: step.body };
    case 'mapEra': {
      const title = getEraLabel(step.eraId, eraLang(locale));
      const parts: string[] = [];
      if (step.atlasSimYear != null) {
        parts.push(
          t('ancestryJourney.stepMapEraSimYear', locale).replace(
            '{year}',
            String(step.atlasSimYear),
          ),
        );
      }
      if (step.layerPatch && Object.keys(step.layerPatch).length > 0) {
        const list = formatLayerPatchList(step.layerPatch);
        if (list.length > 0) {
          parts.push(t('ancestryJourney.stepMapEraLayers', locale).replace('{layers}', list));
        }
      }
      return { title, body: parts.length > 0 ? parts.join(' ') : undefined };
    }
    case 'mapFly': {
      const placeName = resolvePlaceLabel(step.placeId);
      if (placeName) {
        return {
          title: t('ancestryJourney.stepMapFly', locale).replace('{place}', placeName),
        };
      }
      if (step.center) {
        const [lng, lat] = step.center;
        return {
          title: t('ancestryJourney.stepMapFlyCoords', locale)
            .replace('{lng}', lng.toFixed(2))
            .replace('{lat}', lat.toFixed(2)),
        };
      }
      return { title: t('ancestryJourney.stepMapFlyGeneric', locale) };
    }
    case 'lineageOverlay': {
      const profile = getHaplogroupProfile(step.profileId);
      const name = profile?.name || profile?.id || step.profileId;
      const title = t('ancestryJourney.stepLineageTitle', locale).replace('{name}', name);
      const lines: string[] = [
        t('ancestryJourney.stepLineageLens', locale).replace(
          '{lens}',
          getLineageLensLabel(step.eraLens, locale),
        ),
      ];
      if (step.enableMacro && step.macroYear != null) {
        lines.push(
          t('ancestryJourney.stepLineageMacro', locale).replace(
            '{year}',
            String(step.macroYear),
          ),
        );
      }
      return { title, body: lines.join(' ') };
    }
    case 'storyBeat': {
      const beat = getBeat(step.stepIndex, step.arcId);
      if (!beat) {
        return {
          title: t('ancestryJourney.stepStoryBeatFallbackTitle', locale),
          body:
            t('ancestryJourney.stepStoryBeatFallbackBody', locale) +
            ' ' +
            t('ancestryJourney.stepStoryBeatHint', locale),
        };
      }
      const bodyText = pickI18n(beat.copy.body, locale);
      const hint = t('ancestryJourney.stepStoryBeatHint', locale);
      return {
        title: beat.copy.title,
        body: bodyText ? `${bodyText}\n\n${hint}` : hint,
      };
    }
  }
}
