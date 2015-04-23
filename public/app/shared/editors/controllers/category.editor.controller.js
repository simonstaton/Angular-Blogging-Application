//Look at making this a global text editting utility
ss.controller('categoryEditor', [
	'$scope', 
	'$controller',
	'$filter', 
	'api', 
function($scope, $controller, $filter, api){

	if(!$scope.defaultSlug){
		$scope.defaultSlug = true;
	}

	if(!$scope.form){
		$scope.form = $scope.$parent.form;
	}

	api.blog.getCategories().then(function(categories){
		$scope.categories = categories.data;
	});

	$controller('_Base', {$scope: angular.extend($scope, {

		title: function(title){
			if(angular.isDefined(title)){
				$scope.form.title = title;
				if($scope.defaultSlug){
					$scope.formatSlug();
				}
			}
			return $scope.form.title;
		},

		reset: function(){
			this.form.title = null;
			this.form.description = null;
			this.form.slug = null;
		},

		formatSlug: function(){
			if(!angular.isDefined($scope.form.title)){
				return;
			}
			var slugLimited = $filter('limitTo')($scope.form.title, 30);
			$scope.form.slug = slugLimited.toLowerCase()
				.replace(/ /g,'-')
				.replace(/[^\w-]+/g,'');
		},

		editSlug: function(){
			if(this.defaultSlug){
				this.defaultSlug = false;
			} else  {
				this.defaultSlug = true;
				$scope.formatSlug();
			}
		}

	})});
	
}]);