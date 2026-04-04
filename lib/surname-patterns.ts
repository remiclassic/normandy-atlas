import type { CulturalStrand, I18nString, AtlasLocale } from '@/core/types';
import { pickI18n } from '@/lib/locale';

// ---------------------------------------------------------------------------
// Surname pattern rule engine
// ---------------------------------------------------------------------------

export interface SurnamePatternMatch {
  id: string;
  strandHint?: CulturalStrand;
  explanation: I18nString;
  priority: number;
}

interface SurnameRule {
  id: string;
  test: (normalized: string) => boolean;
  strandHint?: CulturalStrand;
  explanation: I18nString;
  priority: number;
}

const RULES: SurnameRule[] = [
  {
    id: 'fitz',
    test: (s) => /^fitz/i.test(s),
    strandHint: 'frankish',
    explanation: {
      en: '"Fitz" indicates "son of" (from Old French fils), a naming pattern introduced by the Normans after 1066. It reflects the Frankish-influenced Old French spoken by Norman settlers in England.',
      fr: '« Fitz » signifie « fils de » (de l\'ancien français fils), un schéma de dénomination introduit par les Normands après 1066. Il reflète l\'ancien français d\'influence franque parlé par les colons normands en Angleterre.',
      es: '"Fitz" indica "hijo de" (del francés antiguo fils), un patrón de nomenclatura introducido por los normandos después de 1066.',
      it: '"Fitz" significa "figlio di" (dal francese antico fils), un modello di denominazione introdotto dai Normanni dopo il 1066.',
      de: '„Fitz" bedeutet „Sohn von" (aus altfranzösisch fils), ein Namensmuster, das die Normannen nach 1066 einführten.',
    },
    priority: 10,
  },
  {
    id: 'de-prefix',
    test: (s) => /^(de |du |des |de la )/i.test(s),
    strandHint: 'frankish',
    explanation: {
      en: '"de" indicates origin from a place, often tied to landholding identity in Frankish and Norman culture. It links the bearer to a specific territory or estate.',
      fr: '« de » indique une origine géographique, souvent liée à l\'identité foncière dans la culture franque et normande. Il rattache le porteur à un territoire ou un domaine spécifique.',
      es: '"de" indica origen de un lugar, a menudo vinculado a la identidad territorial en la cultura franca y normanda.',
      it: '"de" indica l\'origine da un luogo, spesso legata all\'identità fondiaria nella cultura franca e normanna.',
      de: '„de" weist auf die Herkunft von einem Ort hin, oft verbunden mit der Grundbesitzidentität in fränkischer und normannischer Kultur.',
    },
    priority: 9,
  },
  {
    id: 'norse-patronymic',
    test: (s) => /(?:son|sen|sson)$/i.test(s) && s.length > 4,
    strandHint: 'norse',
    explanation: {
      en: 'The -son / -sen suffix is a Norse patronymic ("child of"), one of the oldest naming conventions in Scandinavian culture. It persisted in regions with strong Viking settlement.',
      fr: 'Le suffixe -son / -sen est un patronyme norrois (« enfant de »), l\'une des plus anciennes conventions de dénomination de la culture scandinave.',
      es: 'El sufijo -son / -sen es un patronímico nórdico ("hijo de"), una de las convenciones de nomenclatura más antiguas de la cultura escandinava.',
      it: 'Il suffisso -son / -sen è un patronimico norreno ("figlio di"), una delle più antiche convenzioni di denominazione nella cultura scandinava.',
      de: 'Das Suffix -son / -sen ist ein nordisches Patronym („Kind von"), eine der ältesten Namenskonventionen der skandinavischen Kultur.',
    },
    priority: 8,
  },
  {
    id: 'le-la-article',
    test: (s) => /^(le |la )/i.test(s),
    strandHint: 'frankish',
    explanation: {
      en: '"Le" / "La" (the) prefixes indicate a descriptor-based name from Old French, common among Norman families identifying a person by trade, appearance, or location.',
      fr: 'Les préfixes « Le » / « La » indiquent un nom descriptif issu de l\'ancien français, courant chez les familles normandes.',
      es: 'Los prefijos "Le" / "La" indican un nombre descriptivo del francés antiguo, común entre familias normandas.',
      it: 'I prefissi "Le" / "La" indicano un nome descrittivo dal francese antico, comune tra le famiglie normanne.',
      de: 'Die Präfixe „Le" / „La" weisen auf einen beschreibenden Namen aus dem Altfranzösischen hin, häufig bei normannischen Familien.',
    },
    priority: 7,
  },
  {
    id: 'ap-mac-celtic',
    test: (s) => /^(ap |mac |mc)/i.test(s),
    strandHint: 'breton',
    explanation: {
      en: '"Ap-", "Mac-", or "Mc-" prefixes mean "son of" in Brythonic and Gaelic traditions, reflecting Celtic naming patterns found among Bretons and insular Celts integrated into Norman society.',
      fr: 'Les préfixes « Ap- », « Mac- » ou « Mc- » signifient « fils de » dans les traditions brythoniques et gaéliques, reflétant les schémas de dénomination celtiques.',
      es: 'Los prefijos "Ap-", "Mac-" o "Mc-" significan "hijo de" en las tradiciones britónicas y gaélicas.',
      it: 'I prefissi "Ap-", "Mac-" o "Mc-" significano "figlio di" nelle tradizioni britoniche e gaeliche.',
      de: '„Ap-", „Mac-" oder „Mc-" Präfixe bedeuten „Sohn von" in brythonischen und gälischen Traditionen.',
    },
    priority: 7,
  },
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function matchSurnamePatterns(surname: string | undefined): SurnamePatternMatch[] {
  if (!surname) return [];
  const normalized = surname.trim();
  if (!normalized) return [];

  const matches: SurnamePatternMatch[] = [];
  for (const rule of RULES) {
    if (rule.test(normalized)) {
      matches.push({
        id: rule.id,
        strandHint: rule.strandHint,
        explanation: rule.explanation,
        priority: rule.priority,
      });
    }
  }
  return matches.sort((a, b) => b.priority - a.priority);
}

export function formatPatternExplanation(
  match: SurnamePatternMatch,
  locale: AtlasLocale,
): string {
  return pickI18n(match.explanation, locale);
}
