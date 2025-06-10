/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate que esto cubra todos tus archivos con clases de Tailwind
  ],
  theme: {
    extend: {
      colors: {
        'agro-primary': '#065f46',      // Verde oscuro principal (tomado de .cultivo-title)
        'agro-secondary': '#16a34a',   // Verde secundario/botones (tomado de .cultivo-btn)
        'agro-light': '#d9f99d',       // Verde claro para fondos/acentos (tomado de .cultivo-container)
        'agro-accent': '#f0c674',      // Acento amarillo/dorado (tomado de :hover en Nav.css)
        'agro-info-bg': '#ecfdf5',     // Fondo para resultados/alertas (tomado de .cultivo-result)
        'agro-info-border': '#10b981', // Borde para resultados/alertas (tomado de .cultivo-result)
        'agro-dark-text': '#065f46',   // Texto oscuro principal
        'agro-light-text': '#333',     // Texto claro secundario
        'agro-white-text': '#ffffff',  // Texto blanco
      },
      fontFamily: {
        sans: ['Segoe UI', 'Helvetica', 'Arial', 'sans-serif'], // Familia de fuentes principal
      },
      borderRadius: {
        'xl': '12px', // Consistente con .cultivo-box
      }
    },
  },
  plugins: [],
}