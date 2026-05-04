import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default config;
