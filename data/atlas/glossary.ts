import type { I18nString } from '@/core/types';

export interface GlossaryEntry {
  id: string;
  term: I18nString;
  definition: I18nString;
  seeAlso?: string[];
}

export const atlasGlossary: GlossaryEntry[] = [
  {
    id: 'cousture',
    term: { en: 'Cousture', fr: 'Cousture' },
    definition: {
      en: 'Old French for "cultivated field" or "enclosed land" — the agricultural, territorial origin of the surname Couture. Not related to sewing despite the modern French meaning.',
      fr: 'Ancien français pour « champ cultivé » ou « terre close » \u2014 l\u2019origine agricole et territoriale du patronyme Couture. Sans lien avec la couture malgré le sens moderne.',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'neustria',
    term: { en: 'Neustria', fr: 'Neustrie' },
    definition: {
      en: 'The western Frankish kingdom (roughly the Seine basin and Channel coast) that became the administrative ancestor of Normandy. Its ports and river corridors shaped the region\u2019s identity long before the Vikings arrived.',
      fr: 'Le royaume franc occidental (approximativement le bassin de la Seine et la c\u00f4te de la Manche) qui devint l\u2019anc\u00eatre administratif de la Normandie. Ses ports et corridors fluviaux ont fa\u00e7onn\u00e9 l\u2019identit\u00e9 de la r\u00e9gion bien avant l\u2019arriv\u00e9e des Vikings.',
    },
  },
  {
    id: 'new-france',
    term: { en: 'New France', fr: 'Nouvelle-France' },
    definition: {
      en: 'The territory claimed by France in North America from the early 1600s to 1763, stretching from the Gulf of St. Lawrence through the Great Lakes to the Mississippi basin. Most settlers came from Normandy, Perche, and the Atlantic coast of France.',
      fr: 'Le territoire revendiqu\u00e9 par la France en Am\u00e9rique du Nord du d\u00e9but du XVIIe si\u00e8cle \u00e0 1763, s\u2019\u00e9tendant du golfe du Saint-Laurent aux Grands Lacs jusqu\u2019au bassin du Mississippi. La plupart des colons venaient de Normandie, du Perche et de la c\u00f4te atlantique de la France.',
    },
    seeAlso: ['acadia', 'seigneurial-system'],
  },
  {
    id: 'acadia',
    term: { en: 'Acadia', fr: 'Acadie' },
    definition: {
      en: 'The French colonial region encompassing present-day Nova Scotia, New Brunswick, and Prince Edward Island. Acadians developed a distinct identity; many were expelled by Britain in 1755 (the Grand D\u00e9rangement).',
      fr: 'R\u00e9gion coloniale fran\u00e7aise englobant l\u2019actuelle Nouvelle-\u00c9cosse, le Nouveau-Brunswick et l\u2019\u00cele-du-Prince-\u00c9douard. Les Acadiens ont d\u00e9velopp\u00e9 une identit\u00e9 distincte ; nombre d\u2019entre eux furent expuls\u00e9s par la Grande-Bretagne en 1755 (le Grand D\u00e9rangement).',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'seigneurial-system',
    term: { en: 'Seigneurial system', fr: 'R\u00e9gime seigneurial' },
    definition: {
      en: 'The feudal land-tenure model used in New France, derived from Norman and northern French customs. Seigneurs received large grants along rivers and subdivided them into narrow lots (rangs) for habitants.',
      fr: 'Le mod\u00e8le de tenure fonci\u00e8re f\u00e9odale utilis\u00e9 en Nouvelle-France, d\u00e9riv\u00e9 des coutumes normandes et du nord de la France. Les seigneurs recevaient de vastes concessions le long des rivi\u00e8res et les subdivisaient en lots \u00e9troits (rangs) pour les habitants.',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'migration-channel',
    term: { en: 'Migration channel', fr: 'Canal migratoire' },
    definition: {
      en: 'The region of origin for a settler or group of settlers. Common channels in this atlas include Normandy ports (Dieppe, Honfleur, Le Havre), Perche, Brittany coast, Aunis\u2013Saintonge, and Paris region.',
      fr: 'La r\u00e9gion d\u2019origine d\u2019un colon ou d\u2019un groupe de colons. Les canaux courants dans cet atlas comprennent les ports normands (Dieppe, Honfleur, Le Havre), le Perche, la c\u00f4te bretonne, Aunis\u2013Saintonge et la r\u00e9gion parisienne.',
    },
  },
  {
    id: 'provenance',
    term: { en: 'Provenance confidence', fr: 'Confiance de provenance' },
    definition: {
      en: 'The level of certainty about a historical claim. "Documented" means supported by primary records; "network" means inferred from known patterns; "uncertain" means plausible but unconfirmed.',
      fr: 'Le niveau de certitude d\u2019une affirmation historique. \u00ab Document\u00e9 \u00bb signifie appuy\u00e9 par des sources primaires ; \u00ab r\u00e9seau \u00bb signifie d\u00e9duit de sch\u00e9mas connus ; \u00ab incertain \u00bb signifie plausible mais non confirm\u00e9.',
    },
  },
  {
    id: 'era',
    term: { en: 'Era', fr: '\u00c9poque' },
    definition: {
      en: 'A defined time period in the atlas. Each era controls which settlements, routes, regions, and layers are visible on the map. Use the timeline bar to move between eras.',
      fr: 'Une p\u00e9riode d\u00e9finie dans l\u2019atlas. Chaque \u00e9poque d\u00e9termine quels \u00e9tablissements, routes, r\u00e9gions et couches sont visibles sur la carte. Utilisez la barre chronologique pour naviguer entre les \u00e9poques.',
    },
    seeAlso: ['story-mode'],
  },
  {
    id: 'story-mode',
    term: { en: 'Story mode', fr: 'Mode histoire' },
    definition: {
      en: 'A guided narrative that moves the camera through a sequence of beats \u2014 highlighted places, routes, and regions with explanatory text. Use the story bar at the bottom of the map to start or navigate chapters.',
      fr: 'Un r\u00e9cit guid\u00e9 qui d\u00e9place la cam\u00e9ra \u00e0 travers une s\u00e9quence de moments cl\u00e9s \u2014 lieux, routes et r\u00e9gions mis en \u00e9vidence avec un texte explicatif. Utilisez la barre d\u2019histoire en bas de la carte pour d\u00e9marrer ou naviguer entre les chapitres.',
    },
    seeAlso: ['era'],
  },
  {
    id: 'narrative-weight',
    term: { en: 'Narrative weight', fr: 'Poids narratif' },
    definition: {
      en: 'How prominently a person is featured: "anchor" figures drive story beats and appear first; "supporting" figures enrich a region or era; "minor" figures add demographic depth.',
      fr: 'L\u2019importance d\u2019un personnage dans le r\u00e9cit : les figures \u00ab phares \u00bb (anchor) animent les moments cl\u00e9s et apparaissent en premier ; les \u00ab secondaires \u00bb enrichissent une r\u00e9gion ou une \u00e9poque ; les \u00ab mineurs \u00bb ajoutent de la profondeur d\u00e9mographique.',
    },
  },
  {
    id: 'surname-origin-category',
    term: { en: 'Surname origin category', fr: 'Cat\u00e9gorie d\u2019origine du patronyme' },
    definition: {
      en: 'The classification of a Norman surname by its etymological root: core Norman (well-documented Normandy settler lines), strongly Norman (feudal/Old French/Viking-rooted), coastal/maritime, Norse influence, or feudal & trade.',
      fr: 'La classification d\u2019un patronyme normand par sa racine \u00e9tymologique : normand de souche, fortement normand (f\u00e9odal / vieux fran\u00e7ais / racines vikings), c\u00f4tier / maritime, influence scandinave ou f\u00e9odal & commerce.',
    },
    seeAlso: ['cousture'],
  },
  {
    id: 'grand-derangement',
    term: { en: 'Grand D\u00e9rangement', fr: 'Grand D\u00e9rangement' },
    definition: {
      en: 'The mass deportation of Acadians by British forces beginning in 1755. Thousands were expelled to other British colonies, France, and Louisiana, scattering communities that had existed for over a century.',
      fr: 'La d\u00e9portation massive des Acadiens par les forces britanniques \u00e0 partir de 1755. Des milliers furent expuls\u00e9s vers d\u2019autres colonies britanniques, la France et la Louisiane, dispersant des communaut\u00e9s \u00e9tablies depuis plus d\u2019un si\u00e8cle.',
    },
    seeAlso: ['acadia'],
  },
  {
    id: 'treaty-of-paris-1763',
    term: { en: 'Treaty of Paris (1763)', fr: 'Trait\u00e9 de Paris (1763)' },
    definition: {
      en: 'The treaty that ended the Seven Years\u2019 War and transferred virtually all French territory in North America to Britain. Around 60,000 French Canadians remained under British rule, preserving their language, religion, and Norman-origin surnames.',
      fr: 'Le trait\u00e9 qui mit fin \u00e0 la guerre de Sept Ans et transf\u00e9ra la quasi-totalit\u00e9 du territoire fran\u00e7ais en Am\u00e9rique du Nord \u00e0 la Grande-Bretagne. Environ 60 000 Canadiens fran\u00e7ais rest\u00e8rent sous domination britannique, pr\u00e9servant leur langue, leur religion et leurs patronymes normands.',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'filles-du-roi',
    term: { en: 'Filles du Roi', fr: 'Filles du Roi' },
    definition: {
      en: 'Women sponsored by Louis XIV to emigrate to New France between 1663 and 1673 to address the colony\u2019s gender imbalance. Many came from Normandy, \u00cele-de-France, and western France; their arrivals dramatically accelerated population growth.',
      fr: 'Femmes parrain\u00e9es par Louis XIV pour \u00e9migrer en Nouvelle-France entre 1663 et 1673 afin de rem\u00e9dier au d\u00e9s\u00e9quilibre hommes-femmes de la colonie. Beaucoup venaient de Normandie, d\u2019\u00cele-de-France et de l\u2019ouest de la France ; leur arriv\u00e9e acc\u00e9l\u00e9ra consid\u00e9rablement la croissance d\u00e9mographique.',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'coureur-des-bois',
    term: { en: 'Coureur des bois', fr: 'Coureur des bois' },
    definition: {
      en: 'Independent French-Canadian fur traders who traveled deep into the interior by canoe, trading with Indigenous peoples. They were instrumental in extending French territorial knowledge and claims across the Great Lakes and Mississippi basin.',
      fr: 'Trappeurs canadiens-fran\u00e7ais ind\u00e9pendants qui s\u2019enfon\u00e7aient dans l\u2019int\u00e9rieur en canot, commer\u00e7ant avec les peuples autochtones. Ils furent essentiels dans l\u2019extension des connaissances territoriales et des revendications fran\u00e7aises \u00e0 travers les Grands Lacs et le bassin du Mississippi.',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'habitant',
    term: { en: 'Habitant', fr: 'Habitant' },
    definition: {
      en: 'A farmer-settler in New France who held land from a seigneur. Habitants formed the backbone of the colonial population; most Quebec families today descend from habitant lineages established in the 1600s and 1700s.',
      fr: 'Un colon-agriculteur en Nouvelle-France qui tenait sa terre d\u2019un seigneur. Les habitants formaient l\u2019\u00e9pine dorsale de la population coloniale ; la plupart des familles qu\u00e9b\u00e9coises d\u2019aujourd\u2019hui descendent de lign\u00e9es d\u2019habitants \u00e9tablies aux XVIIe et XVIIIe si\u00e8cles.',
    },
    seeAlso: ['seigneurial-system', 'new-france'],
  },
  {
    id: 'layer',
    term: { en: 'Layer', fr: 'Couche' },
    definition: {
      en: 'A toggleable map overlay that shows a specific category of content \u2014 borders, routes, settlements, exploration paths, colonial claims, forts, and more. Use the Layers panel on the map to turn them on or off.',
      fr: 'Une surcouche cartographique activable qui affiche une cat\u00e9gorie sp\u00e9cifique de contenu \u2014 fronti\u00e8res, routes, \u00e9tablissements, chemins d\u2019exploration, revendications coloniales, forts, etc. Utilisez le panneau Couches sur la carte pour les activer ou les d\u00e9sactiver.',
    },
    seeAlso: ['era'],
  },
  {
    id: 'journey',
    term: { en: 'Journey', fr: 'Voyage' },
    definition: {
      en: 'A connected sequence of route segments that tells the story of a specific historical movement \u2014 such as Cartier\u2019s exploration of the St. Lawrence or La Salle\u2019s descent of the Mississippi. Journeys can be highlighted in story mode.',
      fr: 'Une s\u00e9quence connect\u00e9e de segments de route qui raconte l\u2019histoire d\u2019un mouvement historique sp\u00e9cifique \u2014 comme l\u2019exploration du Saint-Laurent par Cartier ou la descente du Mississippi par La Salle. Les voyages peuvent \u00eatre mis en \u00e9vidence en mode histoire.',
    },
    seeAlso: ['story-mode'],
  },
  {
    id: 'crown-dependency',
    term: { en: 'Crown Dependency', fr: 'Dépendance de la Couronne' },
    definition: {
      en: 'A self-governing territory that owes allegiance to the British crown but is not part of the United Kingdom. Jersey and Guernsey became Crown Dependencies after 1204, when continental Normandy fell to France but the Channel Islands remained with the English king. They retained Norman customary law and their own legislatures.',
      fr: 'Un territoire autonome lié à la couronne britannique mais ne faisant pas partie du Royaume-Uni. Jersey et Guernesey devinrent des dépendances de la Couronne après 1204, lorsque la Normandie continentale tomba sous la France mais que les îles Anglo-Normandes restèrent avec le roi d\u2019Angleterre. Elles conservèrent le droit coutumier normand et leurs propres législatures.',
    },
    seeAlso: ['neustria'],
  },
  {
    id: 'bailiwick',
    term: { en: 'Bailiwick', fr: 'Bailliage' },
    definition: {
      en: 'The administrative jurisdiction of a bailli (bailiff). The Channel Islands are divided into two bailiwicks \u2014 Jersey and Guernsey \u2014 each with its own Royal Court descended from the medieval Norman judicial system. The term itself is a relic of ducal Normandy\u2019s administrative vocabulary.',
      fr: 'La juridiction administrative d\u2019un bailli. Les \u00eeles Anglo-Normandes sont divis\u00e9es en deux bailliages \u2014 Jersey et Guernesey \u2014 chacun avec sa propre Cour royale h\u00e9riti\u00e8re du syst\u00e8me judiciaire normand m\u00e9di\u00e9val. Le terme lui-m\u00eame est un vestige du vocabulaire administratif de la Normandie ducale.',
    },
    seeAlso: ['crown-dependency'],
  },
];
