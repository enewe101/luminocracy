var my_app = angular.module('my_app', ['ui.bootstrap', 'firebase']);
alert('yo');

my_app.controller('FeedCtrl',
	function($scope, $firebaseArray){
		var feed_ref = new Firebase(
			'https://vivid-torch-4114.firebaseio.com/feed');
		$scope.feed = $firebaseArray(feed_ref);
		var query = feed_ref.orderByChild("created_at").limitToLast(25);
		$scope.show_feed = $firebaseArray(query);

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
//			'author': 'Gabriella Coleman',
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
	}
);

