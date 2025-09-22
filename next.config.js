/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Disable image optimization to prevent build timeouts
  },
  experimental: {
    outputFileTracingIncludes: {
      '/store/products/[slug]': ['./lib/data/products.ts'],
    },
  },
};

module.exports = nextConfig;
