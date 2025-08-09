/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    // Remove optimizeCss as it's no longer supported
    optimizePackageImports: ["lucide-react", "@supabase/supabase-js"],
  },

  // Compression and optimization
  compress: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // ...existing sitemap and robots headers...
    ];
  },

  // ...existing redirects and rewrites...

  // Remove turbo config as it's not needed for Next.js 13+

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: "https://pageon.in",
    NEXT_PUBLIC_SITE_NAME: "PageOn",
    NEXT_PUBLIC_SITE_DESCRIPTION:
      "India's best website builder for small businesses",
  },

  // React settings
  reactStrictMode: true,

  // Output configuration
  output: "standalone",

  // ESLint configuration
  eslint: {
    dirs: ["src"],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
