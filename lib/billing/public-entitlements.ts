import type { EntitlementsResponse } from '@/lib/billing/types';

/**
 * Entitlements for static export / CDN hosting (no Next.js Route Handlers).
 *
 * Priority:
 * 1. `NEXT_PUBLIC_BILLING_API_URL` — hosted Stripe/session API (GET /entitlements, cookies).
 * 2. `NEXT_PUBLIC_NORMAN_ATLAS_BILLING_BYPASS=1` — unlock all Pro tools (team / local).
 * 3. `NEXT_PUBLIC_ATLAS_PRO_PREVIEW=true` — same as bypass without the “dev” label.
 * 4. Otherwise free tier (gates on macro compare, CSV, lineage compare).
 *
 * Checkout: use `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL` (Stripe Payment Link) or POST
 * `{BILLING_API}/checkout` when a billing API is deployed (see repo docs / deployment).
 */
function stripeSurfaceConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL?.trim() ||
      process.env.NEXT_PUBLIC_BILLING_API_URL?.trim(),
  );
}

function freeTier(): EntitlementsResponse {
  return {
    atlasPro: false,
    institution: false,
    institutionLabel: null,
    macroCompare: false,
    macroCsvExport: false,
    lineageCompareTool: false,
    hasStripeCustomer: false,
    stripeConfigured: stripeSurfaceConfigured(),
    devBypass: false,
    stripeSubscriptionActive: false,
  };
}

function allPro(opts: { devBypass: boolean; stripeSubscriptionActive?: boolean }): EntitlementsResponse {
  return {
    atlasPro: true,
    institution: false,
    institutionLabel: null,
    macroCompare: true,
    macroCsvExport: true,
    lineageCompareTool: true,
    hasStripeCustomer: Boolean(opts.stripeSubscriptionActive),
    stripeConfigured: stripeSurfaceConfigured(),
    devBypass: opts.devBypass,
    stripeSubscriptionActive: Boolean(opts.stripeSubscriptionActive),
  };
}

export async function getPublicEntitlements(): Promise<EntitlementsResponse> {
  if (typeof window === 'undefined') {
    return freeTier();
  }

  const billingApi = process.env.NEXT_PUBLIC_BILLING_API_URL?.trim().replace(/\/$/, '');
  if (billingApi) {
    try {
      const r = await fetch(`${billingApi}/entitlements`, {
        credentials: 'include',
        cache: 'no-store',
      });
      if (r.ok) return (await r.json()) as EntitlementsResponse;
    } catch {
      /* fall through */
    }
  }

  if (process.env.NEXT_PUBLIC_NORMAN_ATLAS_BILLING_BYPASS === '1') {
    return allPro({ devBypass: true });
  }

  if (process.env.NEXT_PUBLIC_ATLAS_PRO_PREVIEW === 'true') {
    return allPro({ devBypass: false });
  }

  return freeTier();
}
