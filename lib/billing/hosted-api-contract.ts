/**
 * Contract for an optional hosted billing service at `NEXT_PUBLIC_BILLING_API_URL`
 * (static app cannot ship Route Handlers when `output: 'export'`).
 *
 * Endpoints (relative to that origin):
 * - GET  /entitlements — JSON {@link import('./types').EntitlementsResponse}, Set-Cookie as needed
 * - POST /checkout — body `{ cancelPath?: string }`, JSON `{ url?: string }`
 * - POST /complete — body `{ sessionId: string }`, sets customer cookie, JSON `{ ok: true }`
 * - POST /portal — body `{ returnPath?: string }`, JSON `{ url?: string }`
 * - POST /institution/redeem — body `{ key: string }`, JSON `{ ok: true, organization?: string }`
 * - POST /webhook — raw Stripe webhook (signed)
 *
 * Implementation reference: restore deleted `app/api/billing/*` routes from git history
 * into a small Next.js or Hono project with `output: 'standalone'` / Node server.
 */
export const HOSTED_BILLING_ROUTES = [
  'GET /entitlements',
  'POST /checkout',
  'POST /complete',
  'POST /portal',
  'POST /institution/redeem',
  'POST /webhook',
] as const;
