import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

// Avoid inferring workspace root from a stray package-lock.json in a parent folder.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// Root `/` for custom-domain GitHub Pages. For project-URL builds
// (e.g. remiclassic.github.io/normandy-atlas/), run: NEXT_BASE_PATH=/normandy-atlas npm run build
const basePath = process.env.NEXT_BASE_PATH?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  output: "export",
  basePath,
};

export default nextConfig;
