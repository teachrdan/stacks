'use strict';

/* Directives */
/* AngularJS Directive for Twitter's Embedded Timeline with support for custom CSS. */
/* https://github.com/userapp-io/twitter-timeline-angularjs */

var stacksDirectives = angular.module('stacksDirectives', [])
.directive('questionCount', function(questions) {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope) {
      scope.total = questions.get({ deckId: scope.deck.id })
    },
    template: '<span>{{total.length}}</span>'
  };
});