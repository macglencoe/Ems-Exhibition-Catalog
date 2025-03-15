/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.txt$/i,
      use: 'raw-loader',
    });
    return config;
  },
  devIndicators: false,
};

export default nextConfig;

