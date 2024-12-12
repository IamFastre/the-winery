import NextBundleAnalyzer from '@next/bundle-analyzer';

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
    implementation: 'sass-embedded',
    silenceDeprecations: ['legacy-js-api'],
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  webpack(config) {
    config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] });
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
