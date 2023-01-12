/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1da0f2',
        'primary-light': '#71c9f8',
        'primary-grey': '#8799a6',
        'primary-dark-light': '#192734',
        'primary-dark': '#15212b',
        'border-gray': '#38444d',
        danger: '#e0245e',
      },
    },
  },
  plugins: [require('daisyui')],
};
