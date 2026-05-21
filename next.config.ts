import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin-api/:path*",
        destination: `${process.env.NEXT_PUBLIC_ADMIN_API_URL ?? "http://localhost:4001"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
