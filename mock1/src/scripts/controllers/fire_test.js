'use strict';
var my_app = angular.module('my_app')

my_app.controller('FireTest', function($scope, $firebaseObject){

	var ref = new Firebase('https://vivid-torch-4114.firebaseio.com')
	var syncObject = $firebaseObject(ref);
	syncObject.$bindTo($scope, 'data');

	$scope.data = {'items':[]}

});
