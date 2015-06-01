my_app.controller( 'SubscribeCtrl', function($scope) {
	$scope.is_subscribed=false;
	$scope.sub_class = 'sub_icon_inactive';
	$scope.sub_text = 'subscribe'

	$scope.toggle_subscribe = function(e) {
		if($scope.is_subscribed) {
			$scope.sub_class = 'sub_icon_inactive';
			$scope.sub_text = 'subscribe';
		} else {
			$scope.sub_class = 'sub_icon_active';
			$scope.sub_text = "you're subscribed";
		}
		$scope.is_subscribed = !$scope.is_subscribed;
	};
	
});

my_app.controller('FireTest', function($scope, $firebaseObject){

	var ref = new Firebase('https://vivid-torch-4114.firebaseio.com')
	var syncObject = $firebaseObject(ref);
	syncObject.$bindTo($scope, 'data');

	$scope.data = {'items':[]}

});

my_app.controller('KeyFactsCtrl', function($scope) {

	$scope.facts = [{
		'text': (
			'The pipeline is 17 inches long, and weighs about as much as '
			+ 'the average housecat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists.'
		),
		'refs': [{
			'source': 'The New York Times',
			'title': 'Why Keystone is not good for Canada',
			'url': '#'
		}]
	}, {
		'text': (
			'The pipeline is 17 inches long, and weighs about as much as '
			+ 'the average housecat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists.'
		),
		'refs': [{
			'source': 'The New York Times',
			'title': 'Why Keystone is not good for Canada',
			'url': '#'
		}]
	}];

	$scope.remove = function(i) {
		$scope.references.splice(i,1);
	};

	$scope.add_ref = function() {
		$scope.references.push({'link':'', 'source':'', 'title':''});
	};

	$scope.references = [{'link':'', 'source':'', 'title':''}];
	$scope.text = ''
	$scope.is_collapsed = true;

	$scope.post_fact = function() {
		$scope.facts.unshift(
			{'text':$scope.text, 'refs':$scope.references}
		);
	}

});


my_app.controller('IssuePostCtrl', function($scope) {
	$scope.post_text = '';
	$scope.posts = [];
	$scope.put_post = function(e) {
		$scope.posts.unshift({
			'text': $scope.post_text,
			'user': {
				'username': 'Me User',
				'rep': 498
			}
		});
	}
});


my_app.controller('EventsCtrl', function($scope) {
	$scope.events = [{
		'icon': 'meeting',
		'date': '15 March',
		'text': (
			'average house cat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists'
		)
	},{
		'date': '10 March',
		'icon': 'demonstration',
		'text': (
			'average house cat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists'
		)
	},{
		'date': '10 March',
		'icon': 'info',
		'text': (
			'average house cat. It will be made out of mashed potatoes '
			+ 'and repatriated journalists'
		)
	}]

	// initialize empty form
	$scope.link = '';
	$scope.title = '';

	$scope.text = '';
	$scope.date = '';
	$scope.icon = '';

	// form is default hidden
	$scope.is_collapsed = true;

	$scope.post = function() {

		// insert the new news item
		$scope.events.unshift({
			'link': $scope.link,
			'title': $scope.title,

			'date': $scope.date,
			'text': $scope.text,
			'icon': $scope.icon
		});

		// clear the form
		$scope.date = ''
		$scope.title = ''
		$scope.text = ''
		$scope.link = ''
		$scope.icon = ''

		// hide the form
		$scope.is_collapsed=true;
	}
});
