import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ];
  },
  devIndicators: false,
  images: { domains: ["images.pexels.com", "randomuser.me"] },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
