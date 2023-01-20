/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
      'logos-marques.com',
      'rb.gy',
      'image.tmdb.org'
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
