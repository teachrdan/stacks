'use strict';

/* Controllers */

var stacksControllers = angular.module('stacksControllers', [])
  .controller('decksController', ['$scope', 'decks',
    function($scope, decks) {
      decks.then(function(data) {
        $scope.decks = data.data;

      })
    }
  ])
  .controller('progressController', function(progress){
    this.value = progress.getData();
    this.latestData = function() {
      return progress.getData();
    };
    this.update = function(val) {
      return progress.setData(val);
    }
  })
  .controller('questionsController', [ '$scope', '$routeParams',  'questions',
    function($scope, $routeParams, questions) {
      $scope.prompt = questions.get({ deckId: $routeParams.deckId });
      $scope.checkAnswer = function(guess, answer, prompt) {
        $scope.result = (guess === answer);
      }
    }
  ])

  /*.controller('storageController', ['$scope', 'localStorageService',
    function($scope, localStorageService) {
      $scope.$watch('localStorageDemo', function(value){
       localStorageService.set('localStorageDemo',value);
        $scope.localStorageDemoValue = localStorageService.get('localStorageDemo');
      });
    $scope.storageType = 'Local storage';
    if (localStorageService.getStorageType().indexOf('session') >= 0) {
      $scope.storageType = 'Session storage';
    }
    if (!localStorageService.isSupported) {
      $scope.storageType = 'Cookie';
    }
  } 
])*/;