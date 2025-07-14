import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  // base: '/react/',
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {},
  },
  server: {
    sourcemap: true,
    proxy:
      mode === 'development'
        ? {
            '/apiProperties': {
              target: 'https://partner.qatl.ru/api',
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/apiProperties/, ''),
              headers: {
                'X-API-KEY': '2dcdc433-4d54-4079-8ee0-293e36e0446c',
              },
            },
            '/api': {
              target: 'https://api.sputnik8.com/v1',
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          }
        : undefined,
  },
}))
