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
      this.update = function(name, prompt, result, deck) {
        //var split = val.split(',');
        // make an object from the val
        var valObject = angular.fromJson('{"name" : "'+name+'", "prompt" : "'+encodeURIComponent(prompt)+'", "result" : "'+result+'", "deck" : "'+deck+'"}');
        //var data = this.latestData();
        var data = $localStorage.userprogress;
        // make an object from the local storage data
        if(data != null ) {
          var dataObject = angular.fromJson(data);
        } else {
          var dataObject = angular.fromJson('{"results" : []}');
        }
        // mush the two together
        var updated = myStorage.update(valObject,dataObject);
        // put it back in storage
        return updated;
      }
      $scope.$storage = $localStorage.$default({
        userprogress: '{"results" : []}'
      });
    $scope.$deleteLocal = function() {
      delete $scope.$storage.userprogress;
    };
    }
  ])
  .controller('questionsController', ['$scope', '$routeParams', 'questions',
    function($scope, $routeParams, questions) {
      $scope.prompt = questions.get({ deckId: $routeParams.deckId });
      $scope.deckId = $routeParams.deckId;
      $scope.checkAnswer = function(guess, answer, prompt) {
        $scope.result = (guess === answer);
      }
    }
  ])
  .controller('resultsController', ['$scope', '$localStorage',
    // DAN: Figure out how to filter through results by deckId, probably by creating a method that takes deckId to filter through results,
    // and returns # of questions right and wrong for that deck
    function($scope, $localStorage) {
      var storedData = angular.fromJson($localStorage.userprogress);
      console.log("Results Controller");
      console.log(storedData);
      $scope.results = storedData.results; //DAN: Change this so it shows the total # of questions attempted by deckId



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
      })
      $scope.rightCount = function(deckName,data) {
        var rightSoFar = 0;
        for (var n=0; n<data.length; n++) {
          if (data[n].deck == deckName) {
            if (data[n].result == 'true') {
              rightSoFar++;
            }
          }
        }
        return rightSoFar;
      }
      $scope.byDeck = function(deckName,data) {
        var ansSoFar = null;
        for (var n=0; n<data.length; n++) {
          if (data[n].deck == deckName) {
            if (ansSoFar == null) {
              ansSoFar = (data[n].name + " : " + data[n].result);
            } else {
              ansSoFar = ansSoFar + ", " + (data[n].name + " : " + data[n].result);
            }
          }
        }
      return ansSoFar;
      }
    }
  ]);