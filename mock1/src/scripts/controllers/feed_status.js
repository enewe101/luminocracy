'use strict';
var my_app = angular.module('my_app')

String.prototype.endsWith = function(suffix) {
	    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

my_app.controller('FeedStatusCtrl', ['$scope', 'feed', function($scope, feed) {

	$scope.feed_status = 'Your newsfeed';

	var get_feed_status = function() {
		if(feed.state == 'all') {
			$scope.feed_status = 'Your newsfeed';
		} else if(feed.state == 'own_posts') {
			$scope.feed_status = 'Your own posts';
		} else if(feed.state == 'issues') {
			$scope.feed_status = 'Watched issues';
		} else if(feed.state == 'followed') {
			$scope.feed_status = 'Followed accounts';
		} else if(feed.state == 'location') {
			$scope.feed_status = 'News for your location';
		} else if(feed.state == 'user') {
			if(feed.user.endsWith('s')) {
				$scope.feed_status = feed.user + "' posts";
			} else {
				$scope.feed_status = feed.user + "'s posts";
			}
		}
	}

	$scope.$watch(function(){return feed.state}, get_feed_status);
	$scope.$watch(function(){return feed.user}, get_feed_status);

}]);

