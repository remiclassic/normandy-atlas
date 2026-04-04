const raw =
  (typeof process !== 'undefined' &&
    (process.env.NEXT_PUBLIC_BASE_PATH || process.env.NEXT_BASE_PATH)) ||
  '';
const normalized = raw.replace(/\/$/, '');

/** Prefix a site-relative path (e.g. `/story/foo.jpg`) with the deploy basePath. */
export function publicAssetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (normalized && path.startsWith(`${normalized}/`)) return path;
  return `${normalized}${path}`;
}
