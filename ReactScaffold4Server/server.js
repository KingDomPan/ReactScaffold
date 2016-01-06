require('babel-register');

var path = require('path');
var fs = require('fs');

var logger = require('morgan');

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var swig = require('swig');
var favicon = require('serve-favicon');

var app = express();

var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');

var routes = require('./app/routes');

var content = require('./static');

app.set('port', process.env.PORT || 8989);

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'app', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));

var template = path.join(__dirname, 'app', 'templates', 'dashboard', 'index.html');

app.use(function (req, res) {
  Router.match({
    routes: routes.default,
    location: req.url
  }, function (err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      try {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile(template, content({html: html}));
        res.status(200).send(page);
      } catch (e) {
        console.log(e);
      }
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), function (req, res) {
  console.log('Express server listening on port ' + app.get('port'));
});