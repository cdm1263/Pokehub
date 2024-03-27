/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        // 필요한 경우 port와 pathname을 추가할 수 있습니다.
      },
    ],
  },
};

export default nextConfig;
