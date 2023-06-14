/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Activar ESLint durante el proceso de compilación
    ignoreDuringBuilds: false,
  },
  images: {
    domains: [
      'upload.wikimedia.org',
      'uhdtv.io',
      'mango.blender.org',
      'download.blender.org',
    ],
  },
};

module.exports = nextConfig;
