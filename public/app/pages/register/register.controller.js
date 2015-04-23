ss.controller('register', [
	'$scope', 
	'$controller', 
	'$location', 
	'api', 
function($scope, $controller, $location, api){

	$controller('_Base', {$scope: angular.extend($scope, {

		registerForm: {},

		initialise: function(){
			if(api.session){
				$location.path('/dashboard');
			}
		},

		register: function(){
			api.register($scope.registerForm).then(function(response){
					$location.path('/login');
					$scope.$parent.notify = {state: 'error', message: $scope.i18n.notifications.login, timeout: 5000};
				}, function(error){	
					$scope.$parent.notify = {state: 'error', message: error};
				});
		}


	})});
	
}]);