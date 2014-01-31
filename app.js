/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./lib/routes');
var http = require('http');
var path = require('path');

var app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.locals({
  _layoutFile: 'layout'
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'static')));

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Load the routes
routes.initialize(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
