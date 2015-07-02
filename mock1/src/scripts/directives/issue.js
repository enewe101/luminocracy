'use strict';
var my_app = angular.module('my_app')

my_app.directive('luIssue', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { 
      },
      controller: [ "$scope",'Issue', function($scope,Issue) {
        	$scope.issue = Issue;
      }],
      link: function (scope, element, attrs, controller) {

      },
      templateUrl: function(elem, attr){
        return 'partials/issue.html';
      },
      replace: true
    };
  })