import type { LngLatBoundsLike, Map as MaplibreMap } from 'maplibre-gl';
import type { RegionFeatureCollection, CameraPreset } from '@/types';
import { readStoredReduceMotionForced, computeEffectiveReducedMotion } from '@/lib/reduced-motion';

export function getFeatureCollectionBounds(fc: RegionFeatureCollection): LngLatBoundsLike {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  for (const feature of fc.features) {
    const coords =
      feature.geometry.type === 'Polygon'
        ? feature.geometry.coordinates
        : feature.geometry.coordinates.flat();

    for (const ring of coords) {
      for (const [lng, lat] of ring) {
        if (lng < minLng) minLng = lng;
        if (lat < minLat) minLat = lat;
        if (lng > maxLng) maxLng = lng;
        if (lat > maxLat) maxLat = lat;
      }
    }
  }

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}

export const NORMANDY_CENTER: [number, number] = [0.0, 49.2];
export const DEFAULT_ZOOM = 5.8;
export const DEFAULT_BOUNDS: LngLatBoundsLike = [
  [-6, 46],
  [10, 54],
];

export const CAMERA_PRESETS: Record<string, CameraPreset> = {
  homeland: { center: [0.0, 49.2], zoom: 5.8 },
  atlantic: { center: [-30.0, 45.0], zoom: 3.0 },
  'new-france': { center: [-68.0, 48.0], zoom: 4.5 },
  'st-lawrence': { center: [-71.2, 46.8], zoom: 6.0 },
  acadia: { center: [-64.0, 45.0], zoom: 5.5 },
  louisiana: { center: [-90.0, 32.0], zoom: 5.0 },
};

function haversineDistance(a: [number, number], b: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[1] - a[1]);
  const dLon = toRad(b[0] - a[0]);
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function flyToCamera(
  map: MaplibreMap,
  camera: CameraPreset,
) {
  const target = {
    center: camera.center,
    zoom: camera.zoom,
    bearing: camera.bearing ?? 0,
    pitch: camera.pitch ?? 0,
  };

  if (computeEffectiveReducedMotion(readStoredReduceMotionForced())) {
    map.jumpTo(target);
    return;
  }

  const currentCenter = map.getCenter();
  const dist = haversineDistance(
    [currentCenter.lng, currentCenter.lat],
    camera.center,
  );
  const duration = camera.duration ?? Math.min(5000, Math.max(1500, dist * 0.8));

  map.flyTo({
    ...target,
    duration,
    essential: true,
    curve: 1.3,
  });
}

export function flyToPreset(
  map: MaplibreMap,
  presetId: string,
  overrides?: Partial<CameraPreset>,
) {
  const preset = CAMERA_PRESETS[presetId];
  if (!preset) return;

  flyToCamera(map, { ...preset, ...overrides });
}
