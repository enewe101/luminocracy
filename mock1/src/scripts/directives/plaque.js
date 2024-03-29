'use strict';
var my_app = angular.module('my_app')

my_app.directive('luPlaque', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { 
          title: '@',
          type: '@',
      },
      controller: [ "$scope",'feed','User', function($scope,feed,User) {
        $scope.user = User
        $scope.feed = feed
      }],
      link: function (scope, element, attrs, controller) {

      },
      templateUrl: function(elem, attr){
        return 'partials/plaque_'+attr.type+'.html';
      },
      replace: true
    };
  })