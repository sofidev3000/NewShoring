// astro.config.mjs

import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    defaultStrategy: 'viewport'
  },
  integrations: [tailwind(), react()],
  site: 'https://newshoring.com/',
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
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
