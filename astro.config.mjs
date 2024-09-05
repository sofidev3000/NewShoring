// astro.config.mjs

import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  plugins: [react()],
  prefetch: {
    defaultStrategy: 'viewport'
  },
  integrations: [tailwind(),react({experimentalReactChildren: true,})],
  site: 'https://newshoring.com/',
  output: "static",
  compressHTML: false,
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'js/themes/nearshoringtheme/[name].[hash].js',
          chunkFileNames: 'js/themes/nearshoringtheme/chunks/[name].[hash].js'
        },
      },
    },
    server: {
      proxy: {
        '/api-request': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-request/, '/api-request'),
        },
      },
    },
  },
});