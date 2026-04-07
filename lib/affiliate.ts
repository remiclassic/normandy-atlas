/**
 * Appends query params from `NEXT_PUBLIC_AFFILIATE_LINK_QUERY` to external URLs only.
 * Example env: `?ref=normanatlas` or `aff=na`
 */
export function appendAffiliateToUrl(rawUrl: string): string {
  const suffix = process.env.NEXT_PUBLIC_AFFILIATE_LINK_QUERY?.trim();
  if (!suffix || !/^https?:\/\//i.test(rawUrl)) return rawUrl;
  try {
    const u = new URL(rawUrl);
    const q = suffix.startsWith('?') ? suffix.slice(1) : suffix;
    const extra = new URLSearchParams(q);
    extra.forEach((value, key) => {
      if (!u.searchParams.has(key)) u.searchParams.set(key, value);
    });
    return u.toString();
  } catch {
    return rawUrl;
  }
}
