/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["utfs.io", "images.pexels.com","assets.aceternity.com",'images.unsplash.com'],
  },
  experimental: {
    serverActions: true
  }
}

export default nextConfig;