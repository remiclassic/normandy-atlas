import { buildMapHref, type MapDeepLinkParams } from '@/lib/map-deep-link';
import { trackAtlasConversion } from '@/lib/analytics/conversion';

// ---------------------------------------------------------------------------
// Share helpers — basePath-aware public URLs + clipboard copy.
// ---------------------------------------------------------------------------

/**
 * Build a full public URL for sharing (includes origin + basePath).
 * Falls back to relative path when `window` is unavailable.
 */
export function buildPublicShareUrl(params: MapDeepLinkParams): string {
  const relative = buildMapHref(params);
  if (typeof window === 'undefined') return relative;

  const origin = window.location.origin;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const normalized = basePath.replace(/\/$/, '');

  return `${origin}${normalized}${relative}`;
}

/** Copy text to clipboard with fallback (handles missing focus / async Clipboard API). */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof document === 'undefined') return false;

  const fallbackExecCommand = (): boolean => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  };

  const tryAsyncClipboard = async (): Promise<boolean> => {
    if (!navigator.clipboard?.writeText) return false;
    if (!document.hasFocus()) {
      window.focus();
    }
    await navigator.clipboard.writeText(text);
    return true;
  };

  try {
    return await tryAsyncClipboard();
  } catch {
    window.focus();
    try {
      return await tryAsyncClipboard();
    } catch {
      return fallbackExecCommand();
    }
  }
}

/** Try the Web Share API if available, else copy to clipboard. */
export async function shareOrCopy(data: { title: string; text: string; url: string }): Promise<'shared' | 'copied' | 'failed'> {
  const mapDeepLink =
    typeof data.url === 'string' &&
    (data.url.includes('view=') || data.url.includes('era=') || data.url.includes('lineage='));
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(data);
      trackAtlasConversion('share_deep_link_native', { map_view: mapDeepLink });
      return 'shared';
    } catch { /* user cancelled or not supported */ }
  }
  const ok = await copyToClipboard(data.url);
  if (ok) {
    trackAtlasConversion('share_deep_link_copied', { map_view: mapDeepLink });
  }
  return ok ? 'copied' : 'failed';
}
