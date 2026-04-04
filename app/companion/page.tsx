import type { Metadata } from 'next';
import CompanionShell from '@/components/companion/CompanionShell';
import { extractCompanionToc, getCompanionSource } from '@/lib/load-companion';
import './companion-tactical.css';
import './print.css';

const title = 'Reading the Norman Atlas — Official companion | Norman Atlas';
const description =
  'Official companion to Norman Atlas: narrative geography plus tactical UI notes — eras, layers, evidence grades, scenarios, and the atlas contract.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

export default function CompanionPage() {
  const source = getCompanionSource();
  const flatToc = extractCompanionToc(source);

  return <CompanionShell source={source} flatToc={flatToc} />;
}
