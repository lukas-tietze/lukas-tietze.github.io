const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @param {string[]} pages
 * @returns {object}
 */
function makeEntries(pages) {
  const res = {};

  for (const page of pages) {
    res[page] = [`./src/pages/${page}/index.scss`, `./src/pages/${page}/index.ts`];
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
        template: `./src/pages/${p}/index.html`,
        filename: `${p}.html`,
        chunks: [p],
        scriptLoading: 'defer',
      })
  );
}

const inspect = (name) => ({
  loader: 'inspect-loader',
  options: {
    callback(inspect) {
      console.log(name, '\n', inspect.arguments);
    },
  },
});

const pages = ['index', 'about', 'projects', 'why-jesus'];

module.exports = {
  entry: makeEntries(pages),
  mode: 'production',
  plugins: [...makePlugins(pages), new MiniCssExtractPlugin({ filename: '[name].[contenthash].bundle.css' })],
  module: {
    rules: [
      {
        test: /\.partial\.html$/,
        type: 'asset/inline',
        exclude: [/node_modules/],
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }, { loader: 'html-template-loader' }],
        exclude: [/node_modules/, /partials/],
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
          { loader: 'css-loader', options: { sourceMap: false, importLoaders: 1 } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.(png|jpe?g|ttf|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve('./webpack/loaders')],
  },
  devtool: false,
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.png', 'scss', 'css'],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve('./dist'),
    clean: true,
  },
};
