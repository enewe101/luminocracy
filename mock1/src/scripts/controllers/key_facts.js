'use strict';
var my_app = angular.module('my_app')

my_app.controller('KeyFactsCtrl', function($scope) {

	$scope.facts = [{
		'text': (
			'The pipeline is 17 inches long, and weighs about as much as '
			+ 'the average housecat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists.'
		),
		'refs': [{
			'source': 'The New York Times',
			'title': 'Why Keystone is not good for Canada',
			'url': '#'
		}]
	}, {
		'text': (
			'The pipeline is 17 inches long, and weighs about as much as '
			+ 'the average housecat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists.'
		),
		'refs': [{
			'source': 'The New York Times',
			'title': 'Why Keystone is not good for Canada',
			'url': '#'
		}]
	}];

	$scope.remove = function(i) {
		$scope.references.splice(i,1);
	};

	$scope.add_ref = function() {
		$scope.references.push({'link':'', 'source':'', 'title':''});
	};

	$scope.references = [{'link':'', 'source':'', 'title':''}];
	$scope.text = ''
	$scope.is_collapsed = true;

	$scope.post_fact = function() {
		$scope.facts.unshift(
			{'text':$scope.text, 'refs':$scope.references}
		);
	}

});