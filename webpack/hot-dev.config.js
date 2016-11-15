const webpack = require('webpack');
var config = require('./dev.config');

config.devServer.hot = true

config.entry.push(
  'webpack/hot/only-dev-server',
  'react-hot-loader/patch'
);

config.module = {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1', 'stage-0'],
        plugins: ['react-hot-loader/babel', 'transform-decorators-legacy']
      }
    },
    {
      test: /\.(css)$/,
      loaders: ['style-loader', 'css-loader']
    },
    {
      test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=8192'
    },
    {
      test: /\.(json)$/,
      loader: 'json-loader'
    },
    {
      test: /\.(scss)$/,
      loader: 'style!css!sass?sourceMap'
    }
  ]
};

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true
  })
];

module.exports = config;
