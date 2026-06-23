/** @type {import('next').NextConfig} */
const nextConfig = {
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
