'use strict';

/* Controllers */

var stacksControllers = angular.module('stacksControllers', []);

// Controller for the main decks page with multiple stories

stacksControllers.controller('questionsController', ['$scope', 'questions',
  function($scope, questions) {
    questions.then(function(data) {
      $scope.questions = data.data
      $scope.qa = [];
      console.log(data.data)
      angular.forEach(data.data.regex1, function(value,key){
         $scope.qa.push(value); 
      })
    })
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
})