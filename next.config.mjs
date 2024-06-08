/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com"],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
