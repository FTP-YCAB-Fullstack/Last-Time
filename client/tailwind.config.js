const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  // mode: 'jit',
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      lime: colors.lime,
      teal: colors.teal,
      gray: colors.blueGray,
      green: colors.emerald,
      blue: colors.cyan,
      indigo: colors.indigo,
      red: colors.pink,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
