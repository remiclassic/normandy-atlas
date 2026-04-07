import type { Metadata } from 'next';
import NormanYdnaArticlePageClient from '@/components/lineage-explorer/NormanYdnaArticlePageClient';
import { defaultOpenGraphImages, defaultTwitterImages } from '@/lib/social-metadata';

const title = 'Norman Y-DNA (Cotentin) | Genetic Lineage Explorer | Norman Atlas';
const description =
  'Teaching essay on Y-chromosome haplogroups in Normandy: Cotentin surveys, Viking-age context, and how to read regional pies responsibly.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website', images: defaultOpenGraphImages },
  twitter: { card: 'summary_large_image', title, description, images: defaultTwitterImages },
};

export default function NormanYdnaArticlePage() {
  return <NormanYdnaArticlePageClient />;
}
