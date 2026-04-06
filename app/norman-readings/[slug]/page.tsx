import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import NormanReadingArticleClient from '@/components/norman-readings/NormanReadingArticleClient';
import { getNormanReadingPageData } from '@/lib/norman-readings/load-norman-reading';
import { buildNormanReadingMapHref } from '@/lib/norman-readings/map-cta';
import { NORMAN_READINGS, NORMAN_READING_SLUGS } from '@/lib/norman-readings/manifest';

export function generateStaticParams() {
  return NORMAN_READING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getNormanReadingPageData(slug);
  if (!data) {
    return { title: 'Norman reading | Norman Atlas' };
  }
  const { entry } = data;
  const title = `${entry.title} | Norman readings | Norman Atlas`;
  return {
    title,
    description: entry.description,
    openGraph: { title, description: entry.description, type: 'article' },
    twitter: { card: 'summary_large_image', title, description: entry.description },
  };
}

export default async function NormanReadingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getNormanReadingPageData(slug);
  if (!data) notFound();
  const { entry, body } = data;
  const mapHref = buildNormanReadingMapHref(entry);
  return (
    <NormanReadingArticleClient
      title={entry.title}
      description={entry.description}
      body={body}
      mapHref={mapHref}
      allReadings={NORMAN_READINGS}
      currentSlug={slug}
    />
  );
}
