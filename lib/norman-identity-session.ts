export const NORMAN_IDENTITY_STORY_STORAGE_KEY = 'norman-atlas.identityStory.v1';

export type NormanIdentityStoryPayloadV1 = {
  version: 1;
  /** Localized paragraph per beat (same order as map beats). */
  paragraphs: string[];
};

export function readNormanIdentityStoryPayload(): NormanIdentityStoryPayloadV1 | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(NORMAN_IDENTITY_STORY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as NormanIdentityStoryPayloadV1;
    if (parsed?.version !== 1 || !Array.isArray(parsed.paragraphs) || parsed.paragraphs.length !== 5) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeNormanIdentityStoryPayload(payload: NormanIdentityStoryPayloadV1): void {
  sessionStorage.setItem(NORMAN_IDENTITY_STORY_STORAGE_KEY, JSON.stringify(payload));
}

export function clearNormanIdentityStorySession(): void {
  try {
    sessionStorage.removeItem(NORMAN_IDENTITY_STORY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
