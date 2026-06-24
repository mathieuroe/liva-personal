/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/erste-schritte",
        destination: "/ratgeber",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
