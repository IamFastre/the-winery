import path from 'path';
import { fileURLToPath } from 'url';

import consts from './utils/consts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: consts.basePath,
  output: 'export',
  distDir: 'dist',
  images: { unoptimized: true },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },    
};

export default nextConfig;
