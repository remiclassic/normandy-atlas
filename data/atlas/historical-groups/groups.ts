import type { HistoricalGroup, HistoricalSourceRef } from '@/core/types';

type SrcExtra = { url: string; linkTitle: string };

function SRC_GENERIC(id: string, title: string, extra?: SrcExtra): HistoricalSourceRef[] {
  const out: HistoricalSourceRef[] = [];
  if (extra) {
    out.push({ id: `${id}-ref`, title: extra.linkTitle, url: extra.url, kind: 'review' });
  }
  out.push({
    id,
    title,
    note: extra
      ? 'Norman Atlas editorial weighting — verify in regional scholarship.'
      : 'Illustrative synthesis for atlas v1 — refine with dedicated citations.',
    kind: 'synthesis',
  });
  return out;
}

/** Phase-1 seed: presences obey Rus ≥ late 9th c., Viking spheres ramp from late 8th c., Normans from post-settlement framing. */
export const historicalGroups: HistoricalGroup[] = [
  {
    id: 'franks',
    name: { en: 'Franks', fr: 'Francs' },
    kind: 'people',
    color: '#4f6fb5',
    startYear: 400,
    endYear: 1100,
    description: {
      en: 'Frankish peoples and successors; dominant in northern continental corridors from late antiquity through the Carolingian period.',
      fr: 'Peuples francs et successeurs; dominants dans les corridors continentaux du nord de la fin de l’Antiquité à l’époque carolingienne.',
    },
    presences: [
      {
        regionId: 'neustria',
        startYear: 500,
        endYear: 1100,
        weight: 0.85,
        confidence: 'high',
        provenance: 'polity_control',
        sources: SRC_GENERIC('franks-neustria', 'Merovingian / Carolingian political synthesis', {
          url: 'https://www.worldhistory.org/Merovingian_Dynasty/',
          linkTitle: 'World History Encyclopedia — Merovingian dynasty',
        }),
      },
      {
        regionId: 'austrasia',
        startYear: 500,
        endYear: 1100,
        weight: 0.88,
        confidence: 'high',
        provenance: 'polity_control',
        sources: SRC_GENERIC('franks-austrasia', 'Frankish heartland — documentary tradition', {
          url: 'https://www.britannica.com/topic/Frank-people',
          linkTitle: 'Britannica — Franks (overview)',
        }),
      },
      {
        regionId: 'burgundy-macro',
        startYear: 500,
        endYear: 1100,
        weight: 0.65,
        confidence: 'medium',
        provenance: 'polity_control',
        sources: SRC_GENERIC('franks-burgundy', 'Burgundian / Frankish overlap', {
          url: 'https://www.worldhistory.org/Kingdom_of_Burgundy/',
          linkTitle: 'World History Encyclopedia — Kingdom of Burgundy',
        }),
      },
      {
        regionId: 'aquitaine',
        startYear: 500,
        endYear: 900,
        weight: 0.55,
        confidence: 'medium',
        provenance: 'chronicler',
        notes: 'Ducal Aquitaine vis-à-vis Frankish kings — simplified weighting.',
        sources: SRC_GENERIC('franks-aquitania', 'Aquitaine — narrative sources', {
          url: 'https://www.worldhistory.org/Duchy_of_Aquitaine/',
          linkTitle: 'World History Encyclopedia — Duchy of Aquitaine',
        }),
      },
    ],
    storyArcIds: ['frankish-carolingian'],
  },
  {
    id: 'carolingian-polity',
    name: { en: 'Frankish / Carolingian polity', fr: 'Royaume franc / carolingien' },
    kind: 'polity',
    color: '#3d5a8c',
    startYear: 751,
    endYear: 888,
    description: {
      en: 'Carolingian imperial framework (simplified): elite political superstructure over Frankish realms.',
      fr: 'Cadre politique carolingien (simplifié) : élite politique au-dessus des royaumes francs.',
    },
    presences: [
      {
        regionId: 'neustria',
        startYear: 800,
        endYear: 888,
        weight: 0.75,
        confidence: 'high',
        provenance: 'polity_control',
        sources: SRC_GENERIC('carolingian-neustria', 'Carolingian administration', {
          url: 'https://www.worldhistory.org/Carolingian_Empire/',
          linkTitle: 'World History Encyclopedia — Carolingian Empire',
        }),
      },
      {
        regionId: 'austrasia',
        startYear: 800,
        endYear: 888,
        weight: 0.8,
        confidence: 'high',
        provenance: 'polity_control',
        sources: SRC_GENERIC('carolingian-austrasia', 'Aachen-centered polity', {
          url: 'https://www.worldhistory.org/Charlemagne/',
          linkTitle: 'World History Encyclopedia — Charlemagne',
        }),
      },
    ],
  },
  {
    id: 'visigoths',
    name: { en: 'Visigothic kingdom / successors', fr: 'Royaume wisigothique / successeurs' },
    kind: 'people',
    color: '#b45309',
    startYear: 500,
    endYear: 720,
    description: {
      en: 'Iberian successor state traditions before the Umayyad advance (atlas simplifies post-711 transition).',
      fr: 'Traditions de l’État successeur ibérique avant la poussée omeyyade (l’atlas simplifie la transition après 711).',
    },
    presences: [
      {
        regionId: 'galicia-iberia',
        startYear: 500,
        endYear: 720,
        weight: 0.45,
        confidence: 'medium',
        provenance: 'chronicler',
        notes: 'Northwestern Iberia — shared with other post-Roman strands.',
        sources: SRC_GENERIC('visigoths-iberia', 'Visigothic Iberia — outline', {
          url: 'https://www.worldhistory.org/Visigoths/',
          linkTitle: 'World History Encyclopedia — Visigoths',
        }),
      },
      {
        regionId: 'septimania',
        startYear: 500,
        endYear: 720,
        weight: 0.6,
        confidence: 'medium',
        provenance: 'polity_control',
        sources: SRC_GENERIC('visigoths-septimania', 'Septimania — Visigothic / Frankish frontier zone', {
          url: 'https://en.wikipedia.org/wiki/Septimania',
          linkTitle: 'Wikipedia — Septimania (overview)',
        }),
      },
    ],
  },
  {
    id: 'lombards',
    name: { en: 'Lombards', fr: 'Lombards' },
    kind: 'people',
    color: '#7c3aed',
    startYear: 568,
    endYear: 1100,
    description: {
      en: 'Northern Italian successor political culture; weights taper as Frankish and Papal spheres press later centuries.',
      fr: 'Culture politique successeure en Italie du nord; pondération en baisse sous la pression des sphères franque et papale.',
    },
    presences: [
      {
        regionId: 'lombard-italy',
        startYear: 600,
        endYear: 1100,
        weight: 0.7,
        confidence: 'high',
        provenance: 'polity_control',
        sources: SRC_GENERIC('lombards-italy', 'Lombard Italy — documentary / archaeological synthesis', {
          url: 'https://www.worldhistory.org/Lombards/',
          linkTitle: 'World History Encyclopedia — Lombards',
        }),
      },
    ],
  },
  {
    id: 'avars',
    name: { en: 'Avars', fr: 'Avars' },
    kind: 'people',
    color: '#0d9488',
    startYear: 560,
    endYear: 900,
    description: {
      en: 'Steppe-derived power in the Pannonian plain; prominence highest before late 9th-century crises.',
      fr: 'Pouvoir d’origine steppique dans la plaine pannonienne; forte visibilité avant les crises de la fin du IXe siècle.',
    },
    presences: [
      { regionId: 'carpathian-basin', startYear: 600, endYear: 820, weight: 0.72, confidence: 'medium', provenance: 'archaeology', sources: SRC_GENERIC('avars-pannonia', 'Avar Qaganate — synthesis') },
      { regionId: 'carpathian-basin', startYear: 820, endYear: 900, weight: 0.35, confidence: 'low', provenance: 'inferred_sphere', notes: 'Transition / fragmentary control — low confidence.', sources: SRC_GENERIC('avars-decline', 'Post-Avar transition') },
    ],
  },
  {
    id: 'balts',
    name: { en: 'Balts (tribal zone)', fr: 'Baltes (zone tribale)' },
    kind: 'people',
    color: '#059669',
    startYear: 500,
    endYear: 1100,
    description: {
      en: 'Baltic tribal regions east of the coast; not exact polity borders.',
      fr: 'Régions tribales baltes à l’est du littoral; pas de frontières politiques exactes.',
    },
    presences: [
      { regionId: 'baltic-coast', startYear: 500, endYear: 1100, weight: 0.55, confidence: 'low', provenance: 'inferred_sphere', sources: SRC_GENERIC('balts-coast', 'Baltic archaeology / toponymy — coarse') },
    ],
  },
  {
    id: 'anglo-saxons',
    name: { en: 'Anglo-Saxons', fr: 'Anglo-Saxons' },
    kind: 'people',
    color: '#ca8a04',
    startYear: 500,
    endYear: 1100,
    description: {
      en: 'English political-cultural sphere south and east of the Danelaw mosaic (simplified).',
      fr: 'Sphère politico-culturelle anglaise au sud et à l’est de la mosaïque du Danelaw (simplifié).',
    },
    presences: [
      {
        regionId: 'danelaw',
        startYear: 500,
        endYear: 870,
        weight: 0.5,
        confidence: 'medium',
        provenance: 'chronicler',
        notes: 'Pre-Danelaw shift — English polities.',
        sources: SRC_GENERIC('as-pre-danelaw', 'Anglo-Saxon England — outline', {
          url: 'https://www.britannica.com/topic/Anglo-Saxon',
          linkTitle: 'Britannica — Anglo-Saxon (overview)',
        }),
      },
      {
        regionId: 'danelaw',
        startYear: 900,
        endYear: 1100,
        weight: 0.4,
        confidence: 'medium',
        provenance: 'chronicler',
        notes: 'Post-Danelaw reconquest mosaic — simplified.',
        sources: SRC_GENERIC('as-post-danelaw', 'English sphere recovery', {
          url: 'https://www.worldhistory.org/Danelaw/',
          linkTitle: 'World History Encyclopedia — Danelaw',
        }),
      },
    ],
  },
  {
    id: 'bretons',
    name: { en: 'Bretons', fr: 'Bretons' },
    kind: 'people',
    color: '#2563eb',
    startYear: 500,
    endYear: 1100,
    description: {
      en: 'Brittonic cultural and political continuity in the Armorican peninsula.',
      fr: 'Continuité culturelle et politique brittonique dans la péninsule armoricaine.',
    },
    presences: [
      {
        regionId: 'brittany',
        startYear: 500,
        endYear: 1100,
        weight: 0.8,
        confidence: 'high',
        provenance: 'chronicler',
        sources: SRC_GENERIC('bretons', 'Breton polities — narrative', {
          url: 'https://www.britannica.com/place/Brittany',
          linkTitle: 'Britannica — Brittany',
        }),
      },
    ],
  },
  {
    id: 'slavic-groups',
    name: { en: 'Slavic groups (generic)', fr: 'Groupes slaves (générique)' },
    kind: 'people',
    color: '#94a3b8',
    startYear: 500,
    endYear: 1100,
    description: {
      en: 'Coarse label for early medieval Slavic-speaking communities — not a single polity.',
      fr: 'Libellé grossier pour les communautés de langue slave du haut Moyen Âge — pas une seule entité.',
    },
    presences: [
      { regionId: 'baltic-coast', startYear: 700, endYear: 1100, weight: 0.4, confidence: 'low', provenance: 'inferred_sphere', sources: SRC_GENERIC('slavs-baltic', 'Western Slavic zone — synthesis') },
      { regionId: 'bohemia-moravia', startYear: 600, endYear: 1100, weight: 0.45, confidence: 'medium', provenance: 'archaeology', sources: SRC_GENERIC('slavs-bohemia', 'Bohemian / Moravian archaeology') },
    ],
  },
  {
    id: 'byzantines',
    name: { en: 'Byzantine sphere (Italy)', fr: 'Sphère byzantine (Italie)' },
    kind: 'polity',
    color: '#be123c',
    startYear: 500,
    endYear: 1100,
    description: {
      en: 'Imperial Roman successor influence in parts of Italy — not territorial precision.',
      fr: 'Influence de l’Empire romain d’Orient dans certaines parties de l’Italie — sans précision territoriale stricte.',
    },
    presences: [
      { regionId: 'lombard-italy', startYear: 500, endYear: 800, weight: 0.25, confidence: 'low', provenance: 'chronicler', notes: 'Ravenna corridor / southern pockets — illustrative weight.', sources: SRC_GENERIC('byz-italy', 'Byzantine Italy — outline') },
    ],
  },
  {
    id: 'gallo-roman-cultural',
    name: { en: 'Gallo-Roman cultural substratum', fr: 'Substrat culturel gallo-romain' },
    kind: 'cultural-sphere',
    color: '#a8a29e',
    startYear: 500,
    endYear: 1100,
    description: {
      en: 'Latin-language institutions and land tenure traditions persisting under Frankish rule — not a separate polity.',
      fr: 'Institutions de langue latine et traditions foncières sous la domination franque — pas un pouvoir séparé.',
    },
    presences: [
      { regionId: 'neustria', startYear: 500, endYear: 1100, weight: 0.35, confidence: 'medium', provenance: 'archaeology', sources: SRC_GENERIC('gallo-roman', 'Post-Roman provincial continuity') },
      { regionId: 'aquitaine', startYear: 500, endYear: 900, weight: 0.4, confidence: 'medium', provenance: 'archaeology', sources: SRC_GENERIC('gallo-roman-aq', 'Aquitanian Latin continuity') },
    ],
  },
  {
    id: 'norse-activity',
    name: { en: 'Norse maritime activity', fr: 'Activité maritime norroise' },
    kind: 'cultural-sphere',
    color: '#0ea5e9',
    startYear: 790,
    endYear: 1100,
    description: {
      en: 'Raiding, trading, and settlement pressure from Scandinavian seafarers — ramps after the late 8th century.',
      fr: 'Pression de raids, d’échanges et d’implantations venues des navigateurs scandinaves — croissance après la fin du VIIIe siècle.',
    },
    presences: [
      {
        regionId: 'danelaw',
        startYear: 865,
        endYear: 920,
        weight: 0.65,
        confidence: 'high',
        provenance: 'chronicler',
        sources: SRC_GENERIC('norse-danelaw', 'Danelaw — documentary', {
          url: 'https://www.worldhistory.org/Viking_Age/',
          linkTitle: 'World History Encyclopedia — Viking Age',
        }),
      },
      {
        regionId: 'lower-seine',
        startYear: 841,
        endYear: 911,
        weight: 0.7,
        confidence: 'high',
        provenance: 'chronicler',
        sources: SRC_GENERIC('norse-seine', 'Seine fleet bases — narrative', {
          url: 'https://www.worldhistory.org/Siege_of_Paris/',
          linkTitle: 'World History Encyclopedia — Viking raids on Paris (context)',
        }),
      },
      {
        regionId: 'neustria',
        startYear: 800,
        endYear: 900,
        weight: 0.25,
        confidence: 'low',
        provenance: 'inferred_sphere',
        notes: 'Coastal / riverine pressure — not interior control.',
        sources: SRC_GENERIC('norse-neustria', 'Channel / river raids', {
          url: 'https://www.britannica.com/event/Viking',
          linkTitle: 'Britannica — Vikings (overview)',
        }),
      },
      {
        regionId: 'baltic-coast',
        startYear: 800,
        endYear: 1100,
        weight: 0.35,
        confidence: 'medium',
        provenance: 'archaeology',
        sources: SRC_GENERIC('norse-baltic', 'Baltic connections', {
          url: 'https://www.worldhistory.org/Varangian_Guard/',
          linkTitle: 'World History Encyclopedia — Varangians (eastern connections)',
        }),
      },
    ],
    storyArcIds: ['viking-age'],
  },
  {
    id: 'normans',
    name: { en: 'Normans', fr: 'Normands' },
    kind: 'people',
    color: '#c4a962',
    startYear: 911,
    endYear: 1100,
    description: {
      en: 'Northmen integrated into Frankish political frameworks from the Rouen grant onward — identity is socio-political, not a static 6th-century ethnicity block.',
      fr: 'Nordiques intégrés aux cadres politiques francs depuis la concession de Rouen — identité socio-politique, pas un bloc ethnique du VIe siècle.',
    },
    presences: [
      {
        regionId: 'lower-seine',
        startYear: 911,
        endYear: 1100,
        weight: 0.85,
        confidence: 'high',
        provenance: 'polity_control',
        sources: SRC_GENERIC('normans-seine', 'Duchy of Normandy — political core', {
          url: 'https://www.worldhistory.org/Normandy/',
          linkTitle: 'World History Encyclopedia — Normandy',
        }),
      },
      {
        regionId: 'neustria',
        startYear: 930,
        endYear: 1100,
        weight: 0.45,
        confidence: 'medium',
        provenance: 'polity_control',
        notes: 'Ducal influence beyond lower Seine — disputed edges.',
        sources: SRC_GENERIC('normans-neustria', 'Norman political expansion', {
          url: 'https://www.britannica.com/place/Normandy',
          linkTitle: 'Britannica — Normandy',
        }),
      },
    ],
    storyArcIds: ['norman-origins'],
  },
  {
    id: 'kyivan-rus',
    name: { en: 'Kyivan Rus', fr: 'Rus’ de Kiev' },
    kind: 'polity',
    color: '#7dd3fc',
    startYear: 882,
    endYear: 1100,
    description: {
      en: 'Ruling elite and trade network centered on Kyiv — appears only from the late 9th century in this model.',
      fr: 'Élite dirigeante et réseau marchand centré sur Kiev — n’apparaît qu’à partir de la fin du IXe siècle dans ce modèle.',
    },
    presences: [
      {
        regionId: 'kyiv-sphere',
        startYear: 900,
        endYear: 1100,
        weight: 0.7,
        confidence: 'medium',
        provenance: 'chronicler',
        sources: SRC_GENERIC('rus-kyiv', 'Primary Chronicle tradition — simplified', {
          url: 'https://www.worldhistory.org/Kievan_Rus/',
          linkTitle: 'World History Encyclopedia — Kievan Rus',
        }),
      },
      {
        regionId: 'novgorod-sphere',
        startYear: 900,
        endYear: 1100,
        weight: 0.45,
        confidence: 'low',
        provenance: 'inferred_sphere',
        notes: 'Novgorod / northern ties — coarse.',
        sources: SRC_GENERIC('rus-novgorod', 'Northern Rus connections', {
          url: 'https://en.wikipedia.org/wiki/Novgorod_Republic',
          linkTitle: 'Wikipedia — Novgorod Republic (overview)',
        }),
      },
    ],
  },
  {
    id: 'flemings',
    name: { en: 'Flemish sphere', fr: 'Sphère flamande' },
    kind: 'people',
    color: '#f59e0b',
    startYear: 900,
    endYear: 1100,
    description: {
      en: 'Coastal Flanders as an emerging economic-political focus (simplified for late period presets).',
      fr: 'Flandre littorale comme foyer économico-politique émergent (simplifié pour les préréglages tardifs).',
    },
    presences: [
      { regionId: 'flanders', startYear: 900, endYear: 1100, weight: 0.65, confidence: 'medium', provenance: 'chronicler', sources: SRC_GENERIC('flanders', 'County of Flanders — outline') },
    ],
  },
  {
    id: 'gauls-legacy',
    name: { en: 'Gauls (legacy population strata)', fr: 'Gaulois (strates ancestrales)' },
    kind: 'legacy-population',
    color: '#57534e',
    startYear: -800,
    endYear: 1100,
    description: {
      en: 'Ancient Celtic labels as deep-history substrate — not a living early-medieval polity in this layer.',
      fr: 'Étiquettes celtiques antiques comme substrat historique profond — pas une puissance du haut Moyen Âge dans cette couche.',
    },
    presences: [
      { regionId: 'aquitaine', startYear: 500, endYear: 1100, weight: 0.2, confidence: 'low', provenance: 'inferred_sphere', notes: 'Archaeological / linguistic legacy only.', sources: SRC_GENERIC('gauls-legacy', 'Iron Age regional heritage') },
      { regionId: 'neustria', startYear: 500, endYear: 1100, weight: 0.15, confidence: 'low', provenance: 'inferred_sphere', sources: SRC_GENERIC('gauls-neustria', 'Gallic past — not contemporary polity') },
    ],
  },
  {
    id: 'scythians-legacy',
    name: { en: 'Scythians (legacy)', fr: 'Scythes (héritage)' },
    kind: 'legacy-population',
    color: '#78716c',
    startYear: -700,
    endYear: 400,
    description: {
      en: 'Steppe label largely displaced before the early Middle Ages — shown only in deep ancestry mode as distant substrate.',
      fr: 'Étiquette steppique en grande partie dépassée avant le haut Moyen Âge — affichée seulement en mode héritage lointain.',
    },
    presences: [
      { regionId: 'carpathian-basin', startYear: 500, endYear: 1100, weight: 0.05, confidence: 'low', provenance: 'inferred_sphere', notes: 'Not a contemporary macro-population; illustrative trace only.', sources: SRC_GENERIC('scythian-legacy', 'Historiographic / archaeological echo') },
    ],
  },
  {
    id: 'sarmatians-legacy',
    name: { en: 'Sarmatians (legacy)', fr: 'Sarmates (héritage)' },
    kind: 'legacy-population',
    color: '#57534e',
    startYear: -200,
    endYear: 500,
    description: {
      en: 'Late antique steppe heritage label — not co-equal with Franks or Avars in early medieval political layers.',
      fr: 'Héritage steppique tardif — pas équivalent aux Francs ou Avars dans les couches politiques du haut Moyen Âge.',
    },
    presences: [
      { regionId: 'carpathian-basin', startYear: 500, endYear: 800, weight: 0.08, confidence: 'low', provenance: 'inferred_sphere', notes: 'Iazyges / Alan echoes — very coarse.', sources: SRC_GENERIC('sarmatian-legacy', 'Antique labels on frontiers') },
    ],
  },
];
