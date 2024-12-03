import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/focus',
  assetPrefix: '/focus/', // This is necessary for the asset prefix to be correct
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;