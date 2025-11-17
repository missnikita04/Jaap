/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "!bg-red-600",
    "!text-white",
    "from-[#FFF287]",
    "to-[#FFD54F]",
    "hover:from-[#F9CB43]",
    "hover:to-[#FFD54F]",
    "!scale-90",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
