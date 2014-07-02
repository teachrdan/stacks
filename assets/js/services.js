'use strict';

/* Services */

var stacksServices = angular.module('stacksServices', ['ngResource'])
  .factory('decks', function($http) {
      var product = $http.get('assets/json/decks.json')
      .success(function(data) {
          return data;
     })
     return product;
  })
  .factory('progress', function($window,$rootScope) {
    angular.element($window).on('storage', function(event){
      if(event.key === 'user-progress') {
        $rootScope.$apply();
      }
    });
    return {
      setData: function(val) {
        $window.localStorage && $window.localStorage.setItem('user-progress', val);
        return this;
      },
      getData: function() {
        return $window.localStorage && $window.localStorage.getItem('user-progress');
      }
    }
  })
  .factory('questions', ['$resource',
    function($resource) {
      var product = $resource('assets/js/json/:deckId.json', {}, 
      {
        query: {method:'GET', params:{deckId:'questions'}, isArray:true}
      })
      console.log($resource);
    return product;
    }
  ]);
  /*
  .factory('questions', ['$resource',
    function($http) {
      //console.log($resource);
      var product = $http.get('assets/json/:deckId.json')
      .success(function(data) {
          return data;
     })
     return product;
  }]);
  */