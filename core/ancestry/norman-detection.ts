import { getPlace } from '@/core/places/engine';
import { resolveHaplogroupQuery } from '@/core';
import type { HaplogroupProfile } from '@/core/types';
import type { FamilyTreePerson, NormanDetectionResult, NormanHypothesisStrength } from '@/core/ancestry/types';

const DISCLAIMER = [
  'These are exploratory hints for storytelling in Norman Atlas, not proof of ancestry.',
  'Surnames and places alone cannot confirm medieval origin; genetics indicate population affinities, not individual family trees.',
];

/** Regions that overlap the historic duchy / Channel Norman world in our gazetteer. */
const NORMAN_CHANNEL_REGIONS = new Set([
  'normandy',
  'lower-seine',
  'channel-coast',
  'neustria',
  'normandy-neolithic-zone',
  'channel-islands-neolithic',
  'channel-trade-zone',
  'veliocasses',
  'caletes',
  'unelli',
  'abrincates',
]);

const BRITTANY_REGION = new Set(['brittany']);
const NEW_FRANCE_REGIONS = new Set(['new-france', 'acadia']);

/** Places strongly tied to Norman expansion narratives in the atlas. */
const NORMAN_EXPANSION_PLACE_IDS = new Set([
  'hastings',
  'london',
  'palermo',
  'antioch',
  'bari',
  'taranto',
  'caen',
  'rouen',
  'bayeux',
]);

function strengthFromScore(score: number): NormanHypothesisStrength {
  if (score >= 5) return 'moderate';
  if (score >= 3) return 'suggestive';
  return 'weak';
}

function scoreSurname(surname: string | undefined): { score: number; bits: string[] } {
  if (!surname?.trim()) return { score: 0, bits: [] };
  const s = surname.trim();
  const lower = s.toLowerCase();
  const bits: string[] = [];
  let score = 0;
  if (/^fitz-/i.test(s) || /^fitz /i.test(s)) {
    score += 3;
    bits.push('“Fitz-” often marks Anglo-Norman patronymic naming (interpretive).');
  }
  if (/^(de|d’|d`|du|des|le|la)\s+/i.test(s)) {
    score += 2;
    bits.push('French-style particles (“de / du / le…”) are common in Norman and broader Frankish toponymic surnames.');
  }
  if (lower.endsWith('-ville') || lower.endsWith('ville')) {
    score += 1;
    bits.push('Toponymic “-ville” appears often in Norman French naming (non-exclusive).');
  }
  return { score, bits };
}

function scorePlaces(person: FamilyTreePerson): { score: number; bits: string[] } {
  const bits: string[] = [];
  let score = 0;
  const ids = [person.birthPlaceId, person.deathPlaceId].filter(Boolean) as string[];
  for (const pid of ids) {
    const pl = getPlace(pid);
    const rid = pl?.regionId;
    if (rid && NORMAN_CHANNEL_REGIONS.has(rid)) {
      score += 3;
      bits.push(`Atlas place “${pid}” sits in a Norman–Channel geographic cluster.`);
    }
    if (rid && BRITTANY_REGION.has(rid)) {
      score += 2;
      bits.push(`“${pid}” is tagged near Breton spheres — often intertwined with Norman frontiers.`);
    }
    if (rid && NEW_FRANCE_REGIONS.has(rid)) {
      score += 2;
      bits.push(`“${pid}” aligns with New France–era geographies in the atlas — useful for colonial arcs.`);
    }
    if (NORMAN_EXPANSION_PLACE_IDS.has(pid)) {
      score += 2;
      bits.push(`“${pid}” is used in atlas Norman-expansion storytelling (editorial anchor, not personal proof).`);
    }
  }
  return { score, bits };
}

function collectHaplogroupProfiles(
  person: FamilyTreePerson | null,
  yRaw?: string,
  mtRaw?: string,
): HaplogroupProfile[] {
  const out: HaplogroupProfile[] = [];
  const seen = new Set<string>();
  const tryAdd = (raw: string | undefined) => {
    if (!raw?.trim()) return;
    const hit = resolveHaplogroupQuery(raw.trim(), { lineage: 'all', depth: 'all' });
    if (!hit) return;
    const prof = hit.profile;
    if (prof && !seen.has(prof.id)) {
      seen.add(prof.id);
      out.push(prof);
    }
  };
  if (person) {
    tryAdd(person.haplogroups?.paternal ?? yRaw);
    tryAdd(person.haplogroups?.maternal ?? mtRaw);
  } else {
    tryAdd(yRaw);
    tryAdd(mtRaw);
  }
  return out;
}

function scoreHaplos(profiles: HaplogroupProfile[]): { score: number; bits: string[] } {
  const bits: string[] = [];
  let score = 0;
  for (const p of profiles) {
    const focuses = p.normanAtlasFocus ?? [];
    for (const f of focuses) {
      if (f === 'normandy' || f === 'anglo_norman' || f === 'viking_age_scandinavia') {
        score += 2;
        bits.push(
          `Atlas lineage note: ${p.name} is editorially tagged for ${f.replace(/_/g, ' ')} — compare cousins on the tree, not individuals.`,
        );
      } else if (f === 'new_france' || f === 'british_isles') {
        score += 1;
        bits.push(`Atlas lineage note: ${p.name} includes ${f.replace(/_/g, ' ')} framing.`);
      }
    }
  }
  return { score, bits };
}

/** Heuristic “Norman lens” hints from surname, atlas places, and resolved haplogroup profiles. */
export function runNormanDetection(
  person: FamilyTreePerson | null,
  opts?: { yDnaRaw?: string; mtDnaRaw?: string; primarySurname?: string },
): NormanDetectionResult {
  const hypotheses: NormanDetectionResult['hypotheses'] = [];
  if (!person && !opts?.primarySurname?.trim()) {
    return {
      hypotheses: [
        {
          id: 'need-input',
          label: 'Add a person or surname to explore Norman-context hints',
          strength: 'weak',
          evidence: ['No surname or selected person yet.'],
        },
      ],
      disclaimers: DISCLAIMER,
    };
  }

  const surname = opts?.primarySurname?.trim() || person?.name.split(/\s+/).pop();
  const sur = scoreSurname(surname);
  if (sur.bits.length) {
    hypotheses.push({
      id: 'surname',
      label: 'Surname-shaped hints',
      strength: strengthFromScore(sur.score),
      evidence: sur.bits,
    });
  }

  if (person) {
    const pl = scorePlaces(person);
    if (pl.bits.length) {
      hypotheses.push({
        id: 'places',
        label: 'Place-based atlas context',
        strength: strengthFromScore(pl.score),
        evidence: pl.bits,
      });
    }
  }

  const hProfiles = collectHaplogroupProfiles(person, opts?.yDnaRaw, opts?.mtDnaRaw);
  const hg = scoreHaplos(hProfiles);
  if (hg.bits.length) {
    hypotheses.push({
      id: 'haplogroup-atlas',
      label: 'Haplogroup profiles (population-framing only)',
      strength: strengthFromScore(hg.score),
      evidence: hg.bits,
    });
  }

  if (hypotheses.length === 0) {
    hypotheses.push({
      id: 'neutral',
      label: 'Limited automatic overlap with Norman Atlas cues',
      strength: 'weak',
      evidence: [
        'Try adding Channel / Normandy atlas places, a test haplogroup, or a surname with French particles for richer hints.',
      ],
    });
  }

  return { hypotheses, disclaimers: DISCLAIMER };
}
