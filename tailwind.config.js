export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        poster: {
          blue: '#3fb0f0',
          sky: '#6fc7ff',
          grass: '#6bbf3a',
          ribbon: '#e63946',
          accent: '#ffd400',
          pink: '#ff6fa3'
        }
      },
      fontFamily: {
        display: ["'Fredoka One'", 'cursive'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        poster: '0 10px 30px rgba(0,0,0,0.25)'
      }
    }
  },
  plugins: [],
}
