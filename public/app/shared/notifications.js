ss.directive('notification', ['$timeout', function($timeout){
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			notify: "=property"
		},
		link: function($scope, element, attrs){

			$scope.closeNotification = function(){
				delete $scope.notify;
			};

			$scope.$watch('notify.timeout', function(time, prevValue){
				if (time !== prevValue && typeof time !== "undefined") {
					$timeout(function(){
						delete $scope.notify;
					}, time);
				}
			});

		},
		template: '<div ng-show="notify.state" class="notification notify.state">{{ notify.message }} <a href="" ng-click="closeNotification()">Close</a></div>'
	};
}]);