import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.tsx', './src/modules/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
