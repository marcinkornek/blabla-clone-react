const config = require('./../webpack.config');
var webpack = require('webpack');

config.devtool = 'eval';
config.plugins = [
  new webpack.DefinePlugin({
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false
  })
];

module.exports = config;
