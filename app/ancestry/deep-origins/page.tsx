'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { buildDeepOriginsHref } from '@/lib/deep-origins-link';

/** Legacy URL; preserves `cat` and `site` via canonical helper. */
export default function LegacyDeepOriginsRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    const href = buildDeepOriginsHref({ cat: sp.get('cat'), site: sp.get('site') });
    router.replace(href);
  }, [router]);
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-[var(--color-background)] text-[13px] text-text-dim">
      Redirecting…
    </div>
  );
}
