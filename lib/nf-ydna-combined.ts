import { nfYdnaGeoJson } from '@/data/atlas/new-france-ydna';
import { nfYdnaPresumedGeoJson } from '@/data/atlas/gfna-ydna-presumed';
import type { NfYdnaCollection } from '@/data/atlas/new-france-ydna-types';

/** Confirmed (primary catalogue) plus optional presumed Y-DNA features for search / filters. */
export const nfYdnaCombinedGeoJson: NfYdnaCollection = {
  type: 'FeatureCollection',
  features: [...nfYdnaGeoJson.features, ...nfYdnaPresumedGeoJson.features],
};
