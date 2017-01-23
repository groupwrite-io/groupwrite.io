var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './public/client.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/public'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.(png|jpg|gif)$/, loader: 'url' }
    ]
  }
};