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

stacksApp.config(function($routeProvider, $locationProvider) {
	
  // use the HTML5 History API
  $locationProvider.html5Mode(true);

  $routeProvider
   	.when('/', {
      templateUrl: 'assets/partials/decks.html',
      controller: 'decksController'
    })
    .when('/:deckId', {
      templateUrl: 'assets/partials/deck_detail.html',
      controller: 'questionsController'
    })
    .otherwise({
      redirectTo: '/'
    });
});