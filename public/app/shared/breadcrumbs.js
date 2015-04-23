ss
	.factory('breadcrumbs', ['$rootScope', '$route', 'hitch', function ($rootScope, $route, hitch) {

		var service = {

			breadcrumbs: [],

			build: function() {

				//If active route
				if ($route.current && $route.current.originalPath) {

					this.breadcrumbs = [];

					var params = $route.current.params,
						urlParts = $route.current.originalPath.split('/');

					//Split up the path to get parent route /parent/child - [parent, parent/child]
					angular.forEach(urlParts, hitch(this, function(part, index) {

						var isParam = function(part){ //Test if this url part is a param
								return part[0] === ':' && typeof params[part.substring(1)] !== 'undefined' ? params[part.substring(1)] : false;
							},
							pathWithParam = '', //Full route with param still intact as '/:param'
							pathWithQuery = ''; //Full route with param as query '/someQuery'

						//For each url part under this index
						for(var i=0;i<=index;i++){

							//Make path with params
							pathWithParam += urlParts[i];

							//Make path with query
							if(isParam(urlParts[i])){
								pathWithQuery += isParam(urlParts[i]);
							} else {
								pathWithQuery += urlParts[i];
							}

							//If not last in url add trailing slash
							if(i !== index) { 
								pathWithParam +='/';
								pathWithQuery +='/';
							}

						}

						//Make sure router and label exists for this part
						if ($route.routes[pathWithParam] && ($route.routes[pathWithParam].label || param)) {
							this.breadcrumbs.push({
								path: pathWithQuery,
								label: $route.routes[pathWithParam].label || param,
								param: isParam(part)
							});
						}

					}));

				}

			},

			//Improve this
			getDynamicLabel: function() {
				if (this.dynamicLabels) {
					//Each label
					for (var key in this.dynamicLabels) {
						//Each breadcrumb
						for (var index in this.breadcrumbs) {
							//If using dynamic label set as label
							var breadcrumb = this.breadcrumbs[index];
							if (breadcrumb.label === key) {
								breadcrumb.label = this.dynamicLabels[key];
							}

						}

					}
				}
				return this.breadcrumbs;
			}

		};

		$rootScope.$on('$routeChangeSuccess', function() {
			service.build();
		});

		$rootScope.$watch(function(){ return service.dynamicLabels; }, function() {
			service.build();
		});

		service.build();

		return service;

	}])
	.directive('breadcrumbs', function() {
		return {
			restrict: 'E',
			transclude: true,
			template: '<ul class="breadcrumbs"><li ng-repeat="breadcrumb in breadcrumbs.getDynamicLabel() track by breadcrumb.path" ng-class="{ active: $last }"><a ng-if="!$last" ng-href="{{ breadcrumb.path }}" ng-bind="breadcrumb.label" class="margin-right-xs"></a> <span ng-if="!$last"> > </span><span ng-if="$last" ng-bind="breadcrumb.label"></span></li></ul>',
			replace: true
		};
	});