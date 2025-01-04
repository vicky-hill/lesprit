import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const nextConfig: NextConfig = withPWA({
  dest: "public"
});

export default nextConfig;
