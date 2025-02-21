/* eslint-disable import/no-anonymous-default-export */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F1D4AC',
        secondary: '#FCEEB5',
        accent: '#D9B08C',
        dark: '#004B49',
      },
      fontFamily: {
        righteous: ['Righteous', 'cursive'],
        lexend: ['Lexend', 'serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};

