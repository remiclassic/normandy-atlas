import type { I18nString } from '@/core/types';

export type VikingBattleKind = 'battle' | 'fleet' | 'siege';

export interface VikingBattleMarker {
  id: string;
  kind: VikingBattleKind;
  coordinates: [number, number];
  year: number;
  yearEnd?: number;
  label: I18nString;
}

export const vikingBattleMarkers: VikingBattleMarker[] = [
  {
    id: 'vbm-lindisfarne',
    kind: 'battle',
    coordinates: [-1.8, 55.68],
    year: 793,
    label: { en: 'Lindisfarne Raid (793)', fr: 'Raid de Lindisfarne (793)', de: 'Lindisfarne-Überfall (793)' },
  },
  {
    id: 'vbm-paris-845',
    kind: 'siege',
    coordinates: [2.35, 48.86],
    year: 845,
    label: { en: 'Sack of Paris (845)', fr: 'Sac de Paris (845)', de: 'Paris-Tasche (845)' },
  },
  {
    id: 'vbm-rouen-841',
    kind: 'battle',
    coordinates: [1.09, 49.44],
    year: 841,
    label: { en: 'Fall of Rouen (841)', fr: 'Chute de Rouen (841)', de: 'Fall von Rouen (841)' },
  },
  {
    id: 'vbm-paris-siege',
    kind: 'siege',
    coordinates: [2.35, 48.86],
    year: 885,
    yearEnd: 886,
    label: { en: 'Siege of Paris (885–886)', fr: 'Siège de Paris (885–886)', de: 'Belagerung von Paris (885–886)' },
  },
  {
    id: 'vbm-brisbane-dublin',
    kind: 'battle',
    coordinates: [-6.26, 53.35],
    year: 841,
    label: { en: 'Dublin Founded (841)', fr: 'Fondation de Dublin (841)', de: 'Gründung von Dublin (841)' },
  },
  {
    id: 'vbm-york-867',
    kind: 'battle',
    coordinates: [-1.08, 53.96],
    year: 867,
    label: { en: 'Capture of York (867)', fr: 'Prise de York (867)', de: 'Einnahme von York (867)' },
  },
  {
    id: 'vbm-edington',
    kind: 'battle',
    coordinates: [-2.1, 51.27],
    year: 878,
    label: { en: 'Battle of Edington (878)', fr: 'Bataille d\'Edington (878)', de: 'Schlacht von Edington (878)' },
  },
  {
    id: 'vbm-stamford-bridge',
    kind: 'battle',
    coordinates: [-0.92, 53.99],
    year: 1066,
    label: { en: 'Stamford Bridge (1066)', fr: 'Stamford Bridge (1066)', de: 'Stamford Bridge (1066)' },
  },
  {
    id: 'vbm-hastings',
    kind: 'battle',
    coordinates: [0.49, 50.91],
    year: 1066,
    label: { en: 'Hastings (1066)', fr: 'Hastings (1066)', de: 'Hastings (1066)' },
  },
  {
    id: 'vbm-clontarf',
    kind: 'battle',
    coordinates: [-6.19, 53.37],
    year: 1014,
    label: { en: 'Clontarf (1014)', fr: 'Clontarf (1014)', de: 'Clontarf (1014)' },
  },
  {
    id: 'vbm-seville-844',
    kind: 'battle',
    coordinates: [-5.99, 37.39],
    year: 844,
    label: { en: 'Raid on Seville (844)', fr: 'Raid sur Séville (844)', de: 'Überfall auf Sevilla (844)' },
  },
  {
    id: 'vbm-fleet-hedeby',
    kind: 'fleet',
    coordinates: [9.56, 54.49],
    year: 800,
    yearEnd: 1066,
    label: { en: 'Fleet Base: Hedeby', fr: 'Base navale : Hedeby', de: 'Marinestützpunkt: Haithabu' },
  },
  {
    id: 'vbm-fleet-birka',
    kind: 'fleet',
    coordinates: [17.55, 59.33],
    year: 790,
    yearEnd: 970,
    label: { en: 'Fleet Base: Birka', fr: 'Base navale : Birka', de: 'Marinestützpunkt: Birka' },
  },
  {
    id: 'vbm-fleet-kaupang',
    kind: 'fleet',
    coordinates: [10.22, 59.05],
    year: 790,
    yearEnd: 930,
    label: { en: 'Fleet Base: Kaupang', fr: 'Base navale : Kaupang', de: 'Marinestützpunkt: Kaupang' },
  },
];

export function buildVikingBattleGeoJson(simYear?: number): GeoJSON.FeatureCollection {
  const filtered = simYear != null
    ? vikingBattleMarkers.filter((m) => simYear >= m.year && simYear <= (m.yearEnd ?? m.year + 30))
    : vikingBattleMarkers;

  return {
    type: 'FeatureCollection',
    features: filtered.map((m) => ({
      type: 'Feature' as const,
      properties: {
        id: m.id,
        kind: m.kind,
        year: m.year,
        yearEnd: m.yearEnd ?? m.year,
        label: m.label.en,
      },
      geometry: {
        type: 'Point' as const,
        coordinates: m.coordinates,
      },
    })),
  };
}
