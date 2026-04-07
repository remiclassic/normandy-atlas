import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allGuideArchives } from '@/data/digital-guides';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { resolveAllGuideArchives } from '@/lib/digital-guides-resolve';
import GuidesPageChrome from '@/components/guides/GuidesPageChrome';
import { defaultOpenGraphImages, defaultTwitterImages } from '@/lib/social-metadata';

const title = 'Digital guides \u2014 Norman Atlas library | Norman Atlas';
const description =
  'Digital guides and PDF bundles: core Norman Archives, Mediterranean and Atlantic worlds, British Isles and Angevin empire, deep-time Normandy, research and classroom packs, printables, and curated bundles\u2014checkout via secure external links when available.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website', images: defaultOpenGraphImages },
  twitter: { card: 'summary_large_image', title, description, images: defaultTwitterImages },
};

export default function GuidesPage() {
  if (!isDigitalGuidesPublic()) notFound();
  const sections = resolveAllGuideArchives(allGuideArchives);
  return <GuidesPageChrome sections={sections} />;
}
