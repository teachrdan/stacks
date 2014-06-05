'use strict';

/* Services */

var stacksServices = angular.module('stacksServices', ['ngResource']);

stacksServices.factory('decks', function($http) {
    var product = $http.get('assets/json/decks.json')
    .success(function(data) {
        return data
   })
   return product
})

stacksServices.factory('questions', function($http) {
    var product = $http.get('assets/json/decks.json')
    .success(function(data) {
      console.log(data);
        return data;
  }) 
  return product;
})