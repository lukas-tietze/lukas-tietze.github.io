const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: ['./src/index.ts', './src/index.scss'],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: './dist',
    clean: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        // html-Dateien (außer bei Komponenten).
        test: /\.html$/,
        loader: 'html-loader',
        options: {},
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
          'sass-loader',
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].bundle.css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
