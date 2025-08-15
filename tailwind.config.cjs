/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[theme="dark"]'],
  content: [
    "./index.html",
    "./src/main/frontend/**/*.{ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        card: '0 8px 20px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl: '12px',
      }
    },
  },
  plugins: [],
};