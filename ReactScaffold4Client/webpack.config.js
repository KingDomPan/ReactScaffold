"use strict";

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');

var port = process.env.HOT_LOAD_PORT || 8888;

var config = {
  cache: true,
  resolve: {
    extensions: ['', '.js', 'jsx'],
    modulesDirectories: ['node_modules']
  },
  entry: [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/dev-server',
    './client.js'
  ],
  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'client.js',
    publicPath: 'http://localhost:' + port + '/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Scaffold Template',
      inject: true,
      template: './template.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css'],
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=40000',
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /(node_modules|bower_components)/
    }]
  }
};

if (process.env.NODE_ENV === "development") {
  config.devtool = 'eval';
}


module.exports = config;
