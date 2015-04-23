ss.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

	$locationProvider.hashPrefix('!');

	$routeProvider.

	when('/login', {
		templateUrl: 'app/pages/login/login.view.html',
		controller: 'login',
		label: 'Login'
	}).
	
	when('/login/success', {
		redirectTo: '/dashboard',
		label: 'Dashboard'
	}).

	when('/register', {
		templateUrl: 'app/pages/register/register.view.html',
		controller: 'register',
		label: 'Register'
	}).

	otherwise({
		redirectTo: '/blog'
	});

	$locationProvider.html5Mode(true);
}]);