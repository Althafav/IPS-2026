// next.config.js or next.config.ts
import { NextConfig } from 'next';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '44398',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets-us-01.kc-usercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.strategic.ae',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.aimcongress.com',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'api.aimcongress.com',
        pathname: '/**',
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
