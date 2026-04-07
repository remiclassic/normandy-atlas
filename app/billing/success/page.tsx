'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { trackAtlasConversion } from '@/lib/analytics/conversion';

function BillingSuccessInner() {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = sp.get('session_id');
    if (!id) {
      trackAtlasConversion('pro_checkout_completed');
      router.replace('/profile?billing=success#atlas-pro');
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const billingApi = process.env.NEXT_PUBLIC_BILLING_API_URL?.trim().replace(/\/$/, '');
        if (billingApi) {
          await fetch(`${billingApi}/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ sessionId: id }),
          });
        }
        if (!cancelled) {
          trackAtlasConversion('pro_checkout_completed');
          router.replace('/profile?billing=success#atlas-pro');
        }
      } catch {
        if (!cancelled) router.replace('/profile#atlas-pro');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sp, router]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 px-4 text-center text-[14px] text-text-muted">
      <p>Confirming your subscription…</p>
      <p className="text-[12px] text-text-dim">You will be redirected to your profile.</p>
    </div>
  );
}

export default function BillingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-text-dim">Loading…</div>
      }
    >
      <BillingSuccessInner />
    </Suspense>
  );
}
