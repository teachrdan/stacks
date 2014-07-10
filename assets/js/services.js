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
      var product = $resource('assets/json/:deckId.json', {}, 
      {
        get: {method:'GET', params:{}, isArray:true}
      })
    return product;
    }
  ])
  //Write service that creates a results string for storage.
  .factory('stringTime', function(){
    return {
      makeIt: function(data) {
        return '{"results" : [' + data + ']}';
      }
    }
  })
  .factory('localstorage', ['stringTime', 
    function(stringTime){
    return { 
        update: function(val,data) {
          //val = the value of the users action. Look at the val object that arrived and get it into variables.
          for(var k in val) {
            var qKey = k;
            var qVal = val[k];
          }
          // data = the data already in local storage.
          var product = [];
          var match = false; //this sets match's initial value to false
            angular.forEach(data.results, function(value,key){
              for(var dataKey in value) {
                 if(qKey == dataKey) {
                  //If key exists, update value to latest user action value. If it doesn't exist, it adds the value.
                  product.push('{"' + dataKey + '":"' + qVal + '"}');
                  //console.log("They match: " + qKey + " equals " + dataKey + " set existing value to " + qVal);
                  match = true; //If they match then match is set to true.
                  // if the key matches replace it, if not then add the one we are matching, if it mathces none add it to the end
                  } else {
                  //else keep the old values
                  product.push('{"' + dataKey + '":"' + value[dataKey] + '"}');
                }
              }
            });
            if(match == false) {
               product.push('{"' + qKey + '":"' + qVal + '"}');
             }
          //return '{"results" : ['+ product + ']}';
          return stringTime.makeIt(product);
      }
    }
  }]);