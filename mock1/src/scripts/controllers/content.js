'use strict';
var my_app = angular.module('my_app')

my_app.controller('ContentCtrl', ['$scope', 'ViewMode', 
function($scope, ViewMode) {
	$scope.view_mode = ViewMode;
}]);
