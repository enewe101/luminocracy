var BASE_URL = 'https://vivid-torch-4114.firebaseio.com';
var my_app = angular.module('my_app', ['ngAnimate', 'ui.bootstrap', 'firebase']);

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

my_app.service('ViewMode', function(){
	this.view_mode = 'home_feed';
	this.show_feed = function() {
		this.view_mode = 'home_feed';
	}
	this.show_issue = function() {
		this.view_mode = 'issue_page';
	}

});

my_app.run(['$rootScope', 'User','Issue', function($rootScope, User, Issue) {

	var ref = new Firebase(BASE_URL);
	var users_ref = new Firebase(BASE_URL + '/users');
	var issues_ref = new Firebase(BASE_URL + '/issues');

	User.load('MC Hammer');
	Issue.load('keystone');
	
	issues_ref.set({
		'keystone': {
			'image_url': 'keystone-big.jpg',
			'icon_url': 'keystone.jpg',
			'name': 'Keystone XL Pipeline Extension',
			'text': 'The Keystone XL Pipeline is a proposed extension to the existing Keystone Pipeline System, put forward by TransCanada, the corporation that owns the Keystone System. The pipeline would cross the Canada/US border, importing crude oil sourced from the Albertan oil sands, into the United States. The proposal is currently awaiting government approval. The pipeline would be newly constructed, and is similar to existing pipelines in North America.',
			'actors': {
				0: {
					'position': (
						"Chair / CEO of Canada's National Energy Board"
					),
					'name': 'Peter Watson'
				},
				1: {
					'position': "TansCanada President and CEO",
					'name': 'Russer K. Girling'
				}
			},
			'news': {
				0: {
					'date': '30 May 2015',
					'source': 'Calgary Sun',
					'title': (
						"Calgary Mayor Naheed Nenshi says Keystone XL "
						+ "pipeline getting unfair treatment in U.S."
					),
					'icon_url': 'keystone-icon.jpg',
					'url': (
						'http://www.calgarysun.com/2015/05/30/calgary-'
						+'mayor-naheed-nenshi-says-keystone-xl-pipeline-'
						+'getting-unfair-treatment-in-us'
					)
				},
				1: {
					'date': '19 April 2015',
					'source': 'Globe and Mail',
					'title': (
						"Nenshi says Keystone XL bearing 'sins of the "
						+ "carbon economy'"
					),
					'icon_url': 'keystone-icon2.jpg',
					'url': (
						'http://www.cbc.ca/news/canada/calgary/'
						+'nenshi-says-keystone-xl-bearing-sins-of-the-'
						+'carbon-economy-1.3093351'
					)
				}
			},
			'events': {
				0: {
					'date': '15 March',
					'icon_url': 'meeting.png',
					'title': (
						"Meeting to discuss the landowner's negotiation "
						+ "process"
					),
					'text': (
						"If you've been approach by TransCanada to purchase"
						+ "your land, this meeting is for you.  "
						+ "We will discuss your legal rights and "
						+ "proven negatiation techniques to make sure that "
						+ "you hold on to land you wish to keep, or get a "
						+ "fair price if you wish to sell."
					)
				},
				1: {
					'date': '10 March',
					'icon_url': 'rally.png',
					'title': (
						"Demonstration to protest TransCanada's "
						+ "Keystone pipeline proposal"
					),
					'text': (
						"Bring your signs and placards!  We're hitting "
						+ "dowtown Montreal to raise awareness about this "
						+ "environmentally disasterous project."
					)
			   },
			},
			'facts': {
				0: {
					'text': (
						"The pipeline will be newly constructed, "
						+ "unlike other recent extensions which used "
						+ "re-purposed natural gas pipelines."
					),
					'references': {
						0: {
							'source': 'The New York Times',
							'title': 'Why Keystone is not good for Canada',
							'date': 'May 2013'
						}
					}
				},
				1: {
					'text': (
						"This pipeline represents a 11% extension (in length) "
						+ "to the existing pipeline system."
					),
					'references': {
						0: {
							'source': 'keystone.com',
							'title': 'Facts and figures',
							'date': 'April 2011'
						}
					}
				}
			},

			'posts': {


				0: {
					'created': 1234,
					'modified': 1234,
					'title': null,
					'text': (
						"I can't believe we're going to have another conservative "
						+ 'government.  Have you heard about the new legislation '
						+ "they've already proposed?"
					),
					'image_url': 'coleman.jpg',
					'type': 'POST',
					'score': 29,
					'author': {
						'name': 'Gabriella Coleman',
						'avatar_url': 'coleman.jpg',
						'rep': 32,
					},
					'comments': [{
						'created': 1234,
						'modified': 1234,
						'title': null,
						'text': 'uggh',
						'type': 'COMMENT',
						'author': 'Anna Della',
						'comments': null,
						'score': 2,
						'topic': null
					}],
					'topic': 'environment',
					'urls': [],
					'mentions': []
				},

				1: {
					'created': 1234,
					'modified': 1234,
					'title': null,
					'text': (
						"I can't believe we're going to have another conservative "
						+ 'government.  Have you heard about the new legislation '
						+ "they've already proposed?"
					),
					'image_url': 'coleman.jpg',
					'type': 'POST',
					'score': 29,
					'author': {
						'name': 'Gabriella Coleman',
						'avatar_url': 'coleman.jpg',
						'rep': 32,
					},
					'comments': [{
						'created': 1234,
						'modified': 1234,
						'title': null,
						'text': 'uggh',
						'type': 'COMMENT',
						'author': 'Anna Della',
						'comments': null,
						'score': 2,
						'topic': null
					}],
					'topic': 'environment',
					'urls': [],
					'mentions': []
			   }
			},

			'letters': {
				0: {
					'created': 1234,
					'modified': 1234,
					'title': null,
					'text': (
						"I can't believe we're going to have another conservative "
						+ 'government.  Have you heard about the new legislation '
						+ "they've already proposed?"
					),
					'image_url': 'coleman.jpg',
					'type': 'POST',
					'score': 29,
					'author': {
						'name': 'Gabriella Coleman',
						'avatar_url': 'coleman.jpg',
						'rep': 32,
					},

					'signatories': {
						0 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						1 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						2 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						3 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						4 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						}
					},

					'comments': [{
						'created': 1234,
						'modified': 1234,
						'title': null,
						'text': 'uggh',
						'type': 'COMMENT',
						'author': 'Anna Della',
						'comments': null,
						'score': 2,
						'topic': null
					}],
					'topic': 'environment',
					'urls': [],
					'mentions': []
				}
			}
		},

		'uk_election': {
			'image_url': 'election.jpg',
			'icon_url': 'election.jpg',
			'name': 'UK Election 2015',
			'text': (
				"The United Kingdom general election of 2015 was held on "
				+"7 May 2015 to elect the 56th Parliament of the United "
				+"Kingdom. "
				+"Polls and commentators predicted the outcome would be too "
				+"close to call and result in a second hung parliament "
				+"similar to the 2010 election. Opinion polls were "
				+"eventually proven to have significantly underestimated "
				+"the Conservative vote, which bore resemblance to their "
				+"surprise victory in the 1992 general election."
			),
			'actors': {
				0: {
					'position': 'Chair of the UK Electoral Commission',
					'name': 'Jenny Watson'
				},
				1: {
					'position': (
						'Chief Executive of the UK Electoral '
						+'Commission'
					),
					'name': 'Peter Wardle'
				}
			},
			'news': {
				0: {
					'date': '31 May 2015',
					'source': 'The Guardian',
					'title': (
						"Winner-takes-all elections are 'artificially "
						+"dividing the UK'"
					),
					'icon_url': 'nigel.jpg'
				},
				1: {
					'date': '2 May 2015',
					'source': 'The Telegraph',
					'title': (
						"UK election results - what does it all mean? "
						+"As it happened"
					),
					'icon_url': 'cameron-icon.jpg'
				}
			},
			'events': {
				0: {
					'date': '15 March',
					'icon_url': 'meeting.png',
					'title': (
						"Meeting to discuss the landowner's negotiation "
						+ "process"
					),
					'text': (
						"If you've been approach by TransCanada to purchase"
						+ "your land, this meeting is for you.  "
						+ "We will discuss your legal rights and "
						+ "proven negatiation techniques to make sure that "
						+ "you hold on to land you wish to keep, or get a "
						+ "fair price if you wish to sell."
					)
				},
				1: {
					'date': '10 March',
					'icon_url': 'rally.png',
					'title': (
						"Demonstration to protest TransCanada's "
						+ "Keystone pipeline proposal"
					),
					'text': (
						"Bring your signs and placards!  We're hitting "
						+ "dowtown Montreal to raise awareness about this "
						+ "environmentally disasterous project."
					)
			   },
			},
			'facts': {
				0: {
					'text': (
						"The United Kingdom general election of 2015 was "
						+"held on 7 May 2015"
					),
					'references': {
						0: {
							'source': 'Parliament of the United Kingdom',
							'title': 'General election timetable 2015',
							'date': 'December 2014',
							'url': (
								'http://www.parliament.uk/about/how'
								+'/elections-and-voting/general/general'
								+'-election-timetable-2015/'
							)
						}
					}
				},
				1: {
					'text': (
						"the Conservatives won 331 seats and 36.9% of the "
						+"vote, this time winning a working majority of 15"
					),
					'references': {
						0: {
							'source': 'Financial Times',
							'title': (
								"It is 1992 all over again for David "
								+"Cameron’s Conservatives'"
							),
							'date': '8 May 2015',
							'url': (
								'http://www.ft.com/cms/s/2/db4d60b2-f574-'
								+'11e4-bc6d-00144feab7de.html'
							)
						}
					}
				}
			},

			'posts': {


				0: {
					'created': 1234,
					'modified': 1234,
					'title': null,
					'text': (
						"I can't believe we're going to have another conservative "
						+ 'government.  Have you heard about the new legislation '
						+ "they've already proposed?"
					),
					'image_url': 'coleman.jpg',
					'type': 'POST',
					'score': 29,
					'author': {
						'name': 'Gabriella Coleman',
						'avatar_url': 'coleman.jpg',
						'rep': 32,
					},
					'comments': [{
						'created': 1234,
						'modified': 1234,
						'title': null,
						'text': 'uggh',
						'type': 'COMMENT',
						'author': 'Anna Della',
						'comments': null,
						'score': 2,
						'topic': null
					}],
					'topic': 'environment',
					'urls': [],
					'mentions': []
				},

				1: {
					'created': 1234,
					'modified': 1234,
					'title': null,
					'text': (
						"I can't believe we're going to have another conservative "
						+ 'government.  Have you heard about the new legislation '
						+ "they've already proposed?"
					),
					'image_url': 'coleman.jpg',
					'type': 'POST',
					'score': 29,
					'author': {
						'name': 'Gabriella Coleman',
						'avatar_url': 'coleman.jpg',
						'rep': 32,
					},
					'comments': [{
						'created': 1234,
						'modified': 1234,
						'title': null,
						'text': 'uggh',
						'type': 'COMMENT',
						'author': 'Anna Della',
						'comments': null,
						'score': 2,
						'topic': null
					}],
					'topic': 'environment',
					'urls': [],
					'mentions': []
			   }
			},

			'letters': {
				0: {
					'created': 1234,
					'modified': 1234,
					'title': null,
					'text': (
						"I can't believe we're going to have another conservative "
						+ 'government.  Have you heard about the new legislation '
						+ "they've already proposed?"
					),
					'image_url': 'coleman.jpg',
					'type': 'POST',
					'score': 29,
					'author': {
						'name': 'Gabriella Coleman',
						'avatar_url': 'coleman.jpg',
						'rep': 32,
					},

					'signatories': {
						0 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						1 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						2 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						3 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						4 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						}
					},

					'comments': [{
						'created': 1234,
						'modified': 1234,
						'title': null,
						'text': 'uggh',
						'type': 'COMMENT',
						'author': 'Anna Della',
						'comments': null,
						'score': 2,
						'topic': null
					}],
					'topic': 'environment',
					'urls': [],
					'mentions': []
				}
			}
		},

		'free_julian': {
			'image_url': 'assange-large.jpg',
			'icon_url': 'assange.jpg',
			'name': 'Free Julian Assange',
			'text': (
				"In 2010, Wikileaks became internationally renowned when it "
				+"began publishing thousands of files of US intelligence "
				+"-- including warlogs from Iraq -- in collaboration with "
				+"news organisations like The Guardian. "
				+"Assange has sought refuge at the Ecuadorian embassy since "
				+"Sweden issued a detention order in 2010 requiring him to "
				+"be arrested and extradited to the country to face "
				+"questioning over the alleged sexual assault of two women. "
				+"If he were to cooperate with British and Swedish "
				+"authorities, his legal team protest, he would be exposed "
				+"to the US Department of Justice's ongoing criminal "
				+"investigation into Wikileaks."
			),
			'actors': {
				0: {
					'position': 'UK Foreign Secretary',
					'name': 'Philip Hammond'
				},
				1: {
					'position': 'UK Prime Minister',
					'name': 'David Cameron'
				},
				2: {
				   'position': 'Prosecutor-General of Sweeden',
				   'name': 'Anders Perklev'
			   }
			},

			'news': {
				0: {
					'date': '29 May 2015',
					'source': 'The Independant',
					'title': (
						"Alan Rusbridger: Outgoing Guardian editor "
						+"confronted by Wikileaks over their editor Julian "
						+"Assange's detainment"
					),
					'icon_url': 'rusbridger.jpg'
				},
				1: {
					'date': '10 March',
					'source': 'Globe and Mail',
					'title': (
						'Julian Assange On TPP: Only 5 Of 29 Sections Are '
						+'About "Traditional Trade," Covers "Essentially '
						+'Every Aspect Of A Modern Economy"'
					),
					'icon_url': 'assange-icon.jpg'
				}
			},

			'events': {
				0: {
					'date': '17 June',
					'icon_url': 'rally.png',
					'title': (
						"Demonstration outside of Ecuadorian Embassy."
					),
					'text': (
						"Julian Assange has been effectively prisoner in "
						+ "the Ecuadorian Embassy, facing extradition by "
						+ "the UK government should he step outside. "
						+ "This treatment of an international hero is "
						+ "unnacceptable, and not befitting to the UK, "
						+ "one of the torchbearers of free democracy. "
						+ "On 17 June, we will again gather outside of the "
						+ "Ecuadorian Embassy to show our support for Julian "
						+ "Assange, and to demand his extradition be "
						+ "overturned"
					)
				}
			},

			'facts': {
				0: {
					'text': (
						"In 2010, the Swedish Director of Public "
						+"Prosecution opened an investigation into "
						+"sexual offences that Assange is alleged to "
						+"have committed."
					),
					'references': {
						0: {
							'source': 'The Swedish Prosecution Authority',
							'title': (
								'Events concerning Julian Assange in '
								+'chronological order'
							),
							'date': 'March 2015',
							'url': (
								'http://www.aklagare.se/In-English/Media/'
								+'The-Assange-Matter/The-Assange-Matter//'
							)
						}
					}
				},
				1: {
					'text': (
						"On 16 August 2012, Foreign Minister Patiño "
						+"announced that Ecuador was granting Assange "
						+"political asylum."
					),
					'references': {
						0: {
							'source': (
								' Ministry of Foreign Affairs, '
								+'Trade and Integration of Ecuador'
							),
							'title': (
								"Declaración del Gobierno de la República "
								+"del Ecuador sobre la solicitud de asilo "
								+"de Julian Assange"
							),
							'date': 'August 2012'
						}
					}
				}
			},
			'posts': {
				0: {
					'created': 1234,
					'modified': 1234,
					'title': null,
					'text': (
						"I can't believe we're going to have another conservative "
						+ 'government.  Have you heard about the new legislation '
						+ "they've already proposed?"
					),
					'image_url': 'coleman.jpg',
					'type': 'POST',
					'score': 29,
					'author': {
						'name': 'Gabriella Coleman',
						'avatar_url': 'coleman.jpg',
						'rep': 32,
					},
					'comments': [{
						'created': 1234,
						'modified': 1234,
						'title': null,
						'text': 'uggh',
						'type': 'COMMENT',
						'author': 'Anna Della',
						'comments': null,
						'score': 2,
						'topic': null
					}],
					'topic': 'environment',
					'urls': [],
					'mentions': []
				},
				1: {
					'created': 1234,
					'modified': 1234,
					'title': null,
					'text': (
						"I can't believe we're going to have another conservative "
						+ 'government.  Have you heard about the new legislation '
						+ "they've already proposed?"
					),
					'image_url': 'coleman.jpg',
					'type': 'POST',
					'score': 29,
					'author': {
						'name': 'Gabriella Coleman',
						'avatar_url': 'coleman.jpg',
						'rep': 32,
					},
					'comments': [{
						'created': 1234,
						'modified': 1234,
						'title': null,
						'text': 'uggh',
						'type': 'COMMENT',
						'author': 'Anna Della',
						'comments': null,
						'score': 2,
						'topic': null
					}],
					'topic': 'environment',
					'urls': [],
					'mentions': []
			   }
			},
			'letters': {
				0: {
					'created': 1234,
					'modified': 1234,
					'title': null,
					'text': (
						"I can't believe we're going to have another conservative "
						+ 'government.  Have you heard about the new legislation '
						+ "they've already proposed?"
					),
					'image_url': 'coleman.jpg',
					'type': 'POST',
					'score': 29,
					'author': {
						'name': 'Gabriella Coleman',
						'avatar_url': 'coleman.jpg',
						'rep': 32,
					},
					'signatories': {
						0 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						1 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						2 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						3 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						},
						4 :{
							'name': 'Gabriella Coleman',
							'avatar_url': 'coleman.jpg',
							'rep': 32
						}
					},
					'comments': [{
						'created': 1234,
						'modified': 1234,
						'title': null,
						'text': 'uggh',
						'type': 'COMMENT',
						'author': 'Anna Della',
						'comments': null,
						'score': 2,
						'topic': null
					}],
					'topic': 'environment',
					'urls': [],
					'mentions': []
				}
			}
		}
	});


}]);


