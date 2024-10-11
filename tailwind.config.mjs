/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {

      fontFamily: {
        'vremena': ['VremenaGrotesk', 'sans-serif'],
        'vremena-bold': ['VremenaGroteskBold', 'sans-serif'],
        'FjallaOne': ['FjallaOne-Regular', 'sans-serif'],
        'WorkSans': [  "Work Sans", 'sans-serif'],
        'Merriweather': [  "Merriweather", 'serif'],

      },
      colors: {
        "guardsman-red": {
          50: "#ffefef",
          100: "#ffdcdc",
          200: "#ffbfbf",
          300: "#ff9292",
          400: "#8F0101",
          500: "#8F0101",
          600: "#8F0101",
          700: "#8F0101",
          800: "#8F0101",
          900: "#8F0101",
          950: "#8F0101",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  screens: {
    'sm': '640px',


    'md': '768px',
    // => @media (min-width: 768px) { ... }

    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }

    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1925px',
    // => @media (min-width: 1925px) { ... }
  }
};
