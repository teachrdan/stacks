'use strict';

/* App Module */

var stacksApp = angular.module('stacksApp', [
	'ngRoute',
	'stacksControllers',
	'stacksServices',
  'LocalStorageModule'
])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('stacks');
  // The following two lines were originally commented out -DTS
  localStorageServiceProvider.setStorageCookieDomain('stacks.io');
  localStorageServiceProvider.setStorageType('sessionStorage');
}]);