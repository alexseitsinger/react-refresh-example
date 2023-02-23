var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'
const publicPath = 'http://127.0.0.1:8080/'

module.exports = {
  //context: path.resolve(__dirname),
  mode: 'development',
  devtool: 'inline-source-map',
  watchOptions: {
    // *WARN* if using context, be sure to ignore everything except src dir.
    ignored: /node_modules/,
    // Required for react-refresh to work on FreeBSD.
    poll: 500,
  },
  entry: {
    app: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, 'src/index.js'),
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'App',
      publicPath,
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js','.jsx'],
  }
};
