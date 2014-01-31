/*jshint node:true */

'use strict';

var tpb = require('./controllers/tpb');

var routes = routes || {};

routes.load = function(app) {

  app.get('/', tpb.search);

  app.get('/search', tpb.search);

  app.get('/fetch', tpb.fetch);

  app.get('*', function(req, res) {
    res.render('page-not-found');
  });
};

module.exports = routes;
