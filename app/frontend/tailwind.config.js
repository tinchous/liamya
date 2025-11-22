/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegura que Tailwind revise todos los archivos de React para clases
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados para tu estilo neón rojo-fuego
        darkBg: "#121212",        // Color de fondo oscuro general
        neonRed: "#FF2D00",       // Rojo neón para bordes, botones
        neonOrange: "#FF8C00",    // Naranja neón (acompaña al rojo)
      },
      boxShadow: {
        neonRed: "0 0 20px #FF2D00", // Sombra neón roja para efectos de hover/resaltar
      },
    },
  },
  plugins: [], // Aquí podés agregar plugins de Tailwind si hace falta
};
