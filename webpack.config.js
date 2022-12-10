const path = require('path');
const glob = require('glob-all');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

/**
 * @param {string[]} pages
 * @returns {object}
 */
function makeEntries(pages) {
  const res = {};

  for (const page of pages) {
    res[page] = [`./src/pages/${page}.scss`, `./src/pages/${page}.ts`];
  }

  return res;
}

/**
 * @param {string[]} pages
 * @returns {HtmlWebpackPlugin[]}
 */
function makePlugins(pages) {
  return pages.map(
    (p) =>
      new HtmlWebpackPlugin({
        template: `./src/pages/${p}.html`,
        filename: `${p}.html`,
        chunks: [p],
        scriptLoading: 'defer',
        // base: '/',
      })
  );
}

const pages = ['index'];

module.exports = {
  entry: makeEntries(pages),
  mode: 'production',
  plugins: [
    ...makePlugins(pages),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].bundle.css' }),
    new PurgeCSSPlugin({
      paths: glob.sync(['./src/**/*.html'], { nodir: true }),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } }, { loader: 'postcss-loader' }],
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.png', 'scss', 'css'],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve('./dist'),
    clean: true,
  },
};
