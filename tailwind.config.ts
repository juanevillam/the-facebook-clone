import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#393A3B',
          100: '#242526',
          200: '#3A3B3C',
          300: '#8D8D91',
          400: '#18191A',
          500: '#4E4E50',
          600: '#323436',
          700: '#47494A',
          800: '#505151',
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
