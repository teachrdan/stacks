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
      var data = this.latestData();
      return progress.setData(data + ', '+ val);
    };
    this.clear = function() {
      return progress.setData(null);
    };
  })
  .controller('questionsController', ['$scope','$routeParams', 'questions',
    function($scope, $routeParams, questions) {
      var questions = questions.get({deckId: $routeParams.deckId});
      $scope.questions = questions;
      var number = 0;
      $scope.number = number;
    }
      /*
      $scope.checkAnswer = function(guess, answer, prompt) {
        $scope.result = (guess === answer);
      }
    }
    */
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