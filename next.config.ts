// import type { NextConfig } from 'next'
// import withPWA from 'next-pwa'

// const nextConfig: NextConfig = withPWA({
//   dest: "public"
// });

// export default nextConfig;

import type { NextConfig } from 'next'


const nextConfig: NextConfig = {
    env: {
        DOMAIN: process.env.DOMAIN,
        API_URL: process.env.API_URL,
        ENV: process.env.ENV
    },
    reactStrictMode: false,
}

export default nextConfig;