export default {
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%) rotate(12deg)' },
          '100%': { transform: 'translateX(300%) rotate(12deg)' },
        },
      },
      animation: {
        shine: 'shine 1s ease-in-out',
      },
    },
  },
  plugins: [],
}
