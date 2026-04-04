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
  ydna?: string;
  vikingAdna?: string;
  vikingArch?: string;
  story?: string | null;
  step?: number;
  /** Open story library overlay instead of starting playback. */
  library?: boolean;
  /**
   * Arc id for library focus; use empty string for full chronological timeline (`arcId` null).
   * Omit property to open library without changing the featured selection.
   */
  libraryArc?: string | null;
  /** Open the detail sheet when the library loads. */
  libraryDetail?: boolean;
  /** Base64url-encoded map-view payload (camera + layers + timeline). */
  view?: string;
}

export function buildMapHref(params: MapDeepLinkParams, pathname = '/'): string {
  const qs = new URLSearchParams();
  if (params.era) qs.set('era', params.era);
  if (params.place) qs.set('place', params.place);
  if (params.region) qs.set('region', params.region);
  if (params.segment) qs.set('segment', params.segment);
  if (params.journey) qs.set('journey', params.journey);
  if (params.ydna) qs.set('ydna', params.ydna);
  if (params.vikingAdna) qs.set('vikingAdna', params.vikingAdna);
  if (params.vikingArch) qs.set('vikingArch', params.vikingArch);
  if (params.story !== undefined) qs.set('story', params.story ?? '');
  if (params.step != null) qs.set('step', String(params.step));
  if (params.library) qs.set('library', '1');
  if (params.libraryArc !== undefined) qs.set('libraryArc', params.libraryArc ?? '');
  if (params.libraryDetail) qs.set('libraryDetail', '1');
  if (params.view) qs.set('view', params.view);
  const str = qs.toString();
  return str ? `${pathname}?${str}` : pathname;
}
