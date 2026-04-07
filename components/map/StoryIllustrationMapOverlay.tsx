'use client';

import { useEffect, useMemo, useState, useCallback, memo } from 'react';
import type maplibregl from 'maplibre-gl';
import { useMapStore } from '@/lib/store';
import {
  getBeat,
  getBeatCount,
  getEffectiveStoryBeat,
  resolveSlideAnchor,
} from '@/core';
import type { AtlasLocale, StoryBeatIllustrationSlide } from '@/core/types';
import { StoryBeatMapPin } from '@/components/story/StoryBeatIllustration';
import {
  normanAtlanticStory,
  normanAtlanticStoryGalleryBeatId,
} from '@/data/stories';

const CINEMATIC_ARC_IDS = new Set(['leif-erikson']);

interface ResolvedPin {
  slide: StoryBeatIllustrationSlide;
  lng: number;
  lat: number;
  slideIndex: number;
  beatId: string;
}

/**
 * Positions story illustration pins in screen space above the map surface.
 * Projects one pin per slide for the current beat, using a single rAF loop.
 */
export function StoryIllustrationMapOverlay({
  mapRef,
  mapInstanceGeneration,
}: {
  mapRef: React.RefObject<maplibregl.Map | null>;
  mapInstanceGeneration: number;
}) {
  const storyMode = useMapStore((s) => s.storyMode);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const storyArc = useMapStore((s) => s.storyArc);
  const stepIndex = useMapStore((s) => s.storyStepIndex);
  const storyViewMode = useMapStore((s) => s.storyViewMode);
  const storyEraIntroActive = useMapStore((s) => s.storyEraIntroActive);
  const locale = useMapStore((s) => s.locale);

  const pins = useMemo((): ResolvedPin[] => {
    if (!storyMode) return [];
    if (atlasMode) {
      const count = getBeatCount(storyArc);
      if (count < 1) return [];
      const rawBeat = getBeat(Math.min(stepIndex, count - 1), storyArc);
      if (!rawBeat) return [];
      const cinematic = storyArc != null && CINEMATIC_ARC_IDS.has(storyArc);
      const beat = getEffectiveStoryBeat(rawBeat, { cinematic, storyViewMode });
      const slides = beat.illustrations;
      if (!slides?.length) return [];

      const result: ResolvedPin[] = [];
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const anchor = resolveSlideAnchor(slide, beat);
        if (!anchor) continue;
        result.push({ slide, lng: anchor[0], lat: anchor[1], slideIndex: i, beatId: beat.id });
      }
      return result;
    }

    const step = normanAtlanticStory[Math.min(stepIndex, normanAtlanticStory.length - 1)];
    if (!step?.imageUrl) return [];
    const center = step.camera?.center;
    if (!center || center.length < 2) return [];
    const slide: StoryBeatIllustrationSlide = {
      src: step.imageUrl,
      alt: { en: step.title },
      ...(step.imageCaption ? { credit: { en: step.imageCaption } } : {}),
    };
    return [
      {
        slide,
        lng: center[0],
        lat: center[1],
        slideIndex: 0,
        beatId: normanAtlanticStoryGalleryBeatId(step.id),
      },
    ];
  }, [storyMode, atlasMode, storyArc, stepIndex, storyViewMode]);

  const [positions, setPositions] = useState<(({ x: number; y: number }) | null)[]>([]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || pins.length === 0) {
      setPositions([]);
      useMapStore.getState().setStoryCardTopPx(null);
      return;
    }

    let rafId = 0;
    let lastTop: number | null = null;

    const syncStoryCardTop = (next: ({ x: number; y: number } | null)[]) => {
      const setTop = useMapStore.getState().setStoryCardTopPx;
      const valid = next.filter((p): p is { x: number; y: number } => p != null);
      if (valid.length === 0) {
        if (lastTop !== null) {
          lastTop = null;
          setTop(null);
        }
        return;
      }
      const maxPinBottom = Math.max(...valid.map((p) => p.y - 8));
      const gap = 16;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
      const minStoryBand = 200;
      const maxTop = Math.max(96, vh - minStoryBand);
      const nextTop = Math.min(Math.max(0, maxPinBottom + gap), maxTop);
      if (lastTop == null || Math.abs(lastTop - nextTop) >= 4) {
        lastTop = nextTop;
        setTop(nextTop);
      }
    };

    const update = () => {
      try {
        const next = pins.map((pin) => {
          const p = map.project([pin.lng, pin.lat]);
          if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) return null;
          return { x: p.x, y: p.y };
        });
        setPositions(next);
        syncStoryCardTop(next);
      } catch {
        setPositions([]);
        useMapStore.getState().setStoryCardTopPx(null);
      }
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    const onReady = () => update();

    if (map.loaded()) {
      update();
    } else {
      map.once('load', onReady);
    }

    map.on('move', scheduleUpdate);
    map.on('zoom', scheduleUpdate);
    map.on('rotate', scheduleUpdate);
    map.on('pitch', scheduleUpdate);
    map.on('resize', scheduleUpdate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      try {
        map.off('load', onReady);
        map.off('move', scheduleUpdate);
        map.off('zoom', scheduleUpdate);
        map.off('rotate', scheduleUpdate);
        map.off('pitch', scheduleUpdate);
        map.off('resize', scheduleUpdate);
      } catch {
        /* map may already be destroyed */
      }
    };
  }, [mapInstanceGeneration, pins, mapRef, storyEraIntroActive]);

  if (storyEraIntroActive || pins.length === 0 || positions.length === 0) return null;

  /**
   * z-[21]: above map/deck host; keeps pins pickable. Story chrome remains outside this subtree (shell z-50).
   */
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[21] opacity-[0.68] transition-opacity duration-300"
      data-story-illustration-pin=""
    >
      {pins.map((pin, i) => {
        const pos = positions[i];
        if (!pos) return null;
        return (
          <OverlayPin
            key={`${pin.beatId}-${pin.slideIndex}`}
            pin={pin}
            pos={pos}
            locale={locale}
          />
        );
      })}
    </div>
  );
}

const OverlayPin = memo(function OverlayPin({
  pin,
  pos,
  locale,
}: {
  pin: ResolvedPin;
  pos: { x: number; y: number };
  locale: AtlasLocale;
}) {
  const openGallery = useMapStore((s) => s.openStoryImageGallery);

  const handleOpen = useCallback(() => {
    openGallery(pin.beatId, pin.slideIndex);
  }, [openGallery, pin.beatId, pin.slideIndex]);

  return (
    <div
      className="pointer-events-auto absolute z-[22] touch-manipulation hover:z-[24] focus-within:z-[24]"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, calc(-100% - 8px))',
      }}
    >
      <StoryBeatMapPin illustration={pin.slide} locale={locale} onOpenOverride={handleOpen} />
    </div>
  );
});
