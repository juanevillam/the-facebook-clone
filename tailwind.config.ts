import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        error: {
          100: '#F02849',
        },
        primary: {
          100: '#2C64F6',
          200: '#1E52E4',
        },
        smoke: {
          100: '#F0F2F5',
          200: '#737373',
          300: '#DDDFE2',
        },
        success: {
          100: '#42B72A',
          200: '#379723',
        },
      },
    },
  },
  plugins: [],
};

export default config;
