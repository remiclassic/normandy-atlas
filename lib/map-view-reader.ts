/**
 * Module-level registry for reading the current MapLibre camera.
 *
 * MapCanvas registers a reader on mount; the share button reads it on
 * demand without subscribing to map-move events (zero re-renders).
 */

import type { CameraSnapshot } from './map-view-link';

type MapViewReader = () => CameraSnapshot | null;

/** Geographic bounds in degrees (MapLibre `LngLatBounds`). */
export type MapLngLatBounds = {
  west: number;
  south: number;
  east: number;
  north: number;
};

type MapBoundsReader = () => MapLngLatBounds | null;

let reader: MapViewReader | null = null;
let boundsReader: MapBoundsReader | null = null;

export function registerMapViewReader(fn: MapViewReader): void {
  reader = fn;
}

export function unregisterMapViewReader(): void {
  reader = null;
}

export function readMapView(): CameraSnapshot | null {
  return reader ? reader() : null;
}

export function registerMapBoundsReader(fn: MapBoundsReader): void {
  boundsReader = fn;
}

export function unregisterMapBoundsReader(): void {
  boundsReader = null;
}

export function readMapBounds(): MapLngLatBounds | null {
  return boundsReader ? boundsReader() : null;
}
