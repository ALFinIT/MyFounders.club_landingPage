import { fileURLToPath } from 'url';
import { dirname } from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
  },
  images: {
    unoptimized: true,
    // Use `remotePatterns` instead of the deprecated `domains` option.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.ui-avatars.com',
      },
    ],
    // Configure supported quality values to avoid runtime warnings when components
    // use quality={100} or quality={75}.
    qualities: [100, 75],
    formats: ['image/webp', 'image/avif'],
  },
}

export default withNextIntl(nextConfig)

