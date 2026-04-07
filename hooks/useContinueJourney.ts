'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { useLocale } from '@/hooks/use-atlas';
import { useProgress } from '@/hooks/useAtlasProgress';
import { pickI18n } from '@/lib/locale';
import { buildMapHref } from '@/lib/map-deep-link';
import { readStoryProgressMap } from '@/lib/story-progress';
import { listResumableStoryRows } from '@/lib/story-resume';

export const ATLAS_CONTINUE_JOURNEY_DISMISS_KEY = 'atlas-continue-fab-dismissed';
const DISMISS_CHANGE_EVENT = 'atlas-continue-dismiss';

export type ContinueJourneyResume = {
  href: string;
  title: string;
};

function normalizePath(pathname: string | null): string {
  if (!pathname) return '';
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

/** Floating Continue pill: journal only (reference hub uses in-flow card). */
export function pathnameAllowsContinueFloating(pathname: string): boolean {
  const p = normalizePath(pathname);
  return p === '/journal' || p.startsWith('/journal/');
}

function getFabDismissedSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(ATLAS_CONTINUE_JOURNEY_DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function subscribeFabDismissed(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === ATLAS_CONTINUE_JOURNEY_DISMISS_KEY || e.key === null) onChange();
  };
  const onCustom = () => onChange();
  window.addEventListener('storage', onStorage);
  window.addEventListener(DISMISS_CHANGE_EVENT, onCustom);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(DISMISS_CHANGE_EVENT, onCustom);
  };
}

export function useContinueJourney() {
  const locale = useLocale();
  const progress = useProgress();
  const fabDismissed = useSyncExternalStore(
    subscribeFabDismissed,
    getFabDismissedSnapshot,
    () => false,
  );

  const resume = useMemo((): ContinueJourneyResume | null => {
    void progress;
    const rows = listResumableStoryRows(locale);
    const row = rows[0];
    if (!row?.meta.arcId) return null;
    const step = readStoryProgressMap()[row.progressKey]?.lastStep ?? 0;
    const title = row.meta.displayTitle
      ? pickI18n(row.meta.displayTitle, locale)
      : row.arcEntry
        ? pickI18n(row.arcEntry.label, locale)
        : '';
    return {
      href: buildMapHref({ story: row.meta.arcId, step }),
      title,
    };
  }, [locale, progress]);

  const dismissFloatingFab = useCallback(() => {
    try {
      sessionStorage.setItem(ATLAS_CONTINUE_JOURNEY_DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(DISMISS_CHANGE_EVENT));
    }
  }, []);

  const shouldShowFloatingFab = useCallback(
    (pathname: string | null) =>
      Boolean(resume) && pathnameAllowsContinueFloating(pathname ?? '') && !fabDismissed,
    [resume, fabDismissed],
  );

  return useMemo(
    () => ({
      resume,
      fabDismissed,
      dismissFloatingFab,
      shouldShowFloatingFab,
    }),
    [resume, fabDismissed, dismissFloatingFab, shouldShowFloatingFab],
  );
}
