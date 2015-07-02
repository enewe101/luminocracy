'use strict';

angular.module(
	'my_app', ['ngAnimate', 'ui.bootstrap', 'firebase', 'ngRoute']
).config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/feed.html', 
			controller: 'FeedCtrl'
		})
		.when('/feed/:feed_id', {
			templateUrl: 'views/feed.html', 
			controller: 'FeedCtrl'
		})
		.when('/user/:user_id/posts', {
			templateUrl: 'views/feed.html', 
			controller: 'FeedCtrl'
		})
		.when('/issue/:issue_id', {
			templateUrl: 'views/issue.html',
			controller: 'IssueCtrl',
		})
		.otherwise({
			redirectTo:'/'
		});
})

