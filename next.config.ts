import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/",
        permanent: false,
      },
      {
        source: "/dashboard/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/quote",
        destination: "/",
        permanent: false,
      },
      {
        source: "/quote/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/track",
        destination: "/",
        permanent: false,
      },
      {
        source: "/track/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};


export default nextConfig;

