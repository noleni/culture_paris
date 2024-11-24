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
      {
        protocol: "https",
        hostname: "developers.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      }
    ],
  },

  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
