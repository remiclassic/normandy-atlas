import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const title = 'Guides & reference — Norman Atlas';
const description =
  'Atlas journal, official companion, and digital guides: one place to choose how you read and explore the atlas.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

export default function ReferenceLayout({ children }: { children: ReactNode }) {
  return children;
}
