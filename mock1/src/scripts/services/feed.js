'use strict';

var my_app = angular.module('my_app');

my_app.service('feed', ['User', function(User) {

	// to reference context in callbacks
	var that = this;

	this.user = null;
	this.feed_ref = new Firebase(
		'https://vivid-torch-4114.firebaseio.com/feed');

	this.items = [];
	
	// some filters that can be applied to the feed
	this.filters = {
		'all' : function(item){return true},
		'own_posts': function(item){
			if(item.type === 'POST' && item.author.name === User.name){
				return true;
			}
			return false;
		},
		'issues': function(item) {
			if(item.type === 'NEWS_CLUSTER' || item.type === 'NEWS_ITEM') {
				return true;
			}
			return false;
		},
		'location': function(item) {
			return true;
		},
		'followed': function(item) {
			return true;
		}
	};
	this.get_issue_filter = function(issue_id) {
		return function(item) {
			if(item.issue===issue_id) {
				return true;
			}
			return false
		};
	};
	this.get_user_filter = function(username) {
		return function(item) {
			return true;
			if(item.type==='POST' && item.author===username) {
				return true;
			}
			return false
		};
	};

	// determines what items should be returned.  Default show all.
	this.filter = this.filters['all'];

	this.show_issue = function(issue_id) {
		this.state = 'issue';
		this.issue = issue_id;
		this.user = null;
		this.filter = this.get_issue_filter(issue_id);
		this.fetch_feed_items();
	};

	this.show_user = function(username) {
		this.state = 'user';
		this.issue = null;
		this.user = username;
		this.filter = this.get_user_filter(username);
		this.fetch_feed_items();
	};

	this.show = function(filter_to_apply) {
		this.state = filter_to_apply;
		this.issue = null;
		this.user = null;
		this.filter = this.filters[filter_to_apply];
		this.fetch_feed_items();
	}

	this.fetch_feed_items = function() {
		var items = []
		that.items = items;
		this.feed_ref.orderByKey().limitToLast(100).on("child_added",
			function(datum){
				var feed_item = datum.val();
				if(that.filter(feed_item)) {
					items.unshift(feed_item);
				}
			}
		);
	};

	this.show('all');
	this.fetch_feed_items();

}]);
