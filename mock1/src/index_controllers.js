var my_app = angular.module('my_app', ['ngAnimate', 'ui.bootstrap', 'firebase']);
alert('yo');

my_app.service('feed', function() {

	// to reference context in callbacks
	var that = this;

	this.feed_ref = new Firebase(
		'https://vivid-torch-4114.firebaseio.com/feed');

	this.items = [];
	
	// some filters that can be applied to the feed
	this.filters = {
		'all' : function(item){return true},
		'own_posts': function(item){
			if(item.type === 'POST'){
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

	// determines what items should be returned.  Default show all.
	this.filter = this.filters['all'];

	this.show = function(filter_to_apply) {
		this.state = filter_to_apply;
		this.filter = this.filters[filter_to_apply];
		this.fetch_feed_items();
	}

	this.fetch_feed_items = function() {
		var items = []
		that.items = items;
		this.feed_ref.orderByKey().limitToLast(50).on("child_added",
			function(datum){
				var feed_item = datum.val();
				if(that.filter(feed_item)) {
					items.unshift(feed_item);
				}
			}
		);
	};

	this.meed = [{'text':'abc'}, {'text':'def'}, {'text':'ghi'}];

	this.show('all');
	this.fetch_feed_items();

});

my_app.run(function($rootScope, $firebaseObject, $firebaseArray) {

	var ref = new Firebase(
			'https://vivid-torch-4114.firebaseio.com');

	var users_ref = new Firebase(
			'https://vivid-torch-4114.firebaseio.com/users');

	var syncObject = $firebaseObject(ref);

	$rootScope.user = {
		'name': 'New User ',
		'avatar_url': 'guest.jpg',
		'rep': 42
	};
	
});

my_app.controller('OptionsCtrl', ['$scope', 'feed', function($scope, feed) {
	$scope.feed = feed;

}]);

my_app.controller('UserPostsCtrl', ['$scope', 'feed', function($scope, feed) {
	$scope.feed = feed;

}]);


my_app.controller('FeedStatusCtrl', ['$scope', 'feed', function($scope, feed) {

	$scope.feed_status = 'Your newsfeed';

	var get_feed_status = function() {
		if(feed.state == 'all') {
			$scope.feed_status = 'Your newsfeed';
		} else if(feed.state == 'own_posts') {
			$scope.feed_status = 'Your own posts';
		} else if(feed.state == 'issues') {
			$scope.feed_status = 'Watched issues';
		} else if(feed.state == 'followed') {
			$scope.feed_status = 'Followed accounts';
		} else if(feed.state == 'location') {
			$scope.feed_status = 'News for your location';
		}
	}

	$scope.$watch(function(){return feed.state}, get_feed_status);

}]);

my_app.controller('PostCtrl',
	function($scope, $rootScope, $firebaseArray) {
		var feed_ref = new Firebase(
			'https://vivid-torch-4114.firebaseio.com/feed');

		$scope.feed = $firebaseArray(feed_ref);

		$scope.add_post = function() {
			if(!$scope.post_text) {
				alert('denied');
				return;
			}
			var new_post = {
				'text': $scope.post_text,
				'author': $rootScope.user,
				'type': 'POST',
				'created': 1234,
				'modified': 1234,
				'score': 1,
				'comments': [],
				'topic': null,
				'urls': [],
				'mentions': []
			}
			var new_post = feed_ref.push(new_post);
			new_post.setPriority(0-Date());
			//$scope.feed.$add(new_post).then(function(){alert('yo');})
		}
	}
)

my_app.controller('Temp', 
	function($scope, $firebaseObject) {
		var ref = new Firebase(
				'https://vivid-torch-4114.firebaseio.com');

		var syncObject = $firebaseObject(ref);
		syncObject.$bindTo($scope, 'inc');
	}
)

my_app.controller('LetterCtrl',
	function($scope) {
		$scope.num_recipients_to_show = 2;
		$scope.show_recipients = false;
		$scope.toggle_recipients = function() {
			$scope.show_recipients = !$scope.show_recipients;
		}
	}
);

my_app.controller('FeedCtrl', ['$scope', 'feed', 
	function($scope, feed){
		$scope.feed = feed;
	}
]);




//		$scope.feed.$add({
//			'created': 1234,
//			'modified': 1234,
//			'title': (
//				"David Cameron's Conservatives to form the "
//				+ "UK Government - UK election"
//			),
//			'text': (
//				"The Conservative Party swept to power Friday "
//				+ "in Britain's parliamentary elections, winning "
//				+ "an unexpected majority that returns Prime..."
//			),
//			'image_url': 'david-cameron.jpg',
//			'type': 'NEWS_CLUSTER',
//			'score': 13,
//			'date': '17 May 2015',
//			'news_items': [],
//			'author': null,
//			'comments': [{
//				'created': 1234,
//				'modified': 1234,
//				'title': null,
//				'text': 'Thank goodness!',
//				'type': 'COMMENT',
//				'author': 'Boopy Booba',
//				'comments': null,
//				'score': 3,
//				'topic': null
//			}],
//			'topic': 'politics',
//			'urls': [],
//			'mentions': []
//		});

//		$scope.feed.$add({
//			'created': 1234,
//			'modified': 1234,
//			'title': null,
//			'text': (
//				"I can't believe we're going to have another conservative "
//				+ 'government.  Have you heard about the new legislation '
//				+ "they've already proposed?"
//			),
//			'image_url': 'coleman.jpg',
//			'type': 'POST',
//			'score': 29,
//			'author': {
//				'name': 'Gabriella Coleman',
//				'avatar_url': 'coleman.jpg',
//				'rep': 32,
//			},
//			'comments': [{
//				'created': 1234,
//				'modified': 1234,
//				'title': null,
//				'text': 'uggh',
//				'type': 'COMMENT',
//				'author': 'Anna Della',
//				'comments': null,
//				'score': 2,
//				'topic': null
//			}],
//			'topic': 'environment',
//			'urls': [],
//			'mentions': []
//		});

//		$scope.feed.$add({
//			'title': 'Stop Keystone XL',
//			'text': (
//				'We, the undersigned, urge you to prevent the expansion '
//				+ 'of the Keystone Pipeline System, by exercise of the '
//				+ 'Environmental Protection Act.  The prop...'
//			),
//			'attn': [
//				'Stephen Harper', 'Mariah Carey', 'Mr. Scruff', 
//				'Captain Crunch', 'James Dean'
//			],
//			'type': 'LETTER',
//			'score': 7,
//			'author': 'Rick Murray',
//			'comments': [],
//			'topic': 'environment'
//		});
