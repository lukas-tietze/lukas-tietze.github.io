import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
      })
  );
}

const pages = ['index'];

export default {
  entry: makeEntries(pages),
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: './dist',
    clean: true,
  },
  mode: 'production',
  plugins: [...makePlugins(pages), new MiniCssExtractPlugin({ filename: '[name].[contenthash].bundle.css' })],
  module: {
    rules: [
      {
        // html-Dateien (außer bei Komponenten).
        test: /\.html$/,
        loader: 'html-loader',
        exclude: [/node_modules/],
      },
      {
        // TypeScript-Dateien.
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // "normale" scss-Stylesheets
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {},
            },
          },
        ],
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
