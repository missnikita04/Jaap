import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [react(), tailwindcss()],
  safelist: [
    // Navbar colors & shadows
    "bg-[#F9CB43]",
    "hover:bg-[#F9CB43]",
    "text-[#8A0000]",
    "hover:text-black",
    "drop-shadow-[0_0_10px_rgba(255,200,0,0.8)]",

    // CountBtn gradients, hover & colors
    "bg-gradient-to-r",
    "from-[#FFF287]",
    "to-[#FFD54F]",
    "hover:from-[#F9CB43]",
    "hover:to-[#FFD54F]",
    "bg-red-600",
    "text-white",

    // ShowImage shadows & borders
    "shadow-[0_0_30px_10px_rgba(255,215,0,0.6)]",
    "shadow-[0_0_30px_15px_rgba(249,203,67,0.7)]",
    "border-yellow-300",
    "border-black/50",
  ],
  base: "/",
})
