import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media0.giphy.com',
      'media1.giphy.com',
      'media2.giphy.com',
      'media3.giphy.com',
      'media4.giphy.com',
    ],
  },
};

export default withNextIntl(nextConfig);
