/**
 * Export all Normandy data modules to static GeoJSON files.
 * Run: npx tsx scripts/export-normandy-geo.ts
 *
 * Outputs to data/normandy/geo/*.geojson
 */

import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

import { normandyExpansionGeoJson } from '../data/normandy/expansion-geo';
import { normandyRiversGeoJson } from '../data/normandy/rivers-geo';
import { culturalZonesGeoJson } from '../data/normandy/cultural-zones-geo';
import { buildDensityGeoJson } from '../data/normandy/density-points';
import { buildEvidenceGeoJson } from '../data/normandy/evidence-points';
import { buildToponymGeoJson } from '../data/normandy/toponymy-points';
import { microRegionsGeoJson, normandyBoundaryGeoJson } from '../data/normandy/micro-regions-geo';

const OUT_DIR = join(__dirname, '..', 'data', 'normandy', 'geo');

mkdirSync(OUT_DIR, { recursive: true });

const datasets: [string, object][] = [
  ['expansion-phases.geojson', normandyExpansionGeoJson],
  ['rivers.geojson', normandyRiversGeoJson],
  ['cultural-zones.geojson', culturalZonesGeoJson],
  ['settlement-density.geojson', buildDensityGeoJson()],
  ['archaeological-evidence.geojson', buildEvidenceGeoJson()],
  ['norse-place-names.geojson', buildToponymGeoJson()],
  ['micro-regions.geojson', microRegionsGeoJson],
  ['normandy-boundary.geojson', normandyBoundaryGeoJson],
];

for (const [filename, data] of datasets) {
  const path = join(OUT_DIR, filename);
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`  wrote ${path}`);
}

console.log(`\nExported ${datasets.length} GeoJSON files to ${OUT_DIR}`);
