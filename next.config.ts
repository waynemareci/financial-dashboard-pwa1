import type { NextConfig } from "next";
import withPWA from '@ducanh2912/next-pwa';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Turbopack configuration (stable in Next.js 15)
  turbopack: {
    // Turbopack-specific configurations can go here if needed
  }
};

// Only apply PWA in production builds to avoid Turbopack conflicts
const config = process.env.NODE_ENV === 'development' 
  ? nextConfig 
  : withPWA({
      dest: 'public',
      cacheOnFrontEndNav: true,
      aggressiveFrontEndNavCaching: true,
      reloadOnOnline: true,
      disable: false, // Enable PWA in production
      workboxOptions: {
        disableDevLogs: true,
      },
      fallbacks: {
        document: '/offline.html',
      }
    })(nextConfig);

export default config;
