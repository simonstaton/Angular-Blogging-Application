ss.controller('login', [
	'$scope', 
	'$controller', 
	'$location', 
	'api', 
function($scope, $controller, $location, api){

	$controller('_Base', {$scope: angular.extend($scope, {

		loginForm: {},

		initialise: function(){

			if(api.session){
				$location.path('/dashboard');
			}

		},

		login: function(){
			api.login($scope.loginForm).then(function(response){
					$scope.$parent.notify = {state: 'success', message: $scope.i18n.store.notifications.loggedIn, timeout: 4000, route: true};
					$location.path('/login/success');
					api.session = response.data;
				}, function(error){
					$scope.notify = {state: 'error', message: error.data};
					api.session = null;
				});
		}
		

	})});
	
}]);