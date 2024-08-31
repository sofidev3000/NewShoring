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
      },
      colors: {
        "guardsman-red": {
          50: "#ffefef",
          100: "#ffdcdc",
          200: "#ffbfbf",
          300: "#ff9292",
          400: "#ff5454",
          500: "#ff1f1f",
          600: "#ff0000",
          700: "#db0000",
          800: "#ba0000",
          900: "#940808",
          950: "#520000",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  screens: {
    'sm': '640px',
    // => @media (min-width: 640px) { ... }

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
