export function buildDeepOriginsHref(opts: { cat?: string | null; site?: string | null }): string {
  const params = new URLSearchParams();
  if (opts.cat) params.set('cat', opts.cat);
  if (opts.site) params.set('site', opts.site);
  const q = params.toString();
  return q ? `/ancestry/deep-origins?${q}` : '/ancestry/deep-origins';
}
