'use client';

import { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore, NORMAN_NODE_PERIOD_DEFAULT } from '@/lib/store';
import type { BasemapMode, NormanExpansionPreset, NormanNodePeriod } from '@/lib/store';
import { layerConfigs } from '@/data/layers';

const LAYER_ICONS: Record<string, React.ReactNode> = {
  'regions-fill': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5L7 1l5 2.5v7L7 13l-5-2.5v-7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  ),
  'regions-stroke': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="2" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
    </svg>
  ),
  'regions-labels': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 11L7 3l4 8M4.5 8.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  routes: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 12C4 8 6 4 12 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="2" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  settlements: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 8v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'normandy-micro-regions': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 5l5-3 5 3v4l-5 3-5-3V5z" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" opacity="0.6" />
      <path d="M7 2v10M2 5l10 4M12 5L2 9" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
    </svg>
  ),
  'normandy-expansion': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 10L7 2l4 8H3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5 7h4" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  ),
  'normandy-rivers': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 2C5 5 4 9 7 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 5C9 7 10 9 11 12" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  'normandy-culture': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="5" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.0" strokeDasharray="2 1.5" />
      <circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.0" strokeDasharray="2 1.5" opacity="0.5" />
    </svg>
  ),
  'normandy-density': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
      <circle cx="7" cy="7" r="1.25" fill="currentColor" opacity="0.75" />
    </svg>
  ),
  'normandy-evidence': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v4M5 8h4M7 8v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="2" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  'normandy-toponymy': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 11L7 3l5 8" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" opacity="0.4" />
      <text x="4.5" y="10.5" fontSize="6" fill="currentColor" fontFamily="sans-serif" opacity="0.8">Aa</text>
    </svg>
  ),
  'norman-expansion-territories': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 5l5-3 5 3v4l-5 3-5-3V5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" opacity="0.7" />
    </svg>
  ),
  'norman-expansion-crusader': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M4 5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
  'norman-expansion-routes': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 11C5 6 9 4 12 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="2" r="1.2" fill="currentColor" opacity="0.5" />
      <circle cx="2" cy="11" r="1.2" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  'norman-expansion-influence': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.0" strokeDasharray="3 2" opacity="0.6" />
      <circle cx="7" cy="7" r="2" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  'norman-expansion-nodes': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  'prehistory-sites': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M4 11L7 3l3 8H4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.7" />
      <circle cx="7" cy="11" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  'prehistory-hillforts': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 10L7 4l5 6H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5 10V8M9 10V8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  'prehistory-terrain': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 11C4 7 6 9 8 6C10 3 12 5 12 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
      <path d="M2 13C5 11 8 12 12 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
    </svg>
  ),
};

const CATEGORY_SECTIONS: { key: string; label: string; categories: string[] }[] = [
  { key: 'atlas', label: 'Atlas', categories: ['borders', 'labels', 'routes', 'settlements', 'events', 'terrain', 'claims'] },
  { key: 'prehistory', label: 'Pre-Roman', categories: ['prehistory'] },
  { key: 'norman-expansion', label: 'Norman Expansion (911–1204+)', categories: ['norman-expansion'] },
  { key: 'normandy', label: 'Viking Normandy', categories: ['normandy'] },
];

