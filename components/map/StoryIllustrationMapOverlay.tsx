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
import type { StoryBeatIllustrationSlide } from '@/core/types';
import { StoryBeatMapPin } from '@/components/story/StoryBeatIllustration';

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
  const locale = useMapStore((s) => s.locale);

  const pins = useMemo((): ResolvedPin[] => {
    if (!storyMode || !atlasMode) return [];
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
  }, [storyMode, atlasMode, storyArc, stepIndex, storyViewMode]);

  const [positions, setPositions] = useState<(({ x: number; y: number }) | null)[]>([]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || pins.length === 0) {
      setPositions([]);
      return;
    }

    let rafId = 0;

    const update = () => {
      try {
        const next = pins.map((pin) => {
          const p = map.project([pin.lng, pin.lat]);
          if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) return null;
          return { x: p.x, y: p.y };
        });
        setPositions(next);
      } catch {
        setPositions([]);
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
  }, [mapInstanceGeneration, pins, mapRef]);

  if (pins.length === 0 || positions.length === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[30]"
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
  locale: string;
}) {
  const openGallery = useMapStore((s) => s.openStoryImageGallery);

  const handleClick = useCallback(() => {
    openGallery(pin.beatId, pin.slideIndex);
  }, [openGallery, pin.beatId, pin.slideIndex]);

  return (
    <div
      className="pointer-events-auto absolute"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, calc(-100% - 8px))',
      }}
    >
      <StoryBeatMapPin
        illustration={pin.slide}
        locale={locale as 'en' | 'fr' | 'es' | 'it'}
        onOpenOverride={handleClick}
      />
    </div>
  );
});
