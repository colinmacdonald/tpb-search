/* jshint browser:true */

(function() {
'use strict';

var module = angular.module('Controls');

module.directive('collapse', function() {
  var dir = {
    restrict: 'A',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope) {
      scope.contentVisible = false;

      scope.toggleCollapse = function() {
        scope.contentVisible = !scope.contentVisible;
      };
    },
    templateUrl: '../templates/collapse.html'
  };

  return dir;
});

})();
