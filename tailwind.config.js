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
      },
      width:{
        gra: "700px",
      },
      height:{
        gra: "700px",
      },
      colors:{
        primary:{
            DEFAULT: "#F5F7FA",
          light: "#EEF8E2",
          dark: "#E2F0CB",

        },
        secondary:{
                 DEFAULT: "#14532d",
        },
       danger: {
          DEFAULT: "#EF4444",
        },
      }
    },
  },
  plugins: [],
}