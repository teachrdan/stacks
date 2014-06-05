'use strict';

/* App Module */

var stacksApp = angular.module('stacksApp', [
	'ngRoute',
	'stacksControllers',
	'stacksServices',
]);

/*
stacksApp.config(function($routeProvider, $locationProvider) {
	
  $locationProvider.html5Mode(true);

  $routeProvider
      .when('/', {
        templateUrl: 'partials/stories_list.html',
        controller: 'storyController'
      })
      .when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'aboutController'
      })
      .when('/contribute', {
        templateUrl: 'partials/contribute.html'
      })
      .when('/text', {
        template: 'Test text into index.'
      })
      .when('/:storyId', {
        templateUrl: 'partials/story_detail.html',
        controller: 'storyDetailController'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
  */
