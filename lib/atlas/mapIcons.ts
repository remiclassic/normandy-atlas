import type { Map as MaplibreMap } from 'maplibre-gl';
import { ALL_ATLAS_ICON_IDS, atlasIconImageName, type AtlasIconId } from './atlasIconId';

// SVG path data keyed by AtlasIconId. Shares silhouettes with the React
// components in components/atlas/icons but as raw strings so we can
// rasterize without a DOM/React tree.

const ICON_PATHS: Record<AtlasIconId, string> = {
  city: '<rect x="3" y="10" width="5" height="11" rx="0.5"/><rect x="10" y="4" width="5" height="17" rx="0.5"/><rect x="17" y="8" width="4" height="13" rx="0.5"/><line x1="12.5" y1="1" x2="12.5" y2="4"/>',
  settlement: '<path d="M4 21V12l8-8 8 8v9"/><path d="M9 21v-6h6v6"/>',
  fortress: '<path d="M2 21V11h4V7h4V3h4v4h4v4h4v10"/><rect x="9" y="15" width="6" height="6" rx="3"/>',
  religious: '<path d="M12 2v6M9 5h6"/><path d="M7 8l5 3 5-3"/><path d="M7 8v13h10V8"/><path d="M10 21v-5a2 2 0 0 1 4 0v5"/>',
  battle: '<path d="M5 3l7 7M19 3l-7 7"/><path d="M3 5l2-2M21 5l-2-2"/><circle cx="12" cy="14" r="6"/><path d="M9 14l2 2 4-4"/>',
  port: '<path d="M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M12 4v10"/><path d="M12 8l6 3-6 3"/>',
  trade: '<circle cx="12" cy="12" r="9"/><path d="M12 7v4l3 2"/><path d="M8 15h8"/>',
  burial: '<path d="M12 2v20"/><path d="M7 7h10"/><path d="M6 21c0-4 3-6 6-6s6 2 6 6"/>',
  megalith: '<path d="M4 21L7 6h4l-1 15"/><path d="M14 21l-1-15h4l3 15"/><path d="M6 6h12" stroke-width="2.2"/>',
  palace: '<path d="M3 21h18"/><path d="M5 21V10"/><path d="M19 21V10"/><path d="M3 10l9-7 9 7"/><path d="M9 21v-5h6v5"/>',
  expedition: '<circle cx="12" cy="12" r="9"/><path d="M12 3a15 15 0 0 1 0 18"/><path d="M12 3a15 15 0 0 0 0 18"/><path d="M3 12h18"/>',
  person: '<circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>',
  artifact: '<path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/>',
  militaryCamp: '<path d="M3 21l9-16 9 16H3z"/><path d="M12 12v5"/><path d="M10 17h4"/>',
  cultural: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8M8 11h5"/>',
  hillfort: '<path d="M2 21c3-3 6-10 10-14s7 4 10-2"/><path d="M9 10v-2h6v2"/><rect x="10" y="10" width="4" height="5" rx="0.5"/>',
  generic: '<path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>',
};

interface ThemeColors {
  stroke: string;
  fill: string;
}

const THEME_COLORS: Record<'dark' | 'parchment', ThemeColors> = {
  dark:      { stroke: '#d4c9a8', fill: 'rgba(212, 201, 168, 0.15)' },
  parchment: { stroke: '#3a3020', fill: 'rgba(58, 48, 32, 0.12)' },
};

const ICON_SIZE = 48;
const VIEWBOX = 24;

function rasterizeSvg(
  pathMarkup: string,
  colors: ThemeColors,
  size: number,
  dpr: number,
): ImageData {
  const px = size * dpr;
  const canvas = typeof OffscreenCanvas !== 'undefined'
    ? new OffscreenCanvas(px, px)
    : document.createElement('canvas');
  if ('width' in canvas) {
    canvas.width = px;
    canvas.height = px;
  }
  const ctx = (canvas as HTMLCanvasElement).getContext('2d')!;
  const scale = px / VIEWBOX;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);

  // Build a temporary SVG and render via Path2D by parsing an Image.
  // Simpler: draw a data-uri SVG into the canvas.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX} ${VIEWBOX}" width="${px}" height="${px}" fill="${colors.fill}" stroke="${colors.stroke}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${pathMarkup}</svg>`;

  return new Promise<ImageData>((resolve) => {
    const img = new Image(px, px);
    img.onload = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(img, 0, 0, px, px);
      resolve(ctx.getImageData(0, 0, px, px));
    };
    img.onerror = () => {
      // Fallback: filled circle
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.beginPath();
      ctx.arc(px / 2, px / 2, px / 3, 0, Math.PI * 2);
      ctx.fillStyle = colors.stroke;
      ctx.globalAlpha = 0.6;
      ctx.fill();
      resolve(ctx.getImageData(0, 0, px, px));
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }) as unknown as ImageData;
}

async function rasterizeSvgAsync(
  pathMarkup: string,
  colors: ThemeColors,
  size: number,
  dpr: number,
): Promise<ImageData> {
  const px = size * dpr;
  const canvas = typeof OffscreenCanvas !== 'undefined'
    ? new OffscreenCanvas(px, px)
    : document.createElement('canvas');
  if ('width' in canvas) {
    canvas.width = px;
    canvas.height = px;
  }
  const ctx = (canvas as HTMLCanvasElement).getContext('2d')!;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX} ${VIEWBOX}" width="${px}" height="${px}" fill="${colors.fill}" stroke="${colors.stroke}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${pathMarkup}</svg>`;

  return new Promise<ImageData>((resolve) => {
    const img = new Image(px, px);
    img.onload = () => {
      ctx.drawImage(img, 0, 0, px, px);
      resolve(ctx.getImageData(0, 0, px, px));
    };
    img.onerror = () => {
      ctx.beginPath();
      ctx.arc(px / 2, px / 2, px / 3, 0, Math.PI * 2);
      ctx.fillStyle = colors.stroke;
      ctx.globalAlpha = 0.6;
      ctx.fill();
      resolve(ctx.getImageData(0, 0, px, px));
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
}

/**
 * Register all atlas POI icons into a MapLibre map instance.
 * Call once after map 'load' and on theme change.
 */
export async function registerAtlasMapIcons(
  map: MaplibreMap,
  theme: 'dark' | 'parchment' = 'dark',
): Promise<void> {
  const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
  const colors = THEME_COLORS[theme];

  const jobs = ALL_ATLAS_ICON_IDS.map(async (id) => {
    const name = atlasIconImageName(id, theme);
    // Remove previous version if theme changed.
    if (map.hasImage(name)) map.removeImage(name);
    const data = await rasterizeSvgAsync(ICON_PATHS[id], colors, ICON_SIZE, dpr);
    if (!map.hasImage(name)) {
      map.addImage(name, data, { pixelRatio: dpr });
    }
  });

  await Promise.all(jobs);
}
