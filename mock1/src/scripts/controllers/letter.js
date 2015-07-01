'use strict';
var my_app = angular.module('my_app')

my_app.controller('LetterCtrl',
	function($scope) {
		$scope.num_recipients_to_show = 2;
		$scope.show_recipients = false;
		$scope.toggle_recipients = function() {
			$scope.show_recipients = !$scope.show_recipients;
		}
	}
);
