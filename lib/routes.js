/*jshint node:true */

'use strict';

var routes = exports; exports.constructor = function() {};

var NotFound = require('./controllers/errors').NotFound;
var App = require('./controllers/app').App;

routes.load = function(app) {

  app.get('/', function(req, res) {
    return new App(req, res).get();
  });

  app.all('*', NotFound);
};
