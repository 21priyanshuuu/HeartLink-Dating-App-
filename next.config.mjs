/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["utfs.io", "images.pexels.com"],
  },
  experimental: {
    serverActions: true
  }
}

export default nextConfig;