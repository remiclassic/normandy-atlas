import type { GfnaConfidenceStatus, GfnaSignatureType } from '@/data/atlas/gfna-dna-types';

export interface NfMtDnaProperties {
  id: string;
  displayLabel: string;
  surname: string;
  givenName: string;
  marriageYear: number;
  spouse: string;
  mtHaplogroup: string;
  excludeFromMap: boolean;
  gfnaStatus: GfnaConfidenceStatus;
  sourcePage?: string;
  familySheetNo?: string;
  signatureType?: GfnaSignatureType;
}

export interface NfMtDnaFeature {
  type: 'Feature';
  properties: NfMtDnaProperties;
  geometry: { type: 'Point'; coordinates: [number, number] };
}

export interface NfMtDnaCollection {
  type: 'FeatureCollection';
  features: NfMtDnaFeature[];
}
