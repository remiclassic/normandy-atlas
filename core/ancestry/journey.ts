import type { LineageEraLens } from '@/core/types';
import type {
  AncestryJourneyPlan,
  AncestryJourneyStep,
  FamilyTreePerson,
  UserAncestryProfile,
} from '@/core/ancestry/types';
import type { NormanDetectionResult } from '@/core/ancestry/types';
import { getPlaceCoords } from '@/core/places/engine';

function narrative(id: string, title: string, body: string): AncestryJourneyStep {
  return { kind: 'narrativeCard', id, title, body };
}

/** Core voyage steps used when any Norman-relevant hint fires. */
function normanBackdropSteps(): AncestryJourneyStep[] {
  return [
    narrative(
      'intro',
      'Your map, your story',
      'Norman Atlas links places, eras, and curated arcs. This journey is a guided sampler — not a verdict on your ancestors.',
    ),
    {
      kind: 'mapEra',
      id: 'viking-age',
      eraId: 'viking-age',
      atlasSimYear: 900,
      layerPatch: {
        'historical-presence': true,
        'lineage-explorer': false,
      },
    },
    {
      kind: 'mapFly',
      id: 'fly-scandinavia-nodes',
      placeId: 'white-sea-node',
      zoom: 3.8,
      durationMs: 2200,
    },
    {
      kind: 'storyBeat',
      id: 'beat-viking-sample',
      arcId: 'viking-age',
      stepIndex: 0,
    },
    {
      kind: 'mapEra',
      id: 'norman-origins-era',
      eraId: 'norman-origins',
      atlasSimYear: 933,
    },
    {
      kind: 'mapFly',
      id: 'fly-rouen',
      placeId: 'rouen',
      zoom: 6.4,
    },
    {
      kind: 'storyBeat',
      id: 'beat-norman-orig-sample',
      arcId: 'norman-origins',
      stepIndex: 0,
    },
    {
      kind: 'mapEra',
      id: 'norman-expansion-era',
      eraId: 'norman-expansion',
      atlasSimYear: 1066,
      layerPatch: {
        'norman-expansion-territories': true,
        'norman-expansion-routes': true,
        'norman-expansion-nodes': true,
      },
    },
    {
      kind: 'mapFly',
      id: 'fly-hastings',
      placeId: 'hastings',
      zoom: 7,
    },
  ];
}

function hasNormanishSignal(detection: NormanDetectionResult): boolean {
  return detection.hypotheses.some(
    (h) => h.id !== 'need-input' && h.id !== 'neutral' && (h.strength === 'moderate' || h.strength === 'suggestive'),
  );
}

export function buildAncestryJourneyPlan(args: {
  detection: NormanDetectionResult;
  profile: UserAncestryProfile;
  focusPerson: FamilyTreePerson | null;
  /** Resolved haplogroup profile id for map overlay chapter */
  lineageProfileId?: string | null;
  lineageLens?: LineageEraLens;
}): AncestryJourneyPlan {
  const lens: LineageEraLens = args.lineageLens ?? 'early_medieval';
  const steps: AncestryJourneyStep[] = [];
  const id = `journey-${Date.now().toString(36)}`;

  steps.push(
    narrative(
      'open',
      'Starting your ancestry journey',
      'We will move across eras the atlas already models — Scandinavian mobility, the making of Normandy, and the expansion that followed. Stay curious and skeptical: the map illustrates context.',
    ),
  );

  const anchor = args.focusPerson;
  if (anchor?.birthPlaceId) {
    const cta = getPlaceCoords(anchor.birthPlaceId);
    if (cta) {
      steps.push(
        narrative('anchor-person', `Focusing on ${anchor.name}`, `Flying toward their recorded atlas place (${anchor.birthPlaceId}).`),
        {
          kind: 'mapFly',
          id: 'fly-anchor-birth',
          center: cta,
          zoom: 6.5,
        },
      );
    }
  }

  if (args.lineageProfileId) {
    steps.push({
      kind: 'lineageOverlay',
      id: 'lineage-chapter',
      profileId: args.lineageProfileId,
      eraLens: lens,
      enableMacro: true,
      macroYear: 800,
    });
  }

  if (hasNormanishSignal(args.detection) || anchor) {
    steps.push(...normanBackdropSteps());
  } else {
    steps.push(
      narrative(
        'generic-deeper',
        'Deep time lens',
        'Add places in Northern France or the Channel, or enter a haplogroup, to unlock more specific Norman-context chapters.',
      ),
      {
        kind: 'mapEra',
        id: 'bronze-era',
        eraId: 'bronze-age-channel',
      },
    );
  }

  steps.push(
    narrative(
      'close',
      'Keep exploring',
      'Use the Lineage Explorer and Story Library for deeper dives. Export your tree or GEDCOM from the ancestry hub when you are ready.',
    ),
  );

  return {
    id,
    title: 'Personal ancestry sampler',
    steps,
    createdAt: new Date().toISOString(),
  };
}
