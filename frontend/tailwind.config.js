/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width : {
        '1440' : '1440px'
      },
      colors : {
        'DFEEEA' : '#DFEEEA', //เบาสุด
        'A7C4BC' : '#A7C4BC',
        '5E8B7E' : '#5E8B7E',
        '2F5D62' : '#2F5D62', //เข้มสุด
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
}