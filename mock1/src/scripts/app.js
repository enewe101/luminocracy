'use strict';

angular.module(
	'my_app', ['ngAnimate', 'ui.bootstrap', 'firebase', 'ngRoute']
).config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html', 
			controller: 'HomeCtrl'
		})
		.when('/issue/:issue_id', {
			templateUrl: 'views/issue.html',
			controller: 'IssueCtrl',
		})
		.otherwise({
			redirectTo:'/'
		});
})

