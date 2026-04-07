'use client';

import { memo, useMemo, useCallback } from 'react';
import { useMapStore } from '@/lib/store';
import { getBeat, getBeatCount, getEffectiveStoryBeat } from '@/core';
import { pickI18n } from '@/lib/locale';
import { publicAssetUrl } from '@/lib/public-asset-url';
import {
  normanAtlanticStory,
  normanAtlanticGalleryStepIdFromBeatId,
} from '@/data/stories';
import { IllustrationGalleryLightbox } from './StoryBeatIllustration';

const CINEMATIC_ARC_IDS = new Set(['leif-erikson']);

/**
 * Connects the zustand gallery state to the gallery lightbox.
 * Render once at app-level (e.g. inside MapCanvas return).
 */
export default memo(function StoryImageGallery() {
  const gallery = useMapStore((s) => s.storyImageGallery);
  const storyArc = useMapStore((s) => s.storyArc);
  const stepIndex = useMapStore((s) => s.storyStepIndex);
  const storyViewMode = useMapStore((s) => s.storyViewMode);
  const locale = useMapStore((s) => s.locale);
  const setIndex = useMapStore((s) => s.setStoryImageGalleryIndex);
  const closeGallery = useMapStore((s) => s.closeStoryImageGallery);

  const items = useMemo(() => {
    if (!gallery.open || !gallery.beatId) return [];
    const legacyStepId = normanAtlanticGalleryStepIdFromBeatId(gallery.beatId);
    if (legacyStepId != null) {
      const step = normanAtlanticStory.find((s) => s.id === legacyStepId);
      if (!step?.imageUrl) return [];
      return [
        {
          src: publicAssetUrl(step.imageUrl),
          alt: step.title,
          credit: step.imageCaption ?? null,
        },
      ];
    }
    const beat = getBeat(Math.min(stepIndex, getBeatCount(storyArc) - 1), storyArc);
    if (!beat) return [];
    const cinematic = storyArc != null && CINEMATIC_ARC_IDS.has(storyArc);
    const effective = getEffectiveStoryBeat(beat, { cinematic, storyViewMode });
    const slides = effective.illustrations;
    if (!slides?.length) return [];
    return slides.map((s) => ({
      src: publicAssetUrl(s.src),
      alt: pickI18n(s.alt, locale),
      credit: s.credit ? pickI18n(s.credit, locale) : null,
    }));
  }, [gallery.open, gallery.beatId, stepIndex, storyArc, storyViewMode, locale]);

  const handleIndexChange = useCallback((i: number) => setIndex(i), [setIndex]);
  const handleClose = useCallback(() => closeGallery(), [closeGallery]);

  if (!gallery.open || items.length === 0) return null;

  return (
    <IllustrationGalleryLightbox
      open
      items={items}
      index={Math.min(gallery.activeIndex, items.length - 1)}
      locale={locale}
      onIndexChange={handleIndexChange}
      onClose={handleClose}
    />
  );
});
