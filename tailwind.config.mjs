/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
	  extend: {
		colors: {
		  'guardsman-red': {
			'50': '#ffefef',
			'100': '#ffdcdc',
			'200': '#ffbfbf',
			'300': '#ff9292',
			'400': '#ff5454',
			'500': '#ff1f1f',
			'600': '#ff0000',
			'700': '#db0000',
			'800': '#ba0000',
			'900': '#940808',
			'950': '#520000',
		  },
		},
	  },
	},
	plugins: [],
  }
