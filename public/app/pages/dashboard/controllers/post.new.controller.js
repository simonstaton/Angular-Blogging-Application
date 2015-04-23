ss.controller('dashboardNewPost', [
	'$scope', 
	'$controller',
	'$filter', 
	'api',
	'session', 
function($scope, $controller, $filter, api, session){

	$controller('_Base', {$scope: angular.extend($scope, {

		page: 'dashboard',

		form: {
			submitter: api.session.user._id
		},

		session: session,

		initialise: function(){
			$scope.i18n.set('store.pageTitle', 'New Post | Dashboard');
		},
		
		reset: function(){

			this.form.title = null;
			this.form.description = null;
			this.form.slug = null;

		},

		submit: function(){

			api.dashboard.createPost($scope.form).then(function(response){

					$scope.$parent.notify = {state: 'success', message: $scope.i18n.store.notifications.postCreated};
					$scope.reset();

				}, function(error){

					$scope.notify = {state: 'error', message: error};

				});

		}

	})});
	
}]);