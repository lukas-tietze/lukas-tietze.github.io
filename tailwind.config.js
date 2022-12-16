const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/pages/**/*.html', './src/partials/**/*.html'],
  theme: {
    extend: defaultTheme,
  },
  plugins: [],
};
