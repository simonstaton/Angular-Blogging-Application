ss.controller('blog', [
	'$scope', 
	'$controller', 
	'$routeParams', 
	'api', 
	'breadcrumbs', 
function($scope, $controller, $routeParams, api, breadcrumbs){

	//Split out this controller
	if($routeParams.slug){
		api.blog.getPost({slug:$routeParams.slug}).then(function(response){
				$scope.post = response.data;
				breadcrumbs.dynamicLabels = {'postTitle': response.data.title};
			}, function(error){
				console.log(error);
			});
	} else {
		api.blog.getPosts().then(function(response){
				$scope.posts = response.data;
			}, function(error){
				console.log(error);
			});
	}

	$controller('_Base', {$scope: angular.extend($scope, {
		
	})});
	
}]);