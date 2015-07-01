'use strict';
var my_app = angular.module('my_app')

my_app.controller('OptionsCtrl', ['$scope','feed','User','ViewMode','Issue',
function($scope, feed, User, ViewMode, Issue) {

	$scope.feed = feed;
	$scope.user = User;

	$scope.show_feed = function(feed_filter) {
		ViewMode.show_feed();
		Issue.clear();
		feed.show(feed_filter);
	}

	$scope.show_issue = function(issue_name) {
		Issue.load(issue_name);
		feed.show_issue(issue_name);
	};

}]);
