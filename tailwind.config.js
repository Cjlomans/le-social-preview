/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-[#f5ede1]',
    'bg-[#b48a7a]',
    'bg-[#e6d6c9]',
    'text-[#f5ede1]',
    'text-[#b48a7a]',
    'text-[#e6d6c9]',
    'hover:bg-[#e6d6c9]',
    'hover:text-[#b48a7a]',
    'border-[#e6d6c9]',
    'border-[#b48a7a]',
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#f5ede1',
        'brown': '#b48a7a',
        'hover': '#e6d6c9',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}

