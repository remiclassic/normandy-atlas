import type { StoryBeatIllustrationSlide } from '@/core/types';

/**
 * Illustration metadata for story beats.
 * Images live under `public/story/<arc>/` and are served as static assets.
 *   - william-conqueror: Bayeux Tapestry (public domain, CC0) + CC BY-SA photos.
 *   - guillaume-couture: 17th–19th-century maps, engravings, and paintings (public domain).
 *   - viking-age: Commons photos and PD painting reproductions + AI where needed.
 *   - norman-origins: Commons (abbey, Vinland, manuscript) + AI reconstructions + reuse of Viking / William assets where apt.
 *
 * Each key maps to a single slide or an array of slides.
 * Slides with placeId / center get their own map pin and gallery anchor.
 */
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
};
