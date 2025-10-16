/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true, // Prevent 307 redirects for webhooks
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    outputFileTracingIncludes: {
      '/store/products/[slug]': ['./lib/data/products.ts'],
    },
  },
};

module.exports = nextConfig;
