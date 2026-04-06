/**
 * Removes `.next` so the next `next dev` / `next build` starts from a cold cache.
 * Fixes ChunkLoadError / missing `_next/static/chunks/*` after interrupted dev or HMR glitches.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const nextDir = path.join(root, '.next');

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  process.stdout.write('Removed .next\n');
} else {
  process.stdout.write('No .next directory; nothing to remove.\n');
}
