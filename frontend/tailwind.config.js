/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090E',
          900: '#0C1017',
          850: '#111722',
          800: '#161F2E',
          700: '#1F2B3E',
          600: '#2A3A54',
        },
        brand: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981', // vibrant emerald/neon green fitness accent
          600: '#059669',
        },
        accent: {
          neon: '#00F59B',
          electric: '#06B6D4',
          orange: '#FF5722',
          purple: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(0, 245, 155, 0.25)',
        'glow-lg': '0 0 50px -10px rgba(0, 245, 155, 0.35)',
      }
    },
  },
  plugins: [],
}
