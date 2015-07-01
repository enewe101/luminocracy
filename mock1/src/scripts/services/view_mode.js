'use strict';
var my_app = angular.module('my_app')

my_app.service('ViewMode', function(){
	this.view_mode = 'home_feed';
	this.show_feed = function() {
		this.view_mode = 'home_feed';
	}
	this.show_issue = function() {
		this.view_mode = 'issue_page';
	}

});
