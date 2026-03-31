import type { I18nString } from '@/core/types';
import { CELTIC_SEA_JOURNEY_ID } from '@/data/atlas/celtic-sea-route-metadata';

/** Eras where Danish / Celtic Sea Normandy flythrough routes are defined (see `journeys.ts`). */
const VIKING_NORMAN_FLYTHROUGH_ERAS = ['viking-age', 'norman-origins'] as const;

export interface FlythroughPreset {
  id: string;
  journeyIds: string[];
  defaultEraId: string;
  /** Show preset buttons and allow flythrough only in these eras. */
  visibleEraIds: readonly string[];
  title: I18nString;
  subtitle: I18nString;
}

export const flythroughPresets: FlythroughPreset[] = [
  {
    id: 'viking-danish-to-rouen',
    journeyIds: ['journey-danish-migration'],
    defaultEraId: 'viking-age',
    visibleEraIds: VIKING_NORMAN_FLYTHROUGH_ERAS,
    title: {
      en: 'Danish Migration to Rouen',
      fr: 'Migration danoise vers Rouen',
      it: 'Migrazione danese verso Rouen',
      es: 'Migración danesa hacia Ruan',
    },
    subtitle: {
      en: 'Follow the primary Norse corridor from Denmark across the North Sea to the Seine',
      fr: 'Suivez le corridor norrois principal du Danemark à travers la mer du Nord jusqu\'à la Seine',
      it: 'Segui il corridoio norreno principale dalla Danimarca attraverso il Mare del Nord fino alla Senna',
      es: 'Sigue el corredor nórdico principal desde Dinamarca a través del mar del Norte hasta el Sena',
    },
  },
  {
    id: 'viking-celtic-to-rouen',
    journeyIds: [CELTIC_SEA_JOURNEY_ID],
    defaultEraId: 'viking-age',
    visibleEraIds: VIKING_NORMAN_FLYTHROUGH_ERAS,
    title: {
      en: 'Celtic Sea Route',
      fr: 'Route de la mer Celtique',
      it: 'Rotta del mare Celtico',
      es: 'Ruta del mar Celta',
    },
    subtitle: {
      en: 'The Norwegian Viking path through Scotland, Ireland, and the western seaways into Normandy',
      fr: 'La voie viking norvégienne par l\'Écosse, l\'Irlande et les routes maritimes occidentales vers la Normandie',
      it: 'La via vichinga norvegese attraverso Scozia, Irlanda e le rotte marittime occidentali verso la Normandia',
      es: 'La ruta vikinga noruega a través de Escocia, Irlanda y las rutas marítimas occidentales hacia Normandía',
    },
  },
  {
    id: 'viking-normandy-both',
    journeyIds: ['journey-danish-migration', CELTIC_SEA_JOURNEY_ID],
    defaultEraId: 'viking-age',
    visibleEraIds: VIKING_NORMAN_FLYTHROUGH_ERAS,
    title: {
      en: 'Vikings into Normandy',
      fr: 'Les Vikings en Normandie',
      it: 'I Vichinghi in Normandia',
      es: 'Los vikingos en Normandía',
    },
    subtitle: {
      en: 'Both migration corridors — the Danish Seine route and the Norwegian Celtic Sea path',
      fr: 'Les deux corridors migratoires — la route danoise de la Seine et la voie norvégienne de la mer Celtique',
      it: 'Entrambi i corridoi migratori — la rotta danese della Senna e la via norvegese del mare Celtico',
      es: 'Ambos corredores migratorios — la ruta danesa del Sena y la vía noruega del mar Celta',
    },
  },
];

export function getFlythroughPreset(presetId: string): FlythroughPreset | undefined {
  return flythroughPresets.find((p) => p.id === presetId);
}

export function isFlythroughPresetVisibleInEra(preset: FlythroughPreset, eraId: string): boolean {
  return preset.visibleEraIds.includes(eraId);
}
