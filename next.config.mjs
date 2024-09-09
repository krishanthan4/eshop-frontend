/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, // Proxy to Java EE backend
            },
            {
                source: '/images/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/public/images/:path*`, // Proxy to images folder on your backend
            },
        ];
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.pinimg.com',
          },
        ],
      },
};

export default nextConfig;
