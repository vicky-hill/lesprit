// import type { NextConfig } from 'next'
// import withPWA from 'next-pwa'

// const nextConfig: NextConfig = withPWA({
//   dest: "public"
// });

// export default nextConfig;

import type { NextConfig } from 'next'
import path from 'path'


const nextConfig: NextConfig = {
    env: {
        DOMAIN: process.env.DOMAIN,
        API_URL: process.env.API_URL,
        ENV: process.env.ENV
    },
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'sass')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                port: '',
                pathname: '/minite/**'
            }
        ]
    }
}

export default nextConfig;