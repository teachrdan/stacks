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
      return $resource('assets/json/:deckId.json', {}, {
        query: {
          method:'GET',
          transformResponse: function (data) {return angular.fromJson(data).list},
          isArray:true
        }
      })
    }
  ]);