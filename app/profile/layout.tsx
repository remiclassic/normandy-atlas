import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traveller Profile — Norman Atlas',
  description:
    'View your exploration progress, unlocked milestones, and achievement gallery across the Norman Atlas.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
