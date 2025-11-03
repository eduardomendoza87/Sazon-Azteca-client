/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aquí van los colores y fuentes
      colors: {
        'terracota': '#9A4A3A',
        'volcan': '#3E3F41',
        'rojo-quemado': '#B92B27',
        'nopal': '#5A7D5E',
        'hueso': '#F8F6F1',
        'maiz': '#F0E5D1',
        'parrafo': '#2E2E2E',
      },
      fontFamily: {
        'titulo': ['Playfair Display', 'serif'],
        'cuerpo': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}