ss.controller('dashboardPosts', [
	'$scope', 
	'$controller',
	'api',
	'session', 
	'$location', 
function($scope, $controller, api, session, $location){

	$controller('_Base', {$scope: angular.extend($scope, {

		page: 'dashboard',

		session: api.session,

		initialise: function(){

			$scope.i18n.set('store.pageTitle', 'Posts | Dashboard');

			api.blog.getPosts().then(function(response){
				$scope.posts = response.data;
			});
	
		},

		delete: function(post){

			api.dashboard.deletePost({_id: post._id}).then(function(response){

					$scope.posts.splice($scope.posts.indexOf(post), 1);
					$scope.$parent.notify = {state: 'success', message: $scope.i18n.store.notifications.postDeleted, timeout: 5000};
				
				}, function(error){

					$scope.notify = {state: 'error', message: error};

				});

		},

		edit: function(post){

			$location.search({_id: post._id});
			$location.path("/dashboard/posts/edit");

		}

	})});

}]);