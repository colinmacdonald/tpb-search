/*jshint node: true */
/*globals exports */

'use strict';

var configure = exports; exports.constructor = function configure() {};

var express = require('express');
var ejsLocals = require('ejs-locals');
var RedisStore = require('connect-redis')(express);

configure.apply = function(config) {
  var app = express();

  // Application env & config
  app.set('env', process.env.NODE_ENV || 'local');
  app.set('port', process.env.PORT || config.server.listen);
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'ejs');

  // View rendering engine
  app.engine('ejs', ejsLocals);
  app.locals({
    _layoutFile: 'layout'
  });

  // Application setup
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: config.express.secret,
    store: new RedisStore(config.redis)
  }));

  if (app.get('env') === 'local') {
    app.use('/static', express.static(__dirname + '/../static'));
  }

  app.use(app.router);

  // Development only error handler
  if (app.get('env') == 'local') app.use(express.errorHandler());

  return app;

};
