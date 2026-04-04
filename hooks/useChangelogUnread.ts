'use client';

import { useCallback, useEffect, useState } from 'react';
import { atlasChangelog } from '@/data/atlas/changelog';

const STORAGE_KEY = 'atlas:changelog-last-seen';

function getNewestId(): string {
  return atlasChangelog[0]?.id ?? '';
}

function readLastSeen(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

/**
 * Tracks whether the user has unseen changelog entries.
 * Returns `[hasUnread, markRead]`.
 *
 * First-time visitors (no stored key) see the indicator — treating the
 * changelog as worth discovering on first load.
 */
export function useChangelogUnread(): [boolean, () => void] {
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    setHasUnread(readLastSeen() !== getNewestId());
  }, []);

  const markRead = useCallback(() => {
    const newest = getNewestId();
    try {
      localStorage.setItem(STORAGE_KEY, newest);
    } catch { /* quota / private browsing — tolerate silently */ }
    setHasUnread(false);
  }, []);

  return [hasUnread, markRead];
}
