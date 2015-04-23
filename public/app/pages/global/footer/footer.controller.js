ss.controller('footer', [
	'$scope', 
	'$controller', 
function($scope, $controller){

	$controller('_Base', {$scope: angular.extend($scope, {



	})});
	
}]);