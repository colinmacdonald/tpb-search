/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./lib/routes');
var http = require('http');
var path = require('path');
var ejsLocals = require('ejs-locals');

var app = express();

app.configure(function() {
  app.set('env', process.env.NODE_ENV || 'local');
  app.set('port', 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('ejs', ejsLocals);
  app.locals({
    _layoutFile: 'layout',
    title: 'TPB Search'
  });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'static')));
});

// Load the routes
routes.load(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
