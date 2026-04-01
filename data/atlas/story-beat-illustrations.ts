import type { StoryBeatIllustration } from '@/core/types';

/**
 * Illustration metadata for story beats.
 * Images live under `public/story/william-conqueror/` and are served as static assets.
 * All Bayeux Tapestry images are public domain (11th-century work, CC0 reproductions).
 * Architectural photos are CC BY-SA — credited inline.
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
};
