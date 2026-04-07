import type { Metadata } from 'next';

import NormanReadingsIndexClient from '@/components/norman-readings/NormanReadingsIndexClient';
import { defaultOpenGraphImages, defaultTwitterImages } from '@/lib/social-metadata';
import { NORMAN_READINGS } from '@/lib/norman-readings/manifest';

const title = 'Norman readings | Norman Atlas';
const description =
  'Long-form essays on Norman history — linked to the map where a Norman Expansion site has a counterpart.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website', images: defaultOpenGraphImages },
  twitter: { card: 'summary_large_image', title, description, images: defaultTwitterImages },
};

export default function NormanReadingsHubPage() {
  return <NormanReadingsIndexClient readings={NORMAN_READINGS} />;
}
