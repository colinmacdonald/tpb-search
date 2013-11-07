/*jshint node:true */
'use strict';

var app = exports;
exports.constructor = function app() {};

var config = require('json-config')();

function App(req, res) {
  this.req = req;
  this.res = res;
}

App.prototype.get = function() {
  var data = {
    example: 'test'
  };

  return this.res.render('index', data);
};

app.App = App;
