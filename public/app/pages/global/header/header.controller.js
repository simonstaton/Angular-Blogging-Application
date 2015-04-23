ss.controller('header', [
	'$scope', 
	'$controller', 
	'$location',
	'api', 
function($scope, $controller, $location, api){

	$controller('_Base', {$scope: angular.extend($scope, {

		logout: function(){

			api.logout().then(function(response){
					$location.path('/');
					$scope.notify = {state: 'success', message: $scope.i18n.store.notifications.loggedOut, timeout: 2000, route: true};
				}, function(error){	
					console.log(error);
				});

		}

	})});
	
}]);