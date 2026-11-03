import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tech-stack icons on AI interview cards (see getTechLogos in src/lib/utils.ts)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/devicon/**",
      },
    ],
  },
};

export default nextConfig;
