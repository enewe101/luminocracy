'use strict';
var my_app = angular.module('my_app')

// Service to make the logged in user's info available app-wide
my_app.service('User', ['$rootScope', function($rootScope) {

	// to reference context in callbacks
	var that = this;

	// reference to the user namespace in firebase
	var base_url = 'https://vivid-torch-4114.firebaseio.com/users';

	// loads a specific user's info
	this.load = function(username) {
		//alert('loading');
		var full_url = base_url + '/' + username;
		var ref = new Firebase(full_url);

		ref.once('value', function(snapshot) {

			var user = snapshot.val();

			// copy user values to service so they're available app-wide
			that.following = [];
			that.watching  = [];

			for(var i in user.watching) {
				var issue_url = BASE_URL + '/issues/' + i;
				var issue_ref = new Firebase(issue_url);
				issue_ref.once('value', function(issue_snap) {
					var issue = issue_snap.val();
					issue['id'] = i;
					that.watching.push(issue);
					$rootScope.$apply();
				});
			}

			for(var u in user.following) {
				var followed_user_url = BASE_URL + '/users/' + u;
				var followed_user_ref = new Firebase(followed_user_url);
				followed_user_ref.once('value', function(followed_user_snap) {
					var followed_user = followed_user_snap.val()
					followed_user['id'] = u;
					that.following.push(followed_user);
					$rootScope.$apply();
				});
			}

			that.name = user.name;
			that.avatar_url = user.avatar_url;
			that.rep = user.rep;

		});
	}

	this.as_user = function() {
		return {
			'name': that.name,
			'avatar_url': that.avatar_url,
			'rep': that.rep
		}
	}

}]);