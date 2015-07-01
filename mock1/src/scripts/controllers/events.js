'use strict';
var my_app = angular.module('my_app')

my_app.controller('EventsCtrl', function($scope) {
	$scope.events = [{
		'icon': 'meeting',
		'date': '15 March',
		'text': (
			'average house cat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists'
		)
	},{
		'date': '10 March',
		'icon': 'demonstration',
		'text': (
			'average house cat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists'
		)
	},{
		'date': '10 March',
		'icon': 'info',
		'text': (
			'average house cat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists'
		)
	}]

	// initialize empty form
	$scope.link = '';
	$scope.title = '';

	$scope.text = '';
	$scope.date = '';
	$scope.icon = '';

	// form is default hidden
	$scope.is_collapsed = true;

	$scope.post = function() {

		// insert the new news item
		$scope.events.unshift({
			'link': $scope.link,
			'title': $scope.title,

			'date': $scope.date,
			'text': $scope.text,
			'icon': $scope.icon
		});

		// clear the form
		$scope.date = ''
		$scope.title = ''
		$scope.text = ''
		$scope.link = ''
		$scope.icon = ''

		// hide the form
		$scope.is_collapsed=true;
	}
});