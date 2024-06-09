import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
