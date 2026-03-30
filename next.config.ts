import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

// Avoid inferring workspace root from a stray package-lock.json in a parent folder.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  output: "export",
  // GitHub Pages lives under /normandy-atlas; dev server uses "/" so localhost is not a 404.
  basePath: process.env.NODE_ENV === "development" ? "" : "/normandy-atlas",
};

export default nextConfig;
