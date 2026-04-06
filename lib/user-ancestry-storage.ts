/**
 * User ancestry persistence — keyed localStorage payload shared with {@link useAncestryStore}.
 */
export {
  ANCESTRY_STORAGE_KEY,
  readAncestryPayload,
  writeAncestryPayload,
  defaultAncestryProfile,
  type AncestryPersistedPayload,
} from '@/lib/ancestry-persist';

export function exportAncestryJson(state: {
  people: Record<string, import('@/core/ancestry/types').FamilyTreePerson>;
  profile: import('@/core/ancestry/types').UserAncestryProfile;
}): string {
  return JSON.stringify(
    { version: 1 as const, people: state.people, profile: state.profile },
    null,
    2,
  );
}
