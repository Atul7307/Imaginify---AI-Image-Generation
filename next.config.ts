import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/dn2ndm2b0/image/upload/**')],
  },

};

export default nextConfig;
