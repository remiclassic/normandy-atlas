/**
 * Historical identity reconstruction (not a DNA test).
 * Maps geography, self-reported signals, optional surname heuristics → layered scores.
 */

export type NormanLayer = 'Celtic' | 'GalloRoman' | 'Frankish' | 'Norse' | 'Norman';

export type LayerStrength = 'low' | 'medium' | 'high';

export type LayerScore = Record<NormanLayer, number>;

export type OriginRegionId = 'quebec' | 'france' | 'england' | 'ireland' | 'usa' | 'other';

export type AncestrySignalId =
  | 'french'
  | 'british'
  | 'irish'
  | 'germanic'
  | 'scandinavian'
  | 'not_sure';

export type NormanIdentityInput = {
  originRegion: OriginRegionId;
  /** When originRegion is `other`, user note (optional; does not change weights). */
  otherRegionText?: string;
  ancestrySignals: AncestrySignalId[];
  surname: string;
  normanIntent: boolean;
};

export type IdentityLayerResult = {
  name: NormanLayer;
  strength: LayerStrength;
};

export type NormanArchetypeId =
  | 'frankish_core'
  | 'viking_influenced'
  | 'celtic_rooted'
  | 'blended';

export type IdentityResult = {
  layers: IdentityLayerResult[];
  archetypeId: NormanArchetypeId;
  /** Ordered story beat ids for i18n keys normanIdentity.storyBeat.{id} */
  storyBeatIds: readonly ['celtic', 'roman', 'frankish', 'viking', 'norman'];
};

const LAYERS: NormanLayer[] = ['Celtic', 'GalloRoman', 'Frankish', 'Norse', 'Norman'];

export const NORMAN_IDENTITY_STORY_BEAT_IDS = [
  'celtic',
  'roman',
  'frankish',
  'viking',
  'norman',
] as const;

/** Base multipliers per region (internal model). */
export const REGION_BASE: Record<OriginRegionId, LayerScore> = {
  quebec: {
    Celtic: 0.7,
    GalloRoman: 0.9,
    Frankish: 1.0,
    Norse: 0.4,
    Norman: 0.8,
  },
  france: {
    Celtic: 0.8,
    GalloRoman: 1.0,
    Frankish: 1.0,
    Norse: 0.5,
    Norman: 1.0,
  },
  england: {
    Celtic: 0.7,
    GalloRoman: 0.5,
    Frankish: 0.6,
    Norse: 0.7,
    Norman: 1.0,
  },
  ireland: {
    Celtic: 1.0,
    GalloRoman: 0.4,
    Frankish: 0.35,
    Norse: 0.55,
    Norman: 0.5,
  },
  usa: {
    Celtic: 0.55,
    GalloRoman: 0.5,
    Frankish: 0.55,
    Norse: 0.48,
    Norman: 0.52,
  },
  other: {
    Celtic: 0.65,
    GalloRoman: 0.65,
    Frankish: 0.65,
    Norse: 0.55,
    Norman: 0.65,
  },
};

const SIGNAL_MODIFIERS: Record<Exclude<AncestrySignalId, 'not_sure'>, Partial<LayerScore>> = {
  french: { Frankish: 0.3, GalloRoman: 0.3 },
  british: { Norman: 0.3, Norse: 0.2 },
  irish: { Celtic: 0.5 },
  germanic: { Frankish: 0.5 },
  scandinavian: { Norse: 0.7 },
};

const NOT_SURE_BUMP = 0.08;

const SCORE_FLOOR = 0.05;

function emptyScore(): LayerScore {
  return { Celtic: 0, GalloRoman: 0, Frankish: 0, Norse: 0, Norman: 0 };
}

function addInto(target: LayerScore, delta: Partial<LayerScore>): void {
  for (const k of LAYERS) {
    const d = delta[k];
    if (d != null && Number.isFinite(d)) target[k] += d;
  }
}

function floorScore(s: LayerScore): LayerScore {
  const o = emptyScore();
  for (const k of LAYERS) o[k] = Math.max(SCORE_FLOOR, s[k]);
  return o;
}

function normalizeScore(s: LayerScore): LayerScore {
  const floored = floorScore(s);
  let sum = 0;
  for (const k of LAYERS) sum += floored[k];
  const o = emptyScore();
  for (const k of LAYERS) o[k] = sum > 0 ? floored[k] / sum : 1 / LAYERS.length;
  return o;
}

