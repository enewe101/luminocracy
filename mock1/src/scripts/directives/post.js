'use strict';
var my_app = angular.module('my_app')

my_app.directive('luPost', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { 
          
      },
      controller: [ "$scope",'$firebaseArray', 'User', 'Issue', function($scope,
        $firebaseArray, User, Issue) {
        
        var feed_ref = new Firebase(
			'https://vivid-torch-4114.firebaseio.com/feed');
			
        var get_timestamp = function() {
		    var timestamp = Date.now ? Date.now(): Date().getTime();
	        return timestamp;
		}

		$scope.feed = $firebaseArray(feed_ref);

		$scope.add_post = function() {
			if(!$scope.post_text) {
				alert('denied');
				return;
			}
			var new_post = {
				'text': $scope.post_text,
				'author': User.as_user(),
				'type': 'POST',
				'created': get_timestamp(),
				'modified': get_timestamp(),
				'score': 1,
				'comments': [],
				'topic': null,
				'urls': [],
				'mentions': [],
				'issue': Issue.id
			}
			//alert(new_post.toSource());
			var new_post = feed_ref.push(new_post);
			new_post.setPriority(0-Date());
			$scope.feed.$add(new_post).then(function(){alert('yo');})
		}
		
      }],
      link: function (scope, element, attrs, controller) {

      },
      templateUrl: 'partials/post.html',
      replace: true
    };
  })