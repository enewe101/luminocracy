'use strict';
var my_app = angular.module('my_app')

my_app.controller('NewsCtrl', ['$scope', 'Issue', function($scope, Issue) {


	// initilize a few dummy news items
	$scope.news = [{
		'date': '15 March',
		'source': 'CBC',
		'text': (
			'average house cat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists'
		)
	},{
		'date': '10 March',
		'source': 'Globe and Mail',
		'text': (
			'average house cat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists'
		)
	}]

	// initialize empty form
	$scope.link = '';
	$scope.title = '';
	$scope.source = '';
	$scope.text = '';
	$scope.date = '';


	// form is default hidden
	$scope.is_collapsed = true;


	$scope.post = function() {

		// insert the new news item
		$scope.news.unshift({
			'link': $scope.link,
			'date': $scope.date,
			'title': $scope.title,
			'source': $scope.source,
			'text': $scope.text
		});

		// clear the form
		$scope.date = ''
		$scope.title = ''
		$scope.source = ''
		$scope.text = ''
		$scope.link = ''

		// hide the form
		$scope.is_collapsed=true;
	}

}]);



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




//	users_ref.set({
//		'Tina Fey': {
//			'name': 'Tina Fey',
//			'avatar_url': 'tina.jpg',
//			'rep': 87299,
//			'following': {
//				'Penny':true, 'Charlie Sheen':true, 
//				'Cat Woman':true, 'Spiderman':true, 'MC Hammer':true
//			},
//			'watching': {
//				'keystone':true, 'uk_election':true, 'free_julian':true
//			}
//		},
//		'MC Hammer': {
//			'name': 'MC Hammer',
//			'avatar_url': 'hammer.jpg',
//			'rep': '2 legit',
//			'following': {
//				'Tina Fey':true, 'Penny':true, 'Charlie Sheen':true,
//				'Cat Woman':true, 'Spiderman':true
//			},
//			'watching': {
//				'keystone':true, 'uk_election':true, 'free_julian':true
//			}
//		},
//		'Penny': {
//			'name': 'Penny',
//			'avatar_url': 'penny.jpg',
//			'rep': 42000,
//			'following': {
//				'Tina Fey':true, 'Charlie Sheen':true, 'Cat Woman':true,
//			   	'Spiderman':true, 'MC Hammer':true
//			},
//			'watching': {
//				'keystone':true, 'uk_election':true, 'free_julian':true
//			}
//		},
//		'Charlie Sheen': {
//			'name': 'Charlie Sheen',
//			'avatar_url': 'charlie.jpg',
//			'rep': -999,
//			'following': {
//				'Tina Fey':true, 'Cat Woman':true, 'Spiderman':true, 
//				'MC Hammer':true, 'Penny':true
//			},
//			'watching': {
//				'keystone':true, 'uk_election':true, 'free_julian':true
//			}
//		},
//		'Cat Woman': {
//			'name': 'Cat Woman',
//			'avatar_url': 'cat.jpg',
//			'rep': 72000,
//			'following': {
//				'Spiderman':true, 'MC Hammer':true, 'Penny':true, 
//				'Charlie Sheen':true, 'Tina Fey':true
//			},
//			'watching': {
//				'keystone':true, 'uk_election':true, 'free_julian':true
//			}
//		},
//		'Spiderman': {
//			'name': 'Spiderman',
//			'avatar_url': 'spidey.jpg',
//			'rep': 64,
//			'following': {
//				'MC Hammer':true, 'Penny':true, 'Charlie Sheen':true, 
//				'Cat Woman':true, 'Tina Fey':true
//			},
//			'watching': {
//				'keystone':true, 'uk_election':true, 'free_julian':true
//			}
//		}
//	});