/** Strength from value tertiles after normalization. */
export function strengthsFromNormalized(norm: LayerScore): Record<NormanLayer, LayerStrength> {
  const vals = LAYERS.map((k) => ({ k, v: norm[k] })).sort((a, b) => b.v - a.v);
  const n = vals.length;
  const lowCut = vals[Math.floor((n * 2) / 3)]?.v ?? 0;
  const highCut = vals[Math.floor(n / 3)]?.v ?? 1;
  const out: Partial<Record<NormanLayer, LayerStrength>> = {};
  for (const { k, v } of vals) {
    if (v >= highCut - 1e-9) out[k] = 'high';
    else if (v <= lowCut + 1e-9) out[k] = 'low';
    else out[k] = 'medium';
  }
  return out as Record<NormanLayer, LayerStrength>;
}

/** Surname heuristics — additive boosts (deterministic). */
export function analyzeSurname(surnameRaw: string): Partial<LayerScore> {
  const s = surnameRaw.trim().toLowerCase();
  if (!s) return {};

  const boost = emptyScore();
  const tokens = s.split(/[\s'-]+/).filter(Boolean);
  const first = tokens[0] ?? s;

  if (first.startsWith('de') && first.length > 2) {
    boost.Norman += 0.25;
    boost.Frankish += 0.2;
  }
  if (s.endsWith('son') || s.endsWith('sen')) {
    boost.Norse += 0.35;
  }

  const frenchHints = [
    'couture',
    'dupont',
    'martin',
    'bernard',
    'robert',
    'richard',
    'gagnon',
    'leboeuf',
    'tremblay',
    'gauthier',
    'boivin',
    'fontaine',
    'chevalier',
  ];
  for (const h of frenchHints) {
    if (s.includes(h)) {
      boost.Norman += 0.22;
      boost.Frankish += 0.18;
      boost.GalloRoman += 0.1;
      break;
    }
  }

  if (/ville$/i.test(s) || /eau$/i.test(s)) {
    boost.Frankish += 0.08;
    boost.GalloRoman += 0.08;
  }

  return boost;
}

function pickArchetype(norm: LayerScore): NormanArchetypeId {
  const { Celtic: c, GalloRoman: g, Frankish: f, Norse: n, Norman: no } = norm;

  const vikingLean = n >= no * 0.92 && n >= c * 1.02;
  const celticLean = c >= f * 1.08 && c >= n * 1.05;
  const frankishLean = f + g >= c + n * 1.05 && f >= 0.18;

  if (celticLean && !vikingLean) return 'celtic_rooted';
  if (vikingLean && n >= c * 0.95) return 'viking_influenced';
  if (frankishLean) return 'frankish_core';
  return 'blended';
}

function multiplyBase(base: LayerScore): LayerScore {
  const o = emptyScore();
  for (const k of LAYERS) o[k] = base[k];
  return o;
}

/**
 * Apply region base as multiplicative seeds: start from REGION_BASE[region],
 * then add signal / surname / intent adjustments.
 */
export function computeNormanIdentity(input: NormanIdentityInput): IdentityResult {
  const base = REGION_BASE[input.originRegion] ?? REGION_BASE.other;
  const working = multiplyBase(base);

  for (const sig of input.ancestrySignals) {
    if (sig === 'not_sure') {
      for (const k of LAYERS) working[k] += NOT_SURE_BUMP;
    } else {
      const mod = SIGNAL_MODIFIERS[sig];
      addInto(working, mod);
    }
  }

  if (input.ancestrySignals.length === 0) {
    for (const k of LAYERS) working[k] += NOT_SURE_BUMP * 0.75;
  }

  addInto(working, analyzeSurname(input.surname));

  if (input.normanIntent) {
    working.Norman += 0.28;
    working.Frankish += 0.1;
  }

  const normalized = normalizeScore(working);
  const strengthByLayer = strengthsFromNormalized(normalized);
  const layers: IdentityLayerResult[] = LAYERS.map((name) => ({
    name,
    strength: strengthByLayer[name],
  }));

  const archetypeId = pickArchetype(normalized);

  return {
    layers,
    archetypeId,
    storyBeatIds: NORMAN_IDENTITY_STORY_BEAT_IDS,
  };
}

/** i18n step keys in narrative order (Celtic → Norman). */
export function generateNormanStory(_result: IdentityResult): IdentityResult['storyBeatIds'] {
  void _result;
  return NORMAN_IDENTITY_STORY_BEAT_IDS;
}
