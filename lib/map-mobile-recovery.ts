import type { Map } from 'maplibre-gl';

export function mapContainerHasLayout(el: HTMLElement | null): boolean {
  if (!el || !el.isConnected) return false;
  const r = el.getBoundingClientRect();
  return r.width >= 1 && r.height >= 1;
}

/**
 * Heuristic check for a MapLibre map that should still paint after mobile tab sleep / bfcache.
 */
export function isMaplibreMapRenderable(map: Map | null, container: HTMLElement | null): boolean {
  if (!map || !mapContainerHasLayout(container)) return false;
  let canvas: HTMLCanvasElement;
  try {
    canvas = map.getCanvas();
  } catch {
    return false;
  }
  if (!canvas.isConnected) return false;
  const cRect = canvas.getBoundingClientRect();
  if (cRect.width < 1 || cRect.height < 1) return false;

  const gl =
    (canvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
    (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
    (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

  if (gl && typeof gl.isContextLost === 'function' && gl.isContextLost()) return false;

  return true;
}
