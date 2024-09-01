/** @type {import('next').NextConfig} */
const nextConfig = {
    
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, // Proxy to Java EE backend
            },
        ];
    },
};

export default nextConfig;

