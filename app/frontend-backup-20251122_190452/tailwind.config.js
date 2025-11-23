/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonOrange: '#ff8c00',
        neonGreen: '#00ff00',
        neonBlue: '#00b7ff',
        neonPurple: '#bf00ff',
        neonRed: '#ff0000',
      },
      fontFamily: {
        'display': ['Orbitron', 'monospace'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
