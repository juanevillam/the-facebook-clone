import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.tsx', './src/modules/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#2C64F6',
        },
        smoke: {
          100: '#F0F2F5',
          200: '#737373',
        },
      },
    },
  },
  plugins: [],
};

export default config;
