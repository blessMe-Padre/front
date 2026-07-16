import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // API_SERVER в Docker = http://strapi:1337 — для next/image на сервере frontend
  env: {
    NEXT_PUBLIC_IMAGE_SERVER:
      process.env.NEXT_PUBLIC_IMAGE_SERVER ||
      process.env.API_SERVER ||
      "http://localhost:1337",
  },
  watchOptions: {
    pollIntervalMs: 1000,
  },
  images: {
    // Next 16 blocks Docker/private-network image origins by default.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'showcase-inside360.ru',
      },
      {
        protocol: 'https',
        hostname: 'shop.compass25.ru',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'http',
        hostname: 'strapi',
        port: '1337',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
      },
    ],
  },

  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
