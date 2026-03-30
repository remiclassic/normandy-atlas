import type { AtlasIconId } from './atlasIconId';

export interface IconMeta {
  title: string;
  /** Accent colour used in the timeline UI strip badges. */
  accent: string;
}

export const ICON_META: Record<AtlasIconId, IconMeta> = {
  city:         { title: 'City',                accent: '#d4c9a8' },
  settlement:   { title: 'Settlement',          accent: '#b8a87a' },
  fortress:     { title: 'Fortress / Castle',   accent: '#c48a52' },
  religious:    { title: 'Abbey / Church',       accent: '#a8b8c8' },
  battle:       { title: 'Battle / Conflict',   accent: '#d45050' },
  port:         { title: 'Port / Harbor',        accent: '#5b9bd5' },
  trade:        { title: 'Trade Center',         accent: '#c4a962' },
  burial:       { title: 'Burial Site',          accent: '#8a7a6a' },
  megalith:     { title: 'Megalithic Site',      accent: '#a8926a' },
  palace:       { title: 'Palace / Court',       accent: '#d4b872' },
  expedition:   { title: 'Expedition / Voyage',  accent: '#6abfa0' },
  person:       { title: 'Notable Figure',       accent: '#c8a0d0' },
  artifact:     { title: 'Archaeological Find',  accent: '#b89060' },
  militaryCamp: { title: 'Military Camp',        accent: '#a0785a' },
  cultural:     { title: 'Cultural Site',        accent: '#7aa088' },
  hillfort:     { title: 'Hillfort / Oppidum',   accent: '#8b5e3c' },
  generic:      { title: 'Historical Site',      accent: '#9e9e9e' },
};
