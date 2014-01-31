/*jshint node:true */
'use strict';

/**
 * @requires
 */
var request = require('request');
var jsdom = require('jsdom');
var _ = require('lodash');

/**
 * @exports
 */
var tpb = exports;
tpb.constructor = function tpb() {};

tpb.results = function(req, res) {
  res.render('results');
};

tpb.fetch = function(term, cb) {

  var url = 'http://thepiratebay.se/search/';
  var page = '0';
  var end = '/7/0/';

  var searchUrl = url + term + '/' + page + end;

  request({ uri: searchUrl }, function (error, response, body) {
    if (error && response.statusCode !== 200) {
      console.log('Error when contacting');
    }

    jsdom.env({
      html: body,
      scripts: [
        'http://code.jquery.com/jquery-1.7.min.js'
      ],
      done: function (err, window) {
        var $ = window.jQuery;

        var htmlResults = $('body').find('#searchResult').children();
        htmlResults.splice(0, 1);

        var pbResults = [];

        _.each(htmlResults, function(result) {
          var row = $(result).children();

          var types = row.eq(0).find('a');
          var data = {
            type: types.eq(0).text(),
            subType: types.eq(1).text(),
            name: row.eq(1).children().eq(0).find('a').text(),
            link: '//' + row.eq(1).children().eq(1).attr('href'),
            seeds: row.eq(2).text(),
            peers: row.eq(3).text()
          };

          pbResults.push(data);
        });

        var data = {
          results: pbResults,
          test: 'abc123'
        };

        cb(data);
      }
    });
  });
};

tpb.search = function(req, res) {
  var term = req.query.search;

  tpb.fetch(term, function(data) {
    res.send(data);
  });
};
