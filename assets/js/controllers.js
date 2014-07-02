'use strict';

/* Controllers */

var stacksControllers = angular.module('stacksControllers', [])
  .controller('decksController', ['$scope', 'decks',
    function($scope, decks) {
      decks.then(function(data) {
        $scope.decks = data.data.decks;
        // added by margot to create a function we can call on ng-click of a deck name
        $scope.setUserChoice = function(choice){
          return $scope.userChoice = choice;
        }
      })
    }
  ])
  .controller('questionsController', [ '$scope', 'decks',
    function($scope, decks) {
      decks.then(function(data){        
        $scope.prompt = [];
        angular.forEach(data.data.decks.regex2.questions, function(value,key){
          $scope.prompt.push(value);
        })
      });
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
  .controller('storageController', ['$scope', 'localStorageService',
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
]);