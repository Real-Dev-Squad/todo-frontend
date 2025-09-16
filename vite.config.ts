import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: ['dev.realdevsquad.com'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['@tanstack/react-router'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
          ],
          'utils-vendor': ['date-fns', 'clsx', 'tailwind-merge'],
          // Route chunks
          dashboard: ['./src/routes/_internal.dashboard'],
          teams: [
            './src/routes/_internal.teams',
            './src/routes/_internal.teams.index',
            './src/routes/_internal.teams.create',
            './src/routes/_internal.teams.join',
          ],
          admin: ['./src/routes/_internal.admin'],
        },
      },
    },
  },
})
