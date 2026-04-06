/**
 * Run: npx tsx scripts/test-norman-identity-engine.ts
 */
import assert from 'node:assert/strict';
import {
  analyzeSurname,
  computeNormanIdentity,
  NORMAN_IDENTITY_STORY_BEAT_IDS,
  strengthsFromNormalized,
  type LayerScore,
} from '../lib/norman-identity-engine';

function norm(s: LayerScore): LayerScore {
  let t = 0;
  for (const k of Object.keys(s) as (keyof LayerScore)[]) t += s[k];
  const o = { ...s };
  for (const k of Object.keys(o) as (keyof LayerScore)[]) o[k] = t > 0 ? o[k] / t : 0.2;
  return o;
}

const r1 = computeNormanIdentity({
  originRegion: 'quebec',
  ancestrySignals: ['french'],
  surname: 'Couture',
  normanIntent: true,
});
assert.equal(r1.storyBeatIds.length, 5);
assert.deepEqual([...r1.storyBeatIds], [...NORMAN_IDENTITY_STORY_BEAT_IDS]);
assert.ok(['frankish_core', 'blended', 'celtic_rooted', 'viking_influenced'].includes(r1.archetypeId));
assert.equal(r1.layers.length, 5);
for (const L of r1.layers) {
  assert.ok(['low', 'medium', 'high'].includes(L.strength));
}

const r2 = computeNormanIdentity({
  originRegion: 'ireland',
  ancestrySignals: ['irish', 'scandinavian'],
  surname: '',
  normanIntent: false,
});
assert.ok(r2.layers.some((l) => l.name === 'Celtic' && l.strength !== 'low') || r2.archetypeId === 'celtic_rooted');

const s = analyzeSurname('Anderson');
assert.ok((s.Norse ?? 0) > 0);

const st = strengthsFromNormalized(
  norm({ Celtic: 0.1, GalloRoman: 0.1, Frankish: 0.1, Norse: 0.1, Norman: 0.6 }),
);
assert.equal(st.Norman, 'high');

console.log('norman-identity-engine tests: ok');
