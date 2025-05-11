import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['raw.githubusercontent.com', 'pokeapi.co'], 
  },
};

export default nextConfig;
