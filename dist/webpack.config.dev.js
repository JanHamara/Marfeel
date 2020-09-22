"use strict";

//webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var isProduction = process.env.NODE_ENV === 'production';

var path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: 'raw-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: "style-loader!css-loader",
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
      use: 'url-loader'
    }, {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: 'url-loader'
    }]
  },
  plugins: isProduction ? [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({
    template: './index.html'
  })] : [new HtmlWebpackPlugin({
    template: './index.html'
  })]
};