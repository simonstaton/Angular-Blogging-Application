ss.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

	$routeProvider.

	when('/blog/:slug', {
		templateUrl: 'app/pages/blog/views/blog.single.view.html',
		controller: 'blog',
		label: 'postTitle'
	}).
	
	when('/blog', {
		templateUrl: 'app/pages/blog/views/blog.index.view.html',
		controller: 'blog',
		label: 'blog'
	});

}]);