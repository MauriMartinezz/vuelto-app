import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The e2e suite builds into its own directory (see playwright.config.ts).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  // The route indicator overlapped the desktop sidebar; errors still show.
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
