import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { defaultOpenGraphImages, defaultTwitterImages } from '@/lib/social-metadata';

const title = 'Library — Norman Atlas';
const description =
  'Reference hub for digital guides, atlas journal, Norman readings, genealogy tools, and the companion handbook. The Story Library (map tools menu) lists chronicles and arcs; hub tabs match the sections below.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website', images: defaultOpenGraphImages },
  twitter: { card: 'summary_large_image', title, description, images: defaultTwitterImages },
};

export default function ReferenceLayout({ children }: { children: ReactNode }) {
  return children;
}
