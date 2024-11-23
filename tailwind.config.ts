import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#18191A',
        },
        error: {
          100: '#F02849',
        },
        overlay: {
          100: 'rgba(0, 0, 0, 0.65)',
        },
        primary: {
          100: '#2C64F6',
          200: '#1E52E4',
          300: '#2A384F',
          400: '#404C61',
          500: '#EDF5FE',
          600: '#E1E9F1',
        },
        smoke: {
          100: '#E4E6EA',
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
