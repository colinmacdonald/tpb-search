var request = require('request');
var jsdom = require('jsdom');
var _ = require('lodash');

var url = 'http://thepiratebay.se/search/';
var term = 'dvd';
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

      var htmlResults = nodeToArray($('body').find('#searchResult').children());
      htmlResults.splice(0, 1);

      var pbResults = [];

      _.each(htmlResults, function(result) {
        var row = $(result).children();

        var types = row.eq(0).find('a');
        var data = {
          type: types.eq(0).text(),
          subType: types.eq(1).text(),
          name: row.eq(1).find('.detName a').text(),
          seeds: seeds = row.eq(2).text(),
          peers: peers = row.eq(3).text()
        };

        pbResults.push(data);
      });

      var data = {
        results: pbResults,
        test: 'abc123'
      };

      res.render('grocer', data);
    }
  });
});
