/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ee',
          100: '#f9edcf',
          200: '#f2d99a',
          300: '#e8c065',
          400: '#dfa83e',
          500: '#c4913e',
          600: '#c4a55a',
          700: '#a07840',
          800: '#7e5c2e',
          900: '#6a4d28',
        },
        champagne: '#e8d5a3',
        obsidian: '#080810',
        luxury: '#0f0f1a',
      },
      fontFamily: {
        serif:  ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:   ['Montserrat', 'Inter', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c4a55a 0%, #e8d5a3 50%, #c4a55a 100%)',
        'dark-gradient': 'linear-gradient(180deg, #080810 0%, #0f0f1a 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':  { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%':  { boxShadow: '0 0 20px rgba(196,165,90,0.3)' },
          '100%': { boxShadow: '0 0 60px rgba(196,165,90,0.8)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
