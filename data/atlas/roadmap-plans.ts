import type { I18nString } from '@/core/types';

export type RoadmapSection = {
  id: string;
  heading: I18nString;
  bullets: I18nString[];
};

/** Editable plan copy — shown in the “What’s next” modal. */
export const roadmapIntro: I18nString = {
  en: 'Norman Atlas is built in public. Below is what we are working toward next—broader Norman stories, deeper evidence, and new ways to explore the map. Order and timing may shift as research and tooling evolve.',
  fr: 'Norman Atlas se construit au fil du temps. Voici les prochaines étapes visées — récits normands plus larges, sources plus approfondies et nouvelles façons d’explorer la carte. L’ordre et le calendrier peuvent évoluer selon la recherche et les outils.',
  es: 'Norman Atlas se construye en público. Esto es hacia lo que avanzamos: relatos normandos más amplios, más evidencia y nuevas formas de explorar el mapa. El orden y los plazos pueden cambiar según la investigación y las herramientas.',
  it: 'Norman Atlas cresce nel tempo. Segue ciò che vogliamo affrontare: storie normanne più ampie, evidenze più profonde e nuovi modi di esplorare la mappa. Ordine e tempistiche possono cambiare con ricerca e strumenti.',
};

export const roadmapSections: RoadmapSection[] = [
  {
    id: 'norman-worlds',
    heading: {
      en: 'Norman worlds and diaspora',
      fr: 'Mondes normands et diaspora',
      es: 'Mundos normandos y diáspora',
      it: 'Mondi normanni e diaspora',
    },
    bullets: [
      {
        en: 'Anglo-Norman England and the post-Conquest society—law, language, and noble networks—in greater depth on the map and in stories.',
        fr: 'L’Angleterre anglo-normande et la société d’après la conquête — droit, langage et réseaux nobiliaires — avec plus de profondeur sur la carte et dans les récits.',
        es: 'Inglaterra anglonormanda y la sociedad posterior a la conquista — derecho, lenguaje y redes nobiliarias — con más detalle en el mapa y en las historias.',
        it: 'L’Inghilterra anglo-normanna e la società post-conquista — diritto, lingua e reti nobiliari — con maggiore profondità su mappa e narrazioni.',
      },
      {
        en: 'Continental Normandy and Channel ties—finer regional layers, migration corridors, and cross-Channel movement where sources allow.',
        fr: 'La Normandie continentale et les liens de la Manche — couches régionales plus fines, corridors migratoires et circulation trans-Manche lorsque les sources le permettent.',
        es: 'Normandía continental y vínculos del Canal — capas regionales más finas, corredores migratorios y cruce del Canal cuando las fuentes lo permitan.',
        it: 'La Normandia continentale e i legami della Manica — livelli regionali più fini, corridoi migratori e attraversamenti quando le fonti lo consentono.',
      },
      {
        en: 'Norman presence in Italy, Sicily, and the Mediterranean—expansion arcs with the same evidence discipline as the rest of the atlas.',
        fr: 'La présence normande en Italie, en Sicile et en Méditerranée — arcs d’expansion avec la même exigence de sources que le reste de l’atlas.',
        es: 'Presencia normanda en Italia, Sicilia y el Mediterráneo — arcos de expansión con la misma disciplina probatoria que el resto del atlas.',
        it: 'Presenza normanna in Italia, Sicilia e Mediterraneo — archi espansivi con la stessa disciplina delle fonti del resto dell’atlante.',
      },
      {
        en: 'North American lines—including New England and other settlement stories where Norman-descended and French Atlantic threads can be traced with clear cohorts and dates.',
        fr: 'Fils nord-américains — dont la Nouvelle-Angleterre et d’autres récits de peuplement lorsque filiations normandes et atlantiques françaises sont traçables avec cohortes et dates claires.',
        es: 'Líneas norteamericanas —incluida Nueva Inglaterra y otros asentamientos— cuando descendencia normanda y hilos atlánticos franceses se documenten con cohortes y fechas claras.',
        it: 'Linee nordamericane — inclusa la New England e altre fondazioni — quando discendenze normanne e filoni atlantici francesi siano documentabili con coorti e date chiare.',
      },
    ],
  },
  {
    id: 'data-features',
    heading: {
      en: 'Data, narrative, and features',
      fr: 'Données, récit et fonctionnalités',
      es: 'Datos, narrativa y funciones',
      it: 'Dati, racconto e funzionalità',
    },
    bullets: [
      {
        en: 'More named lives, routes, and regions tied to sources—especially for under-represented periods and communities.',
        fr: 'Plus de vies nommées, d’itinéraires et de régions reliés aux sources — surtout pour les périodes et communautés sous-représentées.',
        es: 'Más vidas con nombre, rutas y regiones ligadas a fuentes — sobre todo para períodos y comunidades poco representadas.',
        it: 'Più vite di persone nominate, rotte e regioni ancorate alle fonti — in particolare per periodi e comunità poco rappresentate.',
      },
      {
        en: 'Journal and glossary growth—new entries, Norman names expansions, and reading aids as the map widens.',
        fr: 'Élargissement du journal et du glossaire — nouvelles entrées, extension des patronymes normands et aides de lecture au fil de l’élargissement de la carte.',
        es: 'Crecimiento del diario y del glosario — nuevas entradas, ampliación de apellidos normandos y ayudas de lectura conforme se amplía el mapa.',
        it: 'Crescita di diario e glossario — nuove voci, estensione dei cognomi normanni e strumenti di lettura mentre la mappa si allarga.',
      },
      {
        en: 'Visual and performance polish—smoother era transitions, mobile refinements, and accessibility improvements.',
        fr: 'Peaufinage visuel et des performances — transitions d’époques plus fluides, affinage mobile et améliorations d’accessibilité.',
        es: 'Pulido visual y de rendimiento — transiciones de época más suaves, refinamiento móvil y mejoras de accesibilidad.',
        it: 'Rifinitura visiva e prestazioni — transizioni tra epoche più fluide, affinamenti mobile e accessibilità.',
      },
    ],
  },
];

export const roadmapFootnote: I18nString = {
  en: 'Have a correction, source, or family line worth documenting? The atlas grows through research and community input—support and credits links in the header menu point to how you can help.',
  fr: 'Une correction, une source ou une lignée à documenter ? L’atlas grandit grâce à la recherche et aux contributions — les liens soutien et crédits du menu proposent comment aider.',
  es: '¿Corrección, fuente o linaje que valga documentar? El atlas crece con investigación y aportes: desde el menú, apoyo y créditos explican cómo colaborar.',
  it: 'Correzione, fonte o lignaggio da documentare? L’atlante cresce con ricerca e contributi — dal menu, sostegno e crediti indicano come aiutare.',
};
