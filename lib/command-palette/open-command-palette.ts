/** Dispatched on `window` so headers and other surfaces can open the palette without prop drilling. */
export const OPEN_COMMAND_PALETTE_EVENT = 'atlas:open-command-palette';

export function requestOpenCommandPalette(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE_EVENT));
}
