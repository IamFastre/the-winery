import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const basePath   = process.env.NODE_ENV === "production" ? "/winery" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  output: 'export',
  distDir: 'dist',
  images: { unoptimized: true },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },    
};

export default nextConfig;
