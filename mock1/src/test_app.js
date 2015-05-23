var test_app = angular.module('test_app', []);

test_app.controller('Basic', function($scope) {
	$scope.posts = ['yo', 'dude', "where's my car"];
});
