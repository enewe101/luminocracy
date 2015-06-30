'use strict';

angular.module(
	'my_app', ['ngAnimate', 'ui.bootstrap', 'firebase', 'ngRoute']
).config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'index.html', 
			controller: 'IndexDummyController'
		})
		.when('/issue/free_julian', {
			templateUrl: 'views/issue.html',
			controller: 'IssueDummyController',
		})
		.otherwise({
			redirectTo:'/'
		});
})

