/* jshint browser:true */

(function() {
'use strict';

var angular = window.angular;

angular.module('Controls', []);
angular.module('TPBSearch', ['goangular']);
angular.module('Popular', ['goangular']);

angular.module('App', [
  'TPBSearch',
  'Popular'
]);

})();
