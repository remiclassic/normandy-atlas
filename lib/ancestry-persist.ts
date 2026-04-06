import type { FamilyTreePerson, UserAncestryProfile } from '@/core/ancestry/types';

export const ANCESTRY_STORAGE_KEY = 'norman-atlas-user-ancestry-v1';

export interface AncestryPersistedPayload {
  version: 1;
  people: Record<string, FamilyTreePerson>;
  profile: UserAncestryProfile;
}

export function defaultAncestryProfile(): UserAncestryProfile {
  return {
    selfPersonId: null,
    rootPersonId: null,
    updatedAt: new Date().toISOString(),
  };
}

export function readAncestryPayload(): AncestryPersistedPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ANCESTRY_STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as AncestryPersistedPayload;
    if (p?.version !== 1 || !p.people || !p.profile) return null;
    return p;
  } catch {
    return null;
  }
}

export function writeAncestryPayload(payload: AncestryPersistedPayload): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ANCESTRY_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}
