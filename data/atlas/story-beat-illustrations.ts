import type { StoryBeatIllustration } from '@/core/types';

/**
 * Illustration metadata for story beats.
 * Images live under `public/story/<arc>/` and are served as static assets.
 *   - william-conqueror: Bayeux Tapestry (public domain, CC0) + CC BY-SA photos.
 *   - guillaume-couture: 17th–19th-century maps, engravings, and paintings (public domain).
 */
export const STORY_BEAT_ILLUSTRATIONS: Partial<Record<string, StoryBeatIllustration>> = {
  'wc-bastard-birth': {
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
  },

  'wc-dangerous-minority': {
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
  },

  'wc-val-es-dunes': {
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
  },

  'wc-duchy-master': {
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
  },

  'wc-claim-to-england': {
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
  },

  'wc-invasion-fleet': {
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
  },

  'wc-hastings': {
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
  },

  'wc-coronation-conquest': {
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
  },

  'wc-cross-channel-empire': {
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
  },

  'wc-death-legacy': {
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
  },

  // ── Guillaume Couture arc ────────────────────────────────────────

  'gc-beat-couture-rouen': {
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
  },

  'gc-beat-couture-atlantic': {
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
  },

  'gc-beat-couture-quebec': {
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
  },

  'gc-beat-couture-huronia': {
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
  },

  'gc-beat-couture-captivity': {
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
  },

  'gc-beat-couture-diplomacy': {
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
  },

  'gc-beat-couture-long-sault': {
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
  },

  'gc-beat-couture-north-legacy': {
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
  },
};
