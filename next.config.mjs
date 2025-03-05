/** @type {import('next').NextConfig} */
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const REGION = process.env.AWS_REGION;

console.log("BUCKET_NAME", BUCKET_NAME, "REGION", REGION);
const nextConfig = {
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        // domains: [`${BUCKET_NAME}.s3.${REGION}.amazonaws.com`]
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `${BUCKET_NAME}.s3.${REGION}.amazonaws.com`,
                pathname: '/**',
            },
        ],
    }

};

// export const runtime = 'nodejs';

export default nextConfig;
