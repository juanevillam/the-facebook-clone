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
          500: '#39393A',
          600: '#4E4E50',
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
        },
        smoke: {
          100: '#F0F2F5',
          200: '#65676B',
          300: '#B1B3B8',
          400: '#B9BBBF',
          500: '#C8C8C8',
          600: '#F2F2F2',
          700: '#606266',
          800: '#EDF5FE',
          900: '#E1E9F1',
          1000: '#E4E6EA',
          1100: '#D8DAD6',
          1200: '#A8ABAF',
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
