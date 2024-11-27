import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/focus',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
