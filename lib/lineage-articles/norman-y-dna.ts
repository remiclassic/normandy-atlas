import type { AtlasLocale } from '@/core/types';
import { NORMAN_Y_DNA_ARTICLE_MARKDOWN_EN } from '@/lib/lineage-articles/norman-y-dna-content-en';
import { NORMAN_Y_DNA_ARTICLE_MARKDOWN_FR } from '@/lib/lineage-articles/norman-y-dna-content-fr';

export function getNormanYdnaArticleMarkdown(locale: AtlasLocale): string {
  if (locale === 'fr') return NORMAN_Y_DNA_ARTICLE_MARKDOWN_FR;
  return NORMAN_Y_DNA_ARTICLE_MARKDOWN_EN;
}

export { NORMAN_Y_DNA_ARTICLE_MARKDOWN_EN, NORMAN_Y_DNA_ARTICLE_MARKDOWN_FR };
