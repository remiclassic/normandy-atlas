import type { NormanLayer } from '@/lib/norman-identity-engine';
import type { UiStringKey } from '@/lib/ui-strings';

const TITLE_KEY: Record<NormanLayer, UiStringKey> = {
  Celtic: 'normanIdentity.layerTitle.celtic',
  GalloRoman: 'normanIdentity.layerTitle.galloRoman',
  Frankish: 'normanIdentity.layerTitle.frankish',
  Norse: 'normanIdentity.layerTitle.norse',
  Norman: 'normanIdentity.layerTitle.norman',
};

const BLURB_KEY: Record<NormanLayer, UiStringKey> = {
  Celtic: 'normanIdentity.layerBlurb.celtic',
  GalloRoman: 'normanIdentity.layerBlurb.galloRoman',
  Frankish: 'normanIdentity.layerBlurb.frankish',
  Norse: 'normanIdentity.layerBlurb.norse',
  Norman: 'normanIdentity.layerBlurb.norman',
};

export function normanLayerTitleKey(name: NormanLayer): UiStringKey {
  return TITLE_KEY[name];
}

export function normanLayerBlurbKey(name: NormanLayer): UiStringKey {
  return BLURB_KEY[name];
}

export function normanArchetypeKey(id: string): UiStringKey {
  switch (id) {
    case 'frankish_core':
      return 'normanIdentity.archetype.frankish_core';
    case 'viking_influenced':
      return 'normanIdentity.archetype.viking_influenced';
    case 'celtic_rooted':
      return 'normanIdentity.archetype.celtic_rooted';
    default:
      return 'normanIdentity.archetype.blended';
  }
}
