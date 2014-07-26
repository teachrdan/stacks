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
      if(event.key === 'stacksApp-userprogress') {
        $rootScope.$apply();
      }
    });
    return {
      setData: function(val) {
        $window.localStorage && $window.localStorage.setItem('stacksApp-userprogress', val);
        return this;
      },
      getData: function() {
        return $window.localStorage && $window.localStorage.getItem('stacksApp-userprogress');
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
  .factory('myStorage', ['stringTime', 
    function(stringTime){
    return { 
        update: function(val,data) {
          var product = [];
          var match = false;

          //val = the value of the users action. Look at the val object that arrived and get it into variables.
          var qVal = val.name;

          console.log(val);  
          console.log(data.results);

          // data = the data already in local storage.
            angular.forEach(data.results, function(value,key){
              console.log(value);
              for(var dataKey in value) {
                if(dataKey == "name") {
                  if(qVal == value[dataKey]) {
                    //If key exists, update value to latest user action value. If it doesn't exist, it adds the value.
                    product.push('{"name" : "' + val.name + '", "prompt" : "' + val.prompt + '", "result" : "' + val.result + '", "deck" : "' + val.deck + '"}');
                    //console.log("They match: " + qKey + " equals " + dataKey + " set existing value to " + qVal);
                    match = true;
                    // if the key matches replace it, if not then add the one we are matching, if it matches none add it to the end
                  } else {
                    //else keep the old values
                    product.push('{"name" : "' + value.name + '", "prompt" : "' + value.prompt + '", "result" : "' + value.result + '", "deck" : "' + value.deck + '"}');
                  }
                }
              }
            });
            if(match == false) {
               product.push('{"name" : "' + val.name + '", "prompt" : "' + val.prompt + '", "result" : "' + val.result + '", "deck" : "' + val.deck + '"}');
            }
           console.log(stringTime.makeIt(product));
        return stringTime.makeIt(product);
      }
    }
  }]);