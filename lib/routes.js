/*jshint node:true */

'use strict';

var grocer = require('./controllers/grocer');
var tpb = require('./controllers/tpb');

var routes = routes || {};

routes.initialize = function(app) {

  app.get('/', tpb.results);

  app.get('/index', tpb.results);

  app.get('/results', tpb.results);

  app.get('/search', tpb.search);

  app.get('*', function(req, res) {
    res.render('page-not-found');
  });
};

module.exports = routes;
