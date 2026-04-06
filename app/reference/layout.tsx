import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const title = 'Library — Norman Atlas';
const description =
  'Hub for digital guides, atlas journal, Norman readings, genealogy tools, and the companion handbook—each section matches the library tabs.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

export default function ReferenceLayout({ children }: { children: ReactNode }) {
  return children;
}
