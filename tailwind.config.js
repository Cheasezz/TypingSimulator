/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue,css}'],
  theme: {
    extend: {},
  },
  plugins: ['@tailwindcss/forms'],
};
