import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use a production-only base so the dev server serves files from '/'
// and assets referenced as '/assets/...' resolve correctly during development.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Pinksteren/' : '/',
  plugins: [react()],
}))
