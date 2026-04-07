import type { Metadata } from 'next';

/** Matches app/opengraph-image.tsx size, alt, and the /opengraph-image metadata route. */
export const defaultOpenGraphImages: NonNullable<Metadata['openGraph']>['images'] = [
  {
    url: '/opengraph-image',
    width: 1200,
    height: 630,
    alt: 'Norman Atlas — A Living Map of People, Movement, and Time',
  },
];

/** Matches app/twitter-image.tsx (/twitter-image). */
export const defaultTwitterImages: NonNullable<Metadata['twitter']>['images'] = ['/twitter-image'];
