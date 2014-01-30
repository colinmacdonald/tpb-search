/* jshint browser:true */

(function() {
'use strict';

var _ = window._;

var module = angular.module('Search');

module.factory('Data', function() {
  var data = [
    {
      name: 'One',
      link: 'http://www.goinstant.com',
      seeds: 123
    },
    {
      name: 'Two',
      link: 'http://goinstant.com',
      seeds: 456
    },
    {
      name: 'Three',
      link: 'http://asdgvhjad.com',
      seeds: 6789
    },
    {
      name: 'Four',
      link: 'http:/asghdajd.com',
      seeds: 9734124
    }
  ];

  return {
    getData: function() {
      return data;
    }
  };
});

module.controller('SearchCtrl', function($scope, Data) {
  $scope.results = Data.getData();
  $scope.name = 'One';

  $scope.filterName = function(result) {
    if (!$scope.name) {
      return true;
    }

    var contains = result.name.toLowerCase().indexOf($scope.name.toLowerCase());
    return (contains >= 0) ? true : false;
  };

  $scope.filterSeed = function(result) {
    if (!$scope.seed) {
      return true;
    }

    var equal = result.seeds >= $scope.seed;
    return equal;
  };
});

module.directive('results', function() {
  var dir = {
    restrict: 'E',
    templateUrl: '../templates/results.html'
  };

  return dir;
});

module.directive('search', function() {
  var dir = {
    restrict: 'E',
    scope: false,
    templateUrl: '../templates/search.html'
  };

  return dir;
});

})();
