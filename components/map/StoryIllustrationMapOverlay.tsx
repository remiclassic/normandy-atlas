'use client';

import { useEffect, useMemo, useState } from 'react';
import type maplibregl from 'maplibre-gl';
import { useMapStore } from '@/lib/store';
import {
  getBeat,
  getBeatCount,
  getEffectiveStoryBeat,
  resolveStoryIllustrationLngLat,
} from '@/core';
import type { StoryBeatIllustration } from '@/core/types';
import { StoryBeatMapPin } from '@/components/story/StoryBeatIllustration';

const CINEMATIC_ARC_IDS = new Set(['leif-erikson']);

/**
 * Positions the story illustration pin in screen space above the map surface.
 * MapLibre HTML markers live inside the canvas container under Deck.gl’s
 * full-map overlay, so they stay invisible — this layer is a sibling of the
 * map host with a higher z-index instead.
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

  const pin = useMemo((): {
    illustration: StoryBeatIllustration;
    lng: number;
    lat: number;
    beatId: string;
  } | null => {
    if (!storyMode || !atlasMode) return null;
    const count = getBeatCount(storyArc);
    if (count < 1) return null;
    const rawBeat = getBeat(Math.min(stepIndex, count - 1), storyArc);
    if (!rawBeat) return null;
    const cinematic = storyArc != null && CINEMATIC_ARC_IDS.has(storyArc);
    const beat = getEffectiveStoryBeat(rawBeat, { cinematic, storyViewMode });
    if (!beat.illustration) return null;
    const ll = resolveStoryIllustrationLngLat(beat);
    if (!ll) return null;
    return {
      illustration: beat.illustration,
      lng: ll[0],
      lat: ll[1],
      beatId: beat.id,
    };
  }, [storyMode, atlasMode, storyArc, stepIndex, storyViewMode]);

  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !pin) {
      setPos(null);
      return;
    }

    const lngLat: [number, number] = [pin.lng, pin.lat];

    let rafId = 0;

    const update = () => {
      try {
        const p = map.project(lngLat);
        if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) {
          setPos(null);
          return;
        }
        setPos({ x: p.x, y: p.y });
      } catch {
        setPos(null);
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
  }, [mapInstanceGeneration, pin, mapRef]);

  if (!pin || pos == null) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[30]"
      data-story-illustration-pin=""
    >
      <div
        className="pointer-events-auto absolute"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, calc(-100% - 8px))',
        }}
      >
        <StoryBeatMapPin illustration={pin.illustration} locale={locale} />
      </div>
    </div>
  );
}
