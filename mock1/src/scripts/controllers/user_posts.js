'use strict';
var my_app = angular.module('my_app')

my_app.controller('UserPostsCtrl', ['$scope', 'feed', function($scope, feed) {
	$scope.feed = feed;

}]);
