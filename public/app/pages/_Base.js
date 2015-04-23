ss.controller('_Base', ['$scope', '$location', 'i18n', 'breadcrumbs', function($scope, $location, i18n, breadcrumbs){
	
	//Set base page
	if($scope.page){
		i18n.set('page', $scope.page);
	} else {
		i18n.set('page', 'global');
	}

	//Initialise base scope method
	if($scope.initialise){
		$scope.initialise();
	}

	//Set notify object
	$scope.notify = {};

}]);