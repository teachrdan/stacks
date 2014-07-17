'use strict';

/* App Module */

var stacksApp = angular.module('stacksApp', [
	'ngRoute',
  'ngStorage',
	'stacksControllers',
	'stacksServices'
])

stacksApp.config(function($routeProvider, $locationProvider) {
	
  // use the HTML5 History API
  // $locationProvider.html5Mode(true);

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