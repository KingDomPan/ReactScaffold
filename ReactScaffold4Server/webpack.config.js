var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var PUBLIC_PATH = path.resolve(ROOT_PATH, 'public');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8888', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    path.resolve(APP_PATH, "main")
  ],
  output: {
    path: path.resolve(PUBLIC_PATH, 'js'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
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
      include: APP_PATH,
      exclude: /(node_modules|bower_components)/
    }]
  },
  resolve: {
    modulesDirectories: ['node_modules', APP_PATH],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};