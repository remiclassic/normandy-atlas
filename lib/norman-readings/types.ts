export interface NormanReadingEntry {
  slug: string;
  title: string;
  description: string;
  linkedNodeId?: string;
  defaultEraId?: string;
  /** When there is no pin, optional map camera for “Open on map” (lng, lat). */
  mapFocus?: { center: [number, number]; zoom: number };
  tags?: string[];
}
