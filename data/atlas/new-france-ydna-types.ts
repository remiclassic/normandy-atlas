export type YdnaMajor =
  | 'R1b' | 'R1a' | 'I1' | 'I2' | 'G2' | 'J1' | 'J2'
  | 'E1b' | 'N' | 'C' | 'Q' | 'T' | 'L' | 'Other';

export type GeneticOrigin =
  | 'scandinavian'
  | 'possible-scandinavian'
  | 'western-european'
  | 'mediterranean-neolithic'
  | 'eastern'
  | 'other';

export type GeneticConfidence = 'high' | 'medium' | 'low';

export function classifyGeneticOrigin(
  yMajor: YdnaMajor,
  yHaplogroup: string,
): { origin: GeneticOrigin; confidence: GeneticConfidence } {
  if (yMajor === 'I1') return { origin: 'scandinavian', confidence: 'high' };

  if (yMajor === 'R1a') {
    if (/Z284/i.test(yHaplogroup)) return { origin: 'scandinavian', confidence: 'medium' };
    return { origin: 'possible-scandinavian', confidence: 'low' };
  }

  if (yMajor === 'I2') return { origin: 'possible-scandinavian', confidence: 'low' };
  if (yMajor === 'R1b') return { origin: 'western-european', confidence: 'high' };

  if (yMajor === 'G2' || yMajor === 'J1' || yMajor === 'J2' || yMajor === 'E1b')
    return { origin: 'mediterranean-neolithic', confidence: 'high' };

  if (yMajor === 'N') return { origin: 'eastern', confidence: 'medium' };

  return { origin: 'other', confidence: 'low' };
}

export const GENETIC_ORIGIN_LABELS: Record<GeneticOrigin, string> = {
  'scandinavian':            'Scandinavian (Norse-linked)',
  'possible-scandinavian':   'Possible Scandinavian',
  'western-european':        'Western European (Norman/French)',
  'mediterranean-neolithic': 'Mediterranean / Neolithic',
  'eastern':                 'Northern Eurasian',
  'other':                   'Unclassified Origin',
};

export const GENETIC_ORIGIN_COLORS: Record<GeneticOrigin, string> = {
  'scandinavian':            '#4898e0',
  'possible-scandinavian':   '#6ab0d8',
  'western-european':        '#e05555',
  'mediterranean-neolithic': '#3cb870',
  'eastern':                 '#50b8b8',
  'other':                   '#889098',
};

export interface NfYdnaProperties {
  id: string;
  triId: string;
  surname: string;
  givenName: string;
  displayLabel: string;
  marriageYear: number;
  spouse: string;
  yHaplogroup: string;
  yMajor: YdnaMajor;
  excludeFromMap: boolean;
  geneticOrigin: GeneticOrigin;
  geneticConfidence: GeneticConfidence;
}

export interface NfYdnaFeature {
  type: 'Feature';
  properties: NfYdnaProperties;
  geometry: { type: 'Point'; coordinates: [number, number] };
}

export interface NfYdnaCollection {
  type: 'FeatureCollection';
  features: NfYdnaFeature[];
}

export const YDNA_MAJOR_LABELS: Record<YdnaMajor, string> = {
  R1b: 'R1b',
  R1a: 'R1a',
  I1:  'I1',
  I2:  'I2',
  G2:  'G2',
  J1:  'J1',
  J2:  'J2',
  E1b: 'E1b',
  N:   'N',
  C:   'C',
  Q:   'Q',
  T:   'T',
  L:   'L',
  Other: 'Other',
};
