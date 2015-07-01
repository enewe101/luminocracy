'use strict';

var my_app = angular.module('my_app');


my_app.service('Issue', ['$rootScope', function($rootScope){

	// make forwardable context
	var that = this;

	var base_url = BASE_URL + '/issues/';

	this.clear = function() {
		that.id = null;
		that.name = null;
		that.actors = null;
		that.events = null;
		that.facts = null;
		that.icon_url = null;
		that.image_url = null;
		that.letters = null;
		that.news = null;
		that.posts = null;
		that.text = null;
	};

	this.load = function(issue_id) {
		var ref_url = base_url + issue_id;
		var issue_ref = new Firebase(ref_url);
		issue_ref.once('value', function(issue_snapshot) {
			var issue = issue_snapshot.val();

			that.id = issue_id;
			that.name = issue.name;
			that.actors = issue.actors;
			that.events = issue.events;
			that.facts = issue.facts;
			that.icon_url = issue.icon_url;
			that.image_url = issue.image_url;
			that.letters = issue.letters;
			that.news = issue.news;
			that.posts = issue.posts;
			that.text = issue.text;

			// Hey angular, heads up.
			$rootScope.$apply();

		});
	};

	this.clear();

}]);
