#!/usr/local/bin/node -

const path = require('path');
const bodyParser = require('body-parser')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const host = '127.0.0.1';
const port = '8080';
const publicPath = `http://${host}:${port}`

// Compiler
//
const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig);

// Web Server
//
const server = express();
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
server.use(bodyParser.json());
server.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));
server.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  heartbeat: webpackConfig.watchOptions.poll,
}));
server.listen(8080, '127.0.0.1', () => {
  console.log(`Listening on ${publicPath}`);
});
