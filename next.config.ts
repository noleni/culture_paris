import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.paris.fr",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cibul.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "openagenda.com",
        pathname: "**",
      },
    ],
  },

  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
