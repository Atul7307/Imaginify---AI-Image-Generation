import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  // Enable React strict mode
  reactStrictMode: true,

  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/dn2ndm2b0/image/upload/**') , new URL('https://images.unsplash.com/**')],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },

  outputFileTracingRoot: __dirname,

};


export default nextConfig;
