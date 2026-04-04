'use client';

import { useEffect } from 'react';
import { useMapStore } from '@/lib/store';
import {
  applyUiThemeToDocument,
  resolveAppliedUiTheme,
  resolveAutoThemeWithAmbient,
} from '@/lib/ui-theme';

const LUX_DEBOUNCE_MS = 360;

type AmbientLightSensorInstance = {
  illuminance: number | null;
  start: () => void;
  stop: () => void;
  addEventListener: (type: 'reading' | 'error', listener: () => void) => void;
  removeEventListener: (type: 'reading' | 'error', listener: () => void) => void;
};

type AmbientLightSensorConstructor = new () => AmbientLightSensorInstance;

function applyResolvedIfChanged(next: 'light' | 'dark') {
  const cur = useMapStore.getState().uiTheme;
  if (cur === next) return;
  applyUiThemeToDocument(next);
  useMapStore.setState({ uiTheme: next });
}

/**
 * When `uiThemeMode === 'auto'`, follow `prefers-color-scheme` and optionally boost to light in bright ambient light.
 * No-ops for explicit light/dark. Client-only; mount from ClientBootstrap.
 */
export function useUiThemeAuto(): void {
  const mode = useMapStore((s) => s.uiThemeMode);

  useEffect(() => {
    if (mode !== 'auto' || typeof window === 'undefined') return;

    let cancelled = false;

    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const onScheme = () => {
      try {
        applyResolvedIfChanged(resolveAppliedUiTheme('auto', mql.matches));
      } catch {
        /* noop */
      }
    };

    onScheme();
    mql.addEventListener('change', onScheme);

    let debounceId: ReturnType<typeof setTimeout> | null = null;
    let sensor: AmbientLightSensorInstance | null = null;
    let onReading: (() => void) | null = null;
    let onSensorError: (() => void) | null = null;

    const clearLuxDebounce = () => {
      if (debounceId !== null) {
        clearTimeout(debounceId);
        debounceId = null;
      }
    };

    const flushLux = (lux: number) => {
      try {
        if (mql.matches) return;
        const prev = useMapStore.getState().uiTheme;
        applyResolvedIfChanged(resolveAutoThemeWithAmbient(lux, true, prev));
      } catch {
        /* noop */
      }
    };

    const scheduleLux = (lux: number) => {
      clearLuxDebounce();
      debounceId = setTimeout(() => {
        debounceId = null;
        flushLux(lux);
      }, LUX_DEBOUNCE_MS);
    };

    const startSensor = () => {
      if (cancelled) return;
      try {
        const Ctor = (window as unknown as { AmbientLightSensor?: AmbientLightSensorConstructor })
          .AmbientLightSensor;
        if (!Ctor) return;

        const inst = new Ctor();
        onReading = () => {
          try {
            const lux = inst.illuminance;
            if (lux == null || !Number.isFinite(Number(lux))) return;
            scheduleLux(Number(lux));
          } catch {
            /* noop */
          }
        };
        onSensorError = () => {
          try {
            inst.stop();
          } catch {
            /* noop */
          }
        };
        inst.addEventListener('reading', onReading);
        inst.addEventListener('error', onSensorError);
        if (!cancelled) inst.start();
        sensor = inst;
      } catch {
        /* permission denied or unsupported */
      }
    };

    try {
      const perms = navigator.permissions;
      if (perms?.query) {
        void perms
          .query({ name: 'ambient-light-sensor' as PermissionName })
          .then((status) => {
            if (cancelled) return;
            if (status.state === 'denied') return;
            startSensor();
          })
          .catch(() => {
            if (!cancelled) startSensor();
          });
      } else {
        startSensor();
      }
    } catch {
      if (!cancelled) startSensor();
    }

    return () => {
      cancelled = true;
      mql.removeEventListener('change', onScheme);
      clearLuxDebounce();
      if (sensor && onReading && onSensorError) {
        try {
          sensor.removeEventListener('reading', onReading);
          sensor.removeEventListener('error', onSensorError);
          sensor.stop();
        } catch {
          /* noop */
        }
      }
      sensor = null;
      onReading = null;
      onSensorError = null;
    };
  }, [mode]);
}
