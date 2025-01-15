import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
