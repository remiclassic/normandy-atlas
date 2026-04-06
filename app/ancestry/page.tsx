'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Legacy URL; static export uses client redirect to `/genealogy`. */
export default function AncestryRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/genealogy');
  }, [router]);
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-[var(--color-background)] text-[13px] text-text-dim">
      Redirecting…
    </div>
  );
}
