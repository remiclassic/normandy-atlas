'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { useMapStore } from '@/lib/store';
import { useAncestryStore } from '@/lib/ancestry-store';
import { getPlace } from '@/core';
import { t } from '@/lib/ui-strings';
import { GENEALOGY_HUB_PATH } from '@/lib/genealogy-paths';

/** `selectedId` is feature id `${personId}:birth` or `:death` from map pins. */
const UserAncestryPinDetail = memo(function UserAncestryPinDetail({ selectedId }: { selectedId: string }) {
  const locale = useMapStore((s) => s.locale);
  const personId = useMemo(() => selectedId.replace(/:(birth|death)$/, ''), [selectedId]);
  const pinKind = useMemo(() => (selectedId.endsWith(':death') ? 'death' : 'birth'), [selectedId]);
  const person = useAncestryStore((s) => s.people[personId]);

  if (!person) {
    return (
      <div className="px-7 pt-7 pb-5">
        <p className="text-sm text-text-muted">This person is no longer in your saved tree.</p>
      </div>
    );
  }

  const placeId = pinKind === 'birth' ? person.birthPlaceId : person.deathPlaceId;
  const freeform = pinKind === 'birth' ? person.birthPlaceFreeform : person.deathPlaceFreeform;
  const pl = placeId ? getPlace(placeId) : undefined;

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <span className="inline-flex text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/60 bg-gold/[0.06] px-2.5 py-1 rounded-md border border-gold/10 mb-2">
          {t('genealogy.navLabel', locale)}
        </span>
        <h2 className="text-[22px] font-display font-bold text-parchment leading-tight tracking-[-0.01em]">
          {person.name}
        </h2>
        <p className="text-xs text-text-dim mt-1 uppercase tracking-wider">
          {pinKind === 'birth' ? 'Birth pin' : 'Death pin'} · your tree
        </p>
      </div>
      <div className="accent-line-gold mx-7" />
      <div className="px-7 py-5 space-y-2 text-[13px] text-text-muted">
          {(pinKind === 'birth' ? person.birthYear : person.deathYear) != null && (
            <p>
              <span className="text-text-dim">Year: </span>
              {pinKind === 'birth' ? person.birthYear : person.deathYear}
            </p>
          )}
          {placeId && (
            <p>
              <span className="text-text-dim">Atlas place: </span>
              {pl?.id ?? placeId}
            </p>
          )}
          {freeform && (
            <p>
              <span className="text-text-dim">Freeform: </span>
              {freeform}
            </p>
          )}
        <Link
          href={GENEALOGY_HUB_PATH}
          className="inline-block mt-3 text-gold/80 text-[12px] underline decoration-gold/30 underline-offset-2 hover:text-gold"
        >
          {t('ancestry.editInGenealogyHub', locale)}
        </Link>
      </div>
    </>
  );
});

export default UserAncestryPinDetail;
