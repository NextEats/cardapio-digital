/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
            },
            {
                protocol: 'https',
                hostname: 'cceilpiizkukiqfodhec.supabase.co',
            },
        ],
    },
};

module.exports = nextConfig;
