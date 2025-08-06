import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Serve assets relative to the HTML
export default defineConfig({
  base: './',
  plugins: [react()],
})
