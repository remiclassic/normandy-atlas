import type { StoryBeatIllustrationSlide } from '@/core/types';

/**
 * Illustration metadata for story beats.
 * Images live under `public/story/<arc>/` and are served as static assets.
 *   - william-conqueror: Bayeux Tapestry (public domain, CC0) + CC BY-SA photos.
 *   - guillaume-couture: 17th–19th-century maps, engravings, and paintings (public domain).
 *   - viking-age: Commons photos and PD painting reproductions + AI where needed.
 *   - norman-origins: Commons (abbey, Vinland, manuscript) + AI reconstructions + reuse of Viking / William assets where apt.
 *   - norman-expansion: Italy / crusade / England assets under public/story/norman-expansion + William Conqueror reuse.
 *   - age-of-exploration: Norman Atlantic ports (Commons) + AI mid-ocean reconstruction; Rouen plan reused from guillaume-couture.
 *   - new-france-foundations: Atlantic France ports, St. Lawrence corridor, Acadia (Commons) + reuse of age-of-exploration / guillaume-couture + AI Château-Richer landscape.
 *   - royal-new-france: Great Lakes forts, Mississippi / Gulf (Commons + AI Baie des Puants & Gulf coast) + reuse of new-france-foundations / guillaume-couture.
 *   - atlantic-imprint: peak & collapse of New France (Benjamin West Wolfe PD) + St. Lawrence endurance; heavy reuse of royal / new-france / guillaume assets.
 *
 * Each key maps to a single slide or an array of slides.
 * Slides with placeId / center get their own map pin and gallery anchor.
 */

/** Mainland French Atlantic ports, Perche, and insular Norman harbour (Guernsey) — shared by migration + New France arc origin beats. */
const NEW_FRANCE_ATLANTIC_ORIGIN_SLIDES: StoryBeatIllustrationSlide[] = [
  {
    src: '/story/new-france-foundations/la-rochelle-vieux-port-lisch.jpg',
    alt: {
      en: 'La Rochelle Vieux-Port — reconstruction after Juste Lisch (1864); Aunis was a major Centre-West source of emigrants to New France',
      fr: 'Le Vieux-Port de La Rochelle — reconstitution d’après Juste Lisch (1864) ; l’Aunis fut une source majeure d’émigrants vers la Nouvelle-France',
      es: 'El Viejo Puerto de La Rochelle — reconstrucción según Juste Lisch (1864); Aunis fue una fuente importante de emigrantes a Nueva Francia',
      it: 'Il Vieux-Port de La Rochelle — ricostruzione da Juste Lisch (1864); l’Aunis fu una fonte importante di emigrati verso la Nuova Francia',
    },
    credit: {
      en: 'Juste Lisch, 1864 (illustration); photograph 2006. Wikimedia Commons (public domain)',
      fr: 'Juste Lisch, 1864 (illustration) ; photographie 2006. Wikimedia Commons (domaine public)',
      es: 'Juste Lisch, 1864 (ilustración); fotografía 2006. Wikimedia Commons (dominio público)',
      it: 'Juste Lisch, 1864 (illustrazione); fotografia 2006. Wikimedia Commons (pubblico dominio)',
    },
    placeId: 'la-rochelle',
  },
  {
    src: '/story/new-france-foundations/saint-malo-port.jpg',
    alt: {
      en: 'Saint-Malo harbour — Breton corsair port and repeated point of embarkation toward Canada and Acadia',
      fr: 'Le port de Saint-Malo — havre breton corsaire et point d’embarquement répété vers le Canada et l’Acadie',
      es: 'Puerto de Saint-Malo — puerto corsario bretón y punto repetido de embarque hacia Canadá y Acadia',
      it: 'Porto di Saint-Malo — porto corsaro bretone e punto d’imbarco ricorrente verso Canada e Acadia',
    },
    credit: {
      en: 'Photo: IgorCalzone1, Wikimedia Commons (CC BY-SA 4.0)',
      fr: 'Photo : IgorCalzone1, Wikimedia Commons (CC BY-SA 4.0)',
      es: 'Foto: IgorCalzone1, Wikimedia Commons (CC BY-SA 4.0)',
      it: 'Foto: IgorCalzone1, Wikimedia Commons (CC BY-SA 4.0)',
    },
    placeId: 'saint-malo',
  },
  {
    src: '/story/age-of-exploration/dieppe-port.jpg',
    alt: {
      en: 'Dieppe — Norman Channel port that sent repeated cohorts of engagés and settlers toward the St. Lawrence',
      fr: 'Dieppe — port normand de la Manche qui envoya des cohortes répétées d’engagés et de colons vers le Saint-Laurent',
      es: 'Dieppe — puerto normando del Canal que envió cohortes repetidas de engagés y colonos hacia el San Lorenzo',
      it: 'Dieppe — porto normanno della Manica che inviò coorti ripetute di engagés e coloni verso il San Lorenzo',
    },
    credit: {
      en: 'Photo: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
      fr: 'Photo : W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
      es: 'Foto: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
      it: 'Foto: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
    },
    placeId: 'dieppe',
  },
  {
    src: '/story/age-of-exploration/honfleur-port.jpg',
    alt: {
      en: 'Honfleur Vieux Bassin — Seine-estuary port tied to Norman recruitment for colonial voyages',
      fr: 'Le Vieux Bassin d’Honfleur — port de l’estuaire de la Seine lié au recrutement normand pour les voyages coloniaux',
      es: 'Vieux Bassin de Honfleur — puerto del estuario del Sena vinculado al reclutamiento normando para viajes coloniales',
      it: 'Vieux Bassin di Honfleur — porto dell’estuario della Senna legato al reclutamento normanno per i viaggi coloniali',
    },
    credit: {
      en: 'Photo: Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
      fr: 'Photo : Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
      es: 'Foto: Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
      it: 'Foto: Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
    },
    placeId: 'honfleur',
  },
  {
    src: '/story/new-france-foundations/mortagne-sous-prefecture.jpg',
    alt: {
      en: 'Mortagne-au-Perche — market town in the Perche, a dense source region for French Canadian founder lineages',
      fr: 'Mortagne-au-Perche — bourg de marché du Perche, région d’origine dense pour les lignées fondatrices canadiennes-françaises',
      es: 'Mortagne-au-Perche — villa de mercado del Perche, región de origen densa para linajes fundacionales franco-canadienses',
      it: 'Mortagne-au-Perche — borgo di mercato del Perche, regione d’origine ricca di lignaggi fondatori franco-canadesi',
    },
    credit: {
      en: 'Photo: Benjism89 (Benjamin Smith), Wikimedia Commons (CC BY-SA 3.0)',
      fr: 'Photo : Benjism89 (Benjamin Smith), Wikimedia Commons (CC BY-SA 3.0)',
      es: 'Foto: Benjism89 (Benjamin Smith), Wikimedia Commons (CC BY-SA 3.0)',
      it: 'Foto: Benjism89 (Benjamin Smith), Wikimedia Commons (CC BY-SA 3.0)',
    },
    placeId: 'mortagne-au-perche',
  },
  {
    src: '/story/guillaume-couture/rouen-gomboust-1655.jpg',
    alt: {
      en: 'Jacques Gomboust’s 1655 plan of Rouen — lower Seine merchant networks financed outfits and charters for Atlantic Canada',
      fr: 'Plan de Rouen par Jacques Gomboust, 1655 — les réseaux marchands de la basse Seine finançaient équipements et chartes pour le Canada atlantique',
      es: 'Plano de Ruán de Jacques Gomboust, 1655 — las redes mercantiles del bajo Sena financiaban equipos y cartas para el Canadá atlántico',
      it: 'Pianta di Rouen di Jacques Gomboust, 1655 — le reti mercantili della bassa Senna finanziavano equipaggiamenti e patenti per il Canada atlantico',
    },
    credit: {
      en: 'Jacques Gomboust, 1655. Wikimedia Commons (public domain)',
      fr: 'Jacques Gomboust, 1655. Wikimedia Commons (domaine public)',
      es: 'Jacques Gomboust, 1655. Wikimedia Commons (dominio público)',
      it: 'Jacques Gomboust, 1655. Wikimedia Commons (pubblico dominio)',
    },
    placeId: 'rouen',
  },
  {
    src: '/story/new-france-foundations/st-peter-port-harbour.jpg',
    alt: {
      en: 'Saint Peter Port, Guernsey — insular Norman harbour in the same cultural orbit, though colonial sailings were overwhelmingly from mainland France',
      fr: 'Saint-Pierre-Port, Guernesey — havre insulaire normand dans la même sphère culturelle, bien que les départs coloniaux partissent surtout de France continentale',
      es: 'Saint Peter Port, Guernsey — puerto insular normando en el mismo ámbito cultural, aunque los viajes coloniales salieron sobre todo de Francia continental',
      it: 'Saint Peter Port, Guernsey — porto insulare normanno nella stessa sfera culturale, sebbene le partenze coloniali fossero soprattutto dalla Francia continentale',
    },
    credit: {
      en: 'Photo: John Rostron / Geograph Channel Islands, Wikimedia Commons (CC BY-SA 2.0)',
      fr: 'Photo : John Rostron / Geograph Channel Islands, Wikimedia Commons (CC BY-SA 2.0)',
      es: 'Foto: John Rostron / Geograph Channel Islands, Wikimedia Commons (CC BY-SA 2.0)',
      it: 'Foto: John Rostron / Geograph Channel Islands, Wikimedia Commons (CC BY-SA 2.0)',
    },
    placeId: 'saint-peter-port',
  },
];

export const STORY_BEAT_ILLUSTRATIONS: Partial<
  Record<string, StoryBeatIllustrationSlide | StoryBeatIllustrationSlide[]>
