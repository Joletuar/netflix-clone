/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        // Activar ESLint durante el proceso de compilación
        ignoreDuringBuilds: false,
    },
};

module.exports = nextConfig;
