import type { Metadata } from 'next';
import { Suspense } from 'react';
import { defaultOpenGraphImages, defaultTwitterImages } from '@/lib/social-metadata';
import StoriesPageClient from './StoriesPageClient';

const title = 'Story library — Norman Atlas';
const description =
  'Browse cinematic chronicles across the atlas — curated journeys from the Viking Age to New France.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website', images: defaultOpenGraphImages },
  twitter: { card: 'summary_large_image', title, description, images: defaultTwitterImages },
};

function StoriesFallback() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#060812] text-white/50 text-sm">
      Loading…
    </div>
  );
}

export default function StoriesPage() {
  return (
    <Suspense fallback={<StoriesFallback />}>
      <StoriesPageClient />
    </Suspense>
  );
}
