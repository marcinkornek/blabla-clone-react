const config = require('./../webpack.config');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

config.devtool = 'eval-source-map';
config.output.publicPath = '/static/';

config.entry.push(
  'webpack-dev-server/client?http://localhost:8080'
);

config.devServer = {
  progress: true,
  colors: true,
  port: 8080,
  inline: true,
  historyApiFallback: true,
};

config.plugins.push(
  new WebpackNotifierPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __DEVELOPMENT__: true,
    __DEVTOOLS__: false
  })
);

module.exports = config;
