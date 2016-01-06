"use strict";

require("babel-register");

var path = require('path');

var express = require('express');
var server = express();

var compression = require('compression');
var cors = require('cors');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var swig = require('swig');
var logger = require('morgan');

server.use(compression());
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(favicon(path.join(__dirname, 'favicon.png')));
server.use(cors());

if (process.env.NODE_ENV === "production") {
  server.use('/build', express.static(path.join(__dirname, '/build')));
}

server.use('/static', express.static(path.join(__dirname, '/static')));

var template = path.join(__dirname, 'build', 'index.html');

server.use(function (req, res) {
  var page = swig.renderFile(template);
  res.status(200).send(page);
});

var port = process.env.PORT || 8080;
server.listen(port);

if (process.env.NODE_ENV === "development") {
  console.log('server.js is listening on port ' + port);
}
