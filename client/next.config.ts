import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ssdweb.co","d3at7kzws0mw3g.cloudfront.net"],
  },
    async rewrites() {
      return [
        {
          source: "/lab-diamonds",
          destination: "/pages/lab-diamonds",
        },
        {
          source: "/natural-diamonds",
          destination: "/pages/natural-diamonds",
        },
      ]
    }
  };

export default nextConfig;
