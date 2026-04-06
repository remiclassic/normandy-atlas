import type { LineageEraLens } from '@/core/types';
import type { DeepOriginComponentId } from '@/core/deep-origins/types';

/** User-owned genealogy node — not the curated atlas `Person` type. */
export interface FamilyTreePerson {
  id: string;
  name: string;
  birthYear?: number;
  deathYear?: number;
  /** Atlas place id when matched to the atlas gazetteer */
  birthPlaceId?: string;
  deathPlaceId?: string;
  birthPlaceFreeform?: string;
  deathPlaceFreeform?: string;
  fatherId?: string;
  motherId?: string;
  /** Raw tester-reported labels; resolve via `resolveHaplogroupQuery` */
  haplogroups?: { paternal?: string; maternal?: string };
  /** Optional user notes */
  notes?: string;
}

export interface UserAncestryProfile {
  /** Person node representing the user / “home person” */
  selfPersonId: string | null;
  /** Preferred pedigree root (often earliest known ancestor) */
  rootPersonId: string | null;
  yDnaRaw?: string;
  mtDnaRaw?: string;
  /** Primary surname for quick Norman-detection entry */
  primarySurname?: string;
  /** Optional user-entered deep-origins-style blend (0–100 per component); not from lab testing */
  deepOriginsBlend?: Partial<Record<DeepOriginComponentId, number>>;
  updatedAt: string;
}

export type AncestryJourneyStep =
  | {
      kind: 'narrativeCard';
      id: string;
      title: string;
      body: string;
    }
  | {
      kind: 'mapEra';
      id: string;
      eraId: string;
      atlasSimYear?: number;
      /** Layer id -> visible */
      layerPatch?: Record<string, boolean>;
    }
  | {
      kind: 'mapFly';
      id: string;
      placeId?: string;
      center?: [number, number];
      zoom: number;
      durationMs?: number;
    }
  | {
      kind: 'lineageOverlay';
      id: string;
      profileId: string;
      eraLens: LineageEraLens;
      enableMacro?: boolean;
      macroYear?: number;
    }
  | {
      kind: 'storyBeat';
      id: string;
      arcId: string;
      stepIndex: number;
    };

export interface AncestryJourneyPlan {
  id: string;
  title: string;
  steps: AncestryJourneyStep[];
  createdAt: string;
}

export type NormanHypothesisStrength = 'suggestive' | 'moderate' | 'weak';

export interface NormanDetectionHypothesis {
  id: string;
  label: string;
  strength: NormanHypothesisStrength;
  /** Short evidence strings for the UI */
  evidence: string[];
}

export interface NormanDetectionResult {
  hypotheses: NormanDetectionHypothesis[];
  disclaimers: string[];
}
