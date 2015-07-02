'use strict';
var my_app = angular.module('my_app')

my_app.directive('luSubscribe', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { 
      },
      controller: [ "$scope", function($scope) {
        	$scope.is_subscribed=false;
	        $scope.sub_class = 'sub_icon_inactive';
	        $scope.sub_text = 'subscribe'

	        $scope.toggle_subscribe = function(e) {
		        if($scope.is_subscribed) {
			        $scope.sub_class = 'sub_icon_inactive';
			        $scope.sub_text = 'subscribe';
		        } else {
			        $scope.sub_class = 'sub_icon_active';
			        $scope.sub_text = "you're subscribed";
		        }
		        $scope.is_subscribed = !$scope.is_subscribed;
	        };
      }],
      link: function (scope, element, attrs, controller) {

      },
      templateUrl: 'partials/subscribe.html',
      replace: true
    };
  })