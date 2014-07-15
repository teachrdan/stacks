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
  .controller('progressController', ['$scope', 'localstorage', 'progress', 'stringTime',
    function($scope, localstorage, progress, stringTime) {
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
          var dataObject = angular.fromJson(stringTime.makeIt(''));
        }
        // mush the two together
        console.log("this is the data I pass to update");
        console.log(dataObject);
        var updated = localstorage.update(valObject,dataObject);
        // make them a string cause fuck data storage
        var string = String(updated);
        console.log("this is what I will save");
        console.log(string);
        // put it back in storage
        return progress.setData(string);
      }
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
  .controller('resultsController', ['$scope', 'progress',
    function($scope,progress) {
      var storedData = angular.fromJson(progress.getData());
      $scope.results = storedData.results;
      $scope.qfalse = [];
      $scope.qtrue = [];
      angular.forEach($scope.results, function(value,key){
        angular.forEach(value, function(value,key){
          console.log(value);
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
