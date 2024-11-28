import path from 'path';
import { fileURLToPath } from 'url';
import NextBundleAnalyzer from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
  openAnalyzer: true,
  logLevel: 'silent',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  images: { unoptimized: true },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] });
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
