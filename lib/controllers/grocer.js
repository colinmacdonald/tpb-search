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
var grocer = exports;
grocer.constructor = function grocer() {};

grocer.parse = function(req, res) {

  res.render('grocer');
};

/*
grocer.parse = function(req, res) {

  var url = 'http://director.flyerservices.com/SOB/default.aspx??OrganizationId=83f1a551-da15-4775-9da1-5381bd94c11a&BannerId=0f69e65d-a96e-4871-8f86-a5fe7dde96c0&Language=en&BannerName=SOB&StoreId=ec51c57d-fcad-4e6e-b1af-4b253b2f7fbb&PostalCode=&publicationrunid=d7c86f34-0c88-40cd-871a-4e780d7d9b84&PublicationId=48de0621-ce4c-4f1f-9bf4-cd9a603794fb&PublicationType=1&Edition=2&SessionId=mdsbuon5cbnjsq45wbaxulme&version=TEXT';
  //var url = 'http://sob.ca.flyerservices.com/cached_banner_pages/publication.aspx?BannerName=SOB';

  request({ uri: url }, function (error, response, body) {
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

        // jQuery is now loaded on the jsdom window created from 'agent.body'
        console.log($('body').html());
      }
    });
  });

  var data = {
    test: 'test'
  };

  res.render('grocer', data);
};
*/
/*
grocer.join = function(req, res) {
  var room = req.session.room;
  var token = req.session.token;
  var host = req.session.host;

  var data = _.clone(DATA);

  data.room = room;
  data.token = token;
  data.host = req.session.host;
  data.joinURL = req.protocol + '://' + req.get('host') + req.url;

  res.render('conference', data);
};

grocer.create = function(req, res) {
  // Room already exists in session
  if (req.session.room) {
    return res.redirect('/conference/' + req.session.room);
  }

  // Generate a random room
  generator.room(function(room) {
    req.session.room = room;
    req.session.host = room;

    req.session.save(function() {
      res.redirect('/conference/' + req.session.room);
    });
  });
};

grocer.auth = function(req, res) {
  var name = req.body.displayName;

  if (name.length > NAME_LENGTH) {
    return res.redirect('/');
  }

  var data = {
    dn: name
  };

  generator.token(data, function(token) {
    req.session.token = token;

    req.session.save(function() {
      res.redirect('/conference');
    });
  });
};
*/
