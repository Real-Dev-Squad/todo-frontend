import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    testTimeout: 30000,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        '**/config.ts',
        '**/config.ts',
        '**.eslintrc.js',
        '**/tailwind.config.ts',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/icons/**',
        '**/interface/**',
        'vitest.config.ts',
      ],
      include: ['**/*.{ts,tsx,jsx}'],
    },
  },
})
