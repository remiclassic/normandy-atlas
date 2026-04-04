/**
 * Reports story beat ids missing ES/IT title or body overlays vs English canonical beats.
 * Run: npx tsx scripts/story-beat-i18n-coverage.ts
 */
import { getStoryBeats } from '../core/story/engine';
import { STORY_BEAT_TITLES_ES, STORY_BEAT_BODIES_ES } from '../data/atlas/story-beat-bodies-es';
import { STORY_BEAT_TITLES_IT, STORY_BEAT_BODIES_IT } from '../data/atlas/story-beat-bodies-it';

const beats = getStoryBeats(null);
const esTitleKeys = new Set(Object.keys(STORY_BEAT_TITLES_ES));
const esBodyKeys = new Set(Object.keys(STORY_BEAT_BODIES_ES));
const itTitleKeys = new Set(Object.keys(STORY_BEAT_TITLES_IT));
const itBodyKeys = new Set(Object.keys(STORY_BEAT_BODIES_IT));

const missingEsTitle: string[] = [];
const missingEsBody: string[] = [];
const missingItTitle: string[] = [];
const missingItBody: string[] = [];

for (const b of beats) {
  if (!esTitleKeys.has(b.id)) missingEsTitle.push(b.id);
  if (!esBodyKeys.has(b.id)) missingEsBody.push(b.id);
  if (!itTitleKeys.has(b.id)) missingItTitle.push(b.id);
  if (!itBodyKeys.has(b.id)) missingItBody.push(b.id);
}

console.log(`Full-timeline beats: ${beats.length}`);
console.log(`ES title gaps: ${missingEsTitle.length}`);
console.log(`ES body gaps: ${missingEsBody.length}`);
console.log(`IT title gaps: ${missingItTitle.length}`);
console.log(`IT body gaps: ${missingItBody.length}`);

if (process.argv.includes('--verbose')) {
  console.log('\nMissing ES titles:', missingEsTitle.slice(0, 50).join(', '), missingEsTitle.length > 50 ? '…' : '');
  console.log('Missing ES bodies:', missingEsBody.slice(0, 50).join(', '), missingEsBody.length > 50 ? '…' : '');
  console.log('Missing IT titles:', missingItTitle.slice(0, 50).join(', '), missingItTitle.length > 50 ? '…' : '');
  console.log('Missing IT bodies:', missingItBody.slice(0, 50).join(', '), missingItBody.length > 50 ? '…' : '');
}

process.exit(0);
