import { buildMapHref, type MapDeepLinkParams } from '@/lib/map-deep-link';

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

/** Copy text to clipboard with fallback. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

/** Try the Web Share API if available, else copy to clipboard. */
export async function shareOrCopy(data: { title: string; text: string; url: string }): Promise<'shared' | 'copied' | 'failed'> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(data);
      return 'shared';
    } catch { /* user cancelled or not supported */ }
  }
  const ok = await copyToClipboard(data.url);
  return ok ? 'copied' : 'failed';
}
