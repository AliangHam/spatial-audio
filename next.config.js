/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    // Fix for paths containing '#' character on Windows
    config.context = path.resolve(__dirname);
    
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
}

module.exports = nextConfig
