'use strict';

/* Controllers */

var stacksControllers = angular.module('stacksControllers', []);

// Controller for the main decks page with multiple stories

stacksControllers.controller('decksController', ['$scope', 'decks',
  function($scope, decks) {
      decks.then(function(data) {
      console.log(data.data.decks);
      $scope.decks = data.data.decks;
    })
  }
]);

stacksControllers.controller('questionsController', [ '$scope', 'decks',
  function($scope, decks) {
      decks.then(function(data){
        
        $scope.prompt = [];
        angular.forEach(data.data.decks.regex2.questions, function(value,key){
          $scope.prompt.push(value);
        })
      });
    }
]);

stacksControllers.controller('progressController', function(progress){
  this.value = progress.getData();
  this.latestData = function() {
    return progress.getData();
  };
  this.update = function(val) {
    return progress.setData(val);
  }
});

stacksControllers.controller('storageController', [
  '$scope',
  'localStorageService',
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
