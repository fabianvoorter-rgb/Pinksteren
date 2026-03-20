import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT:
// Replace 'your-repo-name' with your actual GitHub repository name
export default defineConfig({
  base: "/Pinksteren/",
  plugins: [react()],
})
