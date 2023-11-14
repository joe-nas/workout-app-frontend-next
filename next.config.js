/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  images: {
    domains: [`lh3.googleusercontent.com`, 'avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
