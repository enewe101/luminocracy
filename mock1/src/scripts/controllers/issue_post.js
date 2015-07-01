'use strict';
var my_app = angular.module('my_app')

my_app.controller('IssuePostCtrl', function($scope) {
	$scope.post_text = '';
	$scope.posts = [];
	$scope.put_post = function(e) {
		$scope.posts.unshift({
			'text': $scope.post_text,
			'user': {
				'username': 'Me User',
				'rep': 498
			}
		});
	}
});