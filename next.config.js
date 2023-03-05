const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});

module.exports = nextConfig;