const LayerToggle = memo(function LayerToggle({
  id,
  label,
  isOn,
  onToggle,
}: {
  id: string;
  label: string;
  isOn: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className="group grid w-full grid-cols-[28px_minmax(0,1fr)_32px] items-start gap-x-2.5 px-3 py-1.5 rounded-md text-left text-[12px] leading-snug transition-colors duration-150 hover:bg-white/[0.03]"
    >
      <span
        className={`flex h-[18px] w-7 shrink-0 items-center justify-center transition-all duration-200 ${
          isOn ? 'text-gold/80' : 'text-text-dim group-hover:text-text-muted'
        }`}
      >
        {LAYER_ICONS[id] ?? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        )}
      </span>

      <span
        className={`min-w-0 pt-0.5 text-left transition-colors duration-200 ${
          isOn ? 'text-text' : 'text-text-dim group-hover:text-text-muted'
        }`}
      >
        {label}
      </span>

      <span className="flex h-[18px] shrink-0 items-center justify-end">
        <span
          className={`relative h-4 w-7 shrink-0 rounded-full transition-colors duration-200 ${
            isOn
              ? 'border border-gold/55 bg-gold/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
              : 'border border-white/[0.12] bg-white/[0.05]'
          }`}
        >
          <motion.span
            animate={{ x: isOn ? 16 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`absolute top-0.5 h-2.5 w-2.5 rounded-full shadow-sm transition-colors duration-200 ${
              isOn ? 'bg-parchment' : 'bg-white/35'
            }`}
          />
        </span>
      </span>
    </button>
  );
});

