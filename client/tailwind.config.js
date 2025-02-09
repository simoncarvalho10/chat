/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        'screen-dynamic': 'calc(var(--vh, 1vh) * 100)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-1s': {
          animationDelay: '0.1s',
        },
        '.animation-delay-2s': {
          animationDelay: '0.2s',
        },
        '.animation-delay-3s': {
          animationDelay: '0.3s',
        },
      });
    },
  ],
}

