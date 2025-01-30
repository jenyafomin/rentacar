/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

};

// export const runtime = 'nodejs';

export default nextConfig;
