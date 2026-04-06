'use client';

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  AncestryJourneyPlan,
  FamilyTreePerson,
  UserAncestryProfile,
} from '@/core/ancestry/types';
import {
  ANCESTRY_STORAGE_KEY,
  defaultAncestryProfile,
  type AncestryPersistedPayload,
} from '@/lib/ancestry-persist';

function newPersonId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function persist(state: AncestryStoreState) {
  if (typeof window === 'undefined') return;
  const payload: AncestryPersistedPayload = {
    version: 1,
    people: state.people,
    profile: { ...state.profile, updatedAt: new Date().toISOString() },
  };
  try {
    localStorage.setItem(ANCESTRY_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

function hasParentCycle(
  people: Record<string, FamilyTreePerson>,
  personId: string,
  field: 'fatherId' | 'motherId',
  targetAncestor: string,
  seen: Set<string>,
): boolean {
  if (seen.has(personId)) return true;
  seen.add(personId);
  const p = people[personId];
  if (!p) return false;
  const next = p[field];
  if (!next) return false;
  if (next === targetAncestor) return true;
  return hasParentCycle(people, next, field, targetAncestor, seen);
}

export interface AncestryStoreState {
  people: Record<string, FamilyTreePerson>;
  profile: UserAncestryProfile;
  /** Ephemeral journey playback */
  activeJourney: AncestryJourneyPlan | null;
  journeyStepIndex: number;

  addPerson: (partial?: Partial<FamilyTreePerson>) => string;
  updatePerson: (id: string, patch: Partial<FamilyTreePerson>) => boolean;
  removePerson: (id: string) => void;
  setProfilePatch: (patch: Partial<UserAncestryProfile>) => void;
  setSelfPerson: (id: string | null) => void;
  setRootPerson: (id: string | null) => void;
  importPeople: (people: Record<string, FamilyTreePerson>, merge?: boolean) => void;
  loadDemo: (people: Record<string, FamilyTreePerson>, profile: UserAncestryProfile) => void;
  clearAll: () => void;

  setActiveJourney: (plan: AncestryJourneyPlan | null) => void;
  setJourneyStepIndex: (i: number) => void;
}

const emptyState = (): Pick<AncestryStoreState, 'people' | 'profile' | 'activeJourney' | 'journeyStepIndex'> => ({
  people: {},
  profile: defaultAncestryProfile(),
  activeJourney: null,
  journeyStepIndex: 0,
});

function hydrate(): Pick<AncestryStoreState, 'people' | 'profile'> {
  if (typeof window === 'undefined') return { people: {}, profile: defaultAncestryProfile() };
  try {
    const raw = localStorage.getItem(ANCESTRY_STORAGE_KEY);
    if (!raw) return { people: {}, profile: defaultAncestryProfile() };
    const p = JSON.parse(raw) as AncestryPersistedPayload;
    if (p?.version !== 1 || !p.people || !p.profile) return { people: {}, profile: defaultAncestryProfile() };
    return { people: p.people, profile: p.profile };
  } catch {
    return { people: {}, profile: defaultAncestryProfile() };
  }
}

export const useAncestryStore = create<AncestryStoreState>()(
  subscribeWithSelector((set, get) => ({
    ...emptyState(),
    ...hydrate(),

    addPerson: (partial) => {
      const id = newPersonId();
      const p: FamilyTreePerson = {
        ...partial,
        id,
        name: partial?.name ?? 'Unnamed',
      };
      set((s) => {
        const next = { ...s.people, [id]: p };
        const prof = { ...s.profile, updatedAt: new Date().toISOString() };
        const st = { ...s, people: next, profile: prof };
        persist(st as AncestryStoreState);
        return st;
      });
      return id;
    },

    updatePerson: (id, patch) => {
      const cur = get().people[id];
      if (!cur) return false;
      const draft = { ...cur, ...patch, id };
      if (patch.fatherId != null || patch.motherId != null) {
        if (draft.fatherId === id || draft.motherId === id) return false;
        if (draft.fatherId && hasParentCycle(get().people, draft.fatherId, 'fatherId', id, new Set())) return false;
        if (draft.fatherId && hasParentCycle(get().people, draft.fatherId, 'motherId', id, new Set())) return false;
        if (draft.motherId && hasParentCycle(get().people, draft.motherId, 'fatherId', id, new Set())) return false;
        if (draft.motherId && hasParentCycle(get().people, draft.motherId, 'motherId', id, new Set())) return false;
      }
      set((s) => {
        const next = { ...s.people, [id]: draft };
        const prof = { ...s.profile, updatedAt: new Date().toISOString() };
        const st = { ...s, people: next, profile: prof };
        persist(st as AncestryStoreState);
        return st;
      });
      return true;
    },

    removePerson: (id) => {
      set((s) => {
        const { [id]: _, ...rest } = s.people;
        for (const pid of Object.keys(rest)) {
          const q = rest[pid];
          if (q.fatherId === id || q.motherId === id) {
            rest[pid] = {
              ...q,
              fatherId: q.fatherId === id ? undefined : q.fatherId,
              motherId: q.motherId === id ? undefined : q.motherId,
            };
          }
        }
        const prof = {
          ...s.profile,
          selfPersonId: s.profile.selfPersonId === id ? null : s.profile.selfPersonId,
          rootPersonId: s.profile.rootPersonId === id ? null : s.profile.rootPersonId,
          updatedAt: new Date().toISOString(),
        };
        const st = { ...s, people: rest, profile: prof };
        persist(st as AncestryStoreState);
        return st;
      });
    },

    setProfilePatch: (patch) => {
      set((s) => {
        const st = {
          ...s,
          profile: { ...s.profile, ...patch, updatedAt: new Date().toISOString() },
        };
        persist(st as AncestryStoreState);
        return st;
      });
    },

    setSelfPerson: (id) => {
      get().setProfilePatch({ selfPersonId: id });
    },

    setRootPerson: (id) => {
      get().setProfilePatch({ rootPersonId: id });
    },

    importPeople: (incoming, merge) => {
      set((s) => {
        const people = merge ? { ...s.people, ...incoming } : { ...incoming };
        const st = {
          ...s,
          people,
          profile: { ...s.profile, updatedAt: new Date().toISOString() },
        };
        persist(st as AncestryStoreState);
        return st;
      });
    },

    loadDemo: (people, profile) => {
      set((s) => {
        const st = {
          ...s,
          people: { ...people },
          profile: { ...profile, updatedAt: new Date().toISOString() },
          activeJourney: null,
          journeyStepIndex: 0,
        };
        persist(st as AncestryStoreState);
        return st;
      });
    },

    clearAll: () => {
      set((s) => {
        const st = {
          ...s,
          ...emptyState(),
          profile: defaultAncestryProfile(),
        };
        persist(st as AncestryStoreState);
        return st;
      });
    },

    setActiveJourney: (plan) => set({ activeJourney: plan, journeyStepIndex: 0 }),

    setJourneyStepIndex: (i) => set({ journeyStepIndex: i }),
  })),
);