// the sole purpose of this controller is to bind the current issue to an
// angular scope, so that the issue can be displayed by various page elements
my_app.controller('IssueCtrl', ['$scope', 'Issue', function($scope, Issue) {
	$scope.issue = Issue;
}]);

my_app.controller('ContentCtrl', ['$scope', 'ViewMode', 
function($scope, ViewMode) {
	$scope.view_mode = ViewMode;
}]);

my_app.controller('OptionsCtrl', ['$scope','feed','User','ViewMode','Issue',
function($scope, feed, User, ViewMode, Issue) {

	$scope.feed = feed;
	$scope.user = User;

	feed_ref = new Firebase(
		'https://vivid-torch-4114.firebaseio.com/feed');

	$scope.show_feed = function(feed_filter) {
		ViewMode.show_feed();
		Issue.clear();
		feed.show(feed_filter);
	}

	$scope.show_issue = function(issue_name) {
		ViewMode.show_issue();
		Issue.load(issue_name);
		feed.show_issue(issue_name);
	};

}]);

my_app.controller('UserPostsCtrl', ['$scope', 'feed', function($scope, feed) {
	$scope.feed = feed;

}]);

String.prototype.endsWith = function(suffix) {
	    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

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
		} else if(feed.state == 'user') {
			if(feed.user.endsWith('s')) {
				$scope.feed_status = feed.user + "' posts";
			} else {
				$scope.feed_status = feed.user + "'s posts";
			}
		}
	}

	$scope.$watch(function(){return feed.state}, get_feed_status);
	$scope.$watch(function(){return feed.user}, get_feed_status);

}]);

function get_timestamp() {
	var timestamp = Date.now ? Date.now(): Date().getTime();
	return timestamp
}

my_app.controller('PostCtrl', ['$scope', '$firebaseArray', 'User', 'Issue',
function($scope, $firebaseArray, User, Issue) {
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
			alert(new_post.toSource());
			var new_post = feed_ref.push(new_post);
			new_post.setPriority(0-Date());
			//$scope.feed.$add(new_post).then(function(){alert('yo');})
		}
}]);

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
