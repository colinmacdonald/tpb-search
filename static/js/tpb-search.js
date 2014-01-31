/* jshint browser:true */

(function() {
'use strict';

var _ = window._;

var module = angular.module('TPBSearch');

module.factory('FetchResults', function($http, $q) {
  var service = {
    fetch: function(term) {
      var deferred = $q.defer();

      var params = {
        term: term
      };

      $http.get('/fetch', params).success(function(data) {
        deferred.resolve(data);
      }).error(function() {
        deferred.reject('Failed to Fetch Results.');
      });

      return deferred.promise;
    }
  };

  return service;
});

module.controller('SearchCtrl', function($scope, FetchResults) {
  $scope.fetchResults = function(term) {
    FetchResults.fetch(term).then(function(data) {
      $scope.results = data.results;
    });
  };

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

module.directive('search', function() {
  var dir = {
    restrict: 'A',
    templateUrl: '/templates/search.html',
    link: function($scope, element) {
      element.bind('keydown', function(event) {
        if (event.which !== 13) {
          return;
        }

        $scope.fetchResults($scope.term);
      });
    }
  };

  return dir;
});

module.directive('filter', function() {
  var dir = {
    restrict: 'A',
    scope: false,
    templateUrl: '/templates/filter.html'
  };

  return dir;
});

module.directive('results', function() {
  var dir = {
    restrict: 'A',
    link: function(scope) {
      $scope.sort = function(header) {
        $scope.header = ($scope.header !== header) ? header : '-' + header;
      };
    },
    templateUrl: '/templates/results.html',
  };

  return dir;
});

})();
