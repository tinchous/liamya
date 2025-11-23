/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-orange': '#ff4500',
        'neon-red': '#ff0080',
        'neon-yellow': '#ffff00',
      }
    },
  },
  plugins: [],
}
