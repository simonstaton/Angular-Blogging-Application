ss.controller('dashboardEditPost', [
	'$scope', 
	'$controller',
	'api',
	'session', 
	'$location', 
function($scope, $controller, api, session, $location){
	var routeData = $location.search();
	$controller('_Base', {$scope: angular.extend($scope, {

		page: 'dashboard',

		editting: true,

		form: {
			_id: routeData._id,
			submitter: api.session.user._id
		},

		session: api.session,

		initialise: function(){

			$scope.i18n.set('store.pageTitle', 'Edit Post | Dashboard');

			api.blog.getPost({_id: routeData._id}).then(function(response){

				$scope.form = response.data;
				$scope.title = $scope.form.title;

			}, function(error){

				$location.path('/dashboard/posts');
				$scope.$parent.notify = {state: 'error', message: $scope.i18n.store.notifications.postNotFound, route: true};
			
			});


		},

		submit: function(){
			api.dashboard.editPost($scope.form).then(function(response){
					$scope.$parent.notify = {state: 'success', message: $scope.i18n.store.notifications.postUpdated};
				}, function(error){
					$scope.notify = {state: 'error', message: error};
				});

		}

	})});
}]);
