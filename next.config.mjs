/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  reactStrictMode: true,
  ...(isPages ? { output: "export" } : {}),
  images: {
    unoptimized: isPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mir-s3-cdn-cf.behance.net",
      },
      {
        protocol: "https",
        hostname: "a5.behance.net",
      },
    ],
  },
};

export default nextConfig;
