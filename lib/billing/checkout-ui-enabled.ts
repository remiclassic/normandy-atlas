/**
 * Live Atlas Pro checkout (Stripe / billing API). Off by default until you set at build time:
 * `NEXT_PUBLIC_ATLAS_PRO_CHECKOUT_ENABLED=true`
 *
 * When false, upgrade controls stay visible as a “coming soon” teaser (disabled) so visitors know
 * Pro is on the way and can check back.
 */
export function isAtlasProCheckoutUiEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ATLAS_PRO_CHECKOUT_ENABLED === 'true';
}