> = {

  // ── William the Conqueror arc ─────────────────────────────────────

  'wc-bastard-birth': [
    {
      src: '/story/william-conqueror/falaise-castle.jpg',
      alt: {
        en: 'Château de Falaise, birthplace of William the Conqueror',
        fr: 'Château de Falaise, lieu de naissance de Guillaume le Conquérant',
        es: 'Castillo de Falaise, lugar de nacimiento de Guillermo el Conquistador',
        it: 'Castello di Falaise, luogo di nascita di Guglielmo il Conquistatore',
      },
      credit: {
        en: 'Photo: Nitot, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Nitot, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Nitot, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Nitot, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'falaise',
    },
  ],

  'wc-dangerous-minority': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-knights.jpg',
      alt: {
        en: 'Bayeux Tapestry — Norman knights and archers in battle',
        fr: 'Tapisserie de Bayeux — chevaliers et archers normands au combat',
        es: 'Tapiz de Bayeux — caballeros y arqueros normandos en batalla',
        it: 'Arazzo di Bayeux — cavalieri e arcieri normanni in battaglia',
      },
      credit: {
        en: 'Bayeux Tapestry, scene 51. Photo: Myrabella, Wikimedia Commons (CC0)',
        fr: 'Tapisserie de Bayeux, scène 51. Photo : Myrabella, Wikimedia Commons (CC0)',
        es: 'Tapiz de Bayeux, escena 51. Foto: Myrabella, Wikimedia Commons (CC0)',
        it: 'Arazzo di Bayeux, scena 51. Foto: Myrabella, Wikimedia Commons (CC0)',
      },
      placeId: 'rouen',
    },
  ],

  'wc-val-es-dunes': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-hastings.jpg',
      alt: {
        en: 'Bayeux Tapestry — Duke William lifts his helmet on the battlefield',
        fr: 'Tapisserie de Bayeux — le duc Guillaume soulève son casque sur le champ de bataille',
        es: 'Tapiz de Bayeux — el duque Guillermo levanta su casco en el campo de batalla',
        it: 'Arazzo di Bayeux — il duca Guglielmo solleva l\'elmo sul campo di battaglia',
      },
      credit: {
        en: 'Bayeux Tapestry, scenes 55–56. Photo: Myrabella, Wikimedia Commons (CC0)',
        fr: 'Tapisserie de Bayeux, scènes 55–56. Photo : Myrabella, Wikimedia Commons (CC0)',
        es: 'Tapiz de Bayeux, escenas 55–56. Foto: Myrabella, Wikimedia Commons (CC0)',
        it: 'Arazzo di Bayeux, scene 55–56. Foto: Myrabella, Wikimedia Commons (CC0)',
      },
      placeId: 'val-es-dunes',
    },
  ],

  'wc-duchy-master': [
    {
      src: '/story/william-conqueror/abbaye-aux-hommes.jpg',
      alt: {
        en: 'Abbaye aux Hommes (Saint-Étienne), Caen — founded by William',
        fr: 'Abbaye aux Hommes (Saint-Étienne), Caen — fondée par Guillaume',
        es: 'Abadía de los Hombres (Saint-Étienne), Caen — fundada por Guillermo',
        it: 'Abbazia degli Uomini (Saint-Étienne), Caen — fondata da Guglielmo',
      },
      credit: {
        en: 'Photo: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'caen',
    },
  ],

  'wc-claim-to-england': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-oath.jpg',
      alt: {
        en: 'Bayeux Tapestry — Harold swears an oath on holy relics to William',
        fr: 'Tapisserie de Bayeux — Harold prête serment sur les reliques saintes à Guillaume',
        es: 'Tapiz de Bayeux — Harold jura sobre reliquias sagradas ante Guillermo',
        it: 'Arazzo di Bayeux — Harold presta giuramento sulle sacre reliquie a Guglielmo',
      },
      credit: {
        en: 'Bayeux Tapestry, scene 23. Photo: Myrabella, Wikimedia Commons (CC0)',
        fr: 'Tapisserie de Bayeux, scène 23. Photo : Myrabella, Wikimedia Commons (CC0)',
        es: 'Tapiz de Bayeux, escena 23. Foto: Myrabella, Wikimedia Commons (CC0)',
        it: 'Arazzo di Bayeux, scena 23. Foto: Myrabella, Wikimedia Commons (CC0)',
      },
      placeId: 'rouen',
    },
  ],

  'wc-invasion-fleet': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-fleet.jpg',
      alt: {
        en: 'Bayeux Tapestry — Norman horses and soldiers board the invasion fleet',
        fr: 'Tapisserie de Bayeux — chevaux et soldats normands embarquent dans la flotte d\'invasion',
        es: 'Tapiz de Bayeux — caballos y soldados normandos embarcan en la flota de invasión',
        it: 'Arazzo di Bayeux — cavalli e soldati normanni si imbarcano nella flotta d\'invasione',
      },
      credit: {
        en: 'Bayeux Tapestry. Wikimedia Commons (public domain)',
        fr: 'Tapisserie de Bayeux. Wikimedia Commons (domaine public)',
        es: 'Tapiz de Bayeux. Wikimedia Commons (dominio público)',
        it: 'Arazzo di Bayeux. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'saint-valery-sur-somme',
    },
  ],

  'wc-hastings': [
    {
      src: '/story/william-conqueror/harold-death.jpg',
      alt: {
        en: 'Bayeux Tapestry — the death of King Harold at the Battle of Hastings',
        fr: 'Tapisserie de Bayeux — la mort du roi Harold à la bataille de Hastings',
        es: 'Tapiz de Bayeux — la muerte del rey Harold en la batalla de Hastings',
        it: 'Arazzo di Bayeux — la morte di re Harold nella battaglia di Hastings',
      },
      credit: {
        en: 'Bayeux Tapestry. Wikimedia Commons (public domain)',
        fr: 'Tapisserie de Bayeux. Wikimedia Commons (domaine public)',
        es: 'Tapiz de Bayeux. Wikimedia Commons (dominio público)',
        it: 'Arazzo di Bayeux. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'hastings',
    },
  ],

  'wc-coronation-conquest': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-coronation.jpg',
      alt: {
        en: 'Bayeux Tapestry — Harold crowned King of England, a claim William would overturn',
        fr: 'Tapisserie de Bayeux — Harold couronné roi d\'Angleterre, une prétention que Guillaume renversera',
        es: 'Tapiz de Bayeux — Harold coronado rey de Inglaterra, título que Guillermo reclamará',
        it: 'Arazzo di Bayeux — Harold incoronato re d\'Inghilterra, una pretesa che Guglielmo rovescerà',
      },
      credit: {
        en: 'Bayeux Tapestry, scenes 29–31. Photo: Myrabella, Wikimedia Commons (CC0)',
        fr: 'Tapisserie de Bayeux, scènes 29–31. Photo : Myrabella, Wikimedia Commons (CC0)',
        es: 'Tapiz de Bayeux, escenas 29–31. Foto: Myrabella, Wikimedia Commons (CC0)',
        it: 'Arazzo di Bayeux, scene 29–31. Foto: Myrabella, Wikimedia Commons (CC0)',
      },
      placeId: 'london',
    },
  ],

  'wc-cross-channel-empire': [
    {
      src: '/story/william-conqueror/domesday-book.jpg',
      alt: {
        en: 'A page from the Domesday Book (1086), William\'s great survey of England',
        fr: 'Une page du Domesday Book (1086), le grand recensement de l\'Angleterre par Guillaume',
        es: 'Una página del Domesday Book (1086), el gran censo de Inglaterra de Guillermo',
        it: 'Una pagina del Domesday Book (1086), il grande censimento dell\'Inghilterra di Guglielmo',
      },
      credit: {
        en: 'Domesday Book, Warwickshire. Wikimedia Commons (public domain)',
        fr: 'Domesday Book, Warwickshire. Wikimedia Commons (domaine public)',
        es: 'Domesday Book, Warwickshire. Wikimedia Commons (dominio público)',
        it: 'Domesday Book, Warwickshire. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'london',
    },
  ],

  'wc-death-legacy': [
    {
      src: '/story/william-conqueror/tower-of-london.jpg',
      alt: {
        en: 'The Tower of London, begun by William the Conqueror after 1066',
        fr: 'La Tour de Londres, commencée par Guillaume le Conquérant après 1066',
        es: 'La Torre de Londres, iniciada por Guillermo el Conquistador después de 1066',
        it: 'La Torre di Londra, iniziata da Guglielmo il Conquistatore dopo il 1066',
      },
      credit: {
        en: 'Photo: Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'london',
    },
  ],

  // ── Guillaume Couture arc ────────────────────────────────────────

  'gc-beat-couture-rouen': [
    {
      src: '/story/guillaume-couture/rouen-gomboust-1655.jpg',
      alt: {
        en: 'Plan of Rouen by Jacques Gomboust, 1655 — the Norman capital where Guillaume Couture was baptised',
        fr: 'Plan de Rouen par Jacques Gomboust, 1655 — la capitale normande où Guillaume Couture fut baptisé',
        es: 'Plano de Rouen por Jacques Gomboust, 1655 — la capital normanda donde Guillaume Couture fue bautizado',
        it: 'Pianta di Rouen di Jacques Gomboust, 1655 — la capitale normanna dove Guillaume Couture fu battezzato',
      },
      credit: {
        en: 'Jacques Gomboust, 1655. Wikimedia Commons (public domain)',
        fr: 'Jacques Gomboust, 1655. Wikimedia Commons (domaine public)',
        es: 'Jacques Gomboust, 1655. Wikimedia Commons (dominio público)',
        it: 'Jacques Gomboust, 1655. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'rouen',
    },
  ],

  'gc-beat-couture-atlantic': [
    {
      src: '/story/guillaume-couture/champlain-map-1632.jpg',
      alt: {
        en: 'Champlain\'s map of New France, 1632 — the Atlantic world Couture crossed as a Jesuit donné',
        fr: 'Carte de la Nouvelle-France par Champlain, 1632 — le monde atlantique que Couture traversa comme donné jésuite',
        es: 'Mapa de Nueva Francia por Champlain, 1632 — el mundo atlántico que Couture cruzó como donné jesuita',
        it: 'Mappa della Nuova Francia di Champlain, 1632 — il mondo atlantico che Couture attraversò come donné gesuita',
      },
      credit: {
        en: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'dieppe',
    },
  ],

  'gc-beat-couture-quebec': [
    {
      src: '/story/guillaume-couture/habitation-quebec.jpg',
      alt: {
        en: 'Champlain\'s Habitation de Québec — the fragile French foothold on the St. Lawrence',
        fr: 'L\'Habitation de Québec de Champlain — le fragile avant-poste français sur le Saint-Laurent',
        es: 'La Habitación de Quebec de Champlain — el frágil puesto francés en el San Lorenzo',
        it: 'L\'Habitation de Québec di Champlain — il fragile avamposto francese sul San Lorenzo',
      },
      credit: {
        en: 'Samuel de Champlain, c. 1608. Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, v. 1608. Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, c. 1608. Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, c. 1608. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'quebec-city',
    },
  ],

  'gc-beat-couture-huronia': [
    {
      src: '/story/guillaume-couture/france-foi-hurons.jpg',
      alt: {
        en: 'France Bringing the Faith to the Hurons of New France — painting c. 1670, commissioned by the Hurons for the Jesuit church in Québec',
        fr: 'La France apportant la foi aux Hurons de la Nouvelle-France — peinture v. 1670, commandée par les Hurons pour l\'église jésuite de Québec',
        es: 'Francia llevando la fe a los hurones de Nueva Francia — pintura c. 1670, encargada por los hurones para la iglesia jesuita de Quebec',
        it: 'La Francia porta la fede agli Uroni della Nuova Francia — dipinto c. 1670, commissionato dagli Uroni per la chiesa gesuita di Québec',
      },
      credit: {
        en: 'Unknown French artist, c. 1670. Wikimedia Commons (public domain)',
        fr: 'Artiste français inconnu, v. 1670. Wikimedia Commons (domaine public)',
        es: 'Artista francés desconocido, c. 1670. Wikimedia Commons (dominio público)',
        it: 'Artista francese sconosciuto, c. 1670. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'lake-huron-node',
    },
  ],

  'gc-beat-couture-captivity': [
    {
      src: '/story/guillaume-couture/isaac-jogues.jpg',
      alt: {
        en: 'Father Isaac Jogues, captured alongside Guillaume Couture by a Mohawk war party in August 1642',
        fr: 'Le père Isaac Jogues, capturé aux côtés de Guillaume Couture par un parti de guerre mohawk en août 1642',
        es: 'El padre Isaac Jogues, capturado junto a Guillaume Couture por un grupo de guerra mohawk en agosto de 1642',
        it: 'Padre Isaac Jogues, catturato insieme a Guillaume Couture da un gruppo di guerra mohawk nell\'agosto 1642',
      },
      credit: {
        en: 'Engraving by J. Boyes. Wikimedia Commons (public domain)',
        fr: 'Gravure de J. Boyes. Wikimedia Commons (domaine public)',
        es: 'Grabado de J. Boyes. Wikimedia Commons (dominio público)',
        it: 'Incisione di J. Boyes. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'mohawk-territory',
    },
  ],

  'gc-beat-couture-diplomacy': [
    {
      src: '/story/guillaume-couture/trois-rivieres.jpg',
      alt: {
        en: 'The town of Trois-Rivières — a key diplomatic site where Couture negotiated peace along the St. Lawrence',
        fr: 'La ville de Trois-Rivières — un site diplomatique clé où Couture négocia la paix le long du Saint-Laurent',
        es: 'La villa de Trois-Rivières — un lugar diplomático clave donde Couture negoció la paz a lo largo del San Lorenzo',
        it: 'La città di Trois-Rivières — un sito diplomatico chiave dove Couture negoziò la pace lungo il San Lorenzo',
      },
      credit: {
        en: 'John Lambert, 1816. Wikimedia Commons (public domain)',
        fr: 'John Lambert, 1816. Wikimedia Commons (domaine public)',
        es: 'John Lambert, 1816. Wikimedia Commons (dominio público)',
        it: 'John Lambert, 1816. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'trois-rivieres',
    },
  ],

  'gc-beat-couture-long-sault': [
    {
      src: '/story/guillaume-couture/dollard-long-sault.jpg',
      alt: {
        en: 'Bas-relief of Dollard des Ormeaux at the Long Sault — Couture fought alongside him in 1660',
        fr: 'Bas-relief de Dollard des Ormeaux au Long-Sault — Couture combattit à ses côtés en 1660',
        es: 'Bajorrelieve de Dollard des Ormeaux en el Long Sault — Couture combatió a su lado en 1660',
        it: 'Bassorilievo di Dollard des Ormeaux al Long Sault — Couture combatté al suo fianco nel 1660',
      },
      credit: {
        en: 'Louis-Philippe Hébert, 1895. Monument à Maisonneuve, Montréal. Wikimedia Commons (public domain)',
        fr: 'Louis-Philippe Hébert, 1895. Monument à Maisonneuve, Montréal. Wikimedia Commons (domaine public)',
        es: 'Louis-Philippe Hébert, 1895. Monumento a Maisonneuve, Montreal. Wikimedia Commons (dominio público)',
        it: 'Louis-Philippe Hébert, 1895. Monumento a Maisonneuve, Montréal. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'montreal',
    },
  ],

  'gc-beat-couture-north-legacy': [
    {
      src: '/story/guillaume-couture/voyageur-canoe.jpg',
      alt: {
        en: 'Voyageurs in a large canoe — Frances Anne Hopkins, c. 1869; evoking Couture\'s 1663 expedition to Lake Mistassini',
        fr: 'Voyageurs en grand canot — Frances Anne Hopkins, v. 1869 ; évoquant l\'expédition de Couture au lac Mistassini en 1663',
        es: 'Viajeros en una gran canoa — Frances Anne Hopkins, c. 1869; evocando la expedición de Couture al lago Mistassini en 1663',
        it: 'Voyageurs in una grande canoa — Frances Anne Hopkins, c. 1869; evocando la spedizione di Couture al lago Mistassini nel 1663',
      },
      credit: {
        en: 'Frances Anne Hopkins, c. 1869. Wikimedia Commons (public domain)',
        fr: 'Frances Anne Hopkins, v. 1869. Wikimedia Commons (domaine public)',
        es: 'Frances Anne Hopkins, c. 1869. Wikimedia Commons (dominio público)',
        it: 'Frances Anne Hopkins, c. 1869. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'lake-mistassini',
    },
  ],

  // ── New France foundations ─────────────────────────────────────────
  //   - Atlantic origin ports: Commons (La Rochelle Lisch PD; Saint-Malo, Mortagne, St Peter Port CC BY-SA)
  //   - St. Lawrence / Acadia: Montmorency, Tadoussac, Montréal, Port-Royal, Louisbourg (Commons)
  //   - Château-Richer ribbon farms: AI reconstruction

  'beat-2': [
    {
      src: '/story/age-of-exploration/dieppe-port.jpg',
      alt: {
        en: 'Dieppe — one of many mainland harbours from which repeated Atlantic crossings fed the St. Lawrence colony',
        fr: 'Dieppe — l’un des nombreux havres continentaux d’où des traversées atlantiques répétées alimentaient la colonie du Saint-Laurent',
        es: 'Dieppe — uno de los muchos puertos continentales desde los que travesías atlánticas repetidas abastecían la colonia del San Lorenzo',
        it: 'Dieppe — uno dei tanti porti continentali da cui traversate atlantiche ripetute rifornivano la colonia del San Lorenzo',
      },
      credit: {
        en: 'Photo: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'dieppe',
    },
    {
      src: '/story/age-of-exploration/atlantic-crossing-16th-century.jpg',
      alt: {
        en: 'Reconstruction — weeks at sea on the North Atlantic, the corridor linking French ports to Québec',
        fr: 'Reconstitution — des semaines en mer sur l’Atlantique Nord, corridor reliant les ports français à Québec',
        es: 'Reconstrucción — semanas en el Atlántico Norte, el corredor que unía los puertos franceses con Quebec',
        it: 'Ricostruzione — settimane in mare sull’Atlantico del Nord, corridoio che collegava i porti francesi a Québec',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'mid-atlantic-passage',
    },
    {
      src: '/story/guillaume-couture/habitation-quebec.jpg',
      alt: {
        en: 'Champlain’s Habitation de Québec — terminus of the transatlantic corridor for many colonial cohorts',
        fr: 'L’Habitation de Québec de Champlain — terminus du corridor transatlantique pour de nombreuses cohortes coloniales',
        es: 'La Habitation de Champlain en Quebec — término del corredor transatlántico para muchas cohortes coloniales',
        it: 'L’Habitation de Québec di Champlain — capolinea del corridoio transatlantico per molte coorti coloniali',
      },
      credit: {
        en: 'Samuel de Champlain, c. 1608. Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, v. 1608. Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, c. 1608. Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, c. 1608. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'quebec-city',
    },
  ],

  'beat-3': [
    {
      src: '/story/guillaume-couture/habitation-quebec.jpg',
      alt: {
        en: 'Habitation de Québec — a small founder population here left an outsized imprint on French Canadian culture',
        fr: 'L’Habitation de Québec — une population fondatrice restreinte y laissa une empreinte démesurée sur la culture canadienne-française',
        es: 'La Habitation de Québec — una población fundadora pequeña dejó una huella desproporcionada en la cultura franco-canadiense',
        it: 'Habitation de Québec — una piccola popolazione fondatrice lasciò un’impronta sproporzionata sulla cultura franco-canadese',
      },
      credit: {
        en: 'Samuel de Champlain, c. 1608. Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, v. 1608. Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, c. 1608. Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, c. 1608. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'quebec-city',
    },
    {
      src: '/story/new-france-foundations/montmorency-falls.jpg',
      alt: {
        en: 'Montmorency Falls — near Beauport on the Beaupré shore, part of the dense St. Lawrence settlement ribbon',
        fr: 'Chute Montmorency — près de Beauport sur la côte de Beaupré, partie du ruban dense de peuplement du Saint-Laurent',
        es: 'Cataratas Montmorency — cerca de Beauport en la costa de Beaupré, parte del denso ribete de asentamiento del San Lorenzo',
        it: 'Cascate Montmorency — vicino a Beauport sulla costa di Beaupré, parte del fitto nastro di insediamento del San Lorenzo',
      },
      credit: {
        en: 'Photo: Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'beauport',
    },
    {
      src: '/story/new-france-foundations/mortagne-sous-prefecture.jpg',
      alt: {
        en: 'Mortagne-au-Perche — many recruits to Canada left from Norman and Perche parishes linked to Rouen and Dieppe',
        fr: 'Mortagne-au-Perche — nombre de recrues pour le Canada partirent de paroisses normandes et percheronnes liées à Rouen et Dieppe',
        es: 'Mortagne-au-Perche — muchos reclutas para Canadá salieron de parroquias normandas y del Perche ligadas a Ruán y Dieppe',
        it: 'Mortagne-au-Perche — molti reclute per il Canada partirono da parrocchie normanne e del Perche legate a Rouen e Dieppe',
      },
      credit: {
        en: 'Photo: Benjism89 (Benjamin Smith), Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Benjism89 (Benjamin Smith), Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Benjism89 (Benjamin Smith), Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Benjism89 (Benjamin Smith), Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'mortagne-au-perche',
    },
  ],

  'beat-migration-origins': NEW_FRANCE_ATLANTIC_ORIGIN_SLIDES,

  'nf-arc-origins': NEW_FRANCE_ATLANTIC_ORIGIN_SLIDES,

  'nf-arc-atlantic-crossing': [
    {
      src: '/story/new-france-foundations/la-rochelle-vieux-port-lisch.jpg',
      alt: {
        en: 'La Rochelle — spring sailings toward Canada and Acadia often left from La Rochelle and other Atlantic harbours',
        fr: 'La Rochelle — les départs printaniers vers le Canada et l’Acadie partaient souvent de La Rochelle et d’autres havres atlantiques',
        es: 'La Rochelle — las salidas de primavera hacia Canadá y Acadia a menudo partían de La Rochelle y otros puertos atlánticos',
        it: 'La Rochelle — le partenze primaverili verso Canada e Acadia spesso salpavano da La Rochelle e da altri porti atlantici',
      },
      credit: {
        en: 'Juste Lisch, 1864 (illustration); photograph 2006. Wikimedia Commons (public domain)',
        fr: 'Juste Lisch, 1864 (illustration) ; photographie 2006. Wikimedia Commons (domaine public)',
        es: 'Juste Lisch, 1864 (ilustración); fotografía 2006. Wikimedia Commons (dominio público)',
        it: 'Juste Lisch, 1864 (illustrazione); fotografia 2006. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'la-rochelle',
    },
    {
      src: '/story/age-of-exploration/dieppe-port.jpg',
      alt: {
        en: 'Dieppe — Norman port named alongside La Rochelle, Honfleur, and Saint-Malo in colonial sailing seasons',
        fr: 'Dieppe — port normand cité avec La Rochelle, Honfleur et Saint-Malo dans les saisons de navigation coloniale',
        es: 'Dieppe — puerto normando nombrado junto a La Rochelle, Honfleur y Saint-Malo en las temporadas de navegación colonial',
        it: 'Dieppe — porto normanno citato con La Rochelle, Honfleur e Saint-Malo nelle stagioni di navigazione coloniale',
      },
      credit: {
        en: 'Photo: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'dieppe',
    },
    {
      src: '/story/age-of-exploration/atlantic-crossing-16th-century.jpg',
      alt: {
        en: 'Reconstruction — six- to twelve-week Atlantic passages carried settlers, supplies, and trade goods toward the St. Lawrence',
        fr: 'Reconstitution — des traversées atlantiques de six à douze semaines transportaient colons, vivres et marchandises vers le Saint-Laurent',
        es: 'Reconstrucción — travesías atlánticas de seis a doce semanas llevaban colonos, víveres y mercancías hacia el San Lorenzo',
        it: 'Ricostruzione — traversate atlantiche di sei-dodici settimane portavano coloni, viveri e merci verso il San Lorenzo',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'mid-atlantic-passage',
    },
    {
      src: '/story/guillaume-couture/champlain-map-1632.jpg',
      alt: {
        en: 'Champlain’s 1632 map of New France — the St. Lawrence colony as the demographic hub of many transatlantic voyages',
        fr: 'Carte de la Nouvelle-France par Champlain, 1632 — la colonie du Saint-Laurent comme pôle démographique de nombreuses traversées',
        es: 'Mapa de Nueva Francia de Champlain, 1632 — la colonia del San Lorenzo como eje demográfico de muchas travesías',
        it: 'Mappa della Nuova Francia di Champlain, 1632 — la colonia del San Lorenzo come polo demografico di molte traversate',
      },
      credit: {
        en: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'quebec-city',
    },
  ],

  'nf-arc-settlement-corridor': [
    {
      src: '/story/guillaume-couture/habitation-quebec.jpg',
      alt: {
        en: 'Habitation de Québec — head of the seigneurial ribbon along the lower St. Lawrence',
        fr: 'L’Habitation de Québec — tête du ruban seigneurial le long du bas Saint-Laurent',
        es: 'La Habitation de Québec — cabeza del ribete señorial a lo largo del bajo San Lorenzo',
        it: 'Habitation de Québec — testa del nastro signorile lungo il basso San Lorenzo',
      },
      credit: {
        en: 'Samuel de Champlain, c. 1608. Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, v. 1608. Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, c. 1608. Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, c. 1608. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'quebec-city',
    },
    {
      src: '/story/guillaume-couture/trois-rivieres.jpg',
      alt: {
        en: 'Trois-Rivières — mid-corridor node between Québec and Montréal on the St. Lawrence',
        fr: 'Trois-Rivières — nœud du milieu du corridor entre Québec et Montréal sur le Saint-Laurent',
        es: 'Trois-Rivières — nudo intermedio del corredor entre Quebec y Montreal en el San Lorenzo',
        it: 'Trois-Rivières — nodo centrale del corridoio tra Québec e Montréal sul San Lorenzo',
      },
      credit: {
        en: 'John Lambert, 1816. Wikimedia Commons (public domain)',
        fr: 'John Lambert, 1816. Wikimedia Commons (domaine public)',
        es: 'John Lambert, 1816. Wikimedia Commons (dominio público)',
        it: 'John Lambert, 1816. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'trois-rivieres',
    },
    {
      src: '/story/new-france-foundations/vieux-port-montreal.jpg',
      alt: {
        en: 'Old Port of Montréal — downstream terminus of the settled St. Lawrence spine under New France',
        fr: 'Vieux-Port de Montréal — terminus aval de l’épine dorsale peuplée du Saint-Laurent sous la Nouvelle-France',
        es: 'Puerto Viejo de Montreal — término aguas abajo del eje poblado del San Lorenzo bajo Nueva Francia',
        it: 'Vecchio Porto di Montréal — terminale a valle del dorso popolato del San Lorenzo sotto la Nuova Francia',
      },
      credit: {
        en: 'Photo: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'montreal',
    },
    {
      src: '/story/new-france-foundations/montmorency-falls.jpg',
      alt: {
        en: 'Montmorency Falls — Beaupré shore landscape tied to early farms facing Île d’Orléans',
        fr: 'Chute Montmorency — paysage de la côte de Beaupré lié aux premières fermes face à l’Île d’Orléans',
        es: 'Cataratas Montmorency — paisaje de la costa de Beaupré ligado a las primeras granjas frente a la isla de Orleans',
        it: 'Cascate Montmorency — paesaggio della costa di Beaupré legato alle prime fattorie di fronte all’Île d’Orléans',
      },
      credit: {
        en: 'Photo: Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'beauport',
    },
    {
      src: '/story/new-france-foundations/tadoussac-chapelle-indiens.jpg',
      alt: {
        en: 'Tadoussac Indian Chapel (1747–1750) — trading and mission gateway at the mouth of the Saguenay',
        fr: 'Chapelle des Indiens de Tadoussac (1747-1750) — porte de traite et de mission à l’embouchure du Saguenay',
        es: 'Capilla de los indios de Tadoussac (1747-1750) — puerta de comercio y misión en la boca del Saguenay',
        it: 'Cappella degli Indiani a Tadoussac (1747-1750) — accesso a commercio e missione alla foce del Saguenay',
      },
      credit: {
        en: 'Photo: Natidu, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Natidu, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Natidu, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Natidu, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'tadoussac',
    },
  ],

  'beat-transatlantic-quebec-founding': [
    {
      src: '/story/guillaume-couture/habitation-quebec.jpg',
      alt: {
        en: 'Champlain’s Québec habitation (1608) — anchor for Norman and Perche founder families on the St. Lawrence',
        fr: 'L’habitation de Champlain à Québec (1608) — ancrage des familles fondatrices normandes et percheronnes sur le Saint-Laurent',
        es: 'La Habitation de Québec de Champlain (1608) — ancla de familias fundadoras normandas y del Perche en el San Lorenzo',
        it: 'L’habitation di Champlain a Québec (1608) — ancora per famiglie fondatrici normanne e del Perche sul San Lorenzo',
      },
      credit: {
        en: 'Samuel de Champlain, c. 1608. Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, v. 1608. Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, c. 1608. Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, c. 1608. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'quebec-city',
    },
    {
      src: '/story/new-france-foundations/montmorency-falls.jpg',
      alt: {
        en: 'Montmorency Falls — the Beaupré coast and Île d’Orléans as a “new Norman” agricultural landscape',
        fr: 'Chute Montmorency — la côte de Beaupré et l’Île d’Orléans comme paysage agricole « néo-normand »',
        es: 'Cataratas Montmorency — la costa de Beaupré y la isla de Orleans como paisaje agrícola « neo-normando »',
        it: 'Cascate Montmorency — la costa di Beaupré e l’Île d’Orléans come paesaggio agricolo «neo-normanno»',
      },
      credit: {
        en: 'Photo: Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'beauport',
    },
    {
      src: '/story/new-france-foundations/chateau-richer-beauce-st-lawrence.jpg',
      alt: {
        en: 'Reconstruction — seigneurial ribbon farms along the St. Lawrence near Château-Richer, where many early families took land',
        fr: 'Reconstitution — fermes en ruban seigneurial le long du Saint-Laurent près de Château-Richer, où de nombreuses familles prirent terre',
        es: 'Reconstrucción — granjas señoriales en franja a lo largo del San Lorenzo cerca de Château-Richer, donde muchas familias obtuvieron tierras',
        it: 'Ricostruzione — fattorie signorili a nastro lungo il San Lorenzo vicino a Château-Richer, dove molte famiglie ottennero terre',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'chateau-richer',
    },
  ],

  'beat-transatlantic-acadia': [
    {
      src: '/story/new-france-foundations/port-royal-habitation.jpg',
      alt: {
        en: 'Port-Royal National Historic Site — replica of France’s early 17th-century Acadian habitation on the Annapolis Basin',
        fr: 'Lieu historique national du Port-Royal — réplique de l’habitation acadienne du début du XVIIe siècle sur le bassin d’Annapolis',
        es: 'Lugar histórico nacional de Port-Royal — réplica de la habitación acadiana de principios del siglo XVII en la cuenca de Annapolis',
        it: 'Sito storico nazionale di Port-Royal — replica dell’abitazione acadiana di inizio XVII secolo sul bacino di Annapolis',
      },
      credit: {
        en: 'Photo: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        fr: 'Photo : Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        es: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        it: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
      },
      placeId: 'port-royal',
    },
    {
      src: '/story/new-france-foundations/louisbourg-fortress.jpg',
      alt: {
        en: 'Fortress of Louisbourg — 18th-century French Atlantic stronghold tied to Acadian and Canadian defence networks',
        fr: 'Forteresse de Louisbourg — bastion atlantique français du XVIIIe siècle lié aux réseaux de défense acadiens et canadiens',
        es: 'Fortaleza de Louisbourg — bastión atlántico francés del siglo XVIII ligado a las redes de defensa acadianas y canadienses',
        it: 'Fortezza di Louisbourg — bastione atlantico francese del XVIII secolo legato alle reti di difesa acadiane e canadesi',
      },
      credit: {
        en: 'Photo: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        fr: 'Photo : Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        es: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        it: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
      },
      placeId: 'louisbourg',
    },
  ],

  'leif-ch8-new-france': [
    {
      src: '/story/guillaume-couture/rouen-gomboust-1655.jpg',
      alt: {
        en: 'Plan of Rouen, 1655 — Norman river capital linking Viking-age seafaring to Champlain’s colonial departures',
        fr: 'Plan de Rouen, 1655 — capitale fluviale normande reliant la navigation d’époque viking aux départs coloniaux de Champlain',
        es: 'Plano de Ruán, 1655 — capital fluvial normanda que une la navegación vikinga con las salidas coloniales de Champlain',
        it: 'Pianta di Rouen, 1655 — capitale fluviale normanna che collega la navigazione vichinga alle partenze coloniali di Champlain',
      },
      credit: {
        en: 'Jacques Gomboust, 1655. Wikimedia Commons (public domain)',
        fr: 'Jacques Gomboust, 1655. Wikimedia Commons (domaine public)',
        es: 'Jacques Gomboust, 1655. Wikimedia Commons (dominio público)',
        it: 'Jacques Gomboust, 1655. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'rouen',
    },
    {
      src: '/story/age-of-exploration/honfleur-port.jpg',
      alt: {
        en: 'Honfleur — Champlain sailed from here in 1608 to found Québec, echoing the same Norman harbours that once sent longships',
        fr: 'Honfleur — Champlain partit d’ici en 1608 pour fonder Québec, en écho aux mêmes ports normands qui avaient envoyé des drakkars',
        es: 'Honfleur — Champlain zarpó desde aquí en 1608 para fundar Quebec, en eco de los mismos puertos normandos que enviaron drakkars',
        it: 'Honfleur — Champlain salpò di qui nel 1608 per fondare Québec, eco degli stessi porti normanni che inviarono drakkar',
      },
      credit: {
        en: 'Photo: Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'honfleur',
    },
    {
      src: '/story/guillaume-couture/habitation-quebec.jpg',
      alt: {
        en: 'Habitation de Québec — French-speaking heirs of the Norman Atlantic world made the St. Lawrence colony endure',
        fr: 'L’Habitation de Québec — les héritiers francophones du monde atlantique normand firent perdurer la colonie du Saint-Laurent',
        es: 'La Habitation de Québec — los herederos francófonos del mundo atlántico normando hicieron perdurar la colonia del San Lorenzo',
        it: 'Habitation de Québec — gli eredi francofoni del mondo atlantico normanno fecero durare la colonia del San Lorenzo',
      },
      credit: {
        en: 'Samuel de Champlain, c. 1608. Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, v. 1608. Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, c. 1608. Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, c. 1608. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'quebec-city',
    },
    {
      src: '/story/new-france-foundations/l-anse-aux-meadows-longhouse.jpg',
      alt: {
        en: 'Recreated Norse longhouse at L’Anse aux Meadows — Vinland and Québec belong to the same Atlantic geography, centuries apart',
        fr: 'Maison longue norroise reconstituée à l’Anse aux Meadows — le Vinland et Québec partagent la même géographie atlantique, à des siècles d’intervalle',
        es: 'Casa larga nórdica recreada en L’Anse aux Meadows — Vinlandia y Quebec comparten la misma geografía atlántica, siglos aparte',
        it: 'Casa lunga norrena ricostruita a L’Anse aux Meadows — Vinland e Québec condividono la stessa geografia atlantica, a secoli di distanza',
      },
      credit: {
        en: 'Photo: D. Gordon E. Robertson, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : D. Gordon E. Robertson, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: D. Gordon E. Robertson, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: D. Gordon E. Robertson, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'vinland',
    },
  ],

  // ── Royal New France ────────────────────────────────────────────────
  //   - Michilimackinac: Galteglise, Wikimedia Commons (public domain)
  //   - Sault Ste. Marie locks: U.S. Army Corps of Engineers webcam (public domain)
  //   - Detroit River skyline: Shawn Wilson, Wikimedia Commons (CC BY-SA 1.0)
  //   - St. Louis / Mississippi: Daniel Schwen, Wikimedia Commons (CC BY-SA 4.0)
  //   - Jackson Square engraving: W. P. Snyder, Harper’s Weekly 1885 (public domain)
  //   - Green Bay shore / Gulf marsh: AI reconstructions

  'beat-4': [
    {
      src: '/story/new-france-foundations/la-rochelle-vieux-port-lisch.jpg',
      alt: {
        en: 'La Rochelle Vieux-Port — Aunis and the Centre-West fed colonial corridors toward Acadia and Canada',
        fr: 'Le Vieux-Port de La Rochelle — l’Aunis et le Centre-Ouest alimentaient des corridors coloniaux vers l’Acadie et le Canada',
        es: 'El Viejo Puerto de La Rochelle — Aunis y el Centro-Oeste abastecían corredores coloniales hacia Acadia y Canadá',
        it: 'Il Vieux-Port de La Rochelle — l’Aunis e il Centro-Ovest alimentavano corridoi coloniali verso Acadia e Canada',
      },
      credit: {
        en: 'Juste Lisch, 1864 (illustration); photograph 2006. Wikimedia Commons (public domain)',
        fr: 'Juste Lisch, 1864 (illustration) ; photographie 2006. Wikimedia Commons (domaine public)',
        es: 'Juste Lisch, 1864 (ilustración); fotografía 2006. Wikimedia Commons (dominio público)',
        it: 'Juste Lisch, 1864 (illustrazione); fotografia 2006. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'la-rochelle',
    },
    {
      src: '/story/new-france-foundations/saint-malo-port.jpg',
      alt: {
        en: 'Saint-Malo — Breton sailings linked France to Port-Royal, Louisbourg, and the wider French Atlantic',
        fr: 'Saint-Malo — les départs bretons reliaient la France à Port-Royal, Louisbourg et l’Atlantique français au sens large',
        es: 'Saint-Malo — las salidas bretonas unían Francia con Port-Royal, Louisbourg y el Atlántico francés en conjunto',
        it: 'Saint-Malo — le partenze bretone collegavano la Francia a Port-Royal, Louisbourg e l’Atlantico francese più ampio',
      },
      credit: {
        en: 'Photo: IgorCalzone1, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : IgorCalzone1, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: IgorCalzone1, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: IgorCalzone1, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'saint-malo',
    },
    {
      src: '/story/new-france-foundations/port-royal-habitation.jpg',
      alt: {
        en: 'Port-Royal — Acadian anchor fed by the same La Rochelle and Saint-Malo harbour systems as the St. Lawrence',
        fr: 'Port-Royal — ancrage acadien nourri par les mêmes réseaux portuaires de La Rochelle et Saint-Malo que le Saint-Laurent',
        es: 'Port-Royal — ancla acadiana abastecida por los mismos sistemas portuarios de La Rochelle y Saint-Malo que el San Lorenzo',
        it: 'Port-Royal — ancora acadiana alimentata dagli stessi sistemi portuali di La Rochelle e Saint-Malo del San Lorenzo',
      },
      credit: {
        en: 'Photo: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        fr: 'Photo : Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        es: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        it: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
      },
      placeId: 'port-royal',
    },
    {
      src: '/story/new-france-foundations/louisbourg-fortress.jpg',
      alt: {
        en: 'Louisbourg — France’s rebuilt Atlantic fortress capped the corridor from Breton and Aunis ports to Cape Breton',
        fr: 'Louisbourg — la forteresse atlantique reconstruite par la France couronnait le corridor des ports bretons et aunisiens jusqu’au cap-Breton',
        es: 'Louisbourg — la fortaleza atlántica reconstruida por Francia culminaba el corredor desde los puertos bretones y de Aunis hasta Cape Breton',
        it: 'Louisbourg — la fortezza atlantica ricostruita dalla Francia chiudeva il corridoio dai porti bretoni e dell’Aunis fino a Cape Breton',
      },
      credit: {
        en: 'Photo: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        fr: 'Photo : Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        es: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        it: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
      },
      placeId: 'louisbourg',
    },
  ],

  'nf-arc-great-lakes': [
    {
      src: '/story/new-france-foundations/vieux-port-montreal.jpg',
      alt: {
        en: 'Old Port of Montréal — gateway to the Ottawa River route and the upper Great Lakes fur-trade network',
        fr: 'Vieux-Port de Montréal — porte d’accès à la route de l’Outaouais et au réseau de traite des Grands Lacs supérieurs',
        es: 'Puerto Viejo de Montreal — puerta a la ruta del río Ottawa y a la red comercial de pieles del alto los Grandes Lagos',
        it: 'Vecchio Porto di Montréal — accesso alla via del fiume Ottawa e alla rete di commercio delle peli dei Grandi Laghi superiori',
      },
      credit: {
        en: 'Photo: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'montreal',
    },
    {
      src: '/story/guillaume-couture/france-foi-hurons.jpg',
      alt: {
        en: 'France bringing the faith to the Hurons — symbolic of missions and alliances knitting the Great Lakes interior to Québec',
        fr: 'La France apportant la foi aux Hurons — symbole des missions et alliances reliant l’intérieur des Grands Lacs à Québec',
        es: 'Francia llevando la fe a los hurones — símbolo de misiones y alianzas que unían el interior de los Grandes Lagos a Quebec',
        it: 'La Francia porta la fede agli Uroni — simbolo di missioni e alleanze che legavano l’interno dei Grandi Laghi a Québec',
      },
      credit: {
        en: 'Unknown French artist, c. 1670. Wikimedia Commons (public domain)',
        fr: 'Artiste français inconnu, v. 1670. Wikimedia Commons (domaine public)',
        es: 'Artista francés desconocido, c. 1670. Wikimedia Commons (dominio público)',
        it: 'Artista francese sconosciuto, c. 1670. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'great-lakes-hub',
    },
    {
      src: '/story/royal-new-france/fort-michilimackinac.jpg',
      alt: {
        en: 'Reconstructed Fort Michilimackinac — straits entrepôt between Lakes Huron and Michigan under French fur-trade control',
        fr: 'Fort Michilimackinac reconstitué — comptoir du détroit entre les lacs Huron et Michigan sous le contrôle français de la traite',
        es: 'Fort Michilimackinac reconstruido — entrepuerto del estrecho entre los lagos Hurón y Míchigan bajo el comercio francés de pieles',
        it: 'Fort Michilimackinac ricostruito — emporio dello stretto tra i laghi Huron e Michigan sotto il commercio francese delle pellicce',
      },
      credit: {
        en: 'Photo: Galteglise, Wikimedia Commons (public domain)',
        fr: 'Photo : Galteglise, Wikimedia Commons (domaine public)',
        es: 'Foto: Galteglise, Wikimedia Commons (dominio público)',
        it: 'Foto: Galteglise, Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'michilimackinac',
    },
    {
      src: '/story/royal-new-france/sault-ste-marie-locks.jpg',
      alt: {
        en: 'St. Marys River at Sault Ste. Marie — the rapids and portage node linking Lake Superior to the lower lakes',
        fr: 'Rivière Sainte-Marie à Sault Ste. Marie — les rapides et le nœud de portage reliant le lac Supérieur aux lacs inférieurs',
        es: 'Río St. Marys en Sault Ste. Marie — rápidos y nudo de portage que enlazan el lago Superior con los lagos inferiores',
        it: 'Fiume St. Marys a Sault Ste. Marie — rapide e nodo di portage che collegano il lago Superiore ai laghi inferiori',
      },
      credit: {
        en: 'U.S. Army Corps of Engineers webcam. Wikimedia Commons (public domain)',
        fr: 'Image : U.S. Army Corps of Engineers (webcam). Wikimedia Commons (domaine public)',
        es: 'Imagen: U.S. Army Corps of Engineers (webcam). Wikimedia Commons (dominio público)',
        it: 'Immagine: U.S. Army Corps of Engineers (webcam). Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'sault-ste-marie',
    },
    {
      src: '/story/royal-new-france/detroit-river-skyline.jpg',
      alt: {
        en: 'Detroit River waterfront — Fort Pontchartrain (Detroit) guarded the narrow passage between Lakes Erie and Huron',
        fr: 'Front de rivière à Detroit — Fort Pontchartrain (Detroit) gardait le passage étroit entre les lacs Érié et Huron',
        es: 'Frente fluvial del río Detroit — Fort Pontchartrain (Detroit) custodiaba el paso estrecho entre los lagos Erie y Hurón',
        it: 'Fronte sul fiume Detroit — Fort Pontchartrain (Detroit) presidiava lo stretto tra i laghi Erie e Huron',
      },
      credit: {
        en: 'Photo: Shawn Wilson, Wikimedia Commons (CC BY-SA 1.0)',
        fr: 'Photo : Shawn Wilson, Wikimedia Commons (CC BY-SA 1.0)',
        es: 'Foto: Shawn Wilson, Wikimedia Commons (CC BY-SA 1.0)',
        it: 'Foto: Shawn Wilson, Wikimedia Commons (CC BY-SA 1.0)',
      },
      placeId: 'fort-detroit',
    },
  ],

  'nf-arc-mississippi': [
    {
      src: '/story/guillaume-couture/champlain-map-1632.jpg',
      alt: {
        en: 'Champlain’s 1632 map — the St. Lawrence world that later linked Montreal to Mississippi and Gulf explorations',
        fr: 'Carte de Champlain, 1632 — l’univers du Saint-Laurent qui reliera plus tard Montréal aux explorations du Mississippi et du golfe',
        es: 'Mapa de Champlain, 1632 — el mundo del San Lorenzo que luego enlazaría Montreal con las exploraciones del Mississippi y el golfo',
        it: 'Mappa di Champlain, 1632 — l’universo del San Lorenzo che avrebbe collegato Montréal alle esplorazioni del Mississippi e del golfo',
      },
      credit: {
        en: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'great-lakes-hub',
    },
    {
      src: '/story/royal-new-france/st-louis-mississippi-night.jpg',
      alt: {
        en: 'St. Louis on the Mississippi — near the confluence zone where Jolliet and Marquette’s 1673 voyage proved the river ran south',
        fr: 'Saint-Louis sur le Mississippi — près du secteur de confluence où la descente de Jolliet et Marquette en 1673 prouva que le fleuve courait vers le sud',
        es: 'St. Louis en el Mississippi — cerca de la zona de confluencia donde el viaje de Jolliet y Marquette en 1673 demostró que el río corría hacia el sur',
        it: 'St. Louis sul Mississippi — vicino alla zona di confluenza dove la discesa di Jolliet e Marquette nel 1673 dimostrò che il fiume scorreva a sud',
      },
      credit: {
        en: 'Photo: Daniel Schwen, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Daniel Schwen, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Daniel Schwen, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Daniel Schwen, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'mississippi-confluence',
    },
    {
      src: '/story/royal-new-france/gulf-mexico-louisiana-coast.jpg',
      alt: {
        en: 'Reconstruction — Gulf of Mexico littoral evoking La Salle’s 1682 claim of Louisiana for France',
        fr: 'Reconstitution — littoral du golfe du Mexique évoquant la prise de possession de la Louisiane par La Salle pour la France en 1682',
        es: 'Reconstrucción — litoral del golfo de México que evoca la toma de posesión de Luisiana por La Salle para Francia en 1682',
        it: 'Ricostruzione — litorale del golfo del Messico che evoca la presa di possesso della Louisiana da parte de La Salle per la Francia nel 1682',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'gulf-of-mexico-node',
    },
    {
      src: '/story/royal-new-france/green-bay-baie-des-puants.jpg',
      alt: {
        en: 'Reconstruction — western shore of Green Bay (Baie des Puants), a French mission and fur-trade node opening toward the Mississippi basin',
        fr: 'Reconstitution — rive ouest de la baie Green (Baie des Puants), nœud de mission et de traite des fourrures s’ouvrant vers le bassin du Mississippi',
        es: 'Reconstrucción — orilla oeste de la bahía de Green (Baie des Puants), nudo de misión y comercio de pieles hacia la cuenca del Mississippi',
        it: 'Ricostruzione — sponda occidentale della baia di Green (Baie des Puants), nodo di missione e commercio di pellicce verso il bacino del Mississippi',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'green-bay',
    },
  ],

  'beat-transatlantic-mississippi': [
    {
      src: '/story/guillaume-couture/champlain-map-1632.jpg',
      alt: {
        en: 'Champlain’s map of New France — the interior network from which La Salle, born in Rouen, pushed toward the Mississippi and Gulf',
        fr: 'Carte de la Nouvelle-France par Champlain — le réseau intérieur depuis lequel La Salle, né à Rouen, poussa vers le Mississippi et le golfe',
        es: 'Mapa de Nueva Francia de Champlain — la red interior desde la que La Salle, nacido en Ruán, avanzó hacia el Mississippi y el golfo',
        it: 'Mappa della Nuova Francia di Champlain — la rete interna da cui La Salle, nato a Rouen, spinse verso il Mississippi e il golfo',
      },
      credit: {
        en: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'great-lakes-hub',
    },
    {
      src: '/story/royal-new-france/st-louis-mississippi-night.jpg',
      alt: {
        en: 'St. Louis on the Mississippi — the great river system La Salle followed from the Great Lakes toward the Gulf in 1682',
        fr: 'Saint-Louis sur le Mississippi — le grand réseau fluvial que La Salle suivit des Grands Lacs vers le golfe en 1682',
        es: 'St. Louis en el Mississippi — la gran red fluvial que La Salle siguió desde los Grandes Lagos hacia el golfo en 1682',
        it: 'St. Louis sul Mississippi — la grande rete fluviale che La Salle percorse dai Grandi Laghi verso il golfo nel 1682',
      },
      credit: {
        en: 'Photo: Daniel Schwen, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Daniel Schwen, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Daniel Schwen, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Daniel Schwen, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'mississippi-confluence',
    },
    {
      src: '/story/royal-new-france/jackson-square-new-orleans-1885.jpg',
      alt: {
        en: 'Jackson Square, New Orleans (1885 wood engraving) — heart of the French Quarter, eventual capital of French Louisiana on the Gulf',
        fr: 'Place Jackson, La Nouvelle-Orléans (gravure sur bois, 1885) — cœur du Vieux Carré, capitale ultérieure de la Louisiane française sur le golfe',
        es: 'Jackson Square, Nueva Orleans (grabado en madera, 1885) — corazón del Barrio Francés, capital posterior de la Luisiana francesa en el golfo',
        it: 'Jackson Square, New Orleans (xilografia, 1885) — cuore del Quartiere Francese, capitale successiva della Louisiana francese sul golfo',
      },
      credit: {
        en: 'W. P. Snyder after Harper’s Weekly, 1885. Wikimedia Commons (public domain)',
        fr: 'W. P. Snyder d’après Harper’s Weekly, 1885. Wikimedia Commons (domaine public)',
        es: 'W. P. Snyder según Harper’s Weekly, 1885. Wikimedia Commons (dominio público)',
        it: 'W. P. Snyder da Harper’s Weekly, 1885. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'new-orleans',
    },
  ],

  // ── Atlantic imprint (New France peak, loss, endurance) ───────────
  //   - Death of General Wolfe: Benjamin West, 1770 (National Gallery of Canada; photo WGA / Commons, public domain)

  'nf-arc-peak': [
    {
      src: '/story/guillaume-couture/champlain-map-1632.jpg',
      alt: {
        en: 'Champlain’s map of New France — intellectual forerunner of the continental claim from the Gulf of St. Lawrence to the interior',
        fr: 'Carte de la Nouvelle-France par Champlain — prédécesseur intellectuel de la revendication continentale du golfe du Saint-Laurent à l’intérieur',
        es: 'Mapa de Nueva Francia de Champlain — precursor intelectual de la reivindicación continental desde el golfo de San Lorenzo al interior',
        it: 'Mappa della Nuova Francia di Champlain — precursore intellettuale della rivendicazione continentale dal golfo del San Lorenzo all’interno',
      },
      credit: {
        en: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, 1632. NYPL / Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'quebec-city',
    },
    {
      src: '/story/new-france-foundations/vieux-port-montreal.jpg',
      alt: {
        en: 'Old Port of Montréal — hub of the St. Lawrence spine at the zenith of French North America after the Great Peace of 1701',
        fr: 'Vieux-Port de Montréal — plaque tournante de l’axe du Saint-Laurent au zénith de l’Amérique française après la Grande Paix de 1701',
        es: 'Puerto Viejo de Montreal — eje del San Lorenzo en el zenit de la América francesa tras la Gran Paz de 1701',
        it: 'Vecchio Porto di Montréal — snodo del dorsale del San Lorenzo allo zenit dell’America francese dopo la Grande Pace del 1701',
      },
      credit: {
        en: 'Photo: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'montreal',
    },
    {
      src: '/story/new-france-foundations/louisbourg-fortress.jpg',
      alt: {
        en: 'Fortress of Louisbourg — Atlantic bastion of French power in Acadia and the cod fisheries at New France’s height',
        fr: 'Forteresse de Louisbourg — bastion atlantique du pouvoir français en Acadie et dans la pêche à la morue à l’apogée de la Nouvelle-France',
        es: 'Fortaleza de Louisbourg — bastión atlántico del poder francés en Acadia y la pesca del bacalao en el apogeo de Nueva Francia',
        it: 'Fortezza di Louisbourg — bastione atlantico del potere francese in Acadia e nella pesca del merluzzo all’apogeo della Nuova Francia',
      },
      credit: {
        en: 'Photo: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        fr: 'Photo : Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        es: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        it: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
      },
      placeId: 'louisbourg',
    },
    {
      src: '/story/royal-new-france/jackson-square-new-orleans-1885.jpg',
      alt: {
        en: 'Jackson Square, New Orleans (1885 engraving) — French Louisiana on the Gulf as the southern anchor of the continental claim',
        fr: 'Place Jackson, La Nouvelle-Orléans (gravure 1885) — la Louisiane française sur le golfe comme ancrage sud de la revendication continentale',
        es: 'Jackson Square, Nueva Orleans (grabado 1885) — la Luisiana francesa en el golfo como ancla sur de la reivindicación continental',
        it: 'Jackson Square, New Orleans (xilografia 1885) — la Louisiana francese sul golfo come ancora meridionale della rivendicazione continentale',
      },
      credit: {
        en: 'W. P. Snyder after Harper’s Weekly, 1885. Wikimedia Commons (public domain)',
        fr: 'W. P. Snyder d’après Harper’s Weekly, 1885. Wikimedia Commons (domaine public)',
        es: 'W. P. Snyder según Harper’s Weekly, 1885. Wikimedia Commons (dominio público)',
        it: 'W. P. Snyder da Harper’s Weekly, 1885. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'new-orleans',
    },
    {
      src: '/story/royal-new-france/detroit-river-skyline.jpg',
      alt: {
        en: 'Detroit River — choke point between Lakes Erie and Huron where Fort Détroit anchored the western French lakes system',
        fr: 'Rivière Detroit — passage étroit entre les lacs Érié et Huron où Fort Détroit ancrait le système français des lacs à l’ouest',
        es: 'Río Detroit — paso estrecho entre los lagos Erie y Hurón donde Fort Détroit anclaba el sistema francés de los lagos al oeste',
        it: 'Fiume Detroit — strozzatura tra i laghi Erie e Huron dove Fort Détroit ancorava il sistema francese dei laghi a ovest',
      },
      credit: {
        en: 'Photo: Shawn Wilson, Wikimedia Commons (CC BY-SA 1.0)',
        fr: 'Photo : Shawn Wilson, Wikimedia Commons (CC BY-SA 1.0)',
        es: 'Foto: Shawn Wilson, Wikimedia Commons (CC BY-SA 1.0)',
        it: 'Foto: Shawn Wilson, Wikimedia Commons (CC BY-SA 1.0)',
      },
      placeId: 'fort-detroit',
    },
    {
      src: '/story/royal-new-france/fort-michilimackinac.jpg',
      alt: {
        en: 'Fort Michilimackinac — straits trading fort tying the upper lakes fur economy to Montréal and Québec',
        fr: 'Fort Michilimackinac — fort de traite du détroit reliant l’économie des fourrures des lacs supérieurs à Montréal et Québec',
        es: 'Fort Michilimackinac — fuerte comercial del estrecho que unía la economía de pieles de los lagos superiores con Montreal y Quebec',
        it: 'Fort Michilimackinac — forte di commercio dello stretto che legava l’economia delle pellicce dei laghi superiori a Montréal e Québec',
      },
      credit: {
        en: 'Photo: Galteglise, Wikimedia Commons (public domain)',
        fr: 'Photo : Galteglise, Wikimedia Commons (domaine public)',
        es: 'Foto: Galteglise, Wikimedia Commons (dominio público)',
        it: 'Foto: Galteglise, Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'michilimackinac',
    },
  ],

  'nf-arc-collapse': [
    {
      src: '/story/atlantic-imprint/death-of-general-wolfe-1770.jpg',
      alt: {
        en: 'Benjamin West, The Death of General Wolfe (1770) — the 1759 battle on the Plains of Abraham sealed the loss of Québec',
        fr: 'Benjamin West, La Mort du général Wolfe (1770) — la bataille de 1759 sur les Plaines d’Abraham scella la perte de Québec',
        es: 'Benjamin West, La muerte del general Wolfe (1770) — la batalla de 1759 en las Llanuras de Abraham selló la pérdida de Quebec',
        it: 'Benjamin West, La morte del generale Wolfe (1770) — la battaglia del 1759 sulle pianure di Abraham sancì la perdita di Québec',
      },
      credit: {
        en: 'Benjamin West, 1770. National Gallery of Canada; photograph via Web Gallery of Art / Wikimedia Commons (public domain)',
        fr: 'Benjamin West, 1770. Musée des beaux-arts du Canada ; photographie via Web Gallery of Art / Wikimedia Commons (domaine public)',
        es: 'Benjamin West, 1770. Galería Nacional de Canadá; fotografía vía Web Gallery of Art / Wikimedia Commons (dominio público)',
        it: 'Benjamin West, 1770. National Gallery of Canada; fotografia via Web Gallery of Art / Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'quebec-city',
    },
    {
      src: '/story/new-france-foundations/louisbourg-fortress.jpg',
      alt: {
        en: 'Louisbourg — captured by British siege in 1758, removing France’s great Atlantic fortress before the fall of Québec',
        fr: 'Louisbourg — prise par siège britannique en 1758, privant la France de sa grande forteresse atlantique avant la chute de Québec',
        es: 'Louisbourg — tomada por el sitio británico en 1758, privando a Francia de su gran fortaleza atlántica antes de la caída de Quebec',
        it: 'Louisbourg — conquistata dall’assedio britannico nel 1758, togliendo alla Francia la grande fortezza atlantica prima della caduta di Québec',
      },
      credit: {
        en: 'Photo: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        fr: 'Photo : Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        es: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
        it: 'Foto: Dennis G. Jarvis (archer10), Wikimedia Commons (CC BY-SA 2.0)',
      },
      placeId: 'louisbourg',
    },
    {
      src: '/story/new-france-foundations/vieux-port-montreal.jpg',
      alt: {
        en: 'Montréal — the last major French stronghold surrendered in 1760; the Treaty of Paris (1763) ended French rule in Canada',
        fr: 'Montréal — la dernière grande place forte française capitula en 1760 ; le traité de Paris (1763) mit fin à la domination française au Canada',
        es: 'Montreal — la última gran plaza fuerte francesa capituló en 1760; el Tratado de París (1763) acabó con el dominio francés en Canadá',
        it: 'Montréal — l’ultima grande roccaforte francese si arrese nel 1760; il trattato di Parigi (1763) pose fine al dominio francese in Canada',
      },
      credit: {
        en: 'Photo: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'montreal',
    },
  ],

  'beat-transatlantic-endurance': [
    {
      src: '/story/guillaume-couture/habitation-quebec.jpg',
      alt: {
        en: 'Habitation de Québec — the colonial layer that outlasted 1763: language, law, and parish life on the St. Lawrence endured',
        fr: 'L’Habitation de Québec — la couche coloniale qui survécut à 1763 : langue, droit et vie paroissiale sur le Saint-Laurent perdurent',
        es: 'La Habitation de Québec — la capa colonial que sobrevivió a 1763: idioma, derecho y vida parroquial en el San Lorenzo perduraron',
        it: 'L’Habitation de Québec — lo strato coloniale che sopravvisse al 1763: lingua, diritto e vita parrocchiale sul San Lorenzo durarono',
      },
      credit: {
        en: 'Samuel de Champlain, c. 1608. Wikimedia Commons (public domain)',
        fr: 'Samuel de Champlain, v. 1608. Wikimedia Commons (domaine public)',
        es: 'Samuel de Champlain, c. 1608. Wikimedia Commons (dominio público)',
        it: 'Samuel de Champlain, c. 1608. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'quebec-city',
    },
    {
      src: '/story/new-france-foundations/vieux-port-montreal.jpg',
      alt: {
        en: 'Old Port of Montréal — French Canadian civic and commercial life continued here under British rule with Norman-rooted surnames',
        fr: 'Vieux-Port de Montréal — la vie civique et commerciale canadienne-française y poursuivit sous la domination britannique, avec des patronymes aux racines normandes',
        es: 'Puerto Viejo de Montreal — la vida cívica y comercial franco-canadiense siguió bajo el dominio británico, con apellidos de raíz normanda',
        it: 'Vecchio Porto di Montréal — la vita civica e commerciale franco-canadese continuò sotto il dominio britannico, con cognomi dalle radici normanne',
      },
      credit: {
        en: 'Photo: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Christophe95, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'montreal',
    },
    {
      src: '/story/guillaume-couture/trois-rivieres.jpg',
      alt: {
        en: 'Trois-Rivières — mid-St. Lawrence towns kept French institutions and family names linking settlers to Norman embarkation ports',
        fr: 'Trois-Rivières — les bourgs du milieu du Saint-Laurent gardèrent institutions françaises et patronymes liant les colons aux ports normands d’embarquement',
        es: 'Trois-Rivières — los pueblos del San Lorenzo medio conservaron instituciones francesas y apellidos que unían a los colonos con los puertos normandos de embarque',
        it: 'Trois-Rivières — le città del medio San Lorenzo mantennero istituzioni francesi e cognomi che legavano i coloni ai porti normanni d’imbarco',
      },
      credit: {
        en: 'John Lambert, 1816. Wikimedia Commons (public domain)',
        fr: 'John Lambert, 1816. Wikimedia Commons (domaine public)',
        es: 'John Lambert, 1816. Wikimedia Commons (dominio público)',
        it: 'John Lambert, 1816. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'trois-rivieres',
    },
  ],

  // ── Neolithic Normandy ────────────────────────────────────────────
  //   - Pierres Pouquelées (Vauville): CC BY-SA 3.0, Thierry74
  //   - Fontenay-le-Marmion tumulus: CC BY-SA 3.0, Hamon jp
  //   - Menhir du Champ-Dolent: CC BY-SA 4.0, Selmoval
  //   - La Hougue Bie (Jersey): public domain, Man vyi
  //   - La Pouquelaye de Faldouet (Jersey): public domain, Man vyi
  //   - Le Déhus (Guernsey): CC BY-SA 3.0, Unukorno

  'beat-neolithic-monuments': [
    {
      src: '/story/neolithic-normandy/la-hougue-bie-jersey.jpg',
      alt: {
        en: 'La Hougue Bie, Jersey — Neolithic passage grave with medieval chapel on mound',
        fr: 'La Hougue Bie, Jersey — tombe à couloir néolithique avec chapelle médiévale sur le tumulus',
        es: 'La Hougue Bie, Jersey — tumba de corredor neolítica con capilla medieval sobre el túmulo',
        it: 'La Hougue Bie, Jersey — tomba a corridoio neolitica con cappella medievale sul tumulo',
      },
      credit: {
        en: 'Photo: Man vyi, Wikimedia Commons (public domain)',
        fr: 'Photo : Man vyi, Wikimedia Commons (domaine public)',
        es: 'Foto: Man vyi, Wikimedia Commons (dominio público)',
        it: 'Foto: Man vyi, Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'hougue-bie',
    },
  ],

  'neo-arc-dolmens': [
    {
      src: '/story/neolithic-normandy/pierres-pouquelees-vauville.jpg',
      alt: {
        en: 'Pierres Pouquelées, Vauville — Neolithic covered gallery on the Cotentin coast',
        fr: 'Pierres Pouquelées, Vauville — allée couverte néolithique sur la côte du Cotentin',
        es: 'Pierres Pouquelées, Vauville — galería cubierta neolítica en la costa del Cotentin',
        it: 'Pierres Pouquelées, Vauville — allée couverte neolitica sulla costa del Cotentin',
      },
      credit: {
        en: 'Photo: Thierry74, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Thierry74, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Thierry74, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Thierry74, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'dolmen-vauville',
    },
  ],

  'neo-arc-channel-islands': [
    {
      src: '/story/neolithic-normandy/la-hougue-bie-jersey.jpg',
      alt: {
        en: 'La Hougue Bie, Jersey — passage grave aligned with the equinox sunrise',
        fr: 'La Hougue Bie, Jersey — tombe à couloir alignée sur le lever du soleil à l\'équinoxe',
        es: 'La Hougue Bie, Jersey — tumba de corredor alineada con el amanecer del equinoccio',
        it: 'La Hougue Bie, Jersey — tomba a corridoio allineata con l\'alba dell\'equinozio',
      },
      credit: {
        en: 'Photo: Man vyi, Wikimedia Commons (public domain)',
        fr: 'Photo : Man vyi, Wikimedia Commons (domaine public)',
        es: 'Foto: Man vyi, Wikimedia Commons (dominio público)',
        it: 'Foto: Man vyi, Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'hougue-bie',
    },
    {
      src: '/story/neolithic-normandy/faldouet-dolmen-jersey.jpg',
      alt: {
        en: 'La Pouquelaye de Faldouet, Jersey — dolmen with massive capstone and double chamber',
        fr: 'La Pouquelaye de Faldouet, Jersey — dolmen avec dalle de couverture massive et double chambre',
        es: 'La Pouquelaye de Faldouet, Jersey — dolmen con losa de cubierta masiva y doble cámara',
        it: 'La Pouquelaye de Faldouet, Jersey — dolmen con lastra di copertura massiccia e doppia camera',
      },
      credit: {
        en: 'Photo: Man vyi, Wikimedia Commons (public domain)',
        fr: 'Photo : Man vyi, Wikimedia Commons (domaine public)',
        es: 'Foto: Man vyi, Wikimedia Commons (dominio público)',
        it: 'Foto: Man vyi, Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'faldouet-dolmen',
    },
    {
      src: '/story/neolithic-normandy/le-dehus-guernsey.jpg',
      alt: {
        en: 'Le Déhus, Guernsey — Neolithic passage grave with carved "Guardian of the Tomb"',
        fr: 'Le Déhus, Guernesey — tombe à couloir néolithique avec le « Gardien du Tombeau » sculpté',
        es: 'Le Déhus, Guernsey — tumba de corredor neolítica con el "Guardián de la Tumba" tallado',
        it: 'Le Déhus, Guernsey — tomba a corridoio neolitica con il "Guardiano della Tomba" scolpito',
      },
      credit: {
        en: 'Photo: Unukorno, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Unukorno, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Unukorno, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Unukorno, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'le-dehus',
    },
  ],

  'neo-arc-fontenay-cluster': [
    {
      src: '/story/neolithic-normandy/fontenay-le-marmion-tumulus.jpg',
      alt: {
        en: 'Tumulus de la Hogue, Fontenay-le-Marmion — Neolithic burial mound on the Caen plain',
        fr: 'Tumulus de la Hogue, Fontenay-le-Marmion — tumulus néolithique sur la plaine de Caen',
        es: 'Túmulo de la Hogue, Fontenay-le-Marmion — túmulo neolítico en la llanura de Caen',
        it: 'Tumulus de la Hogue, Fontenay-le-Marmion — tumulo neolitico sulla pianura di Caen',
      },
      credit: {
        en: 'Photo: Hamon jp, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Hamon jp, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Hamon jp, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Hamon jp, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'megaliths-fontenay',
    },
  ],

  'neo-arc-menhirs': [
    {
      src: '/story/neolithic-normandy/menhir-champ-dolent.jpg',
      alt: {
        en: 'Menhir du Champ-Dolent, Dol-de-Bretagne — 9.5 m standing stone near the Normandy border',
        fr: 'Menhir du Champ-Dolent, Dol-de-Bretagne — pierre dressée de 9,5 m près de la frontière normande',
        es: 'Menhir du Champ-Dolent, Dol-de-Bretagne — piedra erguida de 9,5 m cerca de la frontera normanda',
        it: 'Menhir du Champ-Dolent, Dol-de-Bretagne — pietra eretta di 9,5 m presso il confine normanno',
      },
      credit: {
        en: 'Photo: Selmoval, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Selmoval, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Selmoval, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Selmoval, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'menhir-dol',
    },
  ],

  'neo-arc-first-farmers': [
    {
      src: '/story/neolithic-normandy/neolithic-first-farmers-normandy.jpg',
      alt: {
        en: 'Neolithic farming community clearing forest and tilling soil along a Normandy river terrace, c. 5000 BC',
        fr: 'Communauté agricole néolithique défrichant la forêt et labourant le sol le long d\'une terrasse fluviale normande, v. 5000 av. J.-C.',
        es: 'Comunidad agrícola neolítica desbrozando el bosque y labrando el suelo junto a una terraza fluvial normanda, c. 5000 a. C.',
        it: 'Comunità agricola neolitica che disbosca e dissoda il suolo lungo una terrazza fluviale normanna, c. 5000 a.C.',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [-1.0, 49.2],
    },
  ],

  'neo-arc-allees-couvertes': [
    {
      src: '/story/neolithic-normandy/allee-couverte-bretteville.jpg',
      alt: {
        en: 'Allée couverte at Bretteville-sur-Laize — Neolithic gallery grave on the Calvados limestone plain',
        fr: 'Allée couverte de Bretteville-sur-Laize — sépulture en galerie néolithique sur le plateau calcaire du Calvados',
        es: 'Allée couverte de Bretteville-sur-Laize — galería funeraria neolítica en la meseta calcárea del Calvados',
        it: 'Allée couverte di Bretteville-sur-Laize — galleria funeraria neolitica sul piano calcareo del Calvados',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'allee-couverte-bretteville',
    },
  ],

  'neo-arc-passais': [
    {
      src: '/story/neolithic-normandy/table-du-diable-passais.jpg',
      alt: {
        en: 'Table du Diable, Passais — megalithic dolmen in the bocage country of southern Normandy',
        fr: 'Table du Diable, Passais — dolmen mégalithique dans le bocage du sud de la Normandie',
        es: 'Table du Diable, Passais — dolmen megalítico en el bocage del sur de Normandía',
        it: 'Table du Diable, Passais — dolmen megalitico nel bocage della Normandia meridionale',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'dolmen-passais',
    },
  ],

  'neo-arc-sacred-landscape': [
    {
      src: '/story/neolithic-normandy/pierres-pouquelees-vauville.jpg',
      alt: {
        en: 'Neolithic covered gallery at Vauville — part of the connected sacred landscape of megalithic Normandy',
        fr: 'Allée couverte néolithique à Vauville — partie du paysage sacré connecté de la Normandie mégalithique',
        es: 'Galería cubierta neolítica en Vauville — parte del paisaje sagrado conectado de la Normandía megalítica',
        it: 'Allée couverte neolitica a Vauville — parte del paesaggio sacro connesso della Normandia megalitica',
      },
      credit: {
        en: 'Photo: Thierry74, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Thierry74, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Thierry74, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Thierry74, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'dolmen-vauville',
    },
  ],

  // ── Bronze Age Channel ──────────────────────────────────────────────
  //   - Dover Bronze Age Boat: CC BY 2.0, Jim Linwood (via Flickr)
  //   - Étretat chalk cliffs: CC BY-SA 3.0, Peco~commonswiki

  'beat-bronze-channel': [
    {
      src: '/story/bronze-age-channel/dover-bronze-age-boat.jpg',
      alt: {
        en: 'Dover Bronze Age Boat (~1550 BC) — one of the oldest seagoing vessels ever found, Dover Museum',
        fr: 'Bateau de l\'âge du bronze de Douvres (~1550 av. J.-C.) — l\'un des plus anciens navires de haute mer jamais retrouvés, musée de Douvres',
        es: 'Barco de la Edad del Bronce de Dover (~1550 a. C.) — una de las embarcaciones marítimas más antiguas jamás encontradas, Museo de Dover',
        it: 'Barca dell\'età del bronzo di Dover (~1550 a.C.) — una delle più antiche imbarcazioni d\'alto mare mai rinvenute, Museo di Dover',
      },
      credit: {
        en: 'Photo: Jim Linwood, Wikimedia Commons (CC BY 2.0)',
        fr: 'Photo : Jim Linwood, Wikimedia Commons (CC BY 2.0)',
        es: 'Foto: Jim Linwood, Wikimedia Commons (CC BY 2.0)',
        it: 'Foto: Jim Linwood, Wikimedia Commons (CC BY 2.0)',
      },
      center: [-1.5, 49.8],
    },
  ],

  'bac-arc-channel-highway': [
    {
      src: '/story/bronze-age-channel/channel-bronze-age-crossing.jpg',
      alt: {
        en: 'Bronze Age plank boats crossing the English Channel with cargo of tin and copper, c. 1500 BC',
        fr: 'Bateaux à planches de l\'âge du bronze traversant la Manche avec une cargaison d\'étain et de cuivre, v. 1500 av. J.-C.',
        es: 'Barcas de tablas de la Edad del Bronce cruzando el canal de la Mancha con carga de estaño y cobre, c. 1500 a. C.',
        it: 'Barche a tavoloni dell\'età del bronzo attraversano la Manica con carico di stagno e rame, c. 1500 a.C.',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [-2.0, 49.8],
    },
  ],

  'bac-arc-cornwall-tin': [
    {
      src: '/story/bronze-age-channel/cornwall-tin-source.jpg',
      alt: {
        en: 'Bronze Age tin streaming in Cornwall — workers panning alluvial cassiterite from a moorland stream',
        fr: 'Extraction d\'étain alluvial en Cornouailles à l\'âge du bronze — ouvriers tamisant la cassitérite dans un ruisseau de lande',
        es: 'Extracción aluvial de estaño en Cornualles durante la Edad del Bronce — trabajadores cribando casiterita en un arroyo del páramo',
        it: 'Estrazione di stagno alluvionale in Cornovaglia nell\'età del bronzo — lavoratori che setacciano cassiterite in un ruscello di brughiera',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'cornwall-tin',
    },
  ],

  'bac-arc-cotentin-landing': [
    {
      src: '/story/bronze-age-channel/cotentin-bronze-age-landing.jpg',
      alt: {
        en: 'Bronze Age trading beach on the Cotentin coast — boats unloading tin and copper at a sheltered cove',
        fr: 'Plage de commerce de l\'âge du bronze sur la côte du Cotentin — bateaux déchargeant étain et cuivre dans une crique abritée',
        es: 'Playa de comercio de la Edad del Bronce en la costa del Cotentin — barcas descargando estaño y cobre en una cala resguardada',
        it: 'Spiaggia commerciale dell\'età del bronzo sulla costa del Cotentin — barche che scaricano stagno e rame in un\'insenatura riparata',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'bronze-cotentin-coast',
    },
  ],

  'bac-arc-tin-trade-peak': [
    {
      src: '/story/bronze-age-channel/dover-bronze-age-boat.jpg',
      alt: {
        en: 'Dover Bronze Age Boat — a sewn-plank vessel built for Channel crossings during the peak of the tin trade',
        fr: 'Bateau de Douvres de l\'âge du bronze — vaisseau à planches cousues construit pour les traversées de la Manche à l\'apogée du commerce de l\'étain',
        es: 'Barco de la Edad del Bronce de Dover — embarcación de tablas cosidas construida para cruzar el canal durante el apogeo del comercio del estaño',
        it: 'Barca dell\'età del bronzo di Dover — imbarcazione a tavoloni cuciti costruita per attraversare la Manica all\'apice del commercio dello stagno',
      },
      credit: {
        en: 'Photo: Jim Linwood, Wikimedia Commons (CC BY 2.0)',
        fr: 'Photo : Jim Linwood, Wikimedia Commons (CC BY 2.0)',
        es: 'Foto: Jim Linwood, Wikimedia Commons (CC BY 2.0)',
        it: 'Foto: Jim Linwood, Wikimedia Commons (CC BY 2.0)',
      },
      center: [-1.5, 49.8],
    },
  ],

  'bac-arc-seine-estuary': [
    {
      src: '/story/bronze-age-channel/seine-estuary-bronze-age.jpg',
      alt: {
        en: 'The Seine estuary as a Bronze Age transhipment point — goods transferred from sea craft to river boats',
        fr: 'L\'estuaire de la Seine comme point de transbordement à l\'âge du bronze — marchandises transférées des navires maritimes aux bateaux fluviaux',
        es: 'El estuario del Sena como punto de transbordo en la Edad del Bronce — mercancías transferidas de embarcaciones marítimas a botes fluviales',
        it: 'L\'estuario della Senna come punto di trasbordo nell\'età del bronzo — merci trasferite da imbarcazioni marittime a barche fluviali',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'seine-estuary',
    },
  ],

  'bac-arc-caux-coast': [
    {
      src: '/story/bronze-age-channel/etretat-chalk-cliffs.jpg',
      alt: {
        en: 'Chalk cliffs at Étretat, Pays de Caux — the dramatic coast that served as an eastern Bronze Age trade corridor',
        fr: 'Falaises de craie à Étretat, Pays de Caux — la côte spectaculaire qui servait de corridor commercial oriental à l\'âge du bronze',
        es: 'Acantilados de creta en Étretat, Pays de Caux — la costa espectacular que sirvió como corredor comercial oriental en la Edad del Bronce',
        it: 'Falesie di creta a Étretat, Pays de Caux — la costa spettacolare che fungeva da corridoio commerciale orientale nell\'età del bronzo',
      },
      credit: {
        en: 'Photo: Peco~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Peco~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Peco~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Peco~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'bronze-caux-coast',
    },
  ],

  'bac-arc-iron-horizon': [
    {
      src: '/story/bronze-age-channel/iron-age-horizon.jpg',
      alt: {
        en: 'A coastal smith forging iron beside abandoned bronze-casting molds — the coming of iron transformed the Channel world, c. 800 BC',
        fr: 'Un forgeron côtier façonnant le fer à côté de moules de coulée de bronze abandonnés — l\'arrivée du fer transforma le monde de la Manche, v. 800 av. J.-C.',
        es: 'Un herrero costero forjando hierro junto a moldes de fundición de bronce abandonados — la llegada del hierro transformó el mundo del canal, c. 800 a. C.',
        it: 'Un fabbro costiero forgia il ferro accanto a stampi di fusione del bronzo abbandonati — l\'arrivo del ferro trasformò il mondo della Manica, c. 800 a.C.',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [-1.0, 49.5],
    },
  ],

  // ── Bronze Age cross-era (Neolithic remnant) ──────────────────────

  'bac-arc-neolithic-memory': [
    {
      src: '/story/neolithic-normandy/fontenay-le-marmion-tumulus.jpg',
      alt: {
        en: 'Tumulus de la Hogue — a Neolithic burial mound already ancient when Bronze Age peoples reused its chambers',
        fr: 'Tumulus de la Hogue — un tumulus néolithique déjà ancien lorsque les peuples de l\'âge du bronze réutilisèrent ses chambres',
        es: 'Túmulo de la Hogue — un túmulo neolítico ya antiguo cuando los pueblos de la Edad del Bronce reutilizaron sus cámaras',
        it: 'Tumulus de la Hogue — un tumulo neolitico già antico quando i popoli dell\'età del bronzo ne riutilizzarono le camere',
      },
      credit: {
        en: 'Photo: Hamon jp, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Hamon jp, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Hamon jp, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Hamon jp, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'megaliths-fontenay',
    },
  ],

  // ── Iron Age Gaul ──────────────────────────────────────────────────
  //   - Lillebonne theatre: CC BY-SA 3.0, Urban~commonswiki
  //   - Gallic gold stater: CC BY-SA 2.0, Portable Antiquities Scheme / Trustees of the British Museum
  //   - Vercingetorix surrenders (Lionel Royer, 1899): Public Domain

  'beat-iron-age-tribes': [
    {
      src: '/story/iron-age-gaul/gallic-gold-stater.jpg',
      alt: {
        en: 'Iron Age gold stater of "Gallic War" type (c. 60–50 BC) — coins like this circulated among the tribes of northern Gaul',
        fr: 'Statère d\'or de l\'âge du fer de type « Guerre des Gaules » (v. 60–50 av. J.-C.) — des monnaies comme celle-ci circulaient parmi les tribus du nord de la Gaule',
        es: 'Estátera de oro de la Edad del Hierro de tipo «Guerra de las Galias» (c. 60–50 a. C.) — monedas como esta circulaban entre las tribus del norte de la Galia',
        it: 'Statere d\'oro dell\'età del ferro di tipo «Guerra gallica» (c. 60–50 a.C.) — monete come questa circolavano tra le tribù della Gallia settentrionale',
      },
      credit: {
        en: 'Photo: Portable Antiquities Scheme / Trustees of the British Museum, Wikimedia Commons (CC BY-SA 2.0)',
        fr: 'Photo : Portable Antiquities Scheme / Trustees of the British Museum, Wikimedia Commons (CC BY-SA 2.0)',
        es: 'Foto: Portable Antiquities Scheme / Trustees of the British Museum, Wikimedia Commons (CC BY-SA 2.0)',
        it: 'Foto: Portable Antiquities Scheme / Trustees of the British Museum, Wikimedia Commons (CC BY-SA 2.0)',
      },
      center: [0.0, 49.3],
    },
  ],

  'iag-arc-celtic-dawn': [
    {
      src: '/story/iron-age-gaul/celtic-dawn-gaul.jpg',
      alt: {
        en: 'Celtic ironworkers and warriors establishing settlements in northern Gaul, c. 800 BC — smiths forge iron tools while a palisaded village overlooks the river',
        fr: 'Forgerons et guerriers celtes établissant des colonies dans le nord de la Gaule, v. 800 av. J.-C. — les forgerons façonnent des outils en fer tandis qu\'un village palissadé surplombe la rivière',
        es: 'Herreros y guerreros celtas estableciendo asentamientos en el norte de la Galia, c. 800 a. C. — los herreros forjan herramientas de hierro mientras una aldea empalizada domina el río',
        it: 'Fabbri e guerrieri celti fondano insediamenti nella Gallia settentrionale, c. 800 a.C. — i fabbri forgiano utensili in ferro mentre un villaggio palizzato domina il fiume',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [0.0, 49.3],
    },
  ],

  'iag-arc-veliocasses': [
    {
      src: '/story/iron-age-gaul/veliocasses-rotomagus-oppidum.jpg',
      alt: {
        en: 'The Veliocasses oppidum at Rotomagus (Rouen), c. 500 BC — a fortified hilltop settlement overlooking the Seine with trading boats moored below',
        fr: 'L\'oppidum des Véliocasses à Rotomagus (Rouen), v. 500 av. J.-C. — un habitat fortifié sur les hauteurs surplombant la Seine avec des bateaux de commerce amarrés en contrebas',
        es: 'El oppidum de los Veliocases en Rotomagus (Rouen), c. 500 a. C. — un asentamiento fortificado en la cima de la colina con vistas al Sena y barcas comerciales amarradas abajo',
        it: 'L\'oppidum dei Veliocassi a Rotomagus (Rouen), c. 500 a.C. — un insediamento fortificato sulla collina che domina la Senna con barche commerciali ormeggiate in basso',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'oppidum-rouen',
    },
  ],

  'iag-arc-caletes': [
    {
      src: '/story/iron-age-gaul/theatre-lillebonne.jpg',
      alt: {
        en: 'Roman theatre at Lillebonne (Juliobona) — built on the site of the Caletes\' oppidum, this 1st-century theatre shows how deeply Rome embedded itself in Celtic foundations',
        fr: 'Théâtre romain de Lillebonne (Juliobona) — construit sur le site de l\'oppidum des Calètes, ce théâtre du Ier siècle montre à quel point Rome s\'ancra dans les fondations celtiques',
        es: 'Teatro romano de Lillebonne (Juliobona) — construido sobre el oppidum de los Caletes, este teatro del siglo I muestra cuán profundamente Roma se asentó sobre cimientos celtas',
        it: 'Teatro romano di Lillebonne (Juliobona) — costruito sul sito dell\'oppidum dei Caleti, questo teatro del I secolo mostra quanto profondamente Roma si radicò nelle fondamenta celtiche',
      },
      credit: {
        en: 'Photo: Urban~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Urban~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Urban~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Urban~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'oppidum-lillebonne',
    },
  ],

  'iag-arc-western-tribes': [
    {
      src: '/story/iron-age-gaul/western-tribes-cotentin.jpg',
      alt: {
        en: 'The Unelli and Abrincates on the Cotentin coast, c. 400 BC — Celtic warriors guard a coastal headland settlement with fishing boats on the beach below',
        fr: 'Les Unelles et les Abrincates sur la côte du Cotentin, v. 400 av. J.-C. — des guerriers celtes gardent un habitat de promontoire côtier avec des bateaux de pêche sur la plage en contrebas',
        es: 'Los Unelli y Abrincates en la costa del Cotentin, c. 400 a. C. — guerreros celtas custodian un asentamiento en un promontorio costero con barcas de pesca en la playa',
        it: 'Gli Unelli e gli Abrincati sulla costa del Cotentin, c. 400 a.C. — guerrieri celti sorvegliano un insediamento sul promontorio costiero con barche da pesca sulla spiaggia sottostante',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'cosedia-coutances',
    },
  ],

  'iag-arc-seine-corridor': [
    {
      src: '/story/iron-age-gaul/seine-celtic-trade-corridor.jpg',
      alt: {
        en: 'The Seine as a Celtic trade highway, c. 350 BC — flat-bottomed boats carry tin, grain, and wine through the river valley past hilltop oppida',
        fr: 'La Seine comme autoroute commerciale celte, v. 350 av. J.-C. — des bateaux à fond plat transportent étain, grain et vin à travers la vallée fluviale devant les oppida perchés',
        es: 'El Sena como autopista comercial celta, c. 350 a. C. — barcas de fondo plano transportan estaño, grano y vino por el valle fluvial frente a los oppida en las colinas',
        it: 'La Senna come autostrada commerciale celtica, c. 350 a.C. — barche a fondo piatto trasportano stagno, grano e vino attraverso la valle fluviale davanti agli oppida sulle alture',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  'iag-arc-oppida': [
    {
      src: '/story/iron-age-gaul/gaulish-oppidum-hilltop.jpg',
      alt: {
        en: 'A Gaulish oppidum — a fortified proto-city on a hilltop, c. 300 BC, with workshops, granaries, a mint, and a sacred precinct enclosed by a murus gallicus',
        fr: 'Un oppidum gaulois — une proto-cité fortifiée sur une hauteur, v. 300 av. J.-C., avec ateliers, greniers, atelier monétaire et enceinte sacrée protégés par un murus gallicus',
        es: 'Un oppidum galo — una protociudad fortificada en la cima de una colina, c. 300 a. C., con talleres, graneros, ceca y recinto sagrado rodeados por un murus gallicus',
        it: 'Un oppidum gallico — una proto-città fortificata sulla cima di una collina, c. 300 a.C., con officine, granai, zecca e recinto sacro racchiusi da un murus gallicus',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'oppidum-rouen',
    },
  ],

  'iag-arc-resistance': [
    {
      src: '/story/iron-age-gaul/vercingetorix-surrender.jpg',
      alt: {
        en: 'Vercingetorix Throws Down His Arms at the Feet of Julius Caesar — Lionel Royer, 1899. The defeat of the Gallic coalition marked the end of Celtic independence',
        fr: 'Vercingétorix jette ses armes aux pieds de Jules César — Lionel Royer, 1899. La défaite de la coalition gauloise marqua la fin de l\'indépendance celtique',
        es: 'Vercingétorix arroja sus armas a los pies de Julio César — Lionel Royer, 1899. La derrota de la coalición gala marcó el fin de la independencia celta',
        it: 'Vercingetorige getta le armi ai piedi di Giulio Cesare — Lionel Royer, 1899. La sconfitta della coalizione gallica segnò la fine dell\'indipendenza celtica',
      },
      credit: {
        en: 'Lionel Royer (1852–1926), Public Domain, via Wikimedia Commons',
        fr: 'Lionel Royer (1852–1926), Domaine public, via Wikimedia Commons',
        es: 'Lionel Royer (1852–1926), Dominio público, vía Wikimedia Commons',
        it: 'Lionel Royer (1852–1926), Pubblico dominio, via Wikimedia Commons',
      },
      center: [-0.5, 49.2],
    },
  ],

  'iag-arc-eve-of-rome': [
    {
      src: '/story/iron-age-gaul/eve-of-rome-gaul.jpg',
      alt: {
        en: 'On the eve of Roman conquest, c. 52 BC — Celtic chieftains watch from their oppidum ramparts as Roman legions march through the valley below',
        fr: 'À la veille de la conquête romaine, v. 52 av. J.-C. — des chefs celtes observent depuis les remparts de leur oppidum les légions romaines marchant dans la vallée en contrebas',
        es: 'En vísperas de la conquista romana, c. 52 a. C. — jefes celtas observan desde las murallas de su oppidum a las legiones romanas marchando por el valle',
        it: 'Alla vigilia della conquista romana, c. 52 a.C. — capi celti osservano dalle mura del loro oppidum le legioni romane in marcia nella valle sottostante',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [0.0, 49.2],
    },
  ],

  // ── Roman Gaul ─────────────────────────────────────────────────────
  //   - Pilier des Nautes: CC BY-SA 3.0, Brodigny
  //   - Gallo-Roman ship (Laténium): CC BY-SA 2.0 FR, Rama
  //   - Lillebonne theatre (reused from iron-age-gaul): CC BY-SA 3.0, Urban~commonswiki

  'beat-roman-bridge': [
    {
      src: '/story/roman-gaul/pilier-des-nautes.jpg',
      alt: {
        en: 'Pillar of the Boatmen (Pilier des Nautes), 1st century AD — the oldest monument in Paris, erected by Seine boatmen and dedicated to Jupiter under Tiberius',
        fr: 'Pilier des Nautes, Ier siècle apr. J.-C. — le plus ancien monument de Paris, érigé par les bateliers de la Seine et dédié à Jupiter sous Tibère',
        es: 'Pilar de los Nautas, siglo I d. C. — el monumento más antiguo de París, erigido por los barqueros del Sena y dedicado a Júpiter bajo Tiberio',
        it: 'Pilastro dei Nauti, I secolo d.C. — il più antico monumento di Parigi, eretto dai battellieri della Senna e dedicato a Giove sotto Tiberio',
      },
      credit: {
        en: 'Photo: Brodigny, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Brodigny, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Brodigny, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Brodigny, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'rouen',
    },
  ],

  'rg-arc-caesars-conquest': [
    {
      src: '/story/roman-gaul/caesars-conquest-gaul.jpg',
      alt: {
        en: 'Roman legions storm a Gaulish oppidum, 52 BC — legionaries in testudo formation assault the wooden palisades of a Celtic hilltop fortress',
        fr: 'Les légions romaines assaillent un oppidum gaulois, 52 av. J.-C. — les légionnaires en formation de tortue attaquent les palissades d\'une forteresse celte',
        es: 'Las legiones romanas asaltan un oppidum galo, 52 a. C. — legionarios en formación de tortuga atacan las empalizadas de una fortaleza celta',
        it: 'Le legioni romane assaltano un oppidum gallico, 52 a.C. — legionari in formazione a testuggine attaccano le palizzate di una fortezza celtica',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [0.5, 49.2],
    },
  ],

  'rg-arc-civitates': [
    {
      src: '/story/roman-gaul/civitates-transformation.jpg',
      alt: {
        en: 'A Gallo-Roman civitas taking shape, c. 10 BC — Roman engineers build a stone forum alongside remaining Celtic roundhouses as tribal territory becomes a Roman district',
        fr: 'Une civitas gallo-romaine prend forme, v. 10 av. J.-C. — des ingénieurs romains construisent un forum en pierre à côté des huttes celtes restantes tandis que le territoire tribal devient un district romain',
        es: 'Una civitas galorromana toma forma, c. 10 a. C. — ingenieros romanos construyen un foro de piedra junto a las cabañas celtas mientras el territorio tribal se convierte en un distrito romano',
        it: 'Una civitas gallo-romana prende forma, c. 10 a.C. — ingegneri romani costruiscono un foro in pietra accanto alle capanne celtiche rimaste mentre il territorio tribale diventa un distretto romano',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [0.0, 49.2],
    },
  ],

  'rg-arc-rotomagus': [
    {
      src: '/story/roman-gaul/rotomagus-provincial-capital.jpg',
      alt: {
        en: 'Roman Rotomagus (Rouen) at its height, 2nd century AD — a prosperous provincial capital on the Seine with forum, amphitheatre, bathhouse, and river port',
        fr: 'Rotomagus (Rouen) romaine à son apogée, IIe siècle apr. J.-C. — une capitale provinciale prospère sur la Seine avec forum, amphithéâtre, thermes et port fluvial',
        es: 'Rotomagus (Rouen) romana en su apogeo, siglo II d. C. — una próspera capital provincial a orillas del Sena con foro, anfiteatro, termas y puerto fluvial',
        it: 'Rotomagus (Rouen) romana al suo apice, II secolo d.C. — una prospera capitale provinciale sulla Senna con foro, anfiteatro, terme e porto fluviale',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  'rg-arc-seine-artery': [
    {
      src: '/story/roman-gaul/gallo-roman-ship.jpg',
      alt: {
        en: 'Reconstruction of a Gallo-Roman river barge at the Laténium museum — flat-bottomed vessels like this carried grain, wine, and pottery along the Seine under Roman rule',
        fr: 'Reconstitution d\'une barge fluviale gallo-romaine au musée du Laténium — des navires à fond plat comme celui-ci transportaient grain, vin et poterie sur la Seine sous la domination romaine',
        es: 'Reconstrucción de una barcaza fluvial galorromana en el museo Laténium — embarcaciones de fondo plano como esta transportaban grano, vino y cerámica por el Sena bajo el dominio romano',
        it: 'Ricostruzione di una chiatta fluviale gallo-romana al museo Laténium — imbarcazioni a fondo piatto come questa trasportavano grano, vino e ceramica lungo la Senna sotto il dominio romano',
      },
      credit: {
        en: 'Photo: Rama, Wikimedia Commons (CC BY-SA 2.0 FR)',
        fr: 'Photo : Rama, Wikimedia Commons (CC BY-SA 2.0 FR)',
        es: 'Foto: Rama, Wikimedia Commons (CC BY-SA 2.0 FR)',
        it: 'Foto: Rama, Wikimedia Commons (CC BY-SA 2.0 FR)',
      },
      placeId: 'rouen',
    },
  ],

  'rg-arc-provincial-towns': [
    {
      src: '/story/iron-age-gaul/theatre-lillebonne.jpg',
      alt: {
        en: 'Roman theatre at Lillebonne (Juliobona), 1st–3rd century AD — one of the best-preserved Gallo-Roman monuments in Normandy, seating thousands in the heart of the Caletes\' former territory',
        fr: 'Théâtre romain de Lillebonne (Juliobona), Ier–IIIe siècle apr. J.-C. — l\'un des monuments gallo-romains les mieux conservés de Normandie, accueillant des milliers de spectateurs au cœur de l\'ancien territoire des Calètes',
        es: 'Teatro romano de Lillebonne (Juliobona), siglos I–III d. C. — uno de los monumentos galorromanos mejor conservados de Normandía, con capacidad para miles de espectadores en el corazón del antiguo territorio de los Caletes',
        it: 'Teatro romano di Lillebonne (Juliobona), I–III secolo d.C. — uno dei monumenti gallo-romani meglio conservati della Normandia, con migliaia di posti nel cuore dell\'antico territorio dei Caleti',
      },
      credit: {
        en: 'Photo: Urban~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Urban~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Urban~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Urban~commonswiki, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'oppidum-lillebonne',
    },
  ],

  'rg-arc-lugdunensis': [
    {
      src: '/story/roman-gaul/lugdunensis-secunda-province.jpg',
      alt: {
        en: 'Lugdunensis Secunda — a bird\'s-eye view of the Roman province showing roads connecting Rotomagus (Rouen), Juliobona (Lillebonne), and Lutetia (Paris) through the Seine valley',
        fr: 'Lyonnaise seconde — vue aérienne de la province romaine montrant les routes reliant Rotomagus (Rouen), Juliobona (Lillebonne) et Lutèce (Paris) à travers la vallée de la Seine',
        es: 'Lugdunensis Secunda — vista aérea de la provincia romana mostrando las calzadas que conectan Rotomagus (Rouen), Juliobona (Lillebonne) y Lutetia (París) a través del valle del Sena',
        it: 'Lugdunensis Secunda — veduta aerea della provincia romana con le strade che collegano Rotomagus (Rouen), Juliobona (Lillebonne) e Lutetia (Parigi) attraverso la valle della Senna',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  'rg-arc-saxon-shore': [
    {
      src: '/story/roman-gaul/saxon-shore-fort.jpg',
      alt: {
        en: 'A Saxon Shore fort (Litus Saxonicum) on the Channel coast, c. 350 AD — late-Roman soldiers man the walls as Saxon raider ships approach through the mist',
        fr: 'Un fort du Litus Saxonicum sur la côte de la Manche, v. 350 apr. J.-C. — des soldats du Bas-Empire gardent les murs tandis que des navires de pillards saxons approchent dans la brume',
        es: 'Un fuerte del Litus Saxonicum en la costa del canal, c. 350 d. C. — soldados del Bajo Imperio defienden las murallas mientras naves de asaltantes sajones se acercan entre la niebla',
        it: 'Un forte del Litus Saxonicum sulla costa della Manica, c. 350 d.C. — soldati del tardo impero presidiano le mura mentre navi di razziatori sassoni si avvicinano nella nebbia',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [0.5, 49.8],
    },
  ],

  'rg-arc-crumbling-frontier': [
    {
      src: '/story/roman-gaul/empire-withdraws-gaul.jpg',
      alt: {
        en: 'The empire withdraws from northern Gaul, c. 400 AD — the last Roman garrison marches away as a bishop steps in to lead the abandoned city',
        fr: 'L\'empire se retire du nord de la Gaule, v. 400 apr. J.-C. — la dernière garnison romaine s\'éloigne tandis qu\'un évêque prend la tête de la cité abandonnée',
        es: 'El imperio se retira del norte de la Galia, c. 400 d. C. — la última guarnición romana se marcha mientras un obispo asume el liderazgo de la ciudad abandonada',
        it: 'L\'impero si ritira dalla Gallia settentrionale, c. 400 d.C. — l\'ultima guarnigione romana se ne va mentre un vescovo assume la guida della città abbandonata',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [1.0, 49.0],
    },
  ],

  // ── Post-Roman Gaul ────────────────────────────────────────────────
  //   - Baptism of Clovis (Master of Saint Giles, c. 1500): CC0 / Public Domain, National Gallery of Art
  //   - Basilique Saint-Denis facade: CC BY-SA 4.0, Zairon

  'prg-arc-collapse': [
    {
      src: '/story/post-roman-gaul/roman-collapse-gaul.jpg',
      alt: {
        en: 'The collapse of Roman authority in northern Gaul, c. 410 AD — crumbling roads, a broken aqueduct, and abandoned military equipment mark the twilight of empire',
        fr: 'L\'effondrement de l\'autorité romaine dans le nord de la Gaule, v. 410 apr. J.-C. — routes en ruine, aqueduc brisé et équipement militaire abandonné marquent le crépuscule de l\'empire',
        es: 'El colapso de la autoridad romana en el norte de la Galia, c. 410 d. C. — caminos en ruinas, un acueducto roto y equipo militar abandonado marcan el ocaso del imperio',
        it: 'Il crollo dell\'autorità romana nella Gallia settentrionale, c. 410 d.C. — strade in rovina, un acquedotto spezzato e attrezzature militari abbandonate segnano il crepuscolo dell\'impero',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [1.5, 49.0],
    },
  ],

  'prg-arc-gallo-roman-cities': [
    {
      src: '/story/post-roman-gaul/gallo-roman-cities-endure.jpg',
      alt: {
        en: 'A Gallo-Roman city endures, c. 420 AD — a bishop leads civic life within maintained Roman walls as markets continue and Latin inscriptions mark the doorways',
        fr: 'Une cité gallo-romaine perdure, v. 420 apr. J.-C. — un évêque dirige la vie civique à l\'intérieur des murailles romaines entretenues tandis que les marchés continuent et les inscriptions latines marquent les portes',
        es: 'Una ciudad galorromana perdura, c. 420 d. C. — un obispo dirige la vida cívica dentro de murallas romanas mantenidas mientras los mercados continúan y las inscripciones latinas marcan las puertas',
        it: 'Una città gallo-romana resiste, c. 420 d.C. — un vescovo guida la vita civica entro le mura romane mantenute mentre i mercati continuano e le iscrizioni latine adornano le porte',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  'prg-arc-frankish-settlement': [
    {
      src: '/story/post-roman-gaul/frankish-rhine-crossing.jpg',
      alt: {
        en: 'Frankish warbands cross the Rhine into northern Gaul, c. 440 AD — warriors with franciscas and families with livestock migrate across a half-ruined Roman bridge',
        fr: 'Des bandes guerrières franques traversent le Rhin vers le nord de la Gaule, v. 440 apr. J.-C. — guerriers armés de franciscas et familles avec bétail migrent sur un pont romain à demi ruiné',
        es: 'Bandas guerreras francas cruzan el Rin hacia el norte de la Galia, c. 440 d. C. — guerreros con franciscas y familias con ganado migran por un puente romano semiderruido',
        it: 'Bande guerriere franche attraversano il Reno verso la Gallia settentrionale, c. 440 d.C. — guerrieri con francische e famiglie con bestiame migrano su un ponte romano semidistrutto',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'paris',
    },
  ],

  'prg-arc-syagrius': [
    {
      src: '/story/post-roman-gaul/kingdom-of-soissons.jpg',
      alt: {
        en: 'The Kingdom of Soissons under Syagrius, c. 465 AD — the last Roman enclave in Gaul, a walled city still functioning under Roman law while Frankish camps surround it',
        fr: 'Le royaume de Soissons sous Syagrius, v. 465 apr. J.-C. — la dernière enclave romaine en Gaule, une cité fortifiée fonctionnant encore selon le droit romain tandis que les camps francs l\'encerclent',
        es: 'El reino de Soissons bajo Siagrio, c. 465 d. C. — el último enclave romano en la Galia, una ciudad amurallada que aún funciona bajo la ley romana mientras campamentos francos la rodean',
        it: 'Il regno di Soissons sotto Siagrio, c. 465 d.C. — l\'ultima enclave romana in Gallia, una città murata che funziona ancora sotto il diritto romano mentre accampamenti franchi la circondano',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [2.5, 49.2],
    },
  ],

  'prg-arc-clovis-unification': [
    {
      src: '/story/post-roman-gaul/battle-of-soissons.jpg',
      alt: {
        en: 'The Battle of Soissons, 486 AD — the young Frankish king Clovis on horseback leads the charge against the last Roman defenders of Syagrius\'s kingdom',
        fr: 'La bataille de Soissons, 486 apr. J.-C. — le jeune roi franc Clovis à cheval mène la charge contre les derniers défenseurs romains du royaume de Syagrius',
        es: 'La batalla de Soissons, 486 d. C. — el joven rey franco Clodoveo a caballo lidera la carga contra los últimos defensores romanos del reino de Siagrio',
        it: 'La battaglia di Soissons, 486 d.C. — il giovane re franco Clodoveo a cavallo guida la carica contro gli ultimi difensori romani del regno di Siagrio',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [2.0, 49.0],
    },
  ],

  'prg-arc-baptism': [
    {
      src: '/story/post-roman-gaul/baptism-of-clovis.jpg',
      alt: {
        en: 'The Baptism of Clovis — Master of Saint Giles, c. 1500. Clovis is baptised as a Catholic Christian by Bishop Remigius of Reims, c. 496 AD',
        fr: 'Le Baptême de Clovis — Maître de Saint-Gilles, v. 1500. Clovis est baptisé chrétien catholique par l\'évêque Rémi de Reims, v. 496 apr. J.-C.',
        es: 'El Bautismo de Clodoveo — Maestro de Saint-Gilles, c. 1500. Clodoveo es bautizado como cristiano católico por el obispo Remigio de Reims, c. 496 d. C.',
        it: 'Il Battesimo di Clodoveo — Maestro di Saint-Gilles, c. 1500. Clodoveo viene battezzato come cristiano cattolico dal vescovo Remigio di Reims, c. 496 d.C.',
      },
      credit: {
        en: 'Master of Saint Giles (c. 1500), National Gallery of Art, Washington DC (CC0 / Public Domain)',
        fr: 'Maître de Saint-Gilles (v. 1500), National Gallery of Art, Washington DC (CC0 / Domaine public)',
        es: 'Maestro de Saint-Gilles (c. 1500), National Gallery of Art, Washington DC (CC0 / Dominio público)',
        it: 'Maestro di Saint-Gilles (c. 1500), National Gallery of Art, Washington DC (CC0 / Pubblico dominio)',
      },
      placeId: 'paris',
    },
  ],

  'prg-arc-paris-capital': [
    {
      src: '/story/post-roman-gaul/basilique-saint-denis.jpg',
      alt: {
        en: 'Basilique Saint-Denis facade — built on the site where Clovis founded the royal burial church, Saint-Denis became the necropolis of French kings for over a thousand years',
        fr: 'Façade de la Basilique Saint-Denis — construite sur le site où Clovis fonda l\'église funéraire royale, Saint-Denis devint la nécropole des rois de France pendant plus de mille ans',
        es: 'Fachada de la Basílica de Saint-Denis — construida en el sitio donde Clodoveo fundó la iglesia funeraria real, Saint-Denis se convirtió en la necrópolis de los reyes de Francia durante más de mil años',
        it: 'Facciata della Basilica di Saint-Denis — costruita sul sito dove Clodoveo fondò la chiesa funeraria reale, Saint-Denis divenne la necropoli dei re di Francia per oltre mille anni',
      },
      credit: {
        en: 'Photo: Zairon, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Zairon, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Zairon, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Zairon, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'paris',
    },
    {
      src: '/story/post-roman-gaul/frankish-paris-capital.jpg',
      alt: {
        en: 'Frankish Paris on the Île de la Cité, c. 508 AD — Clovis\'s capital on the Seine island, blending Roman stone architecture with new Frankish additions',
        fr: 'Paris franc sur l\'Île de la Cité, v. 508 apr. J.-C. — la capitale de Clovis sur l\'île de la Seine, mêlant l\'architecture romaine en pierre et les ajouts francs',
        es: 'París franco en la Île de la Cité, c. 508 d. C. — la capital de Clodoveo en la isla del Sena, fusionando la arquitectura romana de piedra con nuevas adiciones francas',
        it: 'Parigi franca sull\'Île de la Cité, c. 508 d.C. — la capitale di Clodoveo sull\'isola della Senna, che fonde l\'architettura romana in pietra con nuove aggiunte franche',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'paris',
    },
  ],

  'prg-arc-division': [
    {
      src: '/story/post-roman-gaul/frankish-division-neustria.jpg',
      alt: {
        en: 'The division of the Frankish kingdom, 511 AD — Clovis\'s four sons divide Gaul among themselves, creating Neustria as the western sub-kingdom centred on the Seine',
        fr: 'La division du royaume franc, 511 apr. J.-C. — les quatre fils de Clovis se partagent la Gaule, créant la Neustrie comme sous-royaume occidental centré sur la Seine',
        es: 'La división del reino franco, 511 d. C. — los cuatro hijos de Clodoveo se reparten la Galia, creando Neustria como sub-reino occidental centrado en el Sena',
        it: 'La divisione del regno franco, 511 d.C. — i quattro figli di Clodoveo si spartiscono la Gallia, creando la Neustria come sotto-regno occidentale incentrato sulla Senna',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [1.5, 49.0],
    },
  ],

  // ── Neustria ───────────────────────────────────────────────────────
  //   - Jumièges abbey ruins: CC BY-SA 3.0, JDesplats
  //   - Merovingian tremissis: CC BY 2.0, Portable Antiquities Scheme
  //   - Château des Ducs de Bretagne, Nantes: CC BY-SA 2.0 FR, Yann Chemineau
  //   - Childeric I gold bees (Gallica): public domain (France)

  'beat-neustria': [
    {
      src: '/story/neustria/merovingian-tremissis.jpg',
      alt: {
        en: 'Merovingian gold tremissis (late 6th–7th century) — coinage like this circulated in the Frankish sub-kingdoms that divided post-Roman Gaul',
        fr: 'Tremissis d\'or mérovingien (fin VIe–VIIe siècle) — une monnaie comme celle-ci circulait dans les sous-royaumes francs qui partageaient la Gaule post-romaine',
        es: 'Tremís merovingio de oro (finales del siglo VI–VII) — monedas como esta circulaban en los subreinos francos que dividían la Galia posromana',
        it: 'Tremisse merovingio d\'oro (fine VI–VII secolo) — monete come questa circolavano nei sotto-regni franchi che dividevano la Gallia post-romana',
      },
      credit: {
        en: 'Photo: Portable Antiquities Scheme, Wikimedia Commons (CC BY 2.0)',
        fr: 'Photo : Portable Antiquities Scheme, Wikimedia Commons (CC BY 2.0)',
        es: 'Foto: Portable Antiquities Scheme, Wikimedia Commons (CC BY 2.0)',
        it: 'Foto: Portable Antiquities Scheme, Wikimedia Commons (CC BY 2.0)',
      },
      center: [1.5, 48.8],
    },
  ],

  'neu-arc-birth-of-neustria': [
    {
      src: '/story/neustria/childeric-gold-bees.jpg',
      alt: {
        en: 'Gold bees from the treasure of Childeric I — royal Frankish grave goods from the dynasty that produced Clovis, whose death in 511 split the realm into Neustria and sister kingdoms',
        fr: 'Abeilles en or du trésor de Childéric Ier — parure royale franque de la dynastie qui produisit Clovis, dont la mort en 511 partagea le royaume entre Neustrie et royaumes sœurs',
        es: 'Abejas de oro del tesoro de Childerico I — ajuar real franco de la dinastía que engendró a Clodoveo, cuya muerte en 511 dividió el reino entre Neustria y reinos hermanos',
        it: 'Api d\'oro dal tesoro di Childerico I — corredo reale franco della dinastia che diede Clodoveo, la cui morte nel 511 divise il regno tra Neustria e regni sorelli',
      },
      credit: {
        en: 'Gallica / Bibliothèque nationale de France (public domain)',
        fr: 'Gallica / Bibliothèque nationale de France (domaine public)',
        es: 'Gallica / Bibliothèque nationale de France (dominio público)',
        it: 'Gallica / Bibliothèque nationale de France (pubblico dominio)',
      },
      placeId: 'paris',
    },
    {
      src: '/story/neustria/birth-neustria-511.jpg',
      alt: {
        en: 'The partition of the Frankish realm after Clovis\'s death, 511 AD — scribes mark Neustria on a map of the Seine basin between Paris and Rouen',
        fr: 'Le partage du royaume franc après la mort de Clovis, 511 apr. J.-C. — des scribes inscrivent Neustrie sur une carte du bassin de la Seine entre Paris et Rouen',
        es: 'La partición del reino franco tras la muerte de Clodoveo, 511 d. C. — escribanos marcan Neustria en un mapa de la cuenca del Sena entre París y Rouen',
        it: 'La spartizione del regno franco dopo la morte di Clodoveo, 511 d.C. — scribi segnano la Neustria su una mappa del bacino della Senna tra Parigi e Rouen',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [1.5, 48.8],
    },
  ],

  'neu-arc-paris-rouen-axis': [
    {
      src: '/story/neustria/paris-rouen-seine-axis.jpg',
      alt: {
        en: 'The Seine corridor linking Paris and Rouen, 6th century AD — royal barges and grain boats move tolls and harvests along the spine of Neustrian power',
        fr: 'Le corridor de la Seine reliant Paris et Rouen, VIe siècle apr. J.-C. — barges royales et bateaux de céréales transportent péages et récoltes le long de l\'épine dorsale du pouvoir neustrien',
        es: 'El corredor del Sena entre París y Rouen, siglo VI d. C. — barcazas reales y barcos de grano mueven peajes y cosechas a lo largo del eje del poder de Neustria',
        it: 'Il corridoio della Senna tra Parigi e Rouen, VI secolo d.C. — chiatte reali e imbarcazioni di grano trasportano pedaggi e raccolti lungo la spina dorsale del potere neustrale',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  'neu-arc-neustria-austrasia': [
    {
      src: '/story/neustria/neustria-vs-austrasia.jpg',
      alt: {
        en: 'Neustria and Austrasia at war — rival Frankish armies face each other across the Merovingian heartland, late 6th century',
        fr: 'Neustrie et Austrasie en guerre — armées franques rivales s\'affrontent au cœur du monde mérovingien, fin du VIe siècle',
        es: 'Neustria y Austrasia en guerra — ejércitos francos rivales se enfrentan en el corazón del mundo merovingio, finales del siglo VI',
        it: 'Neustria e Austrasia in guerra — eserciti franchi rivali si affrontano nel cuore del mondo merovingio, fine VI secolo',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [2.0, 49.0],
    },
  ],

  'neu-arc-merovingian-courts': [
    {
      src: '/story/neustria/merovingian-court-roi-faineant.jpg',
      alt: {
        en: 'Merovingian court in 7th-century Neustria — a ceremonial king on the throne while the mayor of the palace wields real power in the shadows of Paris',
        fr: 'Cour mérovingienne en Neustrie au VIIe siècle — un roi de cérémonie sur le trône tandis que le maire du palais exerce le pouvoir réel dans l\'ombre de Paris',
        es: 'Corte merovingia en Neustria del siglo VII — un rey ceremonial en el trono mientras el mayordomo de palacio ejerce el poder real a la sombra de París',
        it: 'Corte merovingia nella Neustria del VII secolo — un re cerimoniale sul trono mentre il maggiordomo di palazzo esercita il potere reale nell\'ombra di Parigi',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'paris',
    },
  ],

  'neu-arc-jumieges': [
    {
      src: '/story/neustria/abbaye-jumieges.jpg',
      alt: {
        en: 'Ruins of Jumièges Abbey on the lower Seine — founded c. 654, one of the richest Merovingian monastic houses before Viking raids',
        fr: 'Ruines de l\'abbaye de Jumièges sur la basse Seine — fondée v. 654, l\'une des maisons monastiques mérovingiennes les plus riches avant les raids vikings',
        es: 'Ruinas de la abadía de Jumièges en el bajo Sena — fundada c. 654, una de las casas monásticas merovingias más ricas antes de las incursiones vikingas',
        it: 'Rovine dell\'abbazia di Jumièges sulla bassa Senna — fondata c. 654, una delle case monastiche merovingie più ricche prima delle incursioni vichinghe',
      },
      credit: {
        en: 'Photo: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'jumieges',
    },
  ],

  'neu-arc-nantes-breton-march': [
    {
      src: '/story/neustria/nantes-chateau-ducs-bretagne.jpg',
      alt: {
        en: 'Château des Ducs de Bretagne, Nantes — fortress at the Loire estuary on Neustria\'s western march toward Brittany',
        fr: 'Château des ducs de Bretagne, Nantes — forteresse à l\'estuaire de la Loire sur la marche occidentale de la Neustrie vers la Bretagne',
        es: 'Castillo de los duques de Bretaña, Nantes — fortaleza en el estuario del Loira en la marca occidental de Neustria hacia Bretaña',
        it: 'Castello dei duchi di Bretagna, Nantes — fortezza all\'estuario della Loira sulla marca occidentale della Neustria verso la Bretagna',
      },
      credit: {
        en: 'Photo: Yann Chemineau, Wikimedia Commons (CC BY-SA 2.0 FR)',
        fr: 'Photo : Yann Chemineau, Wikimedia Commons (CC BY-SA 2.0 FR)',
        es: 'Foto: Yann Chemineau, Wikimedia Commons (CC BY-SA 2.0 FR)',
        it: 'Foto: Yann Chemineau, Wikimedia Commons (CC BY-SA 2.0 FR)',
      },
      placeId: 'nantes',
    },
  ],

  'neu-arc-tertry': [
    {
      src: '/story/neustria/battle-of-tertry-687.jpg',
      alt: {
        en: 'The Battle of Tertry, 687 AD — Pippin of Herstal\'s Austrasians shatter the Neustrian army near Saint-Quentin, shifting power to the future Carolingians',
        fr: 'La bataille de Tertry, 687 apr. J.-C. — les Austrasiens de Pépin de Herstal brisent l\'armée neustrienne près de Saint-Quentin, faisant basculer le pouvoir vers les futurs Carolingiens',
        es: 'La batalla de Tertry, 687 d. C. — los austrasianos de Pippín de Heristal destrozan el ejército neustriano cerca de San Quintín, desplazando el poder hacia los futuros carolingios',
        it: 'La battaglia di Tertry, 687 d.C. — gli austrasiani di Pipino di Herstal annientano l\'esercito neustrale vicino a Saint-Quentin, spostando il potere verso i futuri carolingi',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [3.25, 49.85],
    },
  ],

  'neu-arc-carolingian-dawn': [
    {
      src: '/story/neustria/carolingian-dawn-neustria.jpg',
      alt: {
        en: 'Carolingian dawn over the Seine valley — Pippin the Short\'s dynasty inherits Neustria\'s abbeys, river trade, and Paris–Rouen axis for a new empire',
        fr: 'L\'aube carolingienne sur la vallée de la Seine — la dynastie de Pépin le Bref hérite des abbayes, du commerce fluvial et de l\'axe Paris–Rouen de la Neustrie pour un nouvel empire',
        es: 'El amanecer carolingio sobre el valle del Sena — la dinastía de Pipino el Breve hereda las abadías, el comercio fluvial y el eje París–Rouen de Neustria para un nuevo imperio',
        it: 'L\'alba carolingia sulla valle della Senna — la dinastia di Pipino il Breve eredita abbazie, commercio fluviale e asse Parigi–Rouen della Neustria per un nuovo impero',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [1.2, 49.0],
    },
  ],

  // ── Frankish & Carolingian frontier ─────────────────────────────────
  //   - Charlemagne denier (Mainz): public domain, BnF / Gallica
  //   - Utrecht Psalter: public domain, c. 800
  //   - Raphael, Coronation of Charlemagne: public domain, Vatican
  //   - Jumièges ruins: reused from neustria (CC BY-SA 3.0, JDesplats)

  'beat-carolingian-frontier': [
    {
      src: '/story/frankish-carolingian/carolingian-western-frontier.jpg',
      alt: {
        en: 'Imperial Neustria under the Carolingians — Channel emporia, the Seine corridor to Paris and Rouen, and the Breton march toward Nantes',
        fr: 'Neustrie impériale sous les Carolingiens — emporia de la Manche, corridor de la Seine vers Paris et Rouen, et marche bretonne vers Nantes',
        es: 'Neustria imperial bajo los carolingios — emporios del canal, corredor del Sena hacia París y Rouen, y la marca bretona hacia Nantes',
        it: 'Neustria imperiale sotto i Carolingi — empori della Manica, corridoio della Senna verso Parigi e Rouen e la marca bretone verso Nantes',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [0.0, 49.0],
    },
  ],

  'beat-seine-corridor': [
    {
      src: '/story/neustria/abbaye-jumieges.jpg',
      alt: {
        en: 'Jumièges Abbey on the lower Seine — under the Carolingians, monastic houses like this linked Paris to the Channel and concentrated enormous wealth',
        fr: 'Abbaye de Jumièges sur la basse Seine — sous les Carolingiens, des maisons monastiques comme celle-ci reliaient Paris à la Manche et concentraient d\'énormes richesses',
        es: 'Abadía de Jumièges en el bajo Sena — bajo los carolingios, casas monásticas como esta unían París con el canal y concentraban enormes riquezas',
        it: 'Abbazia di Jumièges sulla bassa Senna — sotto i Carolingi, case monastiche come questa collegavano Parigi alla Manica e concentravano enormi ricchezze',
      },
      credit: {
        en: 'Photo: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'jumieges',
    },
  ],

  'fc-arc-carolingian-rise': [
    {
      src: '/story/frankish-carolingian/pippin-short-carolingian-acclamation.jpg',
      alt: {
        en: 'Pippin the Short acclaimed king in 751 — the last Merovingian yields as the Carolingian dynasty takes the Frankish throne with Church support',
        fr: 'Pépin le Bref acclamé roi en 751 — le dernier Mérovingien cède tandis que la dynastie carolingienne prend le trône franc avec le soutien de l\'Église',
        es: 'Pipino el Breve aclamado rey en 751 — el último merovingio cede mientras la dinastía carolingia toma el trono franco con apoyo de la Iglesia',
        it: 'Pipino il Breve acclamato re nel 751 — l\'ultimo merovingio cede mentre la dinastia carolingia prende il trono franco con il sostegno della Chiesa',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'paris',
    },
  ],

  'fc-arc-charlemagne': [
    {
      src: '/story/frankish-carolingian/raphael-coronation-charlemagne.jpg',
      alt: {
        en: 'The Coronation of Charlemagne — fresco by Raphael and workshop (1516–1517), Vatican, depicting Charlemagne crowned emperor in Rome, 800 AD',
        fr: 'Le Couronnement de Charlemagne — fresque de Raphaël et son atelier (1516–1517), Vatican, représentant Charlemagne couronné empereur à Rome en 800',
        es: 'La Coronación de Carlomagno — fresco de Rafael y taller (1516–1517), Vaticano, que representa a Carlomagno coronado emperador en Roma en 800',
        it: 'L\'incoronazione di Carlo Magno — affresco di Raffaello e bottega (1516–1517), Vaticano, che raffigura Carlo Magno incoronato imperatore a Roma nell\'800',
      },
      credit: {
        en: 'Raphael and workshop, Apostolic Palace, Vatican (public domain)',
        fr: 'Raphaël et atelier, palais apostolique, Vatican (domaine public)',
        es: 'Rafael y taller, Palacio Apostólico, Vaticano (dominio público)',
        it: 'Raffaello e bottega, Palazzo Apostolico, Vaticano (pubblico dominio)',
      },
      center: [2.0, 49.0],
    },
    {
      src: '/story/frankish-carolingian/charlemagne-denier-mayence.jpg',
      alt: {
        en: 'Silver denier of Charlemagne struck at Mainz, 812–814 — inscription KAROLVS IMP AVG; Carolingian coinage linked the Seine ports to a single imperial economy',
        fr: 'Denier d\'argent de Charlemagne frappé à Mayence, 812–814 — inscription KAROLVS IMP AVG ; la monnaie carolingienne reliait les ports de la Seine à une économie impériale unique',
        es: 'Denario de plata de Carlomagno acuñado en Maguncia, 812–814 — inscripción KAROLVS IMP AVG; la moneda carolingia unía los puertos del Sena a una economía imperial única',
        it: 'Denaro d\'argento di Carlo Magno coniato a Magonza, 812–814 — iscrizione KAROLVS IMP AVG; la moneta carolingia collegava i porti della Senna a un\'unica economia imperiale',
      },
      credit: {
        en: 'BnF, Cabinet des Médailles, Gallica (public domain)',
        fr: 'BnF, Cabinet des médailles, Gallica (domaine public)',
        es: 'BnF, Gabinete de Medallas, Gallica (dominio público)',
        it: 'BnF, Gabinetto delle medaglie, Gallica (pubblico dominio)',
      },
      placeId: 'rouen',
    },
  ],

  'fc-arc-seine-abbeys': [
    {
      src: '/story/neustria/abbaye-jumieges.jpg',
      alt: {
        en: 'Jumièges Abbey — one of the richest houses on the lower Seine under Carolingian royal charters, connecting monastic wealth to Rouen and the sea',
        fr: 'Abbaye de Jumièges — l\'une des maisons les plus riches de la basse Seine sous les chartes royales carolingiennes, reliant la richesse monastique à Rouen et à la mer',
        es: 'Abadía de Jumièges — una de las casas más ricas del bajo Sena bajo cartas reales carolingias, uniendo la riqueza monástica con Rouen y el mar',
        it: 'Abbazia di Jumièges — una delle case più ricche della bassa Senna sotto le carte reali carolingie, collegando la ricchezza monastica a Rouen e al mare',
      },
      credit: {
        en: 'Photo: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'jumieges',
    },
    {
      src: '/story/frankish-carolingian/utrecht-psalter-cropped.jpg',
      alt: {
        en: 'Carolingian illumination from the Utrecht Psalter, c. 800 — the kind of scriptoria that flourished along the Seine under imperial and monastic patronage',
        fr: 'Enluminure carolingienne du Psautier d\'Utrecht, v. 800 — le type de scriptoriums qui prospéra le long de la Seine sous le patronage impérial et monastique',
        es: 'Miniatura carolingia del Salterio de Utrecht, c. 800 — el tipo de scriptoria que floreció a lo largo del Sena bajo el patronazgo imperial y monástico',
        it: 'Miniatura carolingia dal Salterio di Utrecht, c. 800 — il tipo di scriptoria che fiorì lungo la Senna sotto il patronato imperiale e monastico',
      },
      credit: {
        en: 'Utrecht Psalter, c. 800, Utrecht University Library (public domain)',
        fr: 'Psautier d\'Utrecht, v. 800, bibliothèque de l\'université d\'Utrecht (domaine public)',
        es: 'Salterio de Utrecht, c. 800, biblioteca de la Universidad de Utrecht (dominio público)',
        it: 'Salterio di Utrecht, c. 800, biblioteca dell\'Università di Utrecht (pubblico dominio)',
      },
      placeId: 'paris',
    },
  ],

  'fc-arc-quentovic-trade': [
    {
      src: '/story/frankish-carolingian/quentovic-emporium.jpg',
      alt: {
        en: 'Quentovic emporium on the Channel coast, c. 815 — Frisian and Anglo-Saxon merchants meet Frankish toll-takers at the empire\'s premier cross-Channel port',
        fr: 'Emporium de Quentovic sur la côte de la Manche, v. 815 — marchands frisons et anglo-saxons rencontrent les percepteurs francs au premier port transmanche de l\'empire',
        es: 'Emporio de Quentovic en la costa del canal, c. 815 — comerciantes frisones y anglosajones se encuentran con los recaudadores francos en el principal puerto transmanche del imperio',
        it: 'Emporio di Quentovic sulla costa della Manica, c. 815 — mercanti frisoni e anglosassoni incontrano i esattori franchi nel principale porto transmanica dell\'impero',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'quentovic',
    },
  ],

  'fc-arc-louis-pious': [
    {
      src: '/story/frankish-carolingian/louis-the-pious-civil-war.jpg',
      alt: {
        en: 'Louis the Pious and the fracturing Carolingian court, 830s — civil wars among his sons drained troops from the Channel and river frontiers',
        fr: 'Louis le Pieux et la cour carolingienne en fragmentation, années 830 — les guerres civiles entre ses fils drainèrent les troupes des frontières de la Manche et des fleuves',
        es: 'Luis el Piadoso y la corte carolingia fracturada, década de 830 — las guerras civiles entre sus hijos vaciaron de tropas las fronteras del canal y los ríos',
        it: 'Lodovico il Pio e la corte carolingia in frantumi, anni 830 — le guerre civili tra i figli prosciugarono le truppe dalle frontiere della Manica e dei fiumi',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [2.0, 49.0],
    },
  ],

  'fc-arc-verdun': [
    {
      src: '/story/frankish-carolingian/treaty-of-verdun-843.jpg',
      alt: {
        en: 'The Treaty of Verdun, 843 — the Carolingian empire partitioned; West Francia, centred on the Seine and Loire, emerged fragile and harder to defend',
        fr: 'Le traité de Verdun, 843 — l\'empire carolingien partagé ; la Francie occidentale, centrée sur la Seine et la Loire, émerge fragile et plus difficile à défendre',
        es: 'El Tratado de Verdún, 843 — el imperio carolingio dividido; la Francia Occidental, centrada en el Sena y el Loira, surgió frágil y más difícil de defender',
        it: 'Il trattato di Verdun, 843 — l\'impero carolingio spartito; la Francia occidentale, incentrata sulla Senna e sulla Loira, emerse fragile e più difficile da difendere',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [5.4, 49.15],
    },
  ],

  'fc-arc-first-raids': [
    {
      src: '/story/frankish-carolingian/first-norse-raids-seine-841.jpg',
      alt: {
        en: 'Norse longships enter the Seine estuary, 841 — Rouen and Jumièges attacked as Carolingian civil war leaves the river undefended',
        fr: 'Drakkars scandinaves dans l\'estuaire de la Seine, 841 — Rouen et Jumièges attaqués tandis que la guerre civile carolingienne laisse le fleuve sans défense',
        es: 'Drakkar escandinavos en el estuario del Sena, 841 — Rouen y Jumièges atacados mientras la guerra civil carolingia deja el río indefenso',
        it: 'Navi vichinghe nell\'estuario della Senna, 841 — Rouen e Jumièges attaccate mentre la guerra civile carolingia lascia il fiume senza difese',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'seine-estuary',
    },
  ],

  'fc-arc-storm-horizon': [
    {
      src: '/story/frankish-carolingian/eve-viking-age-frontier.jpg',
      alt: {
        en: 'On the eve of the Viking Age, 841 — Norse fleets probe every major estuary from Nantes to Quentovic as the Carolingian west faces a storm from the sea',
        fr: 'À la veille de l\'Âge Viking, 841 — les flottes scandinaves sondent chaque grand estuaire de Nantes à Quentovic tandis que l\'Occident carolingien fait face à la tempête venue de la mer',
        es: 'En vísperas de la Era Vikinga, 841 — flotas escandinavas suenan cada gran estuario de Nantes a Quentovic mientras el Occidente carolingio afronta la tormenta desde el mar',
        it: 'Alla vigilia dell\'età vichinga, 841 — flotte scandinave sondano ogni grande estuario da Nantes a Quentovic mentre l\'Occidente carolingio affronta la tempesta dal mare',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [1.0, 50.0],
    },
  ],

  // ── Viking Age (era + arc) ───────────────────────────────────────

  'beat-viking-raids': [
    {
      src: '/story/viking-age/oseberg-ship.jpg',
      alt: {
        en: 'The Oseberg ship (ca. 820 CE) at the Viking Ship Museum, Oslo — a burial longship emblematic of Scandinavian seafaring power in the Viking Age',
        fr: 'Le navire d\'Oseberg (v. 820 apr. J.-C.) au musée des navires vikings d\'Oslo — un longship funéraire emblématique de la puissance maritime scandinave à l\'ère viking',
        es: 'El barco de Oseberg (c. 820 d. C.) en el Museo de Barcos Vikingos de Oslo — un longship funerario emblemático del poder marítimo escandinavo en la era vikinga',
        it: 'La nave di Oseberg (ca. 820 d.C.) al Museo delle navi vichinghe di Oslo — un longship funerario emblematico del potere marittimo scandinavo nell\'età vichinga',
      },
      credit: {
        en: 'Photo: Larry Lamsa, Wikimedia Commons (CC BY 2.0)',
        fr: 'Photo : Larry Lamsa, Wikimedia Commons (CC BY 2.0)',
        es: 'Foto: Larry Lamsa, Wikimedia Commons (CC BY 2.0)',
        it: 'Foto: Larry Lamsa, Wikimedia Commons (CC BY 2.0)',
      },
      placeId: 'seine-estuary',
    },
  ],

  'beat-frankish-weakness': [
    {
      src: '/story/viking-age/lower-seine-contested-frontier.jpg',
      alt: {
        en: 'Reconstruction — the lower Seine as a contested Frankish frontier before the 911 treaty, with Norse fleets and camps along the river corridor',
        fr: 'Reconstitution — la basse Seine comme frontière franque contestée avant le traité de 911, avec flottes et campements scandinaves le long du corridor fluvial',
        es: 'Reconstrucción — el bajo Sena como frontera franca disputada antes del tratado de 911, con flotas y campamentos escandinavos a lo largo del corredor fluvial',
        it: 'Ricostruzione — la bassa Senna come frontiera franca contesa prima del trattato dell\'911, con flotte e accampamenti scandinavi lungo il corridoio fluviale',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  'va-arc-first-raids': [
    {
      src: '/story/frankish-carolingian/first-norse-raids-seine-841.jpg',
      alt: {
        en: '841 — Norse longships in the Seine estuary: the first major raids on Rouen and Jumièges',
        fr: '841 — drakkars scandinaves dans l\'estuaire de la Seine : les premiers grands raids contre Rouen et Jumièges',
        es: '841 — longships escandinavos en el estuario del Sena: las primeras grandes incursiones contra Rouen y Jumièges',
        it: '841 — longship scandinavi nell\'estuario della Senna: le prime grandi scorrerie contro Rouen e Jumièges',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'jumieges',
    },
  ],

  'va-arc-seine-highway': [
    {
      src: '/story/viking-age/viking-winter-camp-seine-islands.jpg',
      alt: {
        en: 'Reconstruction — Viking fleets wintering on Seine river islands in the mid-9th century, using the waterway as a repeat invasion corridor',
        fr: 'Reconstitution — flottes vikings hivernant sur les îles de la Seine au milieu du IXe siècle, utilisant le fleuve comme corridor d\'invasion répété',
        es: 'Reconstrucción — flotas vikingas invernan en islas del Sena a mediados del siglo IX, usando el río como corredor de invasión recurrente',
        it: 'Ricostruzione — flotte vichinghe che svernano sulle isole della Senna a metà IX secolo, usando il fiume come corridoio d\'invasione ripetuto',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'paris',
    },
  ],

  'va-arc-wider-raids': [
    {
      src: '/story/viking-age/viking-raids-loire-rhine-seine.jpg',
      alt: {
        en: 'Reconstruction — Viking longships penetrating the Loire, Seine, and Rhine corridors of Carolingian Francia in the mid-9th century',
        fr: 'Reconstitution — longships vikings pénétrant les corridors de la Loire, de la Seine et du Rhin de la Francie carolingienne au milieu du IXe siècle',
        es: 'Reconstrucción — longships vikingos penetrando los corredores del Loira, Sena y Rin de la Francia carolingia a mediados del siglo IX',
        it: 'Ricostruzione — longship vichinghi che penetrano i corridoi della Loira, della Senna e del Reno nella Francia carolingia a metà IX secolo',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'nantes',
    },
  ],

  'va-arc-siege-of-paris': [
    {
      src: '/story/viking-age/siege-paris-885-schnetz.jpg',
      alt: {
        en: 'Jean-Victor Schnetz (1837) — Count Odo defends Paris against Viking besiegers during the siege of 885–886',
        fr: 'Jean-Victor Schnetz (1837) — le comte Eudes défend Paris contre les assiégeants vikings pendant le siège de 885-886',
        es: 'Jean-Victor Schnetz (1837) — el conde Odon defiende París contra los asediadores vikingos durante el sitio de 885-886',
        it: 'Jean-Victor Schnetz (1837) — il conte Oddone difende Parigi dagli assedianti vichinghi durante l\'assedio dell\'885-886',
      },
      credit: {
        en: 'Jean-Victor Schnetz, Count Eudes defends Paris (1837), public domain. Photo: Giogo, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Jean-Victor Schnetz, Le comte Eudes défend Paris (1837), domaine public. Photo : Giogo, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Jean-Victor Schnetz, El conde Odon defiende París (1837), dominio público. Foto: Giogo, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Jean-Victor Schnetz, Il conte Oddone difende Parigi (1837), pubblico dominio. Foto: Giogo, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'paris',
    },
  ],

  'va-arc-danelaw-england': [
    {
      src: '/story/viking-age/cuerdale-hoard-viking-silver.jpg',
      alt: {
        en: 'Viking hacksilver from the Cuerdale hoard (buried c. 905), British Museum — bullion wealth from the Scandinavian penetration of England',
        fr: 'Argent viking en coupes (trésor de Cuerdale, enfoui v. 905), British Museum — richesse en lingots de la pénétration scandinave en Angleterre',
        es: 'Plata vikinga en trozos del tesoro de Cuerdale (enterrado c. 905), Museo Británico — riqueza en lingotes de la penetración escandinava en Inglaterra',
        it: 'Argento vichingo tagliato dal tesoro di Cuerdale (sepolto ca. 905), British Museum — ricchezza in lingotti della penetrazione scandinava in Inghilterra',
      },
      credit: {
        en: 'Photo: JMiall, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : JMiall, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: JMiall, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: JMiall, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'york-jorvik',
    },
  ],

  'va-arc-norse-gaelic': [
    {
      src: '/story/viking-age/norse-gaelic-maritime-world.jpg',
      alt: {
        en: 'Reconstruction — Norse longships and coastal settlement in the Norse-Gaelic sphere (Scotland, Ireland, Irish Sea), late 9th century',
        fr: 'Reconstitution — drakkars et comptoir côtier dans la sphère norso-gaélique (Écosse, Irlande, mer d\'Irlande), fin du IXe siècle',
        es: 'Reconstrucción — longships y asentamiento costero en el mundo norso-gaélico (Escocia, Irlanda, mar de Irlanda), finales del siglo IX',
        it: 'Ricostruzione — longship e insediamento costiero nella sfera norreno-gaelica (Scozia, Irlanda, mare d\'Irlanda), fine IX secolo',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'dublin',
    },
  ],

  'va-arc-varangian-east': [
    {
      src: '/story/viking-age/varangian-rivers-eastern-trade.jpg',
      alt: {
        en: 'Reconstruction — Swedish Varangians on eastern European rivers, trading toward Kiev and Byzantine markets in the Viking Age',
        fr: 'Reconstitution — Varègues suédois sur les fleuves d\'Europe orientale, commerçant vers Kiev et les marchés byzantins à l\'ère viking',
        es: 'Reconstrucción — varegos suecos en los ríos de Europa oriental, comerciando hacia Kiev y los mercados bizantinos en la era vikinga',
        it: 'Ricostruzione — variaghi svedesi sui fiumi dell\'Europa orientale, verso Kiev e i mercati bizantini nell\'età vichinga',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'kiev',
    },
  ],

  'va-arc-from-raids-to-treaty': [
    {
      src: '/story/viking-age/treaty-saint-clair-epte-911.jpg',
      alt: {
        en: 'Reconstruction — the 911 treaty between Charles the Simple and the Viking leader Rollo at Saint-Clair-sur-Epte, founding the Norman principality',
        fr: 'Reconstitution — le traité de 911 entre Charles le Simple et le chef viking Rollon à Saint-Clair-sur-Epte, fondant la principauté normande',
        es: 'Reconstrucción — el tratado de 911 entre Carlos el Simple y el caudillo vikingo Rollo en Saint-Clair-sur-Epte, que funda el principado normando',
        it: 'Ricostruzione — il trattato dell\'911 tra Carlo il Semplice e il capo vichingo Rollone a Saint-Clair-sur-Epte, che fonda la principaltà normanna',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'saint-clair-sur-epte',
    },
  ],

  // ── Norman origins (era + arcs) ──────────────────────────────────

  'beat-normandy-formation': [
    {
      src: '/story/norman-origins/normandy-hybrid-formation.jpg',
      alt: {
        en: 'Reconstruction — mid-10th-century Normandy: Norse settlers merging with Frankish language, law, and Christianity along the lower Seine',
        fr: 'Reconstitution — Normandie du milieu du Xe siècle : colons scandinaves fusionnant avec la langue, le droit et le christianisme francs le long de la basse Seine',
        es: 'Reconstrucción — Normandía a mediados del siglo X: colonos escandinavos fundiéndose con la lengua, el derecho y el cristianismo francos en el bajo Sena',
        it: 'Ricostruzione — Normandia a metà X secolo: coloni scandinavi che si fondono con lingua, diritto e cristianesimo franchi lungo la bassa Senna',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  'no-arc-treaty': [
    {
      src: '/story/viking-age/treaty-saint-clair-epte-911.jpg',
      alt: {
        en: 'Reconstruction — the 911 Treaty of Saint-Clair-sur-Epte: Charles the Simple grants Rollo the lower Seine, nucleus of the duchy',
        fr: 'Reconstitution — le traité de Saint-Clair-sur-Epte (911) : Charles le Simple concède à Rollon la basse Seine, noyau du duché',
        es: 'Reconstrucción — el Tratado de Saint-Clair-sur-Epte (911): Carlos el Simple concede a Rollo el bajo Sena, núcleo del ducado',
        it: 'Ricostruzione — il trattato di Saint-Clair-sur-Epte (911): Carlo il Semplice concede a Rollone la bassa Senna, nucleo del ducato',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  'no-arc-danish-migration': [
    {
      src: '/story/norman-origins/danish-migration-to-normandy.jpg',
      alt: {
        en: 'Reconstruction — Danish North Sea networks and the Danelaw feeding settlers and traders into early Norman Rouen after 911',
        fr: 'Reconstitution — réseaux danois de la mer du Nord et Danelaw alimentant colons et marchands vers le Rouen normand primitif après 911',
        es: 'Reconstrucción — redes danesas del mar del Norte y el Danelaw aportando colonos y comerciantes al Rouen normando inicial tras el 911',
        it: 'Ricostruzione — reti danesi del Mare del Nord e Danelaw che alimentano coloni e mercanti verso la primigenia Rouen normanna dopo il 911',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'denmark-origin',
    },
  ],

  'no-arc-celtic-sea': [
    {
      src: '/story/viking-age/norse-gaelic-maritime-world.jpg',
      alt: {
        en: 'Reconstruction — Norwegian route via the Celtic Sea to the Cotentin and Channel Islands, parallel to the Danish Seine corridor',
        fr: 'Reconstitution — route norvégienne par la mer Celtique vers le Cotentin et les îles Anglo-Normandes, parallèle au corridor danois de la Seine',
        es: 'Reconstrucción — ruta noruega por el mar Celta hacia el Cotentin y las islas del Canal, paralela al corredor danés del Sena',
        it: 'Ricostruzione — rotta norvegese via mare Celtico verso Cotentin e isole della Manica, parallela al corridoio danese della Senna',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'cotentin-landing',
    },
  ],

  'no-arc-territorial-growth': [
    {
      src: '/story/norman-origins/normandy-territorial-expansion-933.jpg',
      alt: {
        en: 'Reconstruction — westward expansion of the duchy: Bessin (924), Cotentin and Avranchin (933), shaping medieval Normandy',
        fr: 'Reconstitution — expansion vers l\'ouest du duché : Bessin (924), Cotentin et Avranchin (933), formant la Normandie médiévale',
        es: 'Reconstrucción — expansión occidental del ducado: Bessin (924), Cotentin y Avranchin (933), perfilando la Normandía medieval',
        it: 'Ricostruzione — espansione verso ovest del ducato: Bessin (924), Cotentin e Avranchin (933), che danno forma alla Normandia medievale',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'caen',
    },
  ],

  'no-arc-cultural-fusion': [
    {
      src: '/story/norman-origins/abbaye-jumieges-ruins.jpg',
      alt: {
        en: 'Ruins of Jumièges Abbey — sacked in the Viking Age, restored and endowed by Norman dukes as Norse settlers embraced Christianity',
        fr: 'Ruines de l\'abbaye de Jumièges — pillée à l\'ère viking, restaurée et dotée par les ducs normands tandis que les colons scandinaves embrassaient le christianisme',
        es: 'Ruinas de la abadía de Jumièges — saqueada en la era vikinga, restaurada y dotada por los duques normandos al abrazar el cristianismo los colonos escandinavos',
        it: 'Rovine dell\'abbazia di Jumièges — saccheggiata nell\'età vichinga, restaurata e dotata dai duchi normanni mentre i coloni scandinavi abbracciavano il cristianesimo',
      },
      credit: {
        en: 'Photo: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: JDesplats, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'jumieges',
    },
  ],

  'no-arc-wider-viking-world': [
    {
      src: '/story/norman-origins/norman-viking-world-network.jpg',
      alt: {
        en: 'Reconstruction — Normandy as one node in the Viking Age world: Atlantic, British Isles, Rus routes, and the Mediterranean edge',
        fr: 'Reconstitution — la Normandie comme nœud du monde viking : Atlantique, îles britanniques, routes de la Rus et frange méditerranéenne',
        es: 'Reconstrucción — Normandía como nodo del mundo vikingo: Atlántico, islas británicas, rutas de la Rus y franja mediterránea',
        it: 'Ricostruzione — la Normandia come nodo del mondo vichingo: Atlantico, isole britanniche, rotte della Rus e lembo mediterraneo',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [10.0, 55.0],
    },
  ],

  'no-arc-duchy-consolidated': [
    {
      src: '/story/william-conqueror/abbaye-aux-hommes.jpg',
      alt: {
        en: 'Abbaye aux Hommes (Saint-Étienne), Caen — symbol of reform, piety, and ducal power in mid-11th-century Normandy',
        fr: 'Abbaye aux Hommes (Saint-Étienne), Caen — symbole de réforme, de piété et du pouvoir ducal dans la Normandie du milieu du XIe siècle',
        es: 'Abadía de los Hombres (Saint-Étienne), Caen — símbolo de reforma, piedad y poder ducal en la Normandía de mediados del siglo XI',
        it: 'Abbazia degli Uomini (Saint-Étienne), Caen — simbolo di riforma, pietà e potere ducale nella Normandia a metà XI secolo',
      },
      credit: {
        en: 'Photo: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'caen',
    },
  ],

  'no-arc-eve-of-conquest': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-fleet.jpg',
      alt: {
        en: 'Bayeux Tapestry — horses and soldiers board the invasion fleet, evoking the force Duke William assembled on the eve of 1066',
        fr: 'Tapisserie de Bayeux — chevaux et soldats embarquent dans la flotte d\'invasion, évoquant la force que le duc Guillaume rassembla à la veille de 1066',
        es: 'Tapiz de Bayeux — caballos y soldados embarcan en la flota de invasión, evocando la fuerza que el duque Guillermo reunió en vísperas de 1066',
        it: 'Arazzo di Bayeux — cavalli e soldati imbarcano nella flotta d\'invasione, evocando la forza che il duca Guglielmo radunò alla vigilia del 1066',
      },
      credit: {
        en: 'Bayeux Tapestry. Wikimedia Commons (public domain)',
        fr: 'Tapisserie de Bayeux. Wikimedia Commons (domaine public)',
        es: 'Tapiz de Bayeux. Wikimedia Commons (dominio público)',
        it: 'Arazzo di Bayeux. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'rouen',
    },
  ],

  'rollo-treaty-epte': [
    {
      src: '/story/viking-age/treaty-saint-clair-epte-911.jpg',
      alt: {
        en: 'Reconstruction — Rollo and Charles the Simple at Saint-Clair-sur-Epte (911): baptismal fealty, defence of the Seine, and the birth of Normandy',
        fr: 'Reconstitution — Rollon et Charles le Simple à Saint-Clair-sur-Epte (911) : foi baptismale, défense de la Seine et naissance de la Normandie',
        es: 'Reconstrucción — Rollo y Carlos el Simple en Saint-Clair-sur-Epte (911): homenaje bautismal, defensa del Sena y nacimiento de Normandía',
        it: 'Ricostruzione — Rollone e Carlo il Semplice a Saint-Clair-sur-Epte (911): fedeltà battesimale, difesa della Senna e nascita della Normandia',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'saint-clair-sur-epte',
    },
  ],

  'rollo-baptism-rouen': [
    {
      src: '/story/norman-origins/rollo-baptism-rouen.jpg',
      alt: {
        en: 'Reconstruction — baptism of Rollo at Rouen after 911, taking the name Robert and signalling rule through Frankish institutions',
        fr: 'Reconstitution — baptême de Rollon à Rouen après 911, prenant le nom de Robert et annonçant un gouvernement par les institutions franques',
        es: 'Reconstrucción — bautismo de Rollo en Rouen tras el 911, con el nombre Roberto, señal de gobierno por las instituciones francas',
        it: 'Ricostruzione — battesimo di Rollone a Rouen dopo il 911, con il nome Roberto, segno di governo tramite le istituzioni franche',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  'rollo-consolidation': [
    {
      src: '/story/norman-origins/rollo-consolidation-seine.jpg',
      alt: {
        en: 'Reconstruction — Rollo consolidates the lower Seine in the 910s–920s: land grants, restored churches, Norse–Frankish settlement',
        fr: 'Reconstitution — Rollon consolide la basse Seine dans les années 910-920 : concessions, églises restaurées, peuplement norro-franc',
        es: 'Reconstrucción — Rollo consolida el bajo Sena en la década de 910-920: concesiones, iglesias restauradas, asentamiento noro-franco',
        it: 'Ricostruzione — Rollone consolida la bassa Senna negli anni 910-920: concessioni, chiese restaurate, insediamento norreno-franco',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'seine-estuary',
    },
  ],

  'rollo-death-succession': [
    {
      src: '/story/norman-origins/rollo-death-rouen-dynasty.jpg',
      alt: {
        en: 'Reconstruction — death of Rollo at Rouen c. 928 and succession by William Longsword, seed of the future Norman dynasty',
        fr: 'Reconstitution — mort de Rollon à Rouen v. 928 et succession de Guillaume Longue-Épée, germe de la future dynastie normande',
        es: 'Reconstrucción — muerte de Rollo en Rouen hacia 928 y sucesión de Guillermo Espada Larga, germen de la futura dinastía normanda',
        it: 'Ricostruzione — morte di Rollone a Rouen ca. 928 e successione di Guglielmo Spada Lunga, germe della futura dinastia normanna',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  'leif-ch2-edge-of-known': [
    {
      src: '/story/norman-origins/leif-greenland-eastern-settlement.jpg',
      alt: {
        en: 'Reconstruction — Greenland Eastern Settlement in the late 900s: Norse farms between ice and ocean, Leif Erikson\'s harsh cradle',
        fr: 'Reconstitution — l\'Établissement oriental du Groenland à la fin des années 900 : fermes norroises entre glace et océan, berceau austère de Leif Erikson',
        es: 'Reconstrucción — Asentamiento Oriental de Groenlandia a finales del siglo X: granjas noruegas entre hielo y océano, cuna severa de Leif Erikson',
        it: 'Ricostruzione — Insediamento orientale della Groenlandia alla fine del X secolo: fattorie norrene tra ghiaccio e oceano, culla aspra di Leif Erikson',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'greenland',
    },
  ],

  'leif-ch3-crossing': [
    {
      src: '/story/norman-origins/leif-atlantic-crossing-1000.jpg',
      alt: {
        en: 'Reconstruction — Norse ships crossing the open Atlantic c. 1000 from Greenland toward the coasts of North America',
        fr: 'Reconstitution — navires norrois traversant l\'Atlantique ouvert v. 1000 du Groenland vers les côtes d\'Amérique du Nord',
        es: 'Reconstrucción — naves noruegas cruzando el Atlántico abierto hacia el año 1000 desde Groenlandia hacia las costas de América del Norte',
        it: 'Ricostruzione — navi norrene attraversano l\'Atlantico aperto verso il 1000 dalla Groenlandia verso le coste del Nord America',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'greenland',
    },
  ],

  'leif-ch4-vinland': [
    {
      src: '/story/norman-origins/lanse-aux-meadows-longhouse.jpg',
      alt: {
        en: 'Interior of the reconstructed Norse longhouse at L\'Anse aux Meadows, Newfoundland — the only confirmed Norse site in the Americas',
        fr: 'Intérieur de la maison longue norroise reconstituée à L\'Anse aux Meadows, Terre-Neuve — le seul site norrois confirmé en Amérique',
        es: 'Interior de la casa larga noruega reconstruida en L\'Anse aux Meadows, Terranova — el único yacimiento noruego confirmado en América',
        it: 'Interno della lunga casa norrena ricostruita a L\'Anse aux Meadows, Terranova — l\'unico sito norreno confermato nelle Americhe',
      },
      credit: {
        en: 'Photo: D. Gordon E. Robertson, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : D. Gordon E. Robertson, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: D. Gordon E. Robertson, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: D. Gordon E. Robertson, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'vinland',
    },
  ],

  'leif-ch5-failure': [
    {
      src: '/story/norman-origins/leif-vinland-withdrawal-tension.jpg',
      alt: {
        en: 'Reconstruction — why Vinland failed: vast distance, thin supply lines, and tension with Indigenous peoples ended Norse settlement within a decade',
        fr: 'Reconstitution — pourquoi le Vinland échoua : distance immense, lignes d\'approvisionnement fragiles et tensions avec les peuples autochtones mirent fin à l\'établissement norrois en une décennie',
        es: 'Reconstrucción — por qué fracasó Vinlandia: gran distancia, líneas de suministro débiles y tensión con los pueblos indígenas acabaron con el asentamiento noruego en una década',
        it: 'Ricostruzione — perché il Vinland fallì: distanza enorme, linee di rifornimento deboli e tensioni con i popoli indigeni misero fine all\'insediamento norreno in un decennio',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'vinland',
    },
  ],

  'leif-ch6-forgotten': [
    {
      src: '/story/norman-origins/flateyjarbok-manuscript.jpg',
      alt: {
        en: 'Flateyjarbók (c. 1390) — Icelandic compilation preserving sagas of Greenland, Vinland, and the Norse Atlantic',
        fr: 'Flateyjarbók (v. 1390) — compilation islandaise préservant les sagas du Groenland, du Vinland et de l\'Atlantique norrois',
        es: 'Flateyjarbók (c. 1390) — compilación islandesa que conserva sagas de Groenlandia, Vinlandia y el Atlántico noruego',
        it: 'Flateyjarbók (ca. 1390) — compilazione islandese che conserva saghe della Groenlandia, del Vinland e dell\'Atlantico norreno',
      },
      credit: {
        en: 'Flateyjarbók illumination (c. 1390). Wikimedia Commons (public domain)',
        fr: 'Enluminure de la Flateyjarbók (v. 1390). Wikimedia Commons (domaine public)',
        es: 'Miniatura de la Flateyjarbók (c. 1390). Wikimedia Commons (dominio público)',
        it: 'Miniatura della Flateyjarbók (ca. 1390). Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'iceland',
    },
  ],

  'leif-ch7-bridge-normans': [
    {
      src: '/story/norman-origins/leif-bridge-norse-norman-parallel.jpg',
      alt: {
        en: 'Reconstruction — c. 1000: Norse Greenland and Vinland beside a transforming Normandy — shared ancestry, diverging French and Atlantic paths',
        fr: 'Reconstitution — v. 1000 : Groenland et Vinland norrois à côté d\'une Normandie en transformation — ancêtres communs, voies française et atlantique divergentes',
        es: 'Reconstrucción — hacia el 1000: Groenlandia y Vinlandia noruegos junto a una Normandía en transformación — ancestros comunes, caminos francés y atlántico divergentes',
        it: 'Ricostruzione — verso il 1000: Groenlandia e Vinland norreni accanto a una Normandia in trasformazione — antenati comuni, percorsi francese e atlantico divergenti',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'rouen',
    },
  ],

  // ── Norman expansion (overview arc) ──────────────────────────────

  'ne-arc-duchy-base': [
    {
      src: '/story/william-conqueror/abbaye-aux-hommes.jpg',
      alt: {
        en: 'Abbaye aux Hommes, Caen — symbol of ducal power and reform on the eve of Norman expansion across Europe',
        fr: 'Abbaye aux Hommes, Caen — symbole du pouvoir ducal et de la réforme à la veille de l\'expansion normande en Europe',
        es: 'Abadía de los Hombres, Caen — símbolo del poder ducal y la reforma en vísperas de la expansión normanda por Europa',
        it: 'Abbazia degli Uomini, Caen — simbolo del potere ducale e della riforma alla vigilia dell\'espansione normanna in Europa',
      },
      credit: {
        en: 'Photo: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'caen',
    },
  ],

  'ne-arc-england': [
    {
      src: '/story/william-conqueror/domesday-book.jpg',
      alt: {
        en: 'Domesday Book (1086) — the survey that embodied Anglo-Norman administrative control after the conquest',
        fr: 'Domesday Book (1086) — le recensement qui incarnait le contrôle administratif anglo-normand après la conquête',
        es: 'Domesday Book (1086) — el censo que encarnó el control administrativo anglonormando tras la conquista',
        it: 'Domesday Book (1086) — il censimento che incarnò il controllo amministrativo anglo-normanno dopo la conquista',
      },
      credit: {
        en: 'Domesday Book, Warwickshire. Wikimedia Commons (public domain)',
        fr: 'Domesday Book, Warwickshire. Wikimedia Commons (domaine public)',
        es: 'Domesday Book, Warwickshire. Wikimedia Commons (dominio público)',
        it: 'Domesday Book, Warwickshire. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'london',
    },
  ],

  'ne-arc-southern-italy': [
    {
      src: '/story/norman-expansion/monreale-cathedral.jpg',
      alt: {
        en: 'Monreale Cathedral, Sicily — Norman-Arab-Byzantine fusion architecture of the Hauteville Mediterranean world',
        fr: 'Cathédrale de Monreale, Sicile — architecture fusionnelle normanno-arabo-byzantine du monde méditerranéen des Hauteville',
        es: 'Catedral de Monreale, Sicilia — arquitectura de fusión normanda-árabe-bizantina del mundo mediterráneo de los Hauteville',
        it: 'Cattedrale di Monreale, Sicilia — architettura di fusione normanno-arabo-bizantina del mondo mediterraneo degli Altavilla',
      },
      credit: {
        en: 'Photo: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'palermo',
    },
  ],

  'ne-arc-crusades': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-knights.jpg',
      alt: {
        en: 'Bayeux Tapestry — Norman heavy cavalry, the military template Crusader lords took to Antioch and the Levant',
        fr: 'Tapisserie de Bayeux — cavalerie lourde normande, modèle militaire que les seigneurs croisés portèrent à Antioche et au Levant',
        es: 'Tapiz de Bayeux — caballería pesada normanda, plantilla militar que los señores cruzados llevaron a Antioquía y el Levante',
        it: 'Arazzo di Bayeux — cavalleria pesante normanna, modello militare che i signori crociati portarono ad Antiochia e al Levante',
      },
      credit: {
        en: 'Bayeux Tapestry, scene 51. Photo: Myrabella, Wikimedia Commons (CC0)',
        fr: 'Tapisserie de Bayeux, scène 51. Photo : Myrabella, Wikimedia Commons (CC0)',
        es: 'Tapiz de Bayeux, escena 51. Foto: Myrabella, Wikimedia Commons (CC0)',
        it: 'Arazzo di Bayeux, scena 51. Foto: Myrabella, Wikimedia Commons (CC0)',
      },
      placeId: 'antioch',
    },
  ],

  'ne-arc-periphery': [
    {
      src: '/story/william-conqueror/tower-of-london.jpg',
      alt: {
        en: 'The Tower of London — Anglo-Norman castle-building pushed into Wales and, from the 1160s, across the Irish Sea',
        fr: 'La Tour de Londres — la construction de châteaux anglo-normands poussée au pays de Galles et, dès les années 1160, vers la mer d\'Irlande',
        es: 'La Torre de Londres — la red de castillos anglonormandos extendida a Gales y, desde la década de 1160, al mar de Irlanda',
        it: 'La Torre di Londra — le fortificazioni anglo-normanne spinte nel Galles e, dal 1160, verso il mare d\'Irlanda',
      },
      credit: {
        en: 'Photo: Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'london',
    },
  ],

  'ne-arc-byzantine-africa': [
    {
      src: '/story/norman-expansion/norman-fleet-mahdia-africa.jpg',
      alt: {
        en: 'Reconstruction — Sicilian Norman fleets along the North African shore: the short-lived Kingdom of Africa and Mediterranean reach',
        fr: 'Reconstitution — flottes siciliennes normandes le long du rivage nord-africain : le bref « Royaume d\'Afrique » et la portée méditerranéenne',
        es: 'Reconstrucción — flotas sicilonormandas en la costa norteafricana: el breve «Reino de África» y el alcance mediterráneo',
        it: 'Ricostruzione — flotte siciliane normanne lungo la costa nordafricana: il breve «Regno d\'Africa» e la portata mediterranea',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'mahdia',
    },
  ],

  'ne-arc-legacy': [
    {
      src: '/story/norman-expansion/chateau-gaillard-les-andelys.jpg',
      alt: {
        en: 'Reconstruction — Château Gaillard above the Seine: symbol of Angevin Normandy before Philip Augustus seized the duchy in 1204',
        fr: 'Reconstitution — Château Gaillard surplombant la Seine : symbole de la Normandie angevine avant que Philippe Auguste s\'empare du duché en 1204',
        es: 'Reconstrucción — Château Gaillard sobre el Sena: símbolo de la Normandía angevina antes de que Felipe Augusto tomara el ducado en 1204',
        it: 'Ricostruzione — Château Gaillard sulla Senna: simbolo della Normandia angioina prima che Filippo Augusto conquistasse il ducato nel 1204',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      center: [1.29, 49.14],
    },
  ],

  // ── Roger II arc ─────────────────────────────────────────────────

  'r2-hauteville-arrival': [
    {
      src: '/story/norman-expansion/bari-san-nicola-adriatic.jpg',
      alt: {
        en: 'Reconstruction — Norman mercenary foothold on the Adriatic: Bari and Apulia before the Hautevilles turned to Sicily',
        fr: 'Reconstitution — avant-poste mercenaire normand sur l\'Adriatique : Bari et les Pouilles avant que les Hauteville ne se tournent vers la Sicile',
        es: 'Reconstrucción — pie normando mercenario en el Adriático: Bari y Apulia antes de que los Hauteville volvieran a Sicilia',
        it: 'Ricostruzione — avamposto mercenario normanno sull\'Adriatico: Bari e Puglia prima che gli Altavilla puntassero alla Sicilia',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'bari',
    },
  ],

  'r2-birth-sicily': [
    {
      src: '/story/norman-expansion/messina-strait-norman-ships.jpg',
      alt: {
        en: 'Reconstruction — ships in the Strait of Messina, gateway to Arab-held Sicily where Roger II was born into conquest',
        fr: 'Reconstitution — navires dans le détroit de Messine, porte de la Sicile arabe où naquit Roger II au sein de la conquête',
        es: 'Reconstrucción — naves en el estrecho de Mesina, puerta de la Sicilia árabe donde nació Roger II en plena conquista',
        it: 'Ricostruzione — navi nello stretto di Messina, porta della Sicilia araba dove nacque Ruggero II nel pieno della conquista',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'messina',
    },
  ],

  'r2-mainland-claim': [
    {
      src: '/story/norman-expansion/bari-san-nicola-adriatic.jpg',
      alt: {
        en: 'Reconstruction — Apulian coast and Bari: Roger II\'s bid to unite mainland Norman Italy with Sicily after 1127',
        fr: 'Reconstitution — côte apulienne et Bari : la tentative de Roger II d\'unir l\'Italie normande continentale à la Sicile après 1127',
        es: 'Reconstrucción — costa apulia y Bari: la empresa de Roger II de unir la Italia normanda continental con Sicilia tras 1127',
        it: 'Ricostruzione — costa pugliese e Bari: la mossa di Ruggero II per unire l\'Italia normanna continentale alla Sicilia dopo il 1127',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'bari',
    },
  ],

  'r2-crowned-king': [
    {
      src: '/story/norman-expansion/monreale-cathedral.jpg',
      alt: {
        en: 'Monreale Cathedral — Norman Sicily\'s golden-age architecture around Roger II\'s coronation as king in 1130',
        fr: 'Cathédrale de Monreale — l\'architecture de l\'âge d\'or de la Sicile normande autour du couronnement de Roger II en 1130',
        es: 'Catedral de Monreale — arquitectura del siglo de oro de la Sicilia normanda en torno a la coronación de Roger II en 1130',
        it: 'Cattedrale di Monreale — architettura dell\'età d\'oro della Sicilia normanna intorno all\'incoronazione di Ruggero II nel 1130',
      },
      credit: {
        en: 'Photo: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'palermo',
    },
  ],

  'r2-palermo-capital': [
    {
      src: '/story/norman-expansion/cappella-palatina-palermo.jpg',
      alt: {
        en: 'Interior of the Cappella Palatina, Palermo — Byzantine mosaics, Arabic muqarnas, and Latin liturgy in one Norman royal chapel',
        fr: 'Intérieur de la chapelle Palatine, Palerme — mosaïques byzantines, muqarnas arabes et liturgie latine dans une chapelle royale normande',
        es: 'Interior de la Capilla Palatina, Palermo — mosaicos bizantinos, muqarnas árabes y liturgia latina en una capilla real normanda',
        it: 'Interno della Cappella Palatina, Palermo — mosaici bizantini, muqarnas arabi e liturgia latina in una cappella reale normanna',
      },
      credit: {
        en: 'Photo: Andrea Schaffer, Wikimedia Commons (CC BY 2.0)',
        fr: 'Photo : Andrea Schaffer, Wikimedia Commons (CC BY 2.0)',
        es: 'Foto: Andrea Schaffer, Wikimedia Commons (CC BY 2.0)',
        it: 'Foto: Andrea Schaffer, Wikimedia Commons (CC BY 2.0)',
      },
      placeId: 'palermo',
    },
  ],

  'r2-administration': [
    {
      src: '/story/norman-expansion/cappella-palatina-palermo.jpg',
      alt: {
        en: 'Palermo\'s royal chapel court — emblem of Roger II\'s multilingual chancery, diwān treasury, and codified Assizes of Ariano',
        fr: 'La cour de la chapelle palatine — emblème de la chancellerie multilingue de Roger II, du trésor diwān et des Assises d\'Ariano codifiées',
        es: 'La corte de la capilla palatina — emblema de la cancillería multilingüe de Roger II, el tesoro diwān y las Assizes de Ariano codificadas',
        it: 'La corte della cappella palatina — emblema della cancelleria multilingue di Ruggero II, del tesoro diwān e delle Assise di Ariano codificate',
      },
      credit: {
        en: 'Photo: Andrea Schaffer, Wikimedia Commons (CC BY 2.0)',
        fr: 'Photo : Andrea Schaffer, Wikimedia Commons (CC BY 2.0)',
        es: 'Foto: Andrea Schaffer, Wikimedia Commons (CC BY 2.0)',
        it: 'Foto: Andrea Schaffer, Wikimedia Commons (CC BY 2.0)',
      },
      placeId: 'palermo',
    },
  ],

  'r2-africa-mediterranean': [
    {
      src: '/story/norman-expansion/norman-fleet-mahdia-africa.jpg',
      alt: {
        en: 'Reconstruction — Roger II\'s fleets on the African littoral: Mahdia, Tripoli, and the Norman “Kingdom of Africa”',
        fr: 'Reconstitution — les flottes de Roger II sur le littoral africain : Mahdia, Tripoli et le « Royaume d\'Afrique » normand',
        es: 'Reconstrucción — las flotas de Roger II en el litoral africano: Mahdia, Trípoli y el «Reino de África» normando',
        it: 'Ricostruzione — le flotte di Ruggero II sul litorale africano: Mahdia, Tripoli e il «Regno d\'Africa» normanno',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'mahdia',
    },
  ],

  'r2-al-idrisi': [
    {
      src: '/story/norman-expansion/tabula-rogeriana-style-map.jpg',
      alt: {
        en: 'Reconstruction — al-Idrisi\'s Tabula Rogeriana (1154): Roger II\'s silver world map and geographic encyclopaedia',
        fr: 'Reconstitution — la Tabula Rogeriana d\'al-Idrisi (1154) : carte du monde d\'argent et encyclopédie géographique de Roger II',
        es: 'Reconstrucción — la Tabula Rogeriana de al-Idrisi (1154): mapamundi plateado y enciclopedia geográfica de Roger II',
        it: 'Ricostruzione — la Tabula Rogeriana di al-Idrisi (1154): mappa del mondo d\'argento e enciclopedia geografica di Ruggero II',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'palermo',
    },
  ],

  'r2-death-legacy': [
    {
      src: '/story/norman-expansion/monreale-cathedral.jpg',
      alt: {
        en: 'Monreale Cathedral — legacy of Norman Sicily after Roger II: law, plural administration, and enduring Arab-Norman art',
        fr: 'Cathédrale de Monreale — héritage de la Sicile normande après Roger II : droit, administration plurielle et art arabo-normand durable',
        es: 'Catedral de Monreale — legado de la Sicilia normanda tras Roger II: derecho, administración plural y arte arabo-normando perdurable',
        it: 'Cattedrale di Monreale — eredità della Sicilia normanna dopo Ruggero II: diritto, amministrazione plurale e arte arabo-normanna duratura',
      },
      credit: {
        en: 'Photo: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'cefalu',
    },
  ],

  // ── Robert Guiscard arc ───────────────────────────────────────────

  'rg-hauteville-origins': [
    {
      src: '/story/william-conqueror/falaise-castle.jpg',
      alt: {
        en: 'Château de Falaise — the ducal fortress of Normandy evoking the petty lordships of the Cotentin where Tancred of Hauteville raised twelve sons',
        fr: 'Château de Falaise — la forteresse ducale de Normandie évoquant les petites seigneuries du Cotentin où Tancrède de Hauteville éleva douze fils',
        es: 'Castillo de Falaise — la fortaleza ducal de Normandía que evoca las pequeñas señorías del Cotentin donde Tancredo de Hauteville crió a doce hijos',
        it: 'Castello di Falaise — la fortezza ducale della Normandia che evoca le piccole signorie del Cotentin dove Tancredi d\'Altavilla crebbe dodici figli',
      },
      credit: {
        en: 'Photo: Nitot, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Nitot, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Nitot, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Nitot, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'caen',
    },
  ],

  'rg-arrival-italy': [
    {
      src: '/story/norman-expansion/melfi-castle-apulia.jpg',
      alt: {
        en: 'Reconstruction — Melfi and the Apulian interior where Robert Guiscard built his war-band in the 1040s–1050s',
        fr: 'Reconstitution — Melfi et l\'intérieur des Pouilles où Robert Guiscard forma sa bande armée dans les années 1040-1050',
        es: 'Reconstrucción — Melfi y el interior de Apulia donde Roberto Guiscardo forjó su banda armada en las décadas de 1040-1050',
        it: 'Ricostruzione — Melfi e l\'entroterra pugliese dove Roberto il Guiscardo costruì la sua banda armata negli anni 1040-1050',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'melfi',
    },
  ],

  'rg-papal-alliance': [
    {
      src: '/story/norman-expansion/melfi-castle-apulia.jpg',
      alt: {
        en: 'Reconstruction — Melfi (1059): Nicholas II invests Robert as duke, turning a Norman brigand into a papal vassal',
        fr: 'Reconstitution — Melfi (1059) : Nicolas II investit Robert comme duc, transformant un brigand normand en vassal pontifical',
        es: 'Reconstrucción — Melfi (1059): Nicolás II inviste a Roberto como duque, convirtiendo a un bandolero normando en vasallo papal',
        it: 'Ricostruzione — Melfi (1059): Niccolò II investe Roberto come duca, trasformando un brigante normanno in vassallo papale',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'melfi',
    },
  ],

  'rg-fall-of-bari': [
    {
      src: '/story/norman-expansion/bari-san-nicola-adriatic.jpg',
      alt: {
        en: 'Reconstruction — Bari after 1071: end of Byzantine Italy and Robert Guiscard\'s Adriatic capital',
        fr: 'Reconstitution — Bari après 1071 : fin de l\'Italie byzantine et capitale adriatique de Robert Guiscard',
        es: 'Reconstrucción — Bari tras 1071: fin de la Italia bizantina y capital adriática de Roberto Guiscardo',
        it: 'Ricostruzione — Bari dopo il 1071: fine dell\'Italia bizantina e capitale adriatica di Roberto il Guiscardo',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'bari',
    },
  ],

  'rg-sicily-campaign': [
    {
      src: '/story/norman-expansion/messina-strait-norman-ships.jpg',
      alt: {
        en: 'Reconstruction — Messina and the Sicilian campaign: Robert and Roger\'s bridgehead into Arab Sicily (1061–1091)',
        fr: 'Reconstitution — Messine et la campagne de Sicile : tête de pont de Robert et Roger dans la Sicile arabe (1061-1091)',
        es: 'Reconstrucción — Mesina y la campaña de Sicilia: cabeza de puente de Roberto y Rogelio en la Sicilia árabe (1061-1091)',
        it: 'Ricostruzione — Messina e la campagna di Sicilia: testa di ponte di Roberto e Ruggero nella Sicilia araba (1061-1091)',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'messina',
    },
  ],

  'rg-salerno-capital': [
    {
      src: '/story/norman-expansion/salerno-medieval-cityscape.jpg',
      alt: {
        en: 'Reconstruction — Salerno as Robert Guiscard\'s capital after 1076: Lombard medical school under Norman rule',
        fr: 'Reconstitution — Salerne comme capitale de Robert Guiscard après 1076 : l\'école de médecine lombarde sous le régime normand',
        es: 'Reconstrucción — Salerno como capital de Roberto Guiscardo tras 1076: la escuela médica lombarda bajo dominio normando',
        it: 'Ricostruzione — Salerno capitale di Roberto il Guiscardo dopo il 1076: la scuola medica longobarda sotto il dominio normanno',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'salerno',
    },
  ],

  'rg-durazzo-campaign': [
    {
      src: '/story/norman-expansion/durazzo-adriatic-roman-heritage.jpg',
      alt: {
        en: 'Reconstruction — Durazzo (Dyrrachium), 1081: Robert Guiscard\'s Norman cavalry shatters the Byzantine line on the Via Egnatia',
        fr: 'Reconstitution — Durazzo (Dyrrachium), 1081 : la cavalerie normande de Robert Guiscard brise la ligne byzantine sur la Via Egnatia',
        es: 'Reconstrucción — Durazzo (Dirraquio), 1081: la caballería normanda de Roberto Guiscardo rompe la línea bizantina en la Vía Egnatia',
        it: 'Ricostruzione — Durazzo (Dyrrachium), 1081: la cavalleria normanna di Roberto il Guiscardo spezza la linea bizantina sulla Via Egnatia',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'durazzo',
    },
  ],

  'rg-rome-rescue': [
    {
      src: '/story/norman-expansion/castel-santangelo-rome.jpg',
      alt: {
        en: 'Castel Sant\'Angelo, Rome — where Gregory VII was besieged in 1084 before Robert Guiscard\'s Norman army rescued, then sacked, the city',
        fr: 'Château Saint-Ange, Rome — où Grégoire VII fut assiégé en 1084 avant que l\'armée normande de Robert Guiscard ne délivre puis mette Rome à sac',
        es: 'Castel Sant\'Angelo, Roma — donde Gregorio VII fue asediado en 1084 antes de que el ejército normando de Roberto Guiscardo rescatara y saqueara la ciudad',
        it: 'Castel Sant\'Angelo, Roma — dove Gregorio VII fu assediato nel 1084 prima che l\'esercito normanno di Roberto il Guiscardo liberasse e saccheggiasse la città',
      },
      credit: {
        en: 'Photo: Adrian104, Wikimedia Commons (public domain)',
        fr: 'Photo : Adrian104, Wikimedia Commons (domaine public)',
        es: 'Foto: Adrian104, Wikimedia Commons (dominio público)',
        it: 'Foto: Adrian104, Wikimedia Commons (pubblico dominio)',
      },
      center: [12.466, 41.902],
    },
  ],

  'rg-death-legacy': [
    {
      src: '/story/norman-expansion/monreale-cathedral.jpg',
      alt: {
        en: 'Monreale — symbol of the Hauteville Mediterranean: from Apulia to Sicily, Robert Guiscard\'s line reshaped the medieval map',
        fr: 'Monreale — symbole de la Méditerranée des Hauteville : des Pouilles à la Sicile, la lignée de Robert Guiscard redessina la carte médiévale',
        es: 'Monreale — símbolo del Mediterráneo de los Hauteville: de Apulia a Sicilia, la línea de Roberto Guiscardo redibujó el mapa medieval',
        it: 'Monreale — simbolo del Mediterraneo degli Altavilla: dalla Puglia alla Sicilia, la linea di Roberto il Guiscardo ridisegnò la carta medievale',
      },
      credit: {
        en: 'Photo: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: pjt56, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'palermo',
    },
  ],

  // ── Bohemond of Antioch arc ───────────────────────────────────────

  'boh-guiscard-son': [
    {
      src: '/story/norman-expansion/bari-san-nicola-adriatic.jpg',
      alt: {
        en: 'Reconstruction — Apulian harbours where Bohemond grew up: son of Robert Guiscard, trained in the wars of southern Italy',
        fr: 'Reconstitution — ports apuliens où grandit Bohémond : fils de Robert Guiscard, formé aux guerres d\'Italie du Sud',
        es: 'Reconstrucción — puertos apulios donde creció Bohemundo: hijo de Roberto Guiscardo, formado en las guerras del sur de Italia',
        it: 'Ricostruzione — porti pugliesi dove crebbe Boemondo: figlio di Roberto il Guiscardo, formato alle guerre dell\'Italia meridionale',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'bari',
    },
  ],

  'boh-italian-wars': [
    {
      src: '/story/norman-expansion/taranto-gulf-norman.jpg',
      alt: {
        en: 'Reconstruction — the heel around Taranto: Bohemond\'s principality before the First Crusade called him east',
        fr: 'Reconstitution — le talon autour de Tarente : la principauté de Bohémond avant que la Première Croisade ne l\'appelle vers l\'Orient',
        es: 'Reconstrucción — el talón en torno a Tarento: el principado de Bohemundo antes de que la Primera Cruzada le llamara al Este',
        it: 'Ricostruzione — il tallone intorno a Taranto: il principato di Boemondo prima che la Prima Crociata lo chiamasse verso Oriente',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'taranto',
    },
  ],

  'boh-crusade-begins': [
    {
      src: '/story/norman-expansion/durazzo-adriatic-roman-heritage.jpg',
      alt: {
        en: 'Reconstruction — Durazzo again in 1096: Bohemond\'s crusaders cross the Adriatic on Robert Guiscard\'s invasion road',
        fr: 'Reconstitution — Durazzo à nouveau en 1096 : les croisés de Bohémond traversent l\'Adriatique sur la route d\'invasion de Robert Guiscard',
        es: 'Reconstrucción — Durazzo de nuevo en 1096: los cruzados de Bohemundo cruzan el Adriático por la ruta de invasión de Roberto Guiscardo',
        it: 'Ricostruzione — Durazzo di nuovo nel 1096: i crociati di Boemondo attraversano l\'Adriatico sulla via d\'invasione di Roberto il Guiscardo',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'durazzo',
    },
  ],

  'boh-constantinople-oath': [
    {
      src: '/story/norman-expansion/hagia-sophia-istanbul.jpg',
      alt: {
        en: 'Hagia Sophia, Constantinople — where Alexios Komnenos extracted oaths from Crusader princes, including Bohemond, in 1097',
        fr: 'Sainte-Sophie, Constantinople — où Alexis Comnène arracha des serments aux princes croisés, dont Bohémond, en 1097',
        es: 'Santa Sofía, Constantinopla — donde Alejo Comneno extrajo juramentos a los príncipes cruzados, entre ellos Bohemundo, en 1097',
        it: 'Santa Sofia, Costantinopoli — dove Alessio Comneno strinse giuramenti dai principi crociati, incluso Boemondo, nel 1097',
      },
      credit: {
        en: 'Photo: Arild Vågen, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Arild Vågen, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Arild Vågen, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Arild Vågen, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'constantinople',
    },
  ],

  'boh-dorylaeum-march': [
    {
      src: '/story/norman-expansion/crusade-dorylaeum-1097.jpg',
      alt: {
        en: 'Reconstruction — Crusaders at Dorylaeum (1097): Bohemond\'s vanguard holds the Seljuk ambush until relief arrives',
        fr: 'Reconstitution — Croisés à Dorylée (1097) : l\'avant-garde de Bohémond tient l\'embuscade seldjoukide jusqu\'aux renforts',
        es: 'Reconstrucción — Cruzados en Dorylaeum (1097): la vanguardia de Bohemundo aguanta la emboscada selyúcida hasta los refuerzos',
        it: 'Ricostruzione — Crociati a Dorylaeum (1097): l\'avanguardia di Boemondo resiste all\'imboscata selgiuchida fino ai rinforzi',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'dorylaeum',
    },
  ],

  'boh-siege-antioch': [
    {
      src: '/story/norman-expansion/siege-antioch-1098.jpg',
      alt: {
        en: 'Reconstruction — eight-month siege of Antioch (1097–1098): Bohemond\'s Normans take the city through Firouz\'s tower',
        fr: 'Reconstitution — siège d\'Antioche de huit mois (1097-1098) : les Normands de Bohémond prennent la ville par la tour de Firouz',
        es: 'Reconstrucción — sitio de ocho meses de Antioquía (1097-1098): los normandos de Bohemundo toman la ciudad por la torre de Firuz',
        it: 'Ricostruzione — assedio di otto mesi di Antiochia (1097-1098): i normanni di Boemondo prendono la città dalla torre di Firuz',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'antioch',
    },
  ],

  'boh-holy-lance': [
    {
      src: '/story/norman-expansion/holy-lance-sortie-antioch-1098.jpg',
      alt: {
        en: 'Reconstruction — sortie from Antioch (28 June 1098): Bohemond leads the charge after the Holy Lance relic rallies the army',
        fr: 'Reconstitution — sortie d\'Antioche (28 juin 1098) : Bohémond mène la charge après que la relique de la Sainte Lance a rallié l\'armée',
        es: 'Reconstrucción — salida de Antioquía (28 de junio de 1098): Bohemundo lidera la carga tras la reliquia de la Santa Lanza',
        it: 'Ricostruzione — sortita da Antiochia (28 giugno 1098): Boemondo guida la carica dopo che la reliquia della Sacra Lancia rianima l\'esercito',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'antioch',
    },
  ],

  'boh-captivity': [
    {
      src: '/story/norman-expansion/bohemond-captivity-1100s.jpg',
      alt: {
        en: 'Reconstruction — Bohemond captive (1100–1103): Danishmend Turks hold the Prince of Antioch until a vast ransom is paid',
        fr: 'Reconstitution — Bohémond captif (1100-1103) : les Turcs danishmendides retiennent le prince d\'Antioche jusqu\'à une rançon énorme',
        es: 'Reconstrucción — Bohemundo cautivo (1100-1103): los turcos danishméndides retienen al príncipe de Antioquía hasta un enorme rescate',
        it: 'Ricostruzione — Boemondo prigioniero (1100-1103): i turchi danishmend tengono il principe di Antiochia fino a un enorme riscatto',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'antioch',
    },
  ],

  'boh-devol-death': [
    {
      src: '/story/norman-expansion/durazzo-adriatic-roman-heritage.jpg',
      alt: {
        en: 'Reconstruction — failed second siege of Durazzo (1107–1108): Bohemond signs the Treaty of Devol; Antioch becomes a Byzantine fief',
        fr: 'Reconstitution — second siège manqué de Durazzo (1107-1108) : Bohémond signe le traité de Devol ; Antioche devient un fief byzantin',
        es: 'Reconstrucción — segundo sitio fallido de Durazzo (1107-1108): Bohemundo firma el Tratado de Devol; Antioquía queda como feudo bizantino',
        it: 'Ricostruzione — secondo assedio fallito di Durazzo (1107-1108): Boemondo firma il trattato di Devol; Antiochia diventa feudo bizantino',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'durazzo',
    },
  ],

  // ── Age of Exploration ─────────────────────────────────────────────
  //   - Honfleur / Dieppe / Le Havre: Wikimedia Commons (CC BY-SA)
  //   - Gaspé (Point Newport): Wm. Notman & Son, c. 1900 — public domain (McCord Stewart Museum)
  //   - Mid-Atlantic ship: AI reconstruction

  'beat-1': [
    {
      src: '/story/guillaume-couture/rouen-gomboust-1655.jpg',
      alt: {
        en: 'Jacques Gomboust’s 1655 plan of Rouen — the Seine capital linking inland trade to Channel and Atlantic shipping',
        fr: 'Plan de Rouen par Jacques Gomboust, 1655 — la capitale séquanaise reliant le commerce de l’intérieur au trafic transmanche et atlantique',
        es: 'Plano de Ruán de Jacques Gomboust, 1655 — la capital del Sena que une el comercio interior con el tráfico del Canal y el Atlántico',
        it: 'Pianta di Rouen di Jacques Gomboust, 1655 — la capitale sulla Senna che collega il commercio dell’entroterra al traffico della Manica e dell’Atlantico',
      },
      credit: {
        en: 'Jacques Gomboust, 1655. Wikimedia Commons (public domain)',
        fr: 'Jacques Gomboust, 1655. Wikimedia Commons (domaine public)',
        es: 'Jacques Gomboust, 1655. Wikimedia Commons (dominio público)',
        it: 'Jacques Gomboust, 1655. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'rouen',
    },
  ],

  'beat-transatlantic-norman-ports': [
    {
      src: '/story/age-of-exploration/dieppe-port.jpg',
      alt: {
        en: 'Dieppe harbour — a Channel ferry port that long anchored cross-Channel trade before Norman voyages pivoted toward the Atlantic',
        fr: 'Le port de Dieppe — plaque tournante de la Manche qui a longtemps soutenu le commerce transmanche avant que les voyages normands ne se tournent vers l’Atlantique',
        es: 'Puerto de Dieppe — nudo del Canal de la Mancha que sostuvo durante siglos el comercio transmanche antes de que las expediciones normandas miraran al Atlántico',
        it: 'Porto di Dieppe — snodo della Manica che per secoli ha sostenuto il commercio transmanica prima che le spedizioni normanne puntassero sull’Atlantico',
      },
      credit: {
        en: 'Photo: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'dieppe',
    },
    {
      src: '/story/age-of-exploration/honfleur-port.jpg',
      alt: {
        en: 'Honfleur’s Vieux Bassin — a Norman harbour where deep-sea craft and fishermen tied the Seine estuary to the open Atlantic',
        fr: 'Le Vieux Bassin d’Honfleur — un port normand où navires de haute mer et pêcheurs liaient l’estuaire de la Seine au large atlantique',
        es: 'El Vieux Bassin de Honfleur — un puerto normando donde barcos de altura y pescadores unían el estuario del Sena con el Atlántico abierto',
        it: 'Il Vieux Bassin di Honfleur — porto normanno dove navi d’altura e pescatori collegavano l’estuario della Senna all’Atlantico aperto',
      },
      credit: {
        en: 'Photo: Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Gzzz, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'honfleur',
    },
    {
      src: '/story/age-of-exploration/le-havre-bassin-manche.jpg',
      alt: {
        en: 'Le Havre’s Bassin de la Manche — modern docks on the same estuary that became France’s great Atlantic outlet after the 16th century',
        fr: 'Le bassin de la Manche au Havre — des quais modernes sur le même estuaire qui devint le grand débouché atlantique de la France après le XVIe siècle',
        es: 'El bassin de la Manche en el puerto de El Havre — muelles modernos en el mismo estuario que se convirtió en el gran enlace atlántico de Francia tras el siglo XVI',
        it: 'Il bacino della Manica a Le Havre — banchine moderne sullo stesso estuario che divenne la grande porta atlantica della Francia dopo il XVI secolo',
      },
      credit: {
        en: 'Photo: Raimond Spekking, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Raimond Spekking, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Raimond Spekking, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Raimond Spekking, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'le-havre',
    },
    {
      src: '/story/guillaume-couture/rouen-gomboust-1655.jpg',
      alt: {
        en: 'Plan of Rouen, 1655 — merchant houses on the lower Seine financed and outfitted transoceanic voyages from Norman and Breton ports',
        fr: 'Plan de Rouen, 1655 — les maisons marchandes de la basse Seine finançaient et équipaient les voyages transocéaniques depuis les ports normands et bretons',
        es: 'Plano de Ruán, 1655 — las casas mercantes del bajo Sena financiaban y equipaban viajes transoceánicos desde puertos normandos y bretones',
        it: 'Pianta di Rouen, 1655 — le case mercantili della bassa Senna finanziavano e equipaggiavano viaggi transoceanici dai porti normanni e bretoni',
      },
      credit: {
        en: 'Jacques Gomboust, 1655. Wikimedia Commons (public domain)',
        fr: 'Jacques Gomboust, 1655. Wikimedia Commons (domaine public)',
        es: 'Jacques Gomboust, 1655. Wikimedia Commons (dominio público)',
        it: 'Jacques Gomboust, 1655. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'rouen',
    },
  ],

  'beat-transatlantic-crossing': [
    {
      src: '/story/age-of-exploration/dieppe-port.jpg',
      alt: {
        en: 'Dieppe — in 1524 Giovanni da Verrazzano’s expedition for the French crown sailed from this Channel port toward North America',
        fr: 'Dieppe — en 1524, l’expédition de Giovanni da Verrazzano pour la couronne française partit de ce port de la Manche vers l’Amérique du Nord',
        es: 'Dieppe — en 1524 la expedición de Giovanni da Verrazzano para la corona francesa zarpó de este puerto de la Mancha hacia América del Norte',
        it: 'Dieppe — nel 1524 la spedizione di Giovanni da Verrazzano per la corona francese salpò da questo porto della Manica verso il Nord America',
      },
      credit: {
        en: 'Photo: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'dieppe',
    },
    {
      src: '/story/age-of-exploration/atlantic-crossing-16th-century.jpg',
      alt: {
        en: 'Reconstruction — a 16th-century European sailing ship on the open Atlantic, evoking the long ocean crossing from Normandy to North America',
        fr: 'Reconstitution — un voilier européen du XVIe siècle sur l’Atlantique ouvert, évoquant la longue traversée de la Normandie vers l’Amérique du Nord',
        es: 'Reconstrucción — un velero europeo del siglo XVI en el Atlántico abierto, evocando la larga travesía desde Normandía hasta América del Norte',
        it: 'Ricostruzione — una nave a vela europea del XVI secolo sull’Atlantico aperto, che evoca la lunga traversata dalla Normandia al Nord America',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'mid-atlantic-passage',
    },
    {
      src: '/story/age-of-exploration/gaspe-point-newport.jpg',
      alt: {
        en: 'Point Newport, Gaspé Peninsula, Quebec, c. 1900 — the forested headlands Cartier reached in 1534 when French exploration opened the St. Lawrence gateway',
        fr: 'Pointe de Newport, péninsule de la Gaspésie, Québec, v. 1900 — les caps boisés que Cartier atteignit en 1534 quand l’exploration française ouvrit la porte du Saint-Laurent',
        es: 'Punta Newport, península de Gaspé, Quebec, c. 1900 — los cabos boscosos que Cartier alcanzó en 1534 cuando la exploración francesa abrió la puerta del San Lorenzo',
        it: 'Point Newport, penisola della Gaspésia, Quebec, c. 1900 — le punte boscose che Cartier raggiunse nel 1534 quando l’esplorazione francese aprì l’accesso al San Lorenzo',
      },
      credit: {
        en: 'Wm. Notman & Son, c. 1900. McCord Stewart Museum VIEW-3982 (public domain)',
        fr: 'Wm. Notman & Son, v. 1900. Musée McCord Stewart VIEW-3982 (domaine public)',
        es: 'Wm. Notman & Son, c. 1900. Museo McCord Stewart VIEW-3982 (dominio público)',
        it: 'Wm. Notman & Son, c. 1900. McCord Stewart Museum VIEW-3982 (pubblico dominio)',
      },
      placeId: 'gaspe-peninsula',
    },
  ],

  // ── William Iron Arm arc ────────────────────────────────────────
  'wia-cotentin-origins': [
    {
      src: '/story/william-conqueror/falaise-castle.jpg',
      alt: {
        en: 'Château de Falaise — the ducal fortress evoking the petty lordships of the Cotentin where the Hauteville brothers were raised',
        fr: 'Château de Falaise — la forteresse ducale évoquant les petites seigneuries du Cotentin où les frères Hauteville furent élevés',
        es: 'Castillo de Falaise — la fortaleza ducal que evoca las pequeñas señorías del Cotentin donde se criaron los hermanos Hauteville',
        it: 'Castello di Falaise — la fortezza ducale che evoca le piccole signorie del Cotentin dove crebbero i fratelli Altavilla',
      },
      credit: {
        en: 'Photo: Nitot, Wikimedia Commons (CC BY-SA 4.0)',
        fr: 'Photo : Nitot, Wikimedia Commons (CC BY-SA 4.0)',
        es: 'Foto: Nitot, Wikimedia Commons (CC BY-SA 4.0)',
        it: 'Foto: Nitot, Wikimedia Commons (CC BY-SA 4.0)',
      },
      placeId: 'cosedia-coutances',
    },
  ],
  'wia-mercenary-arrival': [
    {
      src: '/story/norman-expansion/bari-san-nicola-adriatic.jpg',
      alt: {
        en: 'Reconstruction — Aversa, the first Norman county in Italy, granted to Rainulf Drengot in 1030',
        fr: 'Reconstitution — Aversa, le premier comté normand en Italie, accordé à Rainulf Drengot en 1030',
        es: 'Reconstrucción — Aversa, el primer condado normando en Italia, concedido a Rainulf Drengot en 1030',
        it: 'Ricostruzione — Aversa, la prima contea normanna in Italia, concessa a Rainulf Drengot nel 1030',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'aversa',
    },
  ],
  'wia-apulian-warfare': [
    {
      src: '/story/norman-expansion/melfi-castle-apulia.jpg',
      alt: {
        en: 'Reconstruction — Melfi and the Apulian highlands, theatre of Norman mercenary warfare in the 1030s–1040s',
        fr: 'Reconstitution — Melfi et les hautes terres des Pouilles, théâtre de la guerre mercenaire normande dans les années 1030-1040',
        es: 'Reconstrucción — Melfi y las tierras altas de Apulia, escenario de la guerra mercenaria normanda en las décadas de 1030-1040',
        it: 'Ricostruzione — Melfi e gli altopiani pugliesi, teatro della guerra mercenaria normanna negli anni 1030-1040',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'melfi',
    },
  ],
  'wia-battle-olivento': [
    {
      src: '/story/norman-expansion/melfi-castle-apulia.jpg',
      alt: {
        en: 'Reconstruction — the Battle of Olivento (1041): William\'s Norman cavalry breaks the Byzantine line',
        fr: 'Reconstitution — la bataille d\'Olivento (1041) : la cavalerie normande de Guillaume brise la ligne byzantine',
        es: 'Reconstrucción — la batalla de Olivento (1041): la caballería normanda de Guillermo rompe la línea bizantina',
        it: 'Ricostruzione — la battaglia di Olivento (1041): la cavalleria normanna di Guglielmo sfonda la linea bizantina',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'melfi',
    },
  ],
  'wia-count-apulia': [
    {
      src: '/story/norman-expansion/melfi-castle-apulia.jpg',
      alt: {
        en: 'Melfi castle — seat of Norman power in Apulia after William Iron Arm was acclaimed count in 1042',
        fr: 'Le château de Melfi — siège du pouvoir normand dans les Pouilles après l\'acclamation de Guillaume Bras-de-Fer comme comte en 1042',
        es: 'Castillo de Melfi — sede del poder normando en Apulia tras la aclamación de Guillermo Brazo de Hierro como conde en 1042',
        it: 'Castello di Melfi — sede del potere normanno in Puglia dopo l\'acclamazione di Guglielmo Braccio di Ferro a conte nel 1042',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'melfi',
    },
  ],
  'wia-death-legacy': [
    {
      src: '/story/norman-expansion/bari-san-nicola-adriatic.jpg',
      alt: {
        en: 'Reconstruction — the Apulian landscape that William Iron Arm won and his brothers would expand into a Mediterranean empire',
        fr: 'Reconstitution — le paysage des Pouilles que Guillaume Bras-de-Fer conquit et que ses frères étendraient en un empire méditerranéen',
        es: 'Reconstrucción — el paisaje de Apulia que Guillermo Brazo de Hierro ganó y que sus hermanos expandirían en un imperio mediterráneo',
        it: 'Ricostruzione — il paesaggio pugliese che Guglielmo Braccio di Ferro conquistò e che i suoi fratelli avrebbero espanso in un impero mediterraneo',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'melfi',
    },
  ],

  // ── Sichelgaita arc ─────────────────────────────────────────────
  'sg-lombard-salerno': [
    {
      src: '/story/norman-expansion/salerno-medieval-cityscape.jpg',
      alt: {
        en: 'Salerno — the Lombard principality where Sichelgaita was born, home to the oldest medical school in Europe',
        fr: 'Salerne — la principauté lombarde où naquit Sichelgaita, siège de la plus ancienne école de médecine d\'Europe',
        es: 'Salerno — el principado lombardo donde nació Sichelgaita, sede de la escuela de medicina más antigua de Europa',
        it: 'Salerno — il principato longobardo dove nacque Sichelgaita, sede della più antica scuola di medicina d\'Europa',
      },
      credit: { en: 'AI-generated reconstruction — no suitable public-domain photograph available', fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible', es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada', it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile' },
      placeId: 'salerno',
    },
  ],
  'sg-marriage-guiscard': [
    {
      src: '/story/norman-expansion/salerno-medieval-cityscape.jpg',
      alt: {
        en: 'Reconstruction — the court at Salerno where Sichelgaita married Robert Guiscard, c. 1058',
        fr: 'Reconstitution — la cour de Salerne où Sichelgaita épousa Robert Guiscard, v. 1058',
        es: 'Reconstrucción — la corte en Salerno donde Sichelgaita se casó con Roberto Guiscardo, c. 1058',
        it: 'Ricostruzione — la corte a Salerno dove Sichelgaita sposò Roberto il Guiscardo, c. 1058',
      },
      credit: { en: 'AI-generated reconstruction — no suitable public-domain photograph available', fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible', es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada', it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile' },
      placeId: 'salerno',
    },
  ],
  'sg-on-campaign': [
    {
      src: '/story/norman-expansion/bari-san-nicola-adriatic.jpg',
      alt: {
        en: 'Reconstruction — Sichelgaita in armour riding at the head of Norman troops in southern Italy',
        fr: 'Reconstitution — Sichelgaita en armure chevauchant en tête des troupes normandes en Italie du Sud',
        es: 'Reconstrucción — Sichelgaita con armadura cabalgando al frente de las tropas normandas en el sur de Italia',
        it: 'Ricostruzione — Sichelgaita in armatura cavalca alla testa delle truppe normanne nell\'Italia meridionale',
      },
      credit: { en: 'AI-generated reconstruction — no suitable public-domain photograph available', fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible', es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada', it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile' },
      placeId: 'bari',
    },
  ],
  'sg-durazzo': [
    {
      src: '/story/norman-expansion/durazzo-adriatic-roman-heritage.jpg',
      alt: {
        en: 'Reconstruction — the Battle of Durazzo (1081): Sichelgaita rallies fleeing Norman troops against the Byzantine Varangian Guard',
        fr: 'Reconstitution — la bataille de Durazzo (1081) : Sichelgaita rallie les troupes normandes en fuite face à la Garde varangienne byzantine',
        es: 'Reconstrucción — la batalla de Durazzo (1081): Sichelgaita reagrupa las tropas normandas en huida frente a la Guardia Varega bizantina',
        it: 'Ricostruzione — la battaglia di Durazzo (1081): Sichelgaita raduna le truppe normanne in fuga contro la Guardia Variaga bizantina',
      },
      credit: { en: 'AI-generated reconstruction — no suitable public-domain photograph available', fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible', es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada', it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile' },
      placeId: 'durazzo',
    },
  ],
  'sg-succession': [
    {
      src: '/story/norman-expansion/salerno-medieval-cityscape.jpg',
      alt: {
        en: 'Salerno — where Sichelgaita secured the succession of her son Roger Borsa over Bohemond after Guiscard\'s death in 1085',
        fr: 'Salerne — où Sichelgaita assura la succession de son fils Roger Borsa sur Bohémond après la mort de Guiscard en 1085',
        es: 'Salerno — donde Sichelgaita aseguró la sucesión de su hijo Roger Borsa sobre Bohemundo tras la muerte de Guiscardo en 1085',
        it: 'Salerno — dove Sichelgaita assicurò la successione del figlio Ruggero Borsa su Boemondo dopo la morte del Guiscardo nel 1085',
      },
      credit: { en: 'AI-generated reconstruction — no suitable public-domain photograph available', fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible', es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada', it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile' },
      placeId: 'salerno',
    },
  ],
  'sg-legacy': [
    {
      src: '/story/norman-expansion/salerno-medieval-cityscape.jpg',
      alt: {
        en: 'Salerno — Sichelgaita\'s city, where one of the medieval world\'s few documented female battlefield commanders lived and died',
        fr: 'Salerne — la ville de Sichelgaita, où l\'une des rares femmes chefs de guerre documentées du monde médiéval vécut et mourut',
        es: 'Salerno — la ciudad de Sichelgaita, donde una de las pocas mujeres comandantes de batalla documentadas del mundo medieval vivió y murió',
        it: 'Salerno — la città di Sichelgaita, dove una delle pochissime donne comandanti in battaglia documentate del mondo medievale visse e morì',
      },
      credit: { en: 'AI-generated reconstruction — no suitable public-domain photograph available', fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible', es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada', it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile' },
      placeId: 'salerno',
    },
  ],

  // ── Odo of Bayeux arc ───────────────────────────────────────────
  'ob-half-brother': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-oath.jpg',
      alt: {
        en: 'Bayeux Cathedral — the Norman see where Odo was installed as bishop around 1049',
        fr: 'La cathédrale de Bayeux — le siège normand où Odon fut installé comme évêque vers 1049',
        es: 'Catedral de Bayeux — la sede normanda donde Odón fue instalado como obispo hacia 1049',
        it: 'Cattedrale di Bayeux — la sede normanna dove Odone fu insediato come vescovo verso il 1049',
      },
      credit: {
        en: 'Bayeux Tapestry, scene 23. Photo: Myrabella, Wikimedia Commons (CC0)',
        fr: 'Tapisserie de Bayeux, scène 23. Photo : Myrabella, Wikimedia Commons (CC0)',
        es: 'Tapiz de Bayeux, escena 23. Foto: Myrabella, Wikimedia Commons (CC0)',
        it: 'Arazzo di Bayeux, scena 23. Foto: Myrabella, Wikimedia Commons (CC0)',
      },
      placeId: 'bayeux',
    },
  ],
  'ob-hastings': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-fleet.jpg',
      alt: {
        en: 'The Bayeux Tapestry — depicting Odo at the Battle of Hastings, mounted, in armour, with a club in his hand',
        fr: 'La Tapisserie de Bayeux — représentant Odon à la bataille de Hastings, monté, en armure, une massue à la main',
        es: 'El Tapiz de Bayeux — que muestra a Odón en la batalla de Hastings, montado, con armadura y una maza en la mano',
        it: 'L\'Arazzo di Bayeux — che raffigura Odone alla battaglia di Hastings, a cavallo, in armatura, con una mazza in mano',
      },
      credit: { en: 'Bayeux Tapestry, 11th century. Wikimedia Commons (public domain)', fr: 'Tapisserie de Bayeux, XIe siècle. Wikimedia Commons (domaine public)', es: 'Tapiz de Bayeux, siglo XI. Wikimedia Commons (dominio público)', it: 'Arazzo di Bayeux, XI sec. Wikimedia Commons (pubblico dominio)' },
      placeId: 'hastings',
    },
  ],
  'ob-earl-kent': [
    {
      src: '/story/william-conqueror/tower-of-london.jpg',
      alt: {
        en: 'Reconstruction — Norman London after 1066: Odo as Earl of Kent controlled Dover and the gateway to the capital',
        fr: 'Reconstitution — Londres normand après 1066 : Odon, comte de Kent, contrôlait Douvres et la porte de la capitale',
        es: 'Reconstrucción — Londres normando después de 1066: Odón como conde de Kent controlaba Dover y la puerta de la capital',
        it: 'Ricostruzione — Londra normanna dopo il 1066: Odone come conte di Kent controllava Dover e la porta della capitale',
      },
      credit: {
        en: 'Photo: Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'london',
    },
  ],
  'ob-regent': [
    {
      src: '/story/william-conqueror/tower-of-london.jpg',
      alt: {
        en: 'Reconstruction — Norman England under Odo\'s regency: castles, forest law, and the Harrying of the North',
        fr: 'Reconstitution — l\'Angleterre normande sous la régence d\'Odon : châteaux, loi forestière et la Dévastation du Nord',
        es: 'Reconstrucción — la Inglaterra normanda bajo la regencia de Odón: castillos, ley forestal y la Devastación del Norte',
        it: 'Ricostruzione — l\'Inghilterra normanna sotto la reggenza di Odone: castelli, legge forestale e la Devastazione del Nord',
      },
      credit: {
        en: 'Photo: Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'london',
    },
  ],
  'ob-tapestry': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-coronation.jpg',
      alt: {
        en: 'The Bayeux Tapestry — 70 metres of embroidered propaganda traditionally attributed to Odo\'s patronage',
        fr: 'La Tapisserie de Bayeux — 70 mètres de propagande brodée traditionnellement attribuée au mécénat d\'Odon',
        es: 'El Tapiz de Bayeux — 70 metros de propaganda bordada tradicionalmente atribuida al mecenazgo de Odón',
        it: 'L\'Arazzo di Bayeux — 70 metri di propaganda ricamata tradizionalmente attribuita al mecenatismo di Odone',
      },
      credit: {
        en: 'Bayeux Tapestry, scenes 29–31. Photo: Myrabella, Wikimedia Commons (CC0)',
        fr: 'Tapisserie de Bayeux, scènes 29–31. Photo : Myrabella, Wikimedia Commons (CC0)',
        es: 'Tapiz de Bayeux, escenas 29–31. Foto: Myrabella, Wikimedia Commons (CC0)',
        it: 'Arazzo di Bayeux, scene 29–31. Foto: Myrabella, Wikimedia Commons (CC0)',
      },
      placeId: 'bayeux',
    },
  ],
  'ob-fall': [
    {
      src: '/story/norman-expansion/cappella-palatina-palermo.jpg',
      alt: {
        en: 'Palermo — where Odo of Bayeux died in 1097 on the First Crusade, ending a life at the intersection of war, religion, and power',
        fr: 'Palerme — où Odon de Bayeux mourut en 1097 lors de la Première Croisade, achevant une vie au croisement de la guerre, de la religion et du pouvoir',
        es: 'Palermo — donde Odón de Bayeux murió en 1097 durante la Primera Cruzada, acabando una vida en la intersección de guerra, religión y poder',
        it: 'Palermo — dove Odone di Bayeux morì nel 1097 durante la Prima Crociata, chiudendo una vita all\'incrocio di guerra, religione e potere',
      },
      credit: {
        en: 'AI-generated reconstruction — no suitable public-domain photograph available',
        fr: 'Reconstitution générée par IA — aucune photographie libre de droits disponible',
        es: 'Reconstrucción generada por IA — no se encontró fotografía de dominio público adecuada',
        it: 'Ricostruzione generata da IA — nessuna fotografia di pubblico dominio disponibile',
      },
      placeId: 'palermo',
    },
  ],

  // ── Hereward the Wake arc ───────────────────────────────────────
  'hw-anglo-saxon-england': [
    {
      src: '/story/william-conqueror/abbaye-aux-hommes.jpg',
      alt: {
        en: 'Reconstruction — Anglo-Saxon England before 1066: a prosperous kingdom of churches, manors, and established law',
        fr: 'Reconstitution — l\'Angleterre anglo-saxonne avant 1066 : un royaume prospère d\'églises, de manoirs et de droit établi',
        es: 'Reconstrucción — la Inglaterra anglosajona antes de 1066: un reino próspero de iglesias, señoríos y derecho establecido',
        it: 'Ricostruzione — l\'Inghilterra anglosassone prima del 1066: un regno prospero di chiese, manieri e diritto consolidato',
      },
      credit: {
        en: 'Photo: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Thomas Hirsch, Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'london',
    },
  ],
  'hw-conquest-dispossession': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-fleet.jpg',
      alt: {
        en: 'The Norman invasion fleet crossing the Channel — 1066, the year that ended Anglo-Saxon England',
        fr: 'La flotte d\'invasion normande traversant la Manche — 1066, l\'année qui mit fin à l\'Angleterre anglo-saxonne',
        es: 'La flota de invasión normanda cruzando el Canal — 1066, el año que puso fin a la Inglaterra anglosajona',
        it: 'La flotta d\'invasione normanna attraversa la Manica — 1066, l\'anno che pose fine all\'Inghilterra anglosassone',
      },
      credit: { en: 'Bayeux Tapestry, 11th century. Wikimedia Commons (public domain)', fr: 'Tapisserie de Bayeux, XIe siècle. Wikimedia Commons (domaine public)', es: 'Tapiz de Bayeux, siglo XI. Wikimedia Commons (dominio público)', it: 'Arazzo di Bayeux, XI sec. Wikimedia Commons (pubblico dominio)' },
      placeId: 'hastings',
    },
  ],
  'hw-return': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-hastings.jpg',
      alt: {
        en: 'Reconstruction — the fenlands of eastern England where Hereward emerged as leader of the English resistance',
        fr: 'Reconstitution — les marécages de l\'est de l\'Angleterre où Hereward émergea comme chef de la résistance anglaise',
        es: 'Reconstrucción — los pantanos del este de Inglaterra donde Hereward emergió como líder de la resistencia inglesa',
        it: 'Ricostruzione — le paludi dell\'Inghilterra orientale dove Hereward emerse come capo della resistenza inglese',
      },
      credit: {
        en: 'Bayeux Tapestry. Wikimedia Commons (public domain)',
        fr: 'Tapisserie de Bayeux. Wikimedia Commons (domaine public)',
        es: 'Tapiz de Bayeux. Wikimedia Commons (dominio público)',
        it: 'Arazzo di Bayeux. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'ely',
    },
  ],
  'hw-fenland-fortress': [
    {
      src: '/story/william-conqueror/tower-of-london.jpg',
      alt: {
        en: 'Reconstruction — the Isle of Ely, a natural fortress of marshes and waterways where English rebels held out against Norman power',
        fr: 'Reconstitution — l\'île d\'Ely, une forteresse naturelle de marais et de voies d\'eau où les rebelles anglais résistèrent au pouvoir normand',
        es: 'Reconstrucción — la isla de Ely, una fortaleza natural de pantanos y vías acuáticas donde los rebeldes ingleses resistieron al poder normando',
        it: 'Ricostruzione — l\'isola di Ely, una fortezza naturale di paludi e corsi d\'acqua dove i ribelli inglesi resistettero al potere normanno',
      },
      credit: {
        en: 'Photo: Wikimedia Commons (CC BY-SA 3.0)',
        fr: 'Photo : Wikimedia Commons (CC BY-SA 3.0)',
        es: 'Foto: Wikimedia Commons (CC BY-SA 3.0)',
        it: 'Foto: Wikimedia Commons (CC BY-SA 3.0)',
      },
      placeId: 'ely',
    },
  ],
  'hw-siege-ely': [
    {
      src: '/story/william-conqueror/harold-death.jpg',
      alt: {
        en: 'Reconstruction — the siege of Ely (1071): William orders a causeway built across the marshes to reach the English garrison',
        fr: 'Reconstitution — le siège d\'Ely (1071) : Guillaume ordonne la construction d\'une chaussée à travers les marais pour atteindre la garnison anglaise',
        es: 'Reconstrucción — el asedio de Ely (1071): Guillermo ordena construir una calzada a través de los pantanos para alcanzar la guarnición inglesa',
        it: 'Ricostruzione — l\'assedio di Ely (1071): Guglielmo ordina la costruzione di una strada rialzata attraverso le paludi per raggiungere la guarnigione inglese',
      },
      credit: {
        en: 'Bayeux Tapestry. Wikimedia Commons (public domain)',
        fr: 'Tapisserie de Bayeux. Wikimedia Commons (domaine public)',
        es: 'Tapiz de Bayeux. Wikimedia Commons (dominio público)',
        it: 'Arazzo di Bayeux. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'ely',
    },
  ],
  'hw-legend': [
    {
      src: '/story/william-conqueror/bayeux-tapestry-hastings.jpg',
      alt: {
        en: 'The fenlands — where Hereward vanished into legend, becoming a proto-Robin Hood of English resistance',
        fr: 'Les marécages — où Hereward disparut dans la légende, devenant un proto-Robin des Bois de la résistance anglaise',
        es: 'Los pantanos — donde Hereward desapareció en la leyenda, convirtiéndose en un proto-Robin Hood de la resistencia inglesa',
        it: 'Le paludi — dove Hereward scomparve nella leggenda, diventando un proto-Robin Hood della resistenza inglese',
      },
      credit: {
        en: 'Bayeux Tapestry. Wikimedia Commons (public domain)',
        fr: 'Tapisserie de Bayeux. Wikimedia Commons (domaine public)',
        es: 'Tapiz de Bayeux. Wikimedia Commons (dominio público)',
        it: 'Arazzo di Bayeux. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'ely',
    },
  ],
  'hw-other-side': [
    {
      src: '/story/william-conqueror/domesday-book.jpg',
      alt: {
        en: 'The Domesday Book (1086) — William\'s survey that recorded the total transfer of English landholding to Norman lords',
        fr: 'Le Domesday Book (1086) — le recensement de Guillaume consignant le transfert total des domaines anglais aux seigneurs normands',
        es: 'El Domesday Book (1086) — el censo de Guillermo que registró la transferencia total de las tierras inglesas a señores normandos',
        it: 'Il Domesday Book (1086) — il censimento di Guglielmo che registrò il trasferimento totale delle terre inglesi ai signori normanni',
      },
      credit: {
        en: 'Domesday Book, Warwickshire. Wikimedia Commons (public domain)',
        fr: 'Domesday Book, Warwickshire. Wikimedia Commons (domaine public)',
        es: 'Domesday Book, Warwickshire. Wikimedia Commons (dominio público)',
        it: 'Domesday Book, Warwickshire. Wikimedia Commons (pubblico dominio)',
      },
      placeId: 'london',
    },
  ],
};
