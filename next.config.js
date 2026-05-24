/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ✅ REMOVED: unoptimized: true  <-- This was the main culprit!
    // With it enabled, Vercel skips ALL optimization (no WebP, no resizing, no CDN cache)

    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "kxptt4m9j4.ufs.sh" },
      { protocol: "https", hostname: "picsum.photos" },
    ],

    // ✅ Serve modern formats — Vercel auto-converts to AVIF/WebP
    formats: ["image/avif", "image/webp"],

    // ✅ Cache optimized images for 1 year (avoids re-optimizing on every cold start)
    minimumCacheTTL: 60 * 60 * 24 * 365,

    // ✅ Only generate sizes you actually use
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
  },
};

module.exports = nextConfig;