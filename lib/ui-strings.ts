import type { AtlasLocale } from '@/core/types';
import { DEFAULT_LOCALE } from '@/lib/locale';

// ---------------------------------------------------------------------------
// Static UI strings — keyed by message id then locale.
// Phase 1: en, fr, es, it.
// ---------------------------------------------------------------------------

type StringTable = Record<string, Partial<Record<AtlasLocale, string>> & { en: string }>;

const STRINGS = {
  // --- Intro / Welcome Gate ---
  'intro.tagline': {
    en: 'A living map of people, movement, and time',
    fr: 'Une carte vivante des peuples, des mouvements et du temps',
    es: 'Un mapa vivo de personas, movimiento y tiempo',
    it: 'Una mappa viva di persone, movimenti e tempo',
  },
  'intro.subtitle': {
    en: 'From the first settlers of Neolithic Normandy\nto the global legacy of the Normans',
    fr: 'Des premiers colons de la Normandie néolithique\nà l\'héritage mondial des Normands',
    es: 'Desde los primeros colonos de la Normandía neolítica\nhasta el legado global de los normandos',
    it: 'Dai primi abitanti della Normandia neolitica\nall\'eredità globale dei Normanni',
  },
  'intro.enter': {
    en: 'Enter Atlas',
    fr: 'Entrer dans l\'Atlas',
    es: 'Entrar al Atlas',
    it: 'Entra nell\'Atlante',
  },
  'intro.normanOverviewLink': {
    en: 'Who were the Normans? Read the overview',
    fr: 'Qui étaient les Normands ? Lire la présentation',
    es: '¿Quiénes fueron los normandos? Leer la introducción',
    it: 'Chi erano i Normanni? Leggi la panoramica',
    de: 'Wer waren die Normannen? Überblick lesen',
    pt: 'Quem foram os normandos? Ler a apresentação',
    da: 'Hvem var normannerne? Læs oversigten',
    nl: 'Wie waren de Normanen? Lees het overzicht',
  },

  // --- Norman overview (modal chrome; body copy: lib/norman-overview/bundles/*.ts) ---
  'normanOverview.sectionLabel': {
    en: 'Historical overview',
    fr: 'Aperçu historique',
    es: 'Panorama histórico',
    it: 'Panoramica storica',
    de: 'Historischer Überblick',
    pt: 'Panorama histórico',
    da: 'Historisk oversigt',
    nl: 'Historisch overzicht',
  },
  'normanOverview.tooltip.label': {
    en: 'Who were the Normans?',
    fr: 'Qui étaient les Normands ?',
    es: '¿Quiénes fueron los normandos?',
    it: 'Chi erano i Normanni?',
    de: 'Wer waren die Normannen?',
    pt: 'Quem foram os normandos?',
    da: 'Hvem var normannerne?',
    nl: 'Wie waren de Normanen?',
  },
  'normanOverview.tooltip.hint': {
    en: 'Timeline context: Celts, Rome, Franks, Vikings, Normandy, and the Norman legacy.',
    fr: 'Contexte de la frise : Celtes, Rome, Francs, Vikings, Normandie et héritage normand.',
    es: 'Contexto de la línea de tiempo: celtas, Roma, francos, vikingos, Normandía y legado normando.',
    it: 'Contesto della cronologia: Celti, Roma, Franchi, Vichinghi, Normandia ed eredità normanna.',
    de: 'Zeitleisten-Kontext: Kelten, Rom, Franken, Wikinger, Normandie und normannisches Erbe.',
    pt: 'Contexto da linha do tempo: celtas, Roma, francos, vikings, Normandia e legado normando.',
    da: 'Tidslinjekontekst: keltere, Rom, frankere, vikinger, Normandiet og normannisk arv.',
    nl: 'Tijdlijncontext: Kelten, Rome, Franken, Vikingen, Normandië en het normannische erfgoed.',
  },
  'normanOverview.aria.open': {
    en: 'Open Norman history overview',
    fr: 'Ouvrir l\'aperçu sur l\'histoire des Normands',
    es: 'Abrir panorama de la historia normanda',
    it: 'Apri la panoramica sulla storia dei Normanni',
    de: 'Normannische Geschichtsübersicht öffnen',
    pt: 'Abrir panorama da história normanda',
    da: 'Åbn oversigt over normannisk historie',
    nl: 'Normannische geschiedenisoverzicht openen',
  },
  'normanOverview.aria.close': {
    en: 'Close overview',
    fr: 'Fermer l\'aperçu',
    es: 'Cerrar panorama',
    it: 'Chiudi panoramica',
    de: 'Überblick schließen',
    pt: 'Fechar panorama',
    da: 'Luk oversigt',
    nl: 'Overzicht sluiten',
  },

  // --- Header chrome ---
  'header.tagline': {
    en: 'A living map of people, movement, and time',
    fr: 'Une carte vivante des peuples, des mouvements et du temps',
    es: 'Un mapa vivo de personas, movimiento y tiempo',
    it: 'Una mappa viva di persone, movimenti e tempo',
  },

  'layers.explorationYearStrict.label': {
    en: 'Match exploration routes to timeline year',
    fr: 'Aligner les routes d\'exploration sur l\'année de la frise',
    es: 'Alinear rutas de exploración con el año de la línea de tiempo',
    it: 'Allinea le rotte di esplorazione all\'anno della cronologia',
  },
  'layers.explorationYearStrict.hint': {
    en: 'When on, explorer lines only appear if the year slider falls within each segment’s range. When off, all exploration routes for this era stay visible together.',
    fr: 'Activé : les lignes d\'explorateurs n\'apparaissent que si l\'année de la frise tombe dans la plage de chaque segment. Désactivé : toutes les routes d\'exploration de l\'ère restent visibles.',
    es: 'Activado: las líneas solo aparecen si el año cae en el rango de cada tramo. Desactivado: todas las rutas de exploración de la era permanecen visibles.',
    it: 'Attivo: le linee compaiono solo se l\'anno rientra nell\'intervallo di ogni segmento. Spento: tutte le rotte di esplorazione dell\'era restano visibili.',
  },

  // --- Guided tour ---
  'tour.step1.title': {
    en: 'A living historical system',
    fr: 'Un système historique vivant',
    es: 'Un sistema histórico vivo',
    it: 'Un sistema storico vivente',
  },
  'tour.step1.body': {
    en: 'This atlas is not just a map.\nIt shows how people moved, settled, and shaped the world over time.',
    fr: 'Cet atlas n\'est pas une simple carte.\nIl montre comment les peuples se sont déplacés, installés et ont façonné le monde au fil du temps.',
    es: 'Este atlas no es solo un mapa.\nMuestra cómo las personas se desplazaron, se asentaron y moldearon el mundo a lo largo del tiempo.',
    it: 'Questo atlante non è solo una mappa.\nMostra come le persone si sono mosse, si sono stabilite e hanno plasmato il mondo nel tempo.',
  },
  'tour.step2.title': {
    en: 'What you see',
    fr: 'Ce que vous voyez',
    es: 'Lo que verá',
    it: 'Cosa vedi',
  },
  'tour.step2.body': {
    en: 'Each point represents a settlement. Lines trace migration routes. Shaded regions show zones of influence — all reconstructed from available records.',
    fr: 'Chaque point représente un établissement. Les lignes tracent les routes migratoires. Les régions ombrées montrent les zones d\'influence — le tout reconstitué à partir des sources disponibles.',
    es: 'Cada punto representa un asentamiento. Las líneas trazan rutas migratorias. Las regiones sombreadas muestran zonas de influencia, todo reconstruido a partir de registros disponibles.',
    it: 'Ogni punto rappresenta un insediamento. Le linee tracciano rotte migratorie. Le regioni ombreggiate mostrano zone di influenza — tutto ricostruito dalle fonti disponibili.',
  },
  'tour.step3.title': {
    en: 'Navigate through time',
    fr: 'Naviguez dans le temps',
    es: 'Navegue a través del tiempo',
    it: 'Naviga nel tempo',
  },
  'tour.step3.body': {
    en: 'Move through time to watch history unfold. Each era reveals different layers of activity.',
    fr: 'Déplacez-vous dans le temps pour voir l\'histoire se dérouler. Chaque époque révèle différentes couches d\'activité.',
    es: 'Avance en el tiempo para ver la historia desplegarse. Cada era revela distintas capas de actividad.',
    it: 'Spostati nel tempo per vedere la storia dispiegarsi. Ogni epoca rivela strati diversi di attività.',
  },
  'tour.step4.title': {
    en: 'Explore in depth',
    fr: 'Explorez en profondeur',
    es: 'Explore en profundidad',
    it: 'Approfondisci',
  },
  'tour.step4.body': {
    en: 'Click any location to explore people, events, and context tied to that place and era.',
    fr: 'Cliquez sur n\'importe quel lieu pour explorer les personnes, les événements et le contexte liés à ce lieu et à cette époque.',
    es: 'Haga clic en cualquier lugar para explorar personas, eventos y contexto vinculados a ese sitio y esa era.',
    it: 'Clicca su qualsiasi luogo per esplorare persone, eventi e contesto legati a quel posto e a quell\'epoca.',
  },
  'tour.step5.title': {
    en: 'Layers of evidence',
    fr: 'Couches de preuves',
    es: 'Capas de evidencia',
    it: 'Strati di evidenza',
  },
  'tour.step5.body': {
    en: 'Some layers show documented history. Others reveal modeled influence based on historical patterns and scholarly analysis.',
    fr: 'Certaines couches montrent l\'histoire documentée. D\'autres révèlent l\'influence modélisée à partir de schémas historiques et d\'analyses savantes.',
    es: 'Algunas capas muestran historia documentada. Otras revelan influencia modelada a partir de patrones históricos y análisis académicos.',
    it: 'Alcuni strati mostrano la storia documentata. Altri rivelano un\'influenza modellata su schemi storici e analisi erudite.',
  },

  // --- Tour controls ---
  'tour.skip': {
    en: 'Skip',
    fr: 'Passer',
    es: 'Omitir',
    it: 'Salta',
  },
  'tour.back': {
    en: 'Back',
    fr: 'Retour',
    es: 'Atrás',
    it: 'Indietro',
  },
  'tour.next': {
    en: 'Next',
    fr: 'Suivant',
    es: 'Siguiente',
    it: 'Avanti',
  },
  'tour.begin': {
    en: 'Begin exploring',
    fr: 'Commencer l\'exploration',
    es: 'Comenzar a explorar',
    it: 'Inizia a esplorare',
  },

  // --- Story bar ---
  'story.explore': {
    en: 'Explore the Story',
    fr: 'Explorer l\'histoire',
    es: 'Explorar la historia',
    it: 'Esplora la storia',
  },
  'story.exit': {
    en: 'Exit story',
    fr: 'Quitter l\'histoire',
    es: 'Salir de la historia',
    it: 'Esci dalla storia',
  },
  'story.continue': {
    en: 'Continue',
    fr: 'Continuer',
    es: 'Continuar',
    it: 'Continua',
  },
  'story.finish': {
    en: 'Finish',
    fr: 'Terminer',
    es: 'Finalizar',
    it: 'Fine',
  },

  // --- Credits modal & chrome ---
  'credits.tooltip.label': {
    en: 'Credits & about',
    fr: 'Crédits et à propos',
    es: 'Créditos e información',
    it: 'Crediti e informazioni',
  },
  'credits.tooltip.hint': {
    en: 'Creator, vision, links, and how to support this project.',
    fr: 'Créateur, vision, liens et comment soutenir ce projet.',
    es: 'Creador, visión, enlaces y cómo apoyar este proyecto.',
    it: 'Creatore, visione, link e come sostenere il progetto.',
  },
  'credits.aria.open': {
    en: 'Open credits and about',
    fr: 'Ouvrir les crédits et à propos',
    es: 'Abrir créditos e información',
    it: 'Apri crediti e informazioni',
  },
  'credits.aria.close': {
    en: 'Close credits',
    fr: 'Fermer les crédits',
    es: 'Cerrar créditos',
    it: 'Chiudi crediti',
  },
  'credits.sectionLabel': {
    en: 'Credits',
    fr: 'Crédits',
    es: 'Créditos',
    it: 'Crediti',
  },
  'credits.title': {
    en: 'Created by Guillaume Remi Couture',
    fr: 'Créé par Guillaume Remi Couture',
    es: 'Creado por Guillaume Remi Couture',
    it: 'Creato da Guillaume Remi Couture',
  },
  'credits.intro1': {
    en: 'This atlas was created by Guillaume Remi Couture, a UX/UI designer with nearly two decades of experience building interactive systems, games, and digital products used by millions of people worldwide.',
    fr: 'Cet atlas a été créé par Guillaume Remi Couture, designer UX/UI avec près de vingt ans d\'expérience dans la conception de systèmes interactifs, de jeux et de produits numériques utilisés par des millions de personnes dans le monde.',
    es: 'Este atlas fue creado por Guillaume Remi Couture, diseñador UX/UI con casi dos décadas de experiencia en sistemas interactivos, videojuegos y productos digitales usados por millones de personas en todo el mundo.',
    it: 'Questo atlante è stato creato da Guillaume Remi Couture, designer UX/UI con quasi vent\'anni di esperienza in sistemi interattivi, giochi e prodotti digitali usati da milioni di persone nel mondo.',
  },
  'credits.intro2': {
    en: 'But this project is not just another product.',
    fr: 'Mais ce projet n\'est pas qu\'un produit de plus.',
    es: 'Pero este proyecto no es solo un producto más.',
    it: 'Ma questo progetto non è solo un altro prodotto.',
  },
  'credits.intro3': {
    en: 'It is personal.',
    fr: 'Il est personnel.',
    es: 'Es personal.',
    it: 'È personale.',
  },
  'credits.whyTitle': {
    en: 'Why This Atlas Exists',
    fr: 'Pourquoi cet atlas existe',
    es: 'Por qué existe este atlas',
    it: 'Perché esiste questo atlante',
  },
  'credits.why1': {
    en: 'For as long as I can remember, I have been drawn to the story of the Normans, not just the surface-level version you find in textbooks, but the deeper layers: the movement of people, the migrations, the transformations, the way Viking settlers became one of the most influential forces in medieval Europe.',
    fr: 'Depuis aussi loin que je m\'en souvienne, l\'histoire des Normands m\'a fasciné — pas seulement la version superficielle des manuels, mais les strates profondes : les mouvements de peuples, les migrations, les transformations, la manière dont les colons vikings sont devenus l\'une des forces les plus influentes de l\'Europe médiévale.',
    es: 'Desde que tengo memoria me ha atraído la historia de los normandos, no solo la versión superficial de los libros de texto, sino las capas profundas: el movimiento de gentes, las migraciones, las transformaciones, cómo los colonos vikingos se convirtieron en una de las fuerzas más influyentes de la Europa medieval.',
    it: 'Per quanto mi ricordi, la storia dei Normanni mi ha sempre affascinato — non solo la versione superficiale dei manuali, ma gli strati profondi: il movimento delle genti, le migrazioni, le trasformazioni, come i coloni vichinghi divennero una delle forze più influenti dell\'Europa medievale.',
  },
  'credits.why2': {
    en: 'Normandy is not just a place. It is a turning point. It is where identities shifted, where cultures blended, where something new was created. That ripple effect spread across England, Southern Italy, the Crusader states, and eventually into New France.',
    fr: 'La Normandie n\'est pas qu\'un lieu. C\'est un tournant. C\'est là que les identités se sont déplacées, que les cultures se sont mêlées, que quelque chose de nouveau est né. Cet effet d\'entraînement s\'est propagé en Angleterre, dans le sud de l\'Italie, dans les États des croisades, puis jusqu\'à la Nouvelle-France.',
    es: 'Normandía no es solo un lugar. Es un punto de inflexión. Ahí cambiaron las identidades, se mezclaron las culturas, nació algo nuevo. Ese efecto dominó se extendió por Inglaterra, el sur de Italia, los estados cruzados y, al final, a Nueva Francia.',
    it: 'La Normandia non è solo un luogo. È una svolta. È dove le identità si sono spostate, le culture si sono fuse, è nato qualcosa di nuovo. Quell\'effetto a catena si è diffuso in Inghilterra, nel sud Italia, negli stati crociati e infine nella Nuova Francia.',
  },
  'credits.why3': {
    en: 'But most of this story is fragmented, so I built something to see it clearly.',
    fr: 'Mais la plus grande partie de ce récit est fragmentée — j\'ai donc bâti quelque chose pour le voir clairement.',
    es: 'Pero gran parte de esta historia está fragmentada, así que construí algo para verla con claridad.',
    it: 'Ma gran parte di questa storia è frammentata, così ho costruito qualcosa per vederla con chiarezza.',
  },
  'credits.visionTitle': {
    en: 'The Vision',
    fr: 'La vision',
    es: 'La visión',
    it: 'La visione',
  },
  'credits.visionIntro': {
    en: 'This atlas is meant to be more than a map. It is a living system that lets you:',
    fr: 'Cet atlas veut être bien plus qu\'une carte. C\'est un système vivant qui vous permet de :',
    es: 'Este atlas pretende ser más que un mapa. Es un sistema vivo que le permite:',
    it: 'Questo atlante vuole essere più di una mappa. È un sistema vivente che ti permette di:',
  },
  'credits.visionL1': {
    en: 'Follow migrations across time',
    fr: 'Suivre les migrations dans le temps',
    es: 'Seguir migraciones a lo largo del tiempo',
    it: 'Seguire le migrazioni nel tempo',
  },
  'credits.visionL2': {
    en: 'Explore where people came from and where they settled',
    fr: 'Explorer d\'où venaient les peuples et où ils se sont installés',
    es: 'Explorar de dónde venían las gentes y dónde se asentaron',
    it: 'Esplorare da dove venivano le genti e dove si stabilirono',
  },
  'credits.visionL3': {
    en: 'Understand how cultures evolved',
    fr: 'Comprendre comment les cultures ont évolué',
    es: 'Entender cómo evolucionaron las culturas',
    it: 'Capire come sono evolute le culture',
  },
  'credits.visionL4': {
    en: 'Connect events across centuries in a visual way',
    fr: 'Relier des événements sur des siècles, de façon visuelle',
    es: 'Conectar acontecimientos a lo largo de los siglos de forma visual',
    it: 'Collegare eventi attraverso i secoli in modo visivo',
  },
  'credits.visionOutro': {
    en: 'Instead of reading history in pieces, you can experience it as a continuous story.',
    fr: 'Au lieu de lire l\'histoire par morceaux, vous pouvez la vivre comme un récit continu.',
    es: 'En lugar de leer la historia a trozos, puede vivirla como una narración continua.',
    it: 'Invece di leggere la storia a pezzi, puoi viverla come un racconto continuo.',
  },
  'credits.builtTitle': {
    en: 'Built from Experience',
    fr: 'Construit sur l\'expérience',
    es: 'Construido con experiencia',
    it: 'Costruito sull\'esperienza',
  },
  'credits.builtIntro': {
    en: 'This project brings together everything I have learned over 18+ years in design:',
    fr: 'Ce projet rassemble tout ce que j\'ai appris en plus de 18 ans de design :',
    es: 'Este proyecto reúne todo lo aprendido en más de 18 años de diseño:',
    it: 'Questo progetto riunisce tutto ciò che ho imparato in oltre 18 anni di design:',
  },
  'credits.builtL1': {
    en: 'Game UI and interactive systems',
    fr: 'Interfaces de jeu et systèmes interactifs',
    es: 'IU de juegos y sistemas interactivos',
    it: 'UI di gioco e sistemi interattivi',
  },
  'credits.builtL2': {
    en: 'World-building and spatial storytelling',
    fr: 'Construction de mondes et narration spatiale',
    es: 'Construcción de mundos y narrativa espacial',
    it: 'World-building e narrazione spaziale',
  },
  'credits.builtL3': {
    en: 'UX design for complex systems',
    fr: 'Design UX pour systèmes complexes',
    es: 'Diseño UX para sistemas complejos',
    it: 'Design UX per sistemi complessi',
  },
  'credits.builtL4': {
    en: 'AI-assisted workflows and modern web tech',
    fr: 'Flux de travail assistés par l\'IA et technologies web modernes',
    es: 'Flujos de trabajo con IA y tecnología web moderna',
    it: 'Flussi di lavoro assistiti dall\'IA e tecnologie web moderne',
  },
  'credits.builtOutro': {
    en: 'I have worked with companies like Disney and others, designing experiences meant to guide millions of users. This atlas applies that same thinking to history.',
    fr: 'J\'ai travaillé avec des entreprises comme Disney et d\'autres, en concevant des expériences pour des millions d\'utilisateurs. Cet atlas applique la même démarche à l\'histoire.',
    es: 'He trabajado con empresas como Disney y otras, diseñando experiencias para millones de usuarios. Este atlas aplica la misma idea a la historia.',
    it: 'Ho lavorato con aziende come Disney e altre, progettando esperienze per milioni di utenti. Questo atlante applica lo stesso approccio alla storia.',
  },
  'credits.personalTitle': {
    en: 'A Personal Note',
    fr: 'Une note personnelle',
    es: 'Una nota personal',
    it: 'Una nota personale',
  },
  'credits.personal1': {
    en: 'I am not building this as a traditional historian. I am building this as someone trying to understand where things come from. The Norman story is not just about conquest. It is about identity, movement, and transformation. And in a way, it reflects something deeper about all of us.',
    fr: 'Je ne construis pas cela en historien classique, mais en quelqu\'un qui cherche à comprendre d\'où viennent les choses. L\'histoire normande ne se résume pas à la conquête : elle parle d\'identité, de mouvement, de transformation — et, d\'une certaine façon, de quelque chose de plus profond en nous tous.',
    es: 'No lo construyo como historiador tradicional, sino como alguien que intenta entender de dónde vienen las cosas. La historia normanda no es solo conquista: es identidad, movimiento y transformación — y, en cierto modo, refleja algo más profundo en todos nosotros.',
    it: 'Non lo sto costruendo come storico tradizionale, ma come qualcuno che cerca di capire da dove vengono le cose. La storia normanna non è solo conquista: è identità, movimento, trasformazione — e in un certo senso rispecchia qualcosa di più profondo in ciascuno di noi.',
  },
  'credits.workTitle': {
    en: 'Work With Me',
    fr: 'Travaillons ensemble',
    es: 'Trabajemos juntos',
    it: 'Lavoriamo insieme',
  },
  'credits.workIntro': {
    en: 'If you are interested in working together, collaborating, or bringing this level of design thinking into your own project, connect on LinkedIn:',
    fr: 'Si vous souhaitez collaborer ou intégrer cette approche design à votre projet, contactez-moi sur LinkedIn :',
    es: 'Si le interesa colaborar o llevar este nivel de pensamiento de diseño a su proyecto, conéctese en LinkedIn:',
    it: 'Se vuoi collaborare o portare questo livello di design thinking nel tuo progetto, contattami su LinkedIn:',
  },
  'credits.workAvailable': {
    en: 'I am available for:',
    fr: 'Je suis disponible pour :',
    es: 'Estoy disponible para:',
    it: 'Sono disponibile per:',
  },
  'credits.workL1': {
    en: 'UX/UI design consulting',
    fr: 'Conseil en design UX/UI',
    es: 'Consultoría de diseño UX/UI',
    it: 'Consulenza UX/UI',
  },
  'credits.workL2': {
    en: 'Interactive systems and product design',
    fr: 'Systèmes interactifs et design produit',
    es: 'Sistemas interactivos y diseño de producto',
    it: 'Sistemi interattivi e design di prodotto',
  },
  'credits.workL3': {
    en: 'Game UI/UX',
    fr: 'UI/UX de jeux',
    es: 'UI/UX de videojuegos',
    it: 'UI/UX per giochi',
  },
  'credits.workL4': {
    en: 'AI-assisted workflows and prototyping',
    fr: 'Flux de travail assistés par l\'IA et prototypage',
    es: 'Flujos con IA y prototipado',
    it: 'Flussi assistiti dall\'IA e prototipazione',
  },
  'credits.supportTitle': {
    en: 'Support This Project',
    fr: 'Soutenir ce projet',
    es: 'Apoyar este proyecto',
    it: 'Sostenere questo progetto',
  },
  'credits.supportIntro': {
    en: 'My goal is to make this atlas a full-time project. If you find value in it and want to support its growth:',
    fr: 'Mon objectif est d\'en faire un projet à plein temps. Si vous y trouvez de la valeur et souhaitez soutenir son développement :',
    es: 'Mi objetivo es que este atlas sea un proyecto a tiempo completo. Si le resulta valioso y quiere apoyar su crecimiento:',
    it: 'Il mio obiettivo è farne un progetto a tempo pieno. Se trovi valore in questo atlante e vuoi sostenerne la crescita:',
  },
  'credits.supportL1': {
    en: 'You can share it with others',
    fr: 'Vous pouvez le partager',
    es: 'Puede compartirlo con otras personas',
    it: 'Puoi condividerlo con altri',
  },
  'credits.supportL2': {
    en: 'You can reach out for collaboration',
    fr: 'Vous pouvez proposer une collaboration',
    es: 'Puede proponer colaboración',
    it: 'Puoi proporre una collaborazione',
  },
  'credits.supportL3': {
    en: 'Or support directly (donations, sponsorships, partnerships)',
    fr: 'Ou soutenir directement (dons, parrainages, partenariats)',
    es: 'O apoyar directamente (donaciones, patrocinios, alianzas)',
    it: 'O sostenere direttamente (donazioni, sponsorizzazioni, partnership)',
  },
  'credits.supportOutro': {
    en: 'Every bit of support helps expand the data, improve accuracy, and push this further.',
    fr: 'Chaque soutien aide à enrichir les données, améliorer la précision et faire avancer le projet.',
    es: 'Cada apoyo ayuda a ampliar los datos, mejorar la precisión y seguir adelante.',
    it: 'Ogni sostegno aiuta ad ampliare i dati, migliorare l\'accuratezza e spingere il progetto avanti.',
  },
  'credits.ongoingTitle': {
    en: 'Ongoing Project',
    fr: 'Projet en cours',
    es: 'Proyecto en curso',
    it: 'Progetto in evoluzione',
  },
  'credits.ongoing1': {
    en: 'This atlas is continuously evolving. New eras, deeper historical accuracy, and richer data layers will be added over time. If you are exploring this now, you are early, and that is part of the journey.',
    fr: 'Cet atlas évolue en continu. De nouvelles époques, une meilleure précision historique et des couches de données plus riches seront ajoutées. Si vous explorez cela maintenant, vous êtes en avance — et cela fait partie du parcours.',
    es: 'Este atlas evoluciona sin cesar. Con el tiempo se añadirán nuevas épocas, mayor rigor histórico y capas de datos más ricas. Si lo explora ahora, llega pronto — y eso forma parte del camino.',
    it: 'Questo atlante evolve continuamente. Nel tempo si aggiungeranno nuove epoche, maggiore accuratezza storica e strati di dati più ricchi. Se lo stai esplorando ora sei in anticipo — e fa parte del percorso.',
  },
  'coutureStory.surnameHeading': {
    en: 'The name Couture',
    fr: 'Le nom Couture',
    es: 'El apellido Couture',
    it: 'Il cognome Couture',
  },
  'coutureStory.fullStoryHeading': {
    en: 'His life in full',
    fr: 'Sa vie, en bref',
    es: 'Su vida, en detalle',
    it: 'La sua vita',
  },
  'coutureStory.followMap': {
    en: 'Follow his story on the map',
    fr: 'Suivre son parcours sur la carte',
    es: 'Seguir su historia en el mapa',
    it: 'Segui la sua storia sulla mappa',
  },
} as const satisfies StringTable;

export type UiStringKey = keyof typeof STRINGS;

/**
 * Look up a UI string by key and locale, falling back to English.
 */
export function t(key: UiStringKey, locale: AtlasLocale): string {
  const entry = STRINGS[key];
  return (entry as Record<string, string | undefined>)[locale] ?? entry.en;
}
