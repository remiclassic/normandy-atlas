**Normandy Atlas** — interactive historical map of Normandy and the Norman world (Next.js, MapLibre, deck.gl).

**Live site:** [https://remiclassic.github.io/normandy-atlas/](https://remiclassic.github.io/normandy-atlas/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/normandy-atlas](http://localhost:3000/normandy-atlas) (this app uses a [`basePath`](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath) for GitHub Pages).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Base Path & Share URLs

This app uses `NEXT_BASE_PATH` at build time to set the Next.js `basePath` and `assetPrefix` (see `next.config.ts`). The gamification share feature (`lib/progress/share.ts`) builds public URLs using `NEXT_PUBLIC_BASE_PATH` at runtime.

For GitHub Pages project-URL deployments (e.g. `remiclassic.github.io/normandy-atlas/`), both variables must be set to the same value in the Pages workflow:

```yaml
env:
  NEXT_BASE_PATH: /normandy-atlas
  NEXT_PUBLIC_BASE_PATH: /normandy-atlas
```

For custom-domain deployments where the site lives at the root, both can be left empty (the default).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
