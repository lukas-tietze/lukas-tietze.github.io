const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');
const glob = require('glob-all');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    purgecss({
      content: ['./src/pages/**/*.html', './src/partials/**/*.html'],
      safelist: {
        standard: [/\d+\/\d+/, /hover:/],
      },
    }),
    cssnano({ preset: [require('cssnano-preset-default'), { discardUnused: true }] }),
  ],
};
