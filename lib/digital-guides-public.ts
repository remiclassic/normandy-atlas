/**
 * Feature gate for the `/guides` page and navigation.
 * Set `NEXT_PUBLIC_DIGITAL_GUIDES_PUBLIC=true` when guides are ready to ship.
 */
export function isDigitalGuidesPublic(): boolean {
  return process.env.NEXT_PUBLIC_DIGITAL_GUIDES_PUBLIC === 'true';
}
