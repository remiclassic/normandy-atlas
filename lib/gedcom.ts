/**
 * Minimal GEDCOM 5.5 parser for INDI/FAM → {@link FamilyTreePerson} graph.
 */
import type { FamilyTreePerson } from '@/core/ancestry/types';

export interface GedcomParseIssue {
  message: string;
}

export interface GedcomImportResult {
  people: Record<string, FamilyTreePerson>;
  issues: GedcomParseIssue[];
}

interface IndiAcc {
  xref: string;
  name?: string;
  birthYear?: number;
  deathYear?: number;
  birthPlac?: string;
  deathPlac?: string;
}

function stripXref(raw: string): string {
  const m = raw.trim().match(/^@([^@]+)@$/);
  return m ? m[1] : raw.trim();
}

function parseYearFromDate(raw: string): number | undefined {
  const m = raw.match(/\b(\d{3,4})\b/);
  if (!m) return undefined;
  const y = parseInt(m[1], 10);
  return Number.isFinite(y) ? y : undefined;
}

function parseNameLine(value: string): string {
  const slash = value.split('/');
  if (slash.length >= 3) {
    const given = slash[0].trim();
    const sur = slash[1].trim();
    return [given, sur].filter(Boolean).join(' ').trim() || value.trim();
  }
  return value.trim();
}

type Tok = { level: number; tag: string; value: string };

function tokenizeLine(line: string): Tok | null {
  const m = line.match(/^(\d+)\s+(@\S+@\s+)?(\S+)\s*(.*)$/);
  if (!m) return null;
  return { level: parseInt(m[1], 10), tag: m[3], value: (m[4] ?? '').trim() };
}

export function parseGedcomToPeople(text: string): GedcomImportResult {
  const issues: GedcomParseIssue[] = [];
  const indis = new Map<string, IndiAcc>();
  type FamAccum = { id: string; husb?: string; wife?: string; chil: string[] };
  const fams: FamAccum[] = [];

  const lines = text.replace(/\r\n/g, '\n').split('\n').map((l) => l.trim()).filter(Boolean);
  let i = 0;

  while (i < lines.length) {
    const t0 = tokenizeLine(lines[i]!);
    if (!t0 || t0.level !== 0) {
      i += 1;
      continue;
    }
    const parts = t0.value.split(/\s+/);
    const ptr = parts[0] ?? '';

    if (t0.tag === 'INDI' && ptr.startsWith('@')) {
      const id = stripXref(ptr);
      const acc: IndiAcc = { xref: id };
      indis.set(id, acc);
      i += 1;
      while (i < lines.length) {
        const t = tokenizeLine(lines[i]!);
        if (!t || t.level === 0) break;
        if (t.level === 1 && t.tag === 'NAME') {
          acc.name = parseNameLine(t.value);
        }
        if (t.level === 1 && t.tag === 'BIRT') {
          i += 1;
          while (i < lines.length) {
            const st = tokenizeLine(lines[i]!);
            if (!st || st.level <= 1) break;
            if (st.level === 2 && st.tag === 'DATE') {
              const y = parseYearFromDate(st.value);
              if (y != null) acc.birthYear = y;
            }
            if (st.level === 2 && st.tag === 'PLAC') acc.birthPlac = st.value;
            i += 1;
          }
          continue;
        }
        if (t.level === 1 && t.tag === 'DEAT') {
          i += 1;
          while (i < lines.length) {
            const st = tokenizeLine(lines[i]!);
            if (!st || st.level <= 1) break;
            if (st.level === 2 && st.tag === 'DATE') {
              const y = parseYearFromDate(st.value);
              if (y != null) acc.deathYear = y;
            }
            if (st.level === 2 && st.tag === 'PLAC') acc.deathPlac = st.value;
            i += 1;
          }
          continue;
        }
        i += 1;
      }
      continue;
    }

    if (t0.tag === 'FAM' && ptr.startsWith('@')) {
      const id = stripXref(ptr);
      const fam: FamAccum = { id, chil: [] };
      fams.push(fam);
      i += 1;
      while (i < lines.length) {
        const t = tokenizeLine(lines[i]!);
        if (!t || t.level === 0) break;
        if (t.level === 1 && t.tag === 'HUSB' && t.value.startsWith('@')) {
          fam.husb = stripXref(t.value.split(/\s+/)[0] ?? '');
        }
        if (t.level === 1 && t.tag === 'WIFE' && t.value.startsWith('@')) {
          fam.wife = stripXref(t.value.split(/\s+/)[0] ?? '');
        }
        if (t.level === 1 && t.tag === 'CHIL' && t.value.startsWith('@')) {
          fam.chil.push(stripXref(t.value.split(/\s+/)[0] ?? ''));
        }
        i += 1;
      }
      continue;
    }

    i += 1;
  }

  const people: Record<string, FamilyTreePerson> = {};
  for (const [id, acc] of indis) {
    people[id] = {
      id,
      name: acc.name ?? id,
      birthYear: acc.birthYear,
      deathYear: acc.deathYear,
      birthPlaceFreeform: acc.birthPlac,
      deathPlaceFreeform: acc.deathPlac,
    };
  }

  for (const f of fams) {
    const father = f.husb && people[f.husb] ? f.husb : undefined;
    const mother = f.wife && people[f.wife] ? f.wife : undefined;
    for (const cid of f.chil) {
      const ch = people[cid];
      if (!ch) {
        issues.push({ message: `Missing INDI for child ${cid} in FAM ${f.id}` });
        continue;
      }
      if (father) people[cid] = { ...ch, fatherId: father };
      if (mother) people[cid] = { ...people[cid], motherId: mother };
    }
  }

  if (indis.size === 0) {
    issues.push({ message: 'No INDI records found — file may be empty or use unsupported tags.' });
  }

  return { people, issues };
}

export function exportPeopleToGedcom(people: Record<string, FamilyTreePerson>): string {
  const body: string[] = ['0 HEAD', '1 SOUR Norman Atlas', '1 GEDC', '2 VERS 5.5', '2 FORM LINEAGE-LINKED'];
  for (const p of Object.values(people)) {
    body.push(`0 @${p.id}@ INDI`);
    body.push(`1 NAME ${p.name.replace(/\//g, '')}`);
    if (p.birthYear != null) {
      body.push('1 BIRT');
      body.push(`2 DATE ${p.birthYear}`);
      if (p.birthPlaceFreeform) body.push(`2 PLAC ${p.birthPlaceFreeform}`);
      if (p.birthPlaceId) body.push(`2 NOTE Atlas place id: ${p.birthPlaceId}`);
    }
    if (p.deathYear != null) {
      body.push('1 DEAT');
      body.push(`2 DATE ${p.deathYear}`);
      if (p.deathPlaceFreeform) body.push(`2 PLAC ${p.deathPlaceFreeform}`);
    }
  }
  body.push('0 TRLR');
  return body.join('\n');
}
