/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'sm':'575px',
        'xs': '480px',
        '4xl': '1920px' 
      }
    },
  },
  plugins: [],
}