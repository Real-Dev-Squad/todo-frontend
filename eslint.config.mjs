import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import { importX } from 'eslint-plugin-import-x'
import { defineConfig } from 'eslint/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'import-x/no-dynamic-require': 'warn',
      'import-x/no-nodejs-modules': 'warn',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    extends: compat.extends(
      'next/core-web-vitals',
      'next/typescript',
      'plugin:storybook/recommended',
    ),
  },
])
