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

tpb.search = function(req, res) {
  res.render('tpb-search');
};

tpb.fetch = function(req, res) {
  var term = req.query.search;

  res.send(sampleData);
  /*
  tpbFetch(term, function(data) {
    res.send(data);
  });
  */
};

function tpbFetch(term, cb) {
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
      done: function(err, window) {
        var $ = window.jQuery;

        var htmlResults = $('body').find('#searchResult').children();
        htmlResults.splice(0, 1);

        var tpbResults = [];

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

          tpbResults.push(data);
        });

        var data = {
          results: tpbResults
        };

        cb(data);
      }
    });
  });
}

/**
 * @todo: remove
 */
var sampleData = {
  results: [
    {
      type: 'Music',
      name: 'One',
      link: 'http://www.goinstant.com',
      seeds: 123,
      peers: 9123
    },
    {
      type: 'Music',
      name: 'Two',
      link: 'http://goinstant.com',
      seeds: 456,
      peers: 124
    },
    {
      type: 'Show',
      name: 'Three',
      link: 'http://asdgvhjad.com',
      seeds: 6789,
      peers: 864
    },
    {
      type: 'Movie',
      name: 'Four',
      link: 'http:/asghdajd.com',
      seeds: 9734,
      peers: 10931
    }
  ]
};

