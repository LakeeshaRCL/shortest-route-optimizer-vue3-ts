import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api/random': {
        target: 'http://www.randomnumberapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/random/, '/api/v1.0/random'),
      },
      // Proxy for Beeceptor URL
      '/api/echo': {
        target: 'http://echo.free.beeceptor.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/echo/, '/sample-request?author=beeceptor'),
      },
    },
  },
})
