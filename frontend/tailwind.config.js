/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        famivaa: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Brand violet accent
          600: '#7c3aed', // Primary Famivaa brand purple
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#2e1065', // Deep purple dark
          950: '#1e1b4b',
        },
        violetacc: {
          400: '#a78bfa',
          500: '#936ec9', // Official logo gradient tint
          600: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
