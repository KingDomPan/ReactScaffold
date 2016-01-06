var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  noInfo: false,
  historyApiFallback: false,
  stats: {colors: true, progress: true}
});

server.listen(8888, '127.0.0.1', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening WebpackDevServer At 127.0.0.1:8888');
});