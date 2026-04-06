import { haplogroupProfiles } from '@/data/atlas/lineage';
import type { HaplogroupProfile } from '@/core/types';

const byId = new Map<string, HaplogroupProfile>(haplogroupProfiles.map((p) => [p.id, p]));

export function listHaplogroupProfiles(): readonly HaplogroupProfile[] {
  return haplogroupProfiles;
}

export function getHaplogroupProfile(id: string): HaplogroupProfile | undefined {
  return byId.get(id);
}

export function getHaplogroupChildren(parentId: string): HaplogroupProfile[] {
  return haplogroupProfiles.filter((p) => p.parentId === parentId);
}

export function getHaplogroupParent(profile: HaplogroupProfile): HaplogroupProfile | undefined {
  if (!profile.parentId) return undefined;
  return byId.get(profile.parentId);
}

/** Normalize for lookups: uppercase, strip y-dna/mtdna/mito prefixes, keep alphanumerics and hyphens. */
export function normalizeHaplogroupQuery(raw: string): string {
  let s = raw.trim().toUpperCase();
  s = s.replace(/^Y[-\s]?DNA\s*/i, '').replace(/^MT[-\s]?DNA\s*/i, '').replace(/^MITO(CHONDRIAL)?\s*/i, '');
  s = s.replace(/[>\s]+/g, '');
  s = s.replace(/[^A-Z0-9-]/g, '');
  return s;
}

/** Map normalized alias/name/id token -> canonical profile id (last wins on collision — avoid duplicate aliases). */
export function buildHaplogroupAliasMap(): Map<string, string> {
  const m = new Map<string, string>();
  for (const p of haplogroupProfiles) {
    const register = (tok: string) => {
      const n = normalizeHaplogroupQuery(tok);
      if (n) m.set(n, p.id);
    };
    register(p.id);
    register(p.name);
    for (const a of p.aliases ?? []) register(a);
  }
  return m;
}

/** Walk parent chain from profile to root. */
export function getAncestorChain(profile: HaplogroupProfile): HaplogroupProfile[] {
  const out: HaplogroupProfile[] = [];
  let cur: HaplogroupProfile | undefined = profile;
  const guard = new Set<string>();
  while (cur && !guard.has(cur.id)) {
    guard.add(cur.id);
    out.push(cur);
    cur = cur.parentId ? byId.get(cur.parentId) : undefined;
  }
  return out;
}
