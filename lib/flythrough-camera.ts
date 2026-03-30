import type { Map as MaplibreMap } from 'maplibre-gl';
import type { FlythroughPolyline } from './flythrough-path';
import { interpolatePolyline, bearingAtPolyline } from './flythrough-path';

export interface FlythroughOptions {
  /** Total duration of the flythrough in milliseconds. */
  durationMs?: number;
  /** Zoom level during open-ocean legs. */
  zoomSea?: number;
  /** Zoom level for coastal / river approach. */
  zoomCoast?: number;
  /** Zoom level at the final destination. */
  zoomClose?: number;
  /** Camera pitch in degrees (0 = top-down, 60+ = cinematic). */
  pitch?: number;
  /** Whether to orient the camera bearing along the path tangent. */
  followBearing?: boolean;
  /** Max bearing change per second (degrees) to avoid jarring snaps. */
  maxBearingRatePerSec?: number;
  /**
   * How far ahead (as a fraction of total path, 0–0.1) to offset the
   * camera center so the point of interest sits in the lower half of the
   * viewport, creating a chase-cam "looking forward" effect.
   */
  lookAheadOffset?: number;
}

const DEFAULTS: Required<FlythroughOptions> = {
  durationMs: 30_000,
  zoomSea: 6.5,
  zoomCoast: 8.2,
  zoomClose: 9.5,
  pitch: 62,
  followBearing: true,
  maxBearingRatePerSec: 30,
  lookAheadOffset: 0.025,
};

function lerp(a: number, b: number, f: number): number {
  return a + (b - a) * f;
}

/** Smooth ease-in-out (cubic hermite). */
function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/**
 * Three-phase zoom curve:
 *   0–40%  → open sea (zSea)
 *  40–75%  → coastal approach (ramp to zCoast)
 *  75–100% → river / destination (ramp to zClose)
 */
function zoomForT(t: number, zSea: number, zCoast: number, zClose: number): number {
  if (t < 0.40) return zSea;
  if (t < 0.75) {
    const f = smoothstep((t - 0.40) / 0.35);
    return lerp(zSea, zCoast, f);
  }
  const f = smoothstep((t - 0.75) / 0.25);
  return lerp(zCoast, zClose, f);
}

/**
 * Run a cinematic flythrough along a polyline.
 *
 * Returns a promise that resolves when the animation completes or rejects if aborted.
 * All map mutations use `jumpTo` inside a single rAF loop — no React state per frame.
 */
export function runFlythrough(
  map: MaplibreMap,
  polyline: FlythroughPolyline,
  options: FlythroughOptions = {},
  onProgress?: (t: number) => void,
  signal?: AbortSignal,
): Promise<void> {
  const opts = { ...DEFAULTS, ...options };
  const duration = opts.durationMs;

  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) { reject(new DOMException('Aborted', 'AbortError')); return; }

    let startTime: number | null = null;
    let prevBearing = 0;
    let rafId = 0;
    let lastProgressReport = 0;

    const cleanup = () => {
      if (rafId) cancelAnimationFrame(rafId);
      signal?.removeEventListener('abort', onAbort);
    };

    const onAbort = () => { cleanup(); reject(new DOMException('Aborted', 'AbortError')); };
    signal?.addEventListener('abort', onAbort, { once: true });

    // Compute initial bearing so the first frame isn't jarring.
    prevBearing = bearingAtPolyline(polyline, 0, 0.02);

    const tick = (now: number) => {
      if (signal?.aborted) return;

      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const rawT = Math.min(1, elapsed / duration);
      const t = smoothstep(rawT);

      // Chase-cam: look ahead along the path so the view shows terrain ahead
      const lookT = Math.min(1, t + opts.lookAheadOffset);
      const center = interpolatePolyline(polyline, lookT);
      const zoom = zoomForT(t, opts.zoomSea, opts.zoomCoast, opts.zoomClose);

      let bearing = prevBearing;
      if (opts.followBearing) {
        const targetBearing = bearingAtPolyline(polyline, t, 0.02);
        const dt = elapsed > 0 ? (now - startTime - Math.max(0, elapsed - 16.7)) / 1000 : 0.016;
        const maxDelta = opts.maxBearingRatePerSec * Math.max(dt, 0.016);

        let delta = targetBearing - prevBearing;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        delta = Math.max(-maxDelta, Math.min(maxDelta, delta));
        bearing = (prevBearing + delta + 360) % 360;
      }
      prevBearing = bearing;

      map.jumpTo({ center, zoom, bearing, pitch: opts.pitch });

      // Throttled progress callback (~100 ms)
      if (onProgress && (now - lastProgressReport > 100 || rawT >= 1)) {
        lastProgressReport = now;
        onProgress(rawT);
      }

      if (rawT >= 1) {
        cleanup();
        resolve();
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
  });
}

/**
 * Run a multi-act flythrough (one polyline per act) with a pause between acts.
 * Resolves when all acts complete; rejects on abort.
 */
export async function runMultiActFlythrough(
  map: MaplibreMap,
  polylines: FlythroughPolyline[],
  options: FlythroughOptions & { interActPauseMs?: number } = {},
  onActStart?: (actIndex: number) => void,
  onProgress?: (t: number) => void,
  signal?: AbortSignal,
): Promise<void> {
  const pauseMs = options.interActPauseMs ?? 1500;

  for (let i = 0; i < polylines.length; i++) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    onActStart?.(i);

    const actFraction = 1 / polylines.length;
    const actBase = i * actFraction;
    await runFlythrough(
      map,
      polylines[i],
      options,
      onProgress ? (localT) => onProgress(actBase + localT * actFraction) : undefined,
      signal,
    );

    if (i < polylines.length - 1 && pauseMs > 0) {
      await new Promise<void>((res, rej) => {
        if (signal?.aborted) { rej(new DOMException('Aborted', 'AbortError')); return; }
        const onAbort = () => { clearTimeout(tid); rej(new DOMException('Aborted', 'AbortError')); };
        signal?.addEventListener('abort', onAbort, { once: true });
        const tid = setTimeout(() => { signal?.removeEventListener('abort', onAbort); res(); }, pauseMs);
      });
    }
  }
}
