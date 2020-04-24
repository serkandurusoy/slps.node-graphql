/* eslint-disable comma-dangle */

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

server.listen(8383, 'localhost', () => {});
