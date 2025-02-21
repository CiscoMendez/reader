import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Aquí desactivas el Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;