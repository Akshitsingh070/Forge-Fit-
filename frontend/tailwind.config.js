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
          950: '#0F0918',
          900: '#170E24',
          850: '#1F1430',
          800: '#281A3C',
          700: '#34234C',
          600: '#463264',
        },
        plum: {
          950: '#100A19',
          900: '#191024',
          850: '#20152F',
          800: '#291C3B',
          700: '#35254A',
          card: '#131118',
          cardHover: '#181520',
          pill: '#241832',
        },
        brand: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#9D26F2', // Signature vibrant violet/purple from reference image
          600: '#8419D4',
          700: '#6B12AE',
          800: '#541088',
          900: '#400D66',
        },
        accent: {
          neon: '#9D26F2',
          electric: '#A825FF',
          magenta: '#D946EF',
          cyan: '#06B6D4',
          orange: '#FF5722',
          flame: '#F97316',
          teal: '#14B8A6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 0 25px -4px rgba(157, 38, 242, 0.45)',
        'glow-lg': '0 0 50px -8px rgba(157, 38, 242, 0.55)',
        'glow-purple': '0 10px 25px -5px rgba(157, 38, 242, 0.4)',
        'glow-white': '0 0 20px -2px rgba(255, 255, 255, 0.25)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '34px',
      }
    },
  },
  plugins: [],
}
