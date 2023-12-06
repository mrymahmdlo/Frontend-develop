/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Doing R&D on this @parna
  // output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '82.115.26.242',
        port: '30010'
      }
    ]
  },
  webpack: (config) => {
    // Enable polling based on env variable being set
    /**
     * Use file polling instead file system for windows developer
     * to have fast refresh on dockerize mode
     */
    if (process.env.NEXT_WEBPACK_USEPOLLING) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300
      };
    }

    // Configure SVGR
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/lib/i18n/i18n.ts'
);

module.exports = withNextIntl(nextConfig);
