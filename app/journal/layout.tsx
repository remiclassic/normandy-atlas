import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atlas Journal \u2014 Guide, Glossary & Norman Names',
  description:
    'Companion guide to the Norman Atlas: era timeline, Story Library links, Norman surnames, guided expeditions, glossary index, GFNA/Y-DNA and mtDNA map layers, genealogy hub, genetic lineage explorer, and methodology.',
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
