/**
 * MapLibre aborts in-flight style/tile requests when `map.remove()` runs. That surfaces as
 * `AbortError` unhandled rejections (common in dev with React Strict Mode double-mount).
 * Suppress only those expected rejections for a short window after teardown.
 */
export function removeMapLibreMapQuietly(map: { remove: () => void }): void {
  const onRejection = (ev: PromiseRejectionEvent) => {
    const r = ev.reason as Error | undefined;
    if (!r) return;
    const name = 'name' in r ? String(r.name) : '';
    const msg = 'message' in r ? String(r.message) : '';
    if (
      name === 'AbortError' ||
      msg.includes('aborted') ||
      msg.includes('The user aborted') ||
      msg.includes('user aborted')
    ) {
      ev.preventDefault();
    }
  };

  window.addEventListener('unhandledrejection', onRejection);
  try {
    map.remove();
  } catch {
    /* already removed or partially torn down */
  }
  window.setTimeout(() => window.removeEventListener('unhandledrejection', onRejection), 500);
}
