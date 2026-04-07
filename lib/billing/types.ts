/**
 * Norman Atlas — entitlement flags returned to the client (never include raw Stripe ids).
 *
 * Matrix (free vs Atlas Pro / institution):
 * - Map: all eras, story library, macro “historical peoples” layer ON — single-year slice (free).
 * - Macro **compare two years** (layer + timeline + panel deltas): Pro / institution.
 * - Macro region panel **CSV export**: Pro / institution.
 * - `/lineage-explorer/compare` tool: Pro / institution.
 * - Story mode & cinematic beats: always free (no paywall mid-narrative).
 */
export type EntitlementsResponse = {
  atlasPro: boolean;
  /** Active institution seat (pilot key redemption). */
  institution: boolean;
  institutionLabel: string | null;
  macroCompare: boolean;
  macroCsvExport: boolean;
  lineageCompareTool: boolean;
  /** User completed checkout and has a Stripe customer cookie (may still be trialing / past_due). */
  hasStripeCustomer: boolean;
  /** Server has Stripe secret + price id (checkout available). */
  stripeConfigured: boolean;
  /** Local / staging bypass via NORMAN_ATLAS_BILLING_BYPASS=1 */
  devBypass: boolean;
  /** Stripe Atlas Pro subscription is active (opens Customer Portal). */
  stripeSubscriptionActive: boolean;
};

export type ProGateReason = 'macro_compare' | 'macro_csv' | 'lineage_compare';
