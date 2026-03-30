export const palette = {
  background: '#0a0c12',
  backgroundWarm: '#0e1018',
  surface: '#13161f',
  surfaceHover: '#1a1e2b',
  surfaceBright: '#242938',
  border: '#1e2232',
  borderBright: '#2e3348',

  text: '#e8e6e1',
  textMuted: '#9a968e',
  textDim: '#5e5a52',

  gold: '#c4a962',
  goldBright: '#dcc577',
  goldMuted: '#8a7a45',
  blue: '#5b7fa5',
  blueBright: '#7ba0c5',
  blueMuted: '#3d5670',
  stone: '#7a7265',
  iron: '#5a5650',
  parchment: '#d4c9a8',
  parchmentDark: '#a89e82',
  ember: '#a85c3b',
  crimson: '#8b3a3a',
} as const;

export const mapPaint = {
  regionFill: [0.35, 0.31, 0.22, 0.2] as [number, number, number, number],
  regionFillHover: [0.77, 0.66, 0.38, 0.35] as [number, number, number, number],
  regionFillSelected: [0.77, 0.66, 0.38, 0.45] as [number, number, number, number],
  regionStroke: [0.77, 0.66, 0.38, 0.35] as [number, number, number, number],
  regionStrokeHover: [0.77, 0.66, 0.38, 0.7] as [number, number, number, number],
  regionStrokeSelected: [0.77, 0.66, 0.38, 0.9] as [number, number, number, number],

  routeViking: [91, 127, 165] as [number, number, number],
  routeNorman: [196, 169, 98] as [number, number, number],
  routeInvasion: [168, 92, 59] as [number, number, number],
  routeExploration: [91, 127, 165] as [number, number, number],
  routeTrade: [168, 92, 59] as [number, number, number],
  routeSettlement: [196, 169, 98] as [number, number, number],
  routeRiver: [122, 114, 101] as [number, number, number],
} as const;

export const regionPalette: Record<string, string> = {
  normandy: '#c4a962',
  brittany: '#5b7fa5',
  'ile-de-france': '#a89e82',
  flanders: '#a85c3b',
  'southern-england': '#7a7265',
  'new-france-core': '#5b7fa5',
  acadia: '#a85c3b',
  'louisiana-colony': '#c4a962',
};
