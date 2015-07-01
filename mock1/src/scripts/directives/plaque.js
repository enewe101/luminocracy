'use strict';
var my_app = angular.module('my_app')

my_app.directive('luPlaque', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { 
          title: '@',
          click: '&',
          items: '=',
          active: '=',
          selected: '='
      },
      controller: [ "$scope", function($scope) {
        
      }],
      templateUrl:'partials/plaque.html',
      replace: true
    };
  })