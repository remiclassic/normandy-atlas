'use client';

import { memo, useEffect, useRef } from 'react';
import {
  readProgress,
  updateProgress,
  mergeProgressV2,
  safeProgressOrEmpty,
} from '@/lib/progress';
import { notifyProgressListeners } from '@/hooks/useAtlasProgress';

const COOKIE_SUPPORT = typeof document !== 'undefined';

/**
 * Optional cloud sync. Set `NEXT_PUBLIC_ATLAS_PROGRESS_SYNC_URL` to a GET/POST endpoint that
 * returns `{ ok: true, progress: ProgressV2 }` on GET and accepts the same body on POST.
 * Not used when unset (default for static hosting).
 */
function ProgressRemoteSync() {
  const endpoint =
    typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_ATLAS_PROGRESS_SYNC_URL?.trim() ?? ''
      : '';

  const pulled = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enabled = endpoint.length > 0;

  useEffect(() => {
    if (!enabled || !COOKIE_SUPPORT) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(endpoint, { credentials: 'include' });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { ok?: boolean; progress?: unknown };
        if (!data.ok || !data.progress || cancelled) {
          pulled.current = true;
          return;
        }
        const remote = safeProgressOrEmpty(data.progress);
        const local = readProgress();
        const merged = mergeProgressV2(local, remote);
        updateProgress(merged);
        notifyProgressListeners();
      } catch {
        /* offline / CORS / 404 */
      } finally {
        pulled.current = true;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [endpoint, enabled]);

  useEffect(() => {
    if (!enabled || !COOKIE_SUPPORT) return;

    const onFlush = () => {
      if (!pulled.current) return;
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(async () => {
        pushTimer.current = null;
        try {
          const progress = readProgress();
          await fetch(endpoint, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ progress }),
          });
        } catch {
          /* ignore */
        }
      }, 2500);
    };

    window.addEventListener('norman-atlas-progress-flush', onFlush);
    return () => {
      window.removeEventListener('norman-atlas-progress-flush', onFlush);
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
  }, [endpoint, enabled]);

  return null;
}

export default memo(ProgressRemoteSync);
