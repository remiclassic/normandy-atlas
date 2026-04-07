export type AtlasConversionEvent =
  | 'pro_gate_shown'
  | 'pro_checkout_started'
  | 'pro_checkout_completed'
  | 'share_deep_link_copied'
  | 'share_deep_link_native';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** GA4 + Meta Pixel custom events (best-effort; no-op if scripts absent). */
export function trackAtlasConversion(
  event: AtlasConversionEvent,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }
  } catch {
    /* ignore */
  }
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', event, params);
    }
  } catch {
    /* ignore */
  }
}
