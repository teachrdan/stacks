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
  .controller('progressController', ['$scope', '$localStorage', 'myStorage', 'progress', 'stringTime',
    function($scope, $localStorage, myStorage, progress, stringTime) {
      this.value = progress.getData();
      this.latestData = function() {
        return progress.getData();
      };
      this.update = function(val) {

        var split = val.split(',');
        // make an object from the val
        var valObject = angular.fromJson('{"'+split[0]+'":"'+split[1]+'"}');

        //var data = this.latestData();
        var data = $localStorage.userprogress;
        // make an object from the local storage data
        if(data != null ) { 
          var dataObject = angular.fromJson(data);
        } else {
          var dataObject = angular.fromJson(stringTime.makeIt(''));
        }

        // mush the two together
        var updated = myStorage.update(valObject,dataObject);
        // make them a string cause fuck data storage
        var string = String(updated);
        console.log("this is what I will save");
        console.log(string);
        // put it back in storage
        return updated;
      }
      $scope.$storage = $localStorage.$default({
        userprogress: []
      });
    $scope.$deleteLocal = function() {
      delete $scope.$storage.userprogress;
    };
    }
  ])
  .controller('questionsController', ['$scope', '$routeParams', 'questions',
    function($scope, $routeParams, questions) {
      $scope.prompt = questions.get({ deckId: $routeParams.deckId });
      $scope.checkAnswer = function(guess, answer, prompt) {
        $scope.result = (guess === answer);
      }
    }
  ])
  .controller('resultsController', ['$scope', '$localStorage',
    function($scope, $localStorage) {
      var storedData = angular.fromJson($localStorage.userprogress);
      $scope.results = storedData.results;
      console.log(storedData.results);
      $scope.qfalse = [];
      $scope.qtrue = [];
      angular.forEach($scope.results, function(value,key){
        angular.forEach(value, function(value,key){
          if(value == "true") {
            $scope.qtrue.push(key);
          }
          if(value == "false") {
            $scope.qfalse.push(key);
          } 
        })
      });
    }
  ]);
