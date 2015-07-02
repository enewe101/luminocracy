'use strict';
var my_app = angular.module('my_app')

my_app.controller('FeedCtrl', ['$scope', '$routeParams', 'feed','User','ViewMode','Issue', 
	function($scope,$routeParams, feed, User, ViewMode, Issue){
		$scope.feed = feed;
		$scope.user = User;
		
		$scope.user_id = $routeParams.user_id;
		$scope.feed_id = $routeParams.feed_id;
		
		if ($scope.user_id) {
			feed.show_user($scope.user_id);
		} else {
			var feed_filter = 'all';
			if ($scope.feed_id) {
				feed_filter = $scope.feed_id;
			}
		
			ViewMode.show_feed();
			Issue.clear();
			feed.show(feed_filter);
		}
	}
]);