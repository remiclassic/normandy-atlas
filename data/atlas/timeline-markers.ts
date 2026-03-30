import type { TimelineMarker } from '@/core/types';

export const atlasTimelineMarkers: TimelineMarker[] = [
  // ── Deep-time ─────────────────────────────────────────────────────
  {
    id: 'tm-neolithic-monuments',
    kind: 'foundation',
    year: -4500,
    eraIds: ['neolithic-normandy'],
    label: { en: 'First dolmens raised', fr: 'Premiers dolmens érigés', it: 'Primi dolmen eretti' },
  },
  {
    id: 'tm-bronze-channel-trade',
    kind: 'exploration',
    year: -1500,
    eraIds: ['bronze-age-channel'],
    label: { en: 'Channel tin trade peaks', fr: 'Apogée du commerce de l\'étain', it: 'Apogeo del commercio dello stagno nella Manica' },
  },
  {
    id: 'tm-celtic-oppida',
    kind: 'foundation',
    year: -300,
    eraIds: ['iron-age-gaul'],
    label: { en: 'Celtic oppida established', fr: 'Oppida celtes établis', it: 'Oppida celtici fondati' },
  },
  {
    id: 'tm-caesar-conquest',
    kind: 'battle',
    year: -52,
    eraIds: ['iron-age-gaul', 'roman-gaul'],
    label: { en: 'Caesar conquers Gaul', fr: 'César conquiert la Gaule', it: 'Cesare conquista la Gallia' },
  },
  {
    id: 'tm-rotomagus-capital',
    kind: 'foundation',
    year: 100,
    eraIds: ['roman-gaul'],
    label: { en: 'Rotomagus: provincial capital', fr: 'Rotomagus : capitale provinciale', it: 'Rotomagus: capitale provinciale' },
    action: { type: 'flyToPlace', placeId: 'rouen' },
  },
  {
    id: 'tm-saxon-shore',
    kind: 'battle',
    year: 350,
    eraIds: ['roman-gaul'],
    label: { en: 'Saxon Shore defences', fr: 'Défenses du Litus Saxonicum', it: 'Difese del Litus Saxonicum' },
  },

  // ── Post-Roman / Neustria ─────────────────────────────────────────
  {
    id: 'tm-clovis-baptism',
    kind: 'treaty',
    year: 496,
    eraIds: ['post-roman-gaul'],
    label: { en: 'Clovis baptized', fr: 'Baptême de Clovis', it: 'Battesimo di Clodoveo' },
  },
  {
    id: 'tm-neustria-partition',
    kind: 'treaty',
    year: 561,
    eraIds: ['neustria'],
    label: { en: 'Neustria partitioned', fr: 'Partition de la Neustrie', it: 'Partizione della Neustria' },
  },
  {
    id: 'tm-jumieges-founded',
    kind: 'foundation',
    year: 654,
    eraIds: ['neustria'],
    label: { en: 'Jumièges Abbey founded', fr: 'Fondation de l\'abbaye de Jumièges', it: 'Fondazione dell\'abbazia di Jumièges' },
    action: { type: 'flyToPlace', placeId: 'jumieges' },
  },

  // ── Carolingian ───────────────────────────────────────────────────
  {
    id: 'tm-charlemagne',
    kind: 'person',
    year: 800,
    eraIds: ['frankish-carolingian'],
    label: { en: 'Charlemagne crowned emperor', fr: 'Charlemagne couronné empereur', it: 'Carlo Magno incoronato imperatore' },
    action: { type: 'openPerson', personId: 'charlemagne' },
  },
  {
    id: 'tm-louis-pious-death',
    kind: 'person',
    year: 840,
    eraIds: ['frankish-carolingian'],
    label: { en: 'Death of Louis the Pious', fr: 'Mort de Louis le Pieux', it: 'Morte di Ludovico il Pio' },
    action: { type: 'openPerson', personId: 'louis-the-pious' },
  },

  // ── Viking Age ────────────────────────────────────────────────────
  {
    id: 'tm-first-seine-raid',
    kind: 'battle',
    year: 841,
    eraIds: ['viking-age'],
    label: { en: 'First Norse raid on Seine', fr: 'Premier raid scandinave sur la Seine', it: 'Primo raid norreno sulla Senna' },
  },
  {
    id: 'tm-siege-paris',
    kind: 'battle',
    year: 885,
    eraIds: ['viking-age'],
    label: { en: 'Siege of Paris', fr: 'Siège de Paris', it: 'Assedio di Parigi' },
    action: { type: 'flyToPlace', placeId: 'paris' },
  },

  // ── Norman Origins (911–1066) — includes Normandy STOPS ──────────
  {
    id: 'tm-treaty-saint-clair',
    kind: 'treaty',
    year: 911,
    eraIds: ['norman-origins'],
    label: { en: '911 — Treaty of Saint-Clair (Rollo)', fr: '911 — Traité de Saint-Clair (Rollon)', it: '911 — Trattato di Saint-Clair-sur-Epte (Rollone)' },
  },
  {
    id: 'tm-bessin-annexed',
    kind: 'expansion',
    year: 924,
    eraIds: ['norman-origins'],
    label: { en: '924 — Bessin annexed', fr: '924 — Annexion du Bessin', it: '924 — Annessione del Bessin' },
  },
  {
    id: 'tm-cotentin-annexed',
    kind: 'expansion',
    year: 933,
    eraIds: ['norman-origins'],
    label: { en: '933 — Cotentin & Avranchin', fr: '933 — Cotentin et Avranchin', it: '933 — Cotentin e Avranchino' },
  },
  {
    id: 'tm-duchy-mature',
    kind: 'foundation',
    year: 1050,
    eraIds: ['norman-origins'],
    label: { en: '~1050 — Duchy consolidated', fr: '~1050 — Duché consolidé', it: '~1050 — Ducato consolidato' },
  },
  {
    id: 'tm-battle-hastings',
    kind: 'battle',
    year: 1066,
    eraIds: ['norman-origins', 'norman-expansion'],
    label: { en: '1066 — Battle of Hastings', fr: '1066 — Bataille d\'Hastings', it: '1066 — Battaglia di Hastings' },
  },

  // ── Norman Expansion ──────────────────────────────────────────────
  {
    id: 'tm-first-crusade',
    kind: 'battle',
    year: 1096,
    eraIds: ['norman-expansion'],
    label: { en: 'First Crusade — Normans at Antioch', fr: 'Première croisade — Normands à Antioche', it: 'Prima crociata — Normanni ad Antiochia' },
  },
  {
    id: 'tm-sicily-kingdom',
    kind: 'foundation',
    year: 1130,
    eraIds: ['norman-expansion'],
    label: { en: 'Kingdom of Sicily founded', fr: 'Royaume de Sicile fondé', it: 'Fondazione del regno di Sicilia' },
  },

  // ── Age of Exploration ────────────────────────────────────────────
  {
    id: 'tm-cartier-voyage',
    kind: 'exploration',
    year: 1534,
    eraIds: ['age-of-exploration'],
    label: { en: 'Cartier reaches St. Lawrence', fr: 'Cartier atteint le Saint-Laurent', it: 'Cartier raggiunge il San Lorenzo' },
    action: { type: 'openPerson', personId: 'jacques-cartier' },
  },
  {
    id: 'tm-dugua-acadia',
    kind: 'foundation',
    year: 1604,
    eraIds: ['age-of-exploration'],
    label: { en: 'Dugua founds Port Royal', fr: 'Dugua fonde Port-Royal', it: 'Dugua fonda Port-Royal' },
    action: { type: 'openPerson', personId: 'pierre-dugua-de-mons' },
  },

  // ── New France phase boundaries (cross-era timeline) ─────────────
  {
    id: 'tm-nf-phase-company',
    kind: 'treaty',
    year: 1627,
    eraIds: ['new-france-foundations'],
    label: { en: 'Company of One Hundred Associates', fr: 'Compagnie des Cent-Associés', it: 'Compagnia dei Cento Associati' },
    action: { type: 'setYearOnly' },
  },
  {
    id: 'tm-nf-phase-royal',
    kind: 'expansion',
    year: 1663,
    eraIds: ['new-france-foundations', 'royal-new-france'],
    label: { en: 'New France becomes Royal Colony', fr: 'La Nouvelle-France devient colonie royale', it: 'La Nuova Francia diventa colonia regia' },
    action: { type: 'setYearOnly' },
  },
  {
    id: 'tm-nf-phase-great-peace',
    kind: 'treaty',
    year: 1701,
    eraIds: ['royal-new-france'],
    label: { en: 'Great Peace of Montréal', fr: 'Grande Paix de Montréal', it: 'Grande pace di Montréal' },
    action: { type: 'setYearOnly' },
  },
  {
    id: 'tm-nf-phase-seven-years',
    kind: 'battle',
    year: 1754,
    eraIds: ['atlantic-imprint'],
    label: { en: 'Seven Years\' War begins', fr: 'Début de la guerre de Sept Ans', it: 'Inizio della guerra dei Sette Anni' },
    action: { type: 'setYearOnly' },
  },

  // ── New France Foundations ────────────────────────────────────────
  {
    id: 'tm-founding-quebec',
    kind: 'foundation',
    year: 1608,
    eraIds: ['new-france-foundations'],
    label: { en: 'Champlain founds Québec', fr: 'Champlain fonde Québec', it: 'Champlain fonda Québec' },
    action: { type: 'openPerson', personId: 'samuel-de-champlain' },
  },
  {
    id: 'tm-hebert-arrives',
    kind: 'person',
    year: 1617,
    eraIds: ['new-france-foundations'],
    label: { en: 'Louis Hébert — first farmer', fr: 'Louis Hébert — premier agriculteur', it: 'Louis Hébert — primo agricoltore' },
    action: { type: 'openPerson', personId: 'louis-hebert' },
  },
  {
    id: 'tm-giffard-recruitment',
    kind: 'migration',
    year: 1634,
    eraIds: ['new-france-foundations'],
    label: { en: 'Giffard recruits Perche settlers', fr: 'Giffard recrute des colons du Perche', it: 'Giffard recluta coloni dal Perche' },
    action: { type: 'openPerson', personId: 'robert-giffard' },
  },
  {
    id: 'tm-founding-montreal',
    kind: 'foundation',
    year: 1642,
    eraIds: ['new-france-foundations'],
    label: { en: 'Founding of Ville-Marie', fr: 'Fondation de Ville-Marie', it: 'Fondazione di Ville-Marie' },
    action: { type: 'openPerson', personId: 'jeanne-mance' },
  },
  {
    id: 'tm-bourgeoys-school',
    kind: 'foundation',
    year: 1658,
    eraIds: ['new-france-foundations'],
    label: { en: 'Bourgeoys founds school', fr: 'Bourgeoys fonde une école', it: 'Bourgeoys fonda una scuola' },
    action: { type: 'openPerson', personId: 'marguerite-bourgeoys' },
  },

  // ── Royal New France ──────────────────────────────────────────────
  {
    id: 'tm-talon-intendant',
    kind: 'person',
    year: 1665,
    eraIds: ['royal-new-france'],
    label: { en: 'Jean Talon — first intendant', fr: 'Jean Talon — premier intendant', it: 'Jean Talon — primo intendente' },
    action: { type: 'openPerson', personId: 'jean-talon' },
  },
  {
    id: 'tm-carignan-regiment',
    kind: 'migration',
    year: 1665,
    eraIds: ['royal-new-france'],
    label: { en: 'Carignan-Salières Regiment arrives', fr: 'Arrivée du régiment Carignan-Salières', it: 'Arrivo del reggimento Carignan-Salières' },
  },
  {
    id: 'tm-filles-du-roi',
    kind: 'migration',
    year: 1668,
    eraIds: ['royal-new-france'],
    label: { en: 'Filles du Roi migration', fr: 'Migration des Filles du Roi', it: 'Migrazione delle Fille du Roi' },
  },
  {
    id: 'tm-jolliet-mississippi',
    kind: 'exploration',
    year: 1673,
    eraIds: ['royal-new-france'],
    label: { en: 'Jolliet maps the Mississippi', fr: 'Jolliet cartographie le Mississippi', it: 'Jolliet cartografa il Mississippi' },
  },

  // ── Atlantic Imprint ──────────────────────────────────────────────
  {
    id: 'tm-utrecht-treaty',
    kind: 'treaty',
    year: 1713,
    eraIds: ['atlantic-imprint'],
    label: { en: 'Treaty of Utrecht', fr: 'Traité d\'Utrecht', it: 'Trattato di Utrecht' },
  },
  {
    id: 'tm-fall-quebec',
    kind: 'battle',
    year: 1759,
    eraIds: ['atlantic-imprint'],
    label: { en: 'Fall of Québec', fr: 'Chute de Québec', it: 'Caduta di Québec' },
    action: { type: 'flyToPlace', placeId: 'quebec-city' },
  },
  {
    id: 'tm-treaty-paris',
    kind: 'treaty',
    year: 1763,
    eraIds: ['atlantic-imprint'],
    label: { en: 'Treaty of Paris', fr: 'Traité de Paris', it: 'Trattato di Parigi' },
  },
];

const markersByEra = new Map<string, TimelineMarker[]>();

for (const m of atlasTimelineMarkers) {
  for (const eraId of m.eraIds) {
    const arr = markersByEra.get(eraId);
    if (arr) arr.push(m);
    else markersByEra.set(eraId, [m]);
  }
}

export function getMarkersForEra(eraId: string): TimelineMarker[] {
  return markersByEra.get(eraId) ?? [];
}
