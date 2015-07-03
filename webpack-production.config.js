var path    = require('path');
var webpack = require('webpack');

module.exports = {
  devServer: {
    progress: true,
    colors: true,
    profile: true,
    historyApiFallback: true,
  },
  devtool: 'eval',
  entry: [
    './src/app.cjsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['', '.js', '.cjsx', '.coffee']
  },
  module: {
    loaders: [
      {
        test: /\.cjsx?$/,
        loaders: ['coffee-loader', 'cjsx-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.coffee$/,
        loader: 'coffee-loader'
      },
      {
        test: /\.css$/,
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
  }
};
