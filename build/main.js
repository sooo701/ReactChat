'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var devPort = 4000;

var app = (0, _express2.default)();
var port = 3000;

app.use('/', _express2.default.static(_path2.default.join(__dirname, './../public')));

app.get('/hello', function (req, res) {
  return res.send('Hello My First React App');
});

app.listen(port, function () {
  console.log('Express is listening on port', port);
});

/*
* dev Section
*/
if (process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');
  var config = require('../webpack.dev.config');
  var compiler = (0, _webpack2.default)(config);
  var devServer = new _webpackDevServer2.default(compiler, config.devServer);
  devServer.listen(devPort, function () {
    console.log('webpack-dev-server is runnign on port', devPort);
  });
}