ss.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

	var authenticate = ['api', '$location', 'i18n', function(api, $location, i18n){
		return api.authorise().catch(function(){
			if(!api.session){
				$location.path('/login');
				$head.scope().notify = {
					state: 'error', 
					message: i18n.store.notifications.pleaseLogin, 
					route: true
				};
			}
		});
	}];

	$routeProvider.

	when('/dashboard', {
		templateUrl: 'app/pages/dashboard/dashboard.view.html',
		controller: 'dashboard',
		resolve: {
			session: authenticate
		},
		label: 'dashboard'
	}).

	when('/dashboard/posts', {
		templateUrl: 'app/pages/dashboard/views/post.index.view.html',
		controller: 'dashboardPosts',
		resolve: {
			session: authenticate
		},
		label: 'view posts'
	}).

	when('/dashboard/posts/edit', {
		templateUrl: 'app/shared/editors/views/post.editor.view.html',
		controller: 'dashboardEditPost',
		resolve: {
			session: authenticate
		},
		label: 'edit post'
	}).

	when('/dashboard/posts/new', {
		templateUrl: 'app/shared/editors/views/post.editor.view.html',
		controller: 'dashboardNewPost',
		resolve: {
			session: authenticate
		},
		label: 'new post'
	});

}]);