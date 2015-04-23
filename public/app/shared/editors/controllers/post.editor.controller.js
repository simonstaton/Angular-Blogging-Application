//Look at making this a global text editting utility
ss.controller('postEditor', [
	'$scope', 
	'$element', 
	'$controller',
	'$filter', 
	'api', 
	'hitch', 
function($scope, $element, $controller, $filter, api, hitch){

	if(!$scope.defaultSlug){
		$scope.defaultSlug = true;
	}

	if(!$scope.form){
		$scope.form = $scope.$parent.form;
	}

	api.blog.getCategories().then(function(categories){
		$scope.categories = categories.data;
	});

	$scope.$slugInput = $('#slug', $element);

	angular.extend($scope, {

		_bindEvents: function(){

			this.$slugInput.on('keyup', hitch(this, function(){
				this.$slugInput.val(this.$slugInput.val().toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''));
			}));

		},

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

	});

	$scope._bindEvents();
	
}]);