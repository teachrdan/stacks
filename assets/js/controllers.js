'use strict';

/* Controllers */

var stacksControllers = angular.module('stacksControllers', [])
  .controller('decksController', ['$scope', 'decks', 'questions',
    function($scope, decks, questions) {
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
        if(data != null) {
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
      // Counts total number of questions in a deck
      $scope.total = function() {
        var total = 0;
        total = $scope.prompt.length;
        return total;
      }
      // Counts number of questions attempted in this deck
      $scope.ansSoFar = function(deckId,data) {
        var deckQuestionCount = 0;
        for(var n=0; n<data.length; n++) {
          // Checks if questions attempted were in the current deck
          if(data[n].deck==deckId) {
            deckQuestionCount++;
          }
        }
        return deckQuestionCount;
      }
      // Checks if question was answered correctly
      $scope.checkAnswer = function(guess, answer, prompt) {
        $scope.result = (guess === answer);
      }
    }
  ])
  .controller('resultsController', ['$scope', '$localStorage',
    function($scope, $localStorage) {
      var storedData = angular.fromJson($localStorage.userprogress);
      console.log("Results Controller");
      console.log(storedData);
      $scope.results = storedData.results;
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
      // Counts number of right answers so far
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
      $scope.wrongCount = function(deckName,data) {
        var wrongSoFar = 0;
        for (var n=0; n<data.length; n++) {
          if (data[n].deck == deckName) {
            if (data[n].result == 'false') {
              wrongSoFar++;
            }
          }
        }
        return wrongSoFar;
      }
      $scope.deckCount = function(deckName,data) {
        var deck = 0;
        for (var n=0; n<data.length; n++) {
          if (data[n].deck == deckName) {
              deck++;
          }
        }
        return deck;
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