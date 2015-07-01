var BASE_URL = 'https://vivid-torch-4114.firebaseio.com';

var my_app = angular.module('my_app');


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
