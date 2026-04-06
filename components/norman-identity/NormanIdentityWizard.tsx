'use client';

import { memo, useCallback, useState } from 'react';
import type { AtlasLocale } from '@/core/types';
import type { AncestrySignalId, NormanIdentityInput, OriginRegionId } from '@/lib/norman-identity-engine';
import { t, type UiStringKey } from '@/lib/ui-strings';

const REGION_ORDER: OriginRegionId[] = ['quebec', 'france', 'england', 'ireland', 'usa', 'other'];

const REGION_LABEL_KEY: Record<OriginRegionId, UiStringKey> = {
  quebec: 'normanIdentity.region.quebec',
  france: 'normanIdentity.region.france',
  england: 'normanIdentity.region.england',
  ireland: 'normanIdentity.region.ireland',
  usa: 'normanIdentity.region.usa',
  other: 'normanIdentity.region.other',
};

const SIGNAL_ORDER: AncestrySignalId[] = [
  'french',
  'british',
  'irish',
  'germanic',
  'scandinavian',
  'not_sure',
];

const SIGNAL_LABEL_KEY: Record<AncestrySignalId, UiStringKey> = {
  french: 'normanIdentity.signal.french',
  british: 'normanIdentity.signal.british',
  irish: 'normanIdentity.signal.irish',
  germanic: 'normanIdentity.signal.germanic',
  scandinavian: 'normanIdentity.signal.scandinavian',
  not_sure: 'normanIdentity.signal.not_sure',
};

export type NormanIdentityWizardProps = {
  locale: AtlasLocale;
  onComplete: (input: NormanIdentityInput) => void;
  accentStyle?: React.CSSProperties;
};

const panelClass =
  'rounded-none border border-chrome-border-strong/50 bg-chrome-fill/30 p-5 shadow-[inset_0_0_0_1px_rgba(0,211,243,0.12)]';

