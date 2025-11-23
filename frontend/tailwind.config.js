/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a', // Deeper black
        'card-bg': 'rgba(255, 255, 255, 0.03)', // Glass effect base
        'neon-green': '#00ff9d',
        'neon-blue': '#00f3ff',
        'neon-purple': '#bd00ff',
        'neon-red': '#ff0055',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 10px rgba(0, 255, 157, 0.5)',
        'neon-blue': '0 0 10px rgba(0, 243, 255, 0.5)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
