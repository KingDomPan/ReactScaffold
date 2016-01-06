var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = process.env.HOT_LOAD_PORT || 8888;

new WebpackDevServer(webpack(config), {
  contentBase: 'http://localhost:' + port,
  publicPath: config.output.publicPath,
  noInfo: false,
  hot: true,
  inline: true,
  historyApiFallback: false,
  stats: {
    colors: true,
    progress: true
  }

}).listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Hot load server listening at localhost:' + port);
});
