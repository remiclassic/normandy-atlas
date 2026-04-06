import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atlas Journal \u2014 Guide, Glossary & Norman Names',
  description:
    'Your companion guide to the Norman Atlas. Browse eras, explore Norman-origin surnames, GFNA/Y-DNA and mtDNA map layers, genealogy and the genetic lineage explorer, look up historical terms, and learn how the atlas works.',
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
