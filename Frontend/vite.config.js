import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",     // main source folder
    "./components/**/*.{js,jsx,ts,tsx}" // extra components folder if any
  ],
  theme: {
    extend: {},
  },
  plugins: [react(), tailwindcss()],
  base: "/",
})
