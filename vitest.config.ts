import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'), // Maps `@` to the root directory
    },
  },
  test: {
    testTimeout: 30000,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        '**/config.ts',
        '**/config.ts',
        '**.eslintrc.js',
        '**/tailwind.config.ts',
        '**/.next/**',
        '**/app/layout.tsx',
        '**/app/data/**',
        '**/app/providers.tsx',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/icons/**',
        '**/interface/**',
        '**/app/queryClient.tsx',
        'vitest.config.ts',
        'next.config.ts',
      ],
      include: ['**/*.{ts,tsx,jsx}'],
    },
  },
})
