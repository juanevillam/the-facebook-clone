import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'media0.giphy.com',
        protocol: 'https',
      },
      {
        hostname: 'media1.giphy.com',
        protocol: 'https',
      },
      {
        hostname: 'media2.giphy.com',
        protocol: 'https',
      },
      {
        hostname: 'media3.giphy.com',
        protocol: 'https',
      },
      {
        hostname: 'media4.giphy.com',
        protocol: 'https',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
