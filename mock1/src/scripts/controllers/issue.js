'use strict';
angular.module('my_app')
	.controller('IssueCtrl',function($scope, $routeParams,Issue,feed) {
		$scope.issue_id = $routeParams.issue_id;
		$scope.issue = Issue;
		
		Issue.load($scope.issue_id);
		feed.show_issue($scope.issue_id);
})