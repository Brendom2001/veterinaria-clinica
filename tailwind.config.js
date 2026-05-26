/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0F1A14',
        'bg-alt': '#132018',
        surface: '#1A2B1F',
        border: '#2A3D2F',
        green: {
          primary: '#4CAF7D',
          hover: '#6FCFA0',
        },
        yellow: '#F5C842',
        text: {
          primary: '#F0F5F1',
          secondary: '#8A9E8F',
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulse_glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        pulse_glow: 'pulse_glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
