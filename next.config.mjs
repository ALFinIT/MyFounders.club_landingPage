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

export default nextConfig

