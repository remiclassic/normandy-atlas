/**
 * Helpers for building deep-link URLs from the Journal back to the map,
 * and for consuming them on the map page.
 */

export interface MapDeepLinkParams {
  era?: string;
  place?: string;
  region?: string;
  segment?: string;
  journey?: string;
  story?: string | null;
  step?: number;
}

export function buildMapHref(params: MapDeepLinkParams): string {
  const qs = new URLSearchParams();
  if (params.era) qs.set('era', params.era);
  if (params.place) qs.set('place', params.place);
  if (params.region) qs.set('region', params.region);
  if (params.segment) qs.set('segment', params.segment);
  if (params.journey) qs.set('journey', params.journey);
  if (params.story !== undefined) qs.set('story', params.story ?? '');
  if (params.step != null) qs.set('step', String(params.step));
  const str = qs.toString();
  return str ? `/?${str}` : '/';
}
