/*jshint node:true */
'use strict';

var http = require('http');

// Autoload JSON config
var config = require('json-config')();

// Configure application
var app = require('./lib/configure').apply(config);

var routes = require('./lib/routes');
routes.load(app);

// Listen
http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
