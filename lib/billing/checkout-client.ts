'use client';

import { trackAtlasConversion } from '@/lib/analytics/conversion';
import { isAtlasProCheckoutUiEnabled } from '@/lib/billing/checkout-ui-enabled';

export async function startAtlasProCheckout(cancelPath: string): Promise<boolean> {
  if (!isAtlasProCheckoutUiEnabled()) return false;
  trackAtlasConversion('pro_checkout_started');
  const billingApi = process.env.NEXT_PUBLIC_BILLING_API_URL?.trim().replace(/\/$/, '');
  if (billingApi) {
    try {
      const r = await fetch(`${billingApi}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ cancelPath }),
      });
      const j = (await r.json()) as { url?: string };
      if (j.url) {
        window.location.href = j.url;
        return true;
      }
    } catch {
      /* fall through */
    }
  }

  const pay = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL?.trim();
  if (pay) {
    window.location.href = pay;
    return true;
  }

  return false;
}

export async function openAtlasBillingPortal(returnPath: string): Promise<boolean> {
  const billingApi = process.env.NEXT_PUBLIC_BILLING_API_URL?.trim().replace(/\/$/, '');
  if (!billingApi) return false;
  try {
    const r = await fetch(`${billingApi}/portal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ returnPath }),
    });
    const j = (await r.json()) as { url?: string };
    if (j.url) {
      window.location.href = j.url;
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}