const NormanIdentityWizard = memo(function NormanIdentityWizard({
  locale,
  onComplete,
  accentStyle,
}: NormanIdentityWizardProps) {
  const [step, setStep] = useState(0);
  const [originRegion, setOriginRegion] = useState<OriginRegionId>('quebec');
  const [otherRegionNote, setOtherRegionNote] = useState('');
  const [ancestrySignals, setAncestrySignals] = useState<AncestrySignalId[]>([]);
  const [surname, setSurname] = useState('');
  const [normanIntent, setNormanIntent] = useState(false);

  const toggleSignal = useCallback((id: AncestrySignalId) => {
    setAncestrySignals((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const submit = useCallback(() => {
    onComplete({
      originRegion,
      otherRegionText: originRegion === 'other' ? otherRegionNote.trim() || undefined : undefined,
      ancestrySignals,
      surname: surname.trim(),
      normanIntent,
    });
  }, [originRegion, otherRegionNote, ancestrySignals, surname, normanIntent, onComplete]);

  const next = useCallback(() => {
    if (step < 3) setStep((s) => s + 1);
    else submit();
  }, [step, submit]);

  const back = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  return (
    <div className="space-y-6" style={accentStyle}>
      <div className="flex gap-1.5" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 ${i <= step ? 'bg-cyan-400/80' : 'bg-chrome-border-strong/60'}`}
          />
        ))}
      </div>

      {step === 0 && (
        <div className={panelClass}>
          <h2 className="mb-4 font-display text-base font-semibold uppercase tracking-[0.08em] text-[var(--color-gold)]">
            {t('normanIdentity.wizard.step1.title', locale)}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {REGION_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setOriginRegion(id)}
                className={`rounded-none border px-3 py-2.5 text-left text-[length:var(--atlas-text-sm)] transition-colors ${
                  originRegion === id
                    ? 'border-cyan-400/50 bg-chrome-fill-active/80 text-parchment'
                    : 'border-chrome-border-strong/50 bg-chrome-fill/20 text-text-muted hover:border-gold/25 hover:text-parchment'
                }`}
              >
                {t(REGION_LABEL_KEY[id], locale)}
              </button>
            ))}
          </div>
          {originRegion === 'other' && (
            <label className="mt-4 block text-[length:var(--atlas-text-xs)] text-text-dim">
              <span className="mb-1 block uppercase tracking-wide">{t('normanIdentity.region.otherPlaceholder', locale)}</span>
              <input
                value={otherRegionNote}
                onChange={(e) => setOtherRegionNote(e.target.value)}
                className="mt-1 w-full rounded-none border border-chrome-border-strong/60 bg-background/60 px-3 py-2 text-parchment outline-none focus-visible:border-cyan-400/40"
              />
            </label>
          )}
        </div>
      )}

      {step === 1 && (
        <div className={panelClass}>
          <h2 className="mb-4 font-display text-base font-semibold uppercase tracking-[0.08em] text-[var(--color-gold)]">
            {t('normanIdentity.wizard.step2.title', locale)}
          </h2>
          <div className="flex flex-col gap-2">
            {SIGNAL_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => toggleSignal(id)}
                className={`flex items-center gap-2 rounded-none border px-3 py-2 text-left text-[length:var(--atlas-text-sm)] transition-colors ${
                  ancestrySignals.includes(id)
                    ? 'border-cyan-400/45 bg-chrome-fill-active/70 text-parchment'
                    : 'border-chrome-border-strong/50 bg-chrome-fill/15 text-text-muted hover:border-gold/25'
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-none border ${ancestrySignals.includes(id) ? 'border-cyan-400/60 bg-cyan-400/15' : 'border-chrome-border-strong/70'}`}
                  aria-hidden
                >
                  {ancestrySignals.includes(id) ? '✓' : ''}
                </span>
                {t(SIGNAL_LABEL_KEY[id], locale)}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={panelClass}>
          <h2 className="mb-1 font-display text-base font-semibold uppercase tracking-[0.08em] text-[var(--color-gold)]">
            {t('normanIdentity.wizard.step3.title', locale)}
          </h2>
          <p className="mb-3 text-[length:var(--atlas-text-xs)] text-text-dim">{t('normanIdentity.wizard.step3.hint', locale)}</p>
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            autoComplete="family-name"
            className="w-full rounded-none border border-chrome-border-strong/60 bg-background/60 px-3 py-2.5 text-parchment outline-none focus-visible:border-cyan-400/40"
            placeholder="—"
          />
        </div>
      )}

      {step === 3 && (
        <div className={panelClass}>
          <h2 className="mb-1 font-display text-base font-semibold uppercase tracking-[0.08em] text-[var(--color-gold)]">
            {t('normanIdentity.wizard.step4.title', locale)}
          </h2>
          <p className="mb-4 text-[length:var(--atlas-text-xs)] text-text-dim">{t('normanIdentity.wizard.step4.hint', locale)}</p>
          <button
            type="button"
            role="switch"
            aria-checked={normanIntent}
            onClick={() => setNormanIntent((v) => !v)}
            className={`flex w-full items-center justify-between gap-3 rounded-none border px-3 py-3 text-left text-[length:var(--atlas-text-sm)] transition-colors ${
              normanIntent
                ? 'border-cyan-400/45 bg-chrome-fill-active/70 text-parchment'
                : 'border-chrome-border-strong/50 bg-chrome-fill/15 text-text-muted'
            }`}
          >
            <span>{normanIntent ? t('normanIdentity.toggle.yes', locale) : t('normanIdentity.toggle.no', locale)}</span>
            <span className="atlas-text-cyan-aux-label text-[11px] uppercase tracking-wider">{normanIntent ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="rounded-none border border-chrome-border-strong/60 bg-chrome-fill/25 px-4 py-2 text-[length:var(--atlas-text-sm)] font-semibold text-text-muted transition-colors hover:border-gold/30 hover:text-parchment"
          >
            {t('normanIdentity.nav.back', locale)}
          </button>
        )}
        <button
          type="button"
          onClick={next}
          className="atlas-btn-cyan-secondary rounded-none px-4 py-2 text-[length:var(--atlas-text-sm)] font-semibold"
        >
          {step < 3 ? t('normanIdentity.nav.next', locale) : t('normanIdentity.nav.results', locale)}
        </button>
      </div>
    </div>
  );
});

export default NormanIdentityWizard;
