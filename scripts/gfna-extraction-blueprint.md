# Francogene / GFNA haplogroup extraction blueprint (agent prompt)

Use this checklist when turning FrancoGene “Genealogy of the French in North America” (GFNA) pages into `data/atlas/gfna-dna-records.jsonl` for Norman Atlas.

## Compliance

- FrancoGene compilations are editorial work. Obtain permission or rely on manual extraction you control; avoid bulk scraping if site terms disallow it.
- Always store **exact** `source_page` URLs per row and keep **confirmed** vs **presumed** distinct (never merge without `status`).

## Objective

Produce **one JSON object per line** (JSONL), each satisfying the canonical schema (see `data/atlas/gfna-dna-types.ts` — `GfnaDnaRecord`).

### Required fields

| Field | Notes |
|-------|--------|
| `ancestor_name` | e.g. `COUTURE, Guillaume` or `GUYON Jean` |
| `sex_line_type` | `Y` or `mtDNA` |
| `haplogroup` | Raw label from the page |
| `status` | `confirmed` (triangulated) or `presumed` |
| `source_page` | Full URL of the page the row was copied from |

### Optional fields

- `signature_type`: `SNP`, `STR`, `rCRS`, `RSRS`, or `unknown`
- `spouse`, `arrival_year`, `region_in_new_france`, `descendant_context`, `notes`
- `tri_id`: e.g. `TRI0550` when present (Y catalogue or mtDNA when matched to triangulation index)
- `family_sheet_no`: numeric id for `gfangfna.php?no=`
- `collection`: `gfna-y-confirmed` | `gfna-y-presumed` | `gfna-mt-confirmed` | `gfna-mt-presumed` | `family-sheet` | `royal-descents` | `other`
- `source_organization`: e.g. `FrancoGene`

## Source buckets (capture separately)

1. **Confirmed Y** — triangulated paternal lines (`adny.html` / triangulation list). *In this repo, primary ingest is `scripts/parse-francogene-ydna.mjs` → `new-france-ydna.ts`; do not duplicate confirmed Y in JSONL unless you deliberately migrate pipelines.*
2. **Presumed Y** — `adny2.html` (or equivalent); always `status: presumed`.
3. **Confirmed mtDNA** — `adnmt.html` (confirmed table) and the triangulation index `https://www.francogene.com/triangulation/mt.php` (often newer; extra lines not yet in the static table).
4. **Presumed mtDNA** — `adnmt2.html` when present.
5. **Index** — `listes.html`: use only to verify you hit all four catalogue types.
6. **Family sheets** — `ymtx/gfangfna.php?no=…`: capture inline haplogroups; set `family_sheet_no` and `collection: family-sheet`.
7. **Royal / notable** — `qrd.html`: set `collection: royal-descents`; put narrative cues in `descendant_context` / `notes`.

## Example JSONL lines

```json
{"ancestor_name":"EXAMPLE, Marie","sex_line_type":"mtDNA","haplogroup":"H3c","status":"confirmed","source_page":"https://www.francogene.com/gfna/gfna/998/adnmt.html","arrival_year":1668,"family_sheet_no":"10051","collection":"gfna-mt-confirmed"}
```

```json
{"ancestor_name":"EXAMPLE, Jean","sex_line_type":"Y","haplogroup":"R1b-FT67458","status":"presumed","source_page":"https://www.francogene.com/gfna/gfna/998/adny2.html","arrival_year":1670,"collection":"gfna-y-presumed","notes":"Single-line descendant; possible NPE"}
```

## Validation rules

- **Y + `status: presumed`** → ends up in `gfna-ydna-presumed.ts` after `npm run build:gfna`.
- **Y + `status: confirmed`** in JSONL is **skipped** by the build script (primary catalogue = paste parser) — remove confirmed Y rows from JSONL or expect a skip count in `gfna-dna-records.validation.json`.
- **`tri_id`** on presumed Y is optional; synthesised ids are used when absent.
- **`family_sheet_no`** should open `https://www.francogene.com/ymtx/gfangfna.php?no=<id>`.

## Automated mtDNA refresh (this repo)

```bash
npm run refresh:gfna-mtdna              # HTML tables + mt.php → jsonl
npm run refresh:gfna-mtdna:enrich     # same + fetch GFNA person pages for family_sheet_no / signature hints
npm run build:gfna                    # emit TypeScript GeoJSON bundles
```

`npm run build` runs `prebuild`, which executes `build:gfna` so clones with a committed `gfna-dna-records.jsonl` stay in sync. Optional fetch cache: `data/atlas/gfna-mtdna-enrich-cache.json` (gitignored); family sheet numbers are still stored in the JSONL after enrich.

## Build

```bash
npm run build:gfna
```

Outputs:

- `data/atlas/gfna-ydna-presumed.ts`
- `data/atlas/gfna-mtdna-lineages.ts`
- `data/atlas/gfna-dna-records.validation.json`

## Attribution (UI)

Pie charts and map layers should cite Francogene / GFNA URLs already aligned in `core/lineage/regional-haplogroup-snapshots.ts` and per-feature `sourcePage` where set.
