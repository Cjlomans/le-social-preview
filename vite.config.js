import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tell Vite to prefix every URL with your repo name
export default defineConfig({
  base: '/le-social-preview/',
  plugins: [react()],
})
