/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: ['animate-blink'],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%) rotate(12deg)' },
          '100%': { transform: 'translateX(300%) rotate(12deg)' },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
        shine: 'shine 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
