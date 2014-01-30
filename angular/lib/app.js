/* jshint browser:true */

(function() {
'use strict';

var angular = window.angular;

angular.module('Controls', []);
angular.module('Search', ['Controls']);
angular.module('Popular', ['goangular']);

angular.module('App', [
  'Search',
  'Popular'
]);

})();
