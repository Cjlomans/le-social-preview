import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tell Vite to prefix every link with /le-social-preview/
export default defineConfig({
  base: '/le-social-preview/',
  plugins: [react()],
})
