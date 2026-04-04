/**
 * Module-level registry for reading the current MapLibre camera.
 *
 * MapCanvas registers a reader on mount; the share button reads it on
 * demand without subscribing to map-move events (zero re-renders).
 */

import type { CameraSnapshot } from './map-view-link';

type MapViewReader = () => CameraSnapshot | null;

let reader: MapViewReader | null = null;

export function registerMapViewReader(fn: MapViewReader): void {
  reader = fn;
}

export function unregisterMapViewReader(): void {
  reader = null;
}

export function readMapView(): CameraSnapshot | null {
  return reader ? reader() : null;
}