const BasemapToggle = memo(function BasemapToggle() {
  const basemapMode = useMapStore((s) => s.basemapMode);
  const setBasemapMode = useMapStore((s) => s.setBasemapMode);

  const handleSwitch = useCallback(
    (mode: BasemapMode) => setBasemapMode(mode),
    [setBasemapMode],
  );

  return (
    <div className="px-3.5 py-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-dim block mb-1.5">
        Basemap
      </span>
      <div className="flex gap-1.5">
        {([['dark', 'Dark Atlas'], ['parchment', 'Parchment']] as const).map(([mode, label]) => (
          <button
            key={mode}
            type="button"
            onClick={() => handleSwitch(mode)}
            className={`flex-1 py-1 px-2 rounded-md text-[11px] font-medium transition-all duration-150 ${
              basemapMode === mode
                ? 'bg-gold/20 text-parchment border border-gold/30'
                : 'bg-white/[0.03] text-text-dim border border-transparent hover:bg-white/[0.06] hover:text-text-muted'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
});

const NORMAN_PRESETS: { id: NormanExpansionPreset; label: string }[] = [
  { id: 'conquest', label: 'Conquest' },
  { id: 'influence', label: 'Influence' },
  { id: 'full', label: 'Full' },
];

const NormanPresetBar = memo(function NormanPresetBar() {
  const apply = useMapStore((s) => s.applyNormanExpansionPreset);
  const handleClick = useCallback(
    (preset: NormanExpansionPreset) => apply(preset),
    [apply],
  );
  return (
    <div className="flex gap-1 px-3.5 pb-1.5">
      {NORMAN_PRESETS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => handleClick(p.id)}
          className="flex-1 py-0.5 px-1.5 rounded-md text-[10px] font-medium bg-white/[0.03] text-text-dim border border-transparent hover:bg-white/[0.06] hover:text-text-muted transition-all duration-150"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
});

const PERIOD_MIN = 911;
const PERIOD_MAX = 1300;

const NormanNodePeriodControl = memo(function NormanNodePeriodControl() {
  const period = useMapStore((s) => s.normanNodePeriod);
  const setPeriod = useMapStore((s) => s.setNormanNodePeriod);
  const nodesVisible = useMapStore((s) => s.layers['norman-expansion-nodes'] ?? false);

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const min = Number(e.target.value);
      setPeriod({ min, max: Math.max(min, period.max) });
    },
    [setPeriod, period.max],
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const max = Number(e.target.value);
      setPeriod({ min: Math.min(period.min, max), max });
    },
    [setPeriod, period.min],
  );

  const handleReset = useCallback(
    () => setPeriod(NORMAN_NODE_PERIOD_DEFAULT),
    [setPeriod],
  );

  if (!nodesVisible) return null;

  const isDefault =
    period.min === NORMAN_NODE_PERIOD_DEFAULT.min &&
    period.max === NORMAN_NODE_PERIOD_DEFAULT.max;

  return (
    <div className="px-3.5 pb-2 pt-0.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-dim">
          Period: {period.min}–{period.max}
        </span>
        {!isDefault && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[9px] text-text-dim/60 hover:text-text-muted transition-colors"
          >
            Reset
          </button>
        )}
      </div>
      <div className="space-y-1">
        <input
          type="range"
          min={PERIOD_MIN}
          max={PERIOD_MAX}
          step={10}
          value={period.min}
          onChange={handleMinChange}
          className="w-full h-1 appearance-none bg-white/10 rounded-full accent-[#e060a0] cursor-pointer [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#e060a0]"
        />
        <input
          type="range"
          min={PERIOD_MIN}
          max={PERIOD_MAX}
          step={10}
          value={period.max}
          onChange={handleMaxChange}
          className="w-full h-1 appearance-none bg-white/10 rounded-full accent-[#e060a0] cursor-pointer [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#e060a0]"
        />
      </div>
    </div>
  );
});

export default function LayerPanel() {
  const [open, setOpen] = useState(false);
  const layers = useMapStore((s) => s.layers);
  const toggleLayer = useMapStore((s) => s.toggleLayer);

  const handleToggle = useCallback(
    (id: string) => toggleLayer(id),
    [toggleLayer],
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-xl glass-panel-elevated px-3.5 py-2.5 text-[13px] transition-all duration-200 ${
          open
            ? 'text-text border-gold/25 shadow-[0_0_0_1px_rgba(196,169,98,0.12)]'
            : 'text-text-muted hover:text-text hover:border-gold/20'
        }`}
        aria-label="Toggle layers"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="opacity-70">
          <path
            d="M8 1L1 5l7 4 7-4-7-4z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M1 8l7 4 7-4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          <path
            d="M1 11l7 4 7-4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
          />
        </svg>
        Layers
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-full mb-2 left-0 w-[248px] rounded-xl glass-panel-elevated overflow-hidden"
          >
            <div className="px-3.5 pt-3 pb-1.5 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-gold/50">
                <path
                  d="M8 1L1 5l7 4 7-4-7-4zM1 8l7 4 7-4M1 11l7 4 7-4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim">
                Map Layers
              </span>
            </div>

            <div className="accent-line-gold mx-3 my-1" />

            <BasemapToggle />
            <div className="accent-line-gold mx-3 my-1" />

            <div className="py-1 pb-2 max-h-[60vh] overflow-y-auto scrollbar-thin">
              {CATEGORY_SECTIONS.map((section) => {
                const sectionLayers = layerConfigs.filter((cfg) =>
                  section.categories.includes(cfg.category),
                );
                if (sectionLayers.length === 0) return null;
                return (
                  <div key={section.key}>
                    {section.key !== 'atlas' && (
                      <>
                        <div className="accent-line-gold mx-3 mt-2 mb-0" />
                        <div className="px-3.5 pt-2.5 pb-1.5">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim">
                            {section.label}
                          </span>
                          {section.key === 'norman-expansion' && (
                            <p className="text-[10px] text-text-dim/80 leading-snug mt-1 normal-case tracking-normal font-normal">
                              Turn on <span className="text-text-muted">Norman sites &amp; castles</span> to show keeps,
                              ports, and crusader hubs. Use the timeline era <span className="text-text-muted">Norman
                              Expansion</span> or <span className="text-text-muted">Norman Origins</span> to enable them
                              automatically.
                            </p>
                          )}
                        </div>
                        <div className="accent-line-gold mx-3 mb-0.5" />
                      </>
                    )}
                    {section.key === 'norman-expansion' && <NormanPresetBar />}
                    {section.key === 'norman-expansion' && <NormanNodePeriodControl />}
                    {sectionLayers.map((cfg) => (
                      <LayerToggle
                        key={cfg.id}
                        id={cfg.id}
                        label={cfg.label}
                        isOn={layers[cfg.id] ?? cfg.defaultOn}
                        onToggle={handleToggle}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
