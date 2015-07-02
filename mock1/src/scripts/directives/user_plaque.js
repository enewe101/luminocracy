'use strict';
var my_app = angular.module('my_app')

my_app.directive('luUserPlaque', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
      },
      controller: [ "$scope",'feed','User', function($scope,feed,User) {
          $scope.feed = feed;
          $scope.user = User;
      }],
      link: function (scope, element, attrs, controller) {
      },
      templateUrl: function(elem, attr){
        return 'partials/user_plaque.html';
      },
      replace: true
    };
  })