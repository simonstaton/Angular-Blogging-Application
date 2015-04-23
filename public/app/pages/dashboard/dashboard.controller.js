ss.controller('dashboard', [
	'$scope', 
	'$controller',
	'api',
	'session', 
function($scope, $controller, api, session){
	$controller('_Base', {$scope: angular.extend($scope, {
		page: 'dashboard',
		session: api.session
	})});
}]);