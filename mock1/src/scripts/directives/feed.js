'use strict';
var my_app = angular.module('my_app')

my_app.directive('luFeed', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { 
      },
      controller: [ "$scope",'feed', function($scope,feed) {
        	$scope.feed = feed;
      }],
      link: function (scope, element, attrs, controller) {

      },
      templateUrl: function(elem, attr){
        return 'partials/feed.html';
      },
      replace: true
    };
  })