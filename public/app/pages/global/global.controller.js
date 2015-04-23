ss.controller('global', [
	'$scope', 
	'$location', 
	'$rootScope', 
	'$timeout', 
	'i18n', 
	'api', 
	'breadcrumbs', 
function($scope, $location, $rootScope, $timeout, i18n, api, breadcrumbs){

	//Getting i18n data and setting as langPack
	api.getJson('/app/json/i18n.json').then(function(response){
		i18n.set('langPack', response.data);
		i18n.set('page', 'global');
	});

	//Authorising session
	api.authorise();
	
	//Setting scope
	angular.extend($scope, {
		i18n: i18n,
		api: api,
		location: $location,
		notify: {}
	});

	//TO DO: Find a way to check angular parsed for initial animation
	$timeout(function(){
		if(!$scope.pageParsed){
			$scope.pageParsed = true;
		}
	}, 500);
	
	$rootScope.$on("$routeChangeError",  function(event, current, previous, rejection){
		$scope.notify = {state: 'error', message: rejection.error};
	});

	//If notify not set to route kill it
	$rootScope.$on("$routeChangeSuccess",  function(event, current, previous){
		if($scope.notify && !$scope.notify.route){
			$scope.notify = null;
		}
	});

	$scope.breadcrumbs = breadcrumbs;

}]);