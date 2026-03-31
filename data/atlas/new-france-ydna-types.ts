export type YdnaMajor =
  | 'R1b' | 'R1a' | 'I1' | 'I2' | 'G2' | 'J1' | 'J2'
  | 'E1b' | 'N' | 'C' | 'Q' | 'T' | 'L' | 'Other';

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
