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
  .controller('progressController', ['$scope', '$filter', 'localstorage', 'progress', 
    function($scope, $filter, localstorage, progress ){
      this.value = progress.getData();
      this.latestData = function() {
        return progress.getData();
      };
      this.update = function(val) {
        var data = this.latestData();
        var split = val.split(',');
        // make an object from the val
        var valObject = angular.fromJson('{"'+split[0]+'":"'+split[1]+'"}');
        // make an object from the local stroage data
        if(data != null ) { 
          var dataObject = angular.fromJson(data); 
        } else {
          var dataObject = angular.fromJson('{"results" : [{"what":"ever"}]}');
        }
        
        // mush the two together
        var updated = localstorage.update(valObject,dataObject);
        // make them a string cause fuck data storage
        var string = $filter('json')(updated);
        // put it back in storage
        console.log(updated);
        return progress.setData(string);
      }
    }
  ])
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