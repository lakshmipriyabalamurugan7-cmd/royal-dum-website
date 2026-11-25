/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#050302',
          900: '#0b0705',
          850: '#120c08',
          800: '#1a120c',
          700: '#241a12',
          600: '#332417',
        },
        gold: {
          50: '#fdf8ec',
          100: '#faf0d4',
          200: '#f5e0a8',
          300: '#efc96e',
          400: '#e9b23f',
          500: '#d99a26',
          600: '#b87a1c',
          700: '#94591a',
          800: '#7a451d',
          900: '#66391d',
        },
        ember: {
          300: '#f8b76b',
          400: '#f2933f',
          500: '#e8722c',
          600: '#c8521c',
          700: '#a03d14',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(217, 154, 38, 0.35)',
        'glow-lg': '0 0 80px rgba(217, 154, 38, 0.45)',
        card: '0 20px 60px rgba(0,0,0,0.55)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #efc96e 0%, #d99a26 45%, #b87a1c 100%)',
        'ember-gradient': 'linear-gradient(135deg, #f8b76b 0%, #e8722c 60%, #a03d14 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
