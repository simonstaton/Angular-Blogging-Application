ss
	.controller('imageUploader', ['$scope', 'api', '$element', '$controller', function($scope, api, $element, $controller){

		angular.extend($scope, {

			uploading: false,

			progress: 0,
				
			image: null,

			delete: function(image){

				api.upload.deleteFile(image).then(function(response){
					$scope.image = null;
				}, function(error){
					$scope.$parent.notify = {state: 'error', message: error};
				});

			},

			upload: function(image) {

				if(this.uploading){
					return;
				}

				this.uploading = true;
				this.progress = 0;

				if (angular.isArray(image)) {
					image = image[0];
				}

				api.upload.image(image).progress(function(event) {

					$scope.progress = Math.floor(event.loaded / event.total);

				}).success(function(data, status, headers, config) {

					$scope.image = data;

					$scope.uploading = false;
					$scope.progress = 0;
					$scope.$uploadInput.val(null);

				}).error(function(error) {

					$scope.$parent.notify = {state: 'error', message: error};

					$scope.uploading = false;
					$scope.image = null;
					$scope.$uploadInput.val(null);
						
				});

			}

		});

		$scope.$uploadInput = $('#uploader', $element);

	}])
	.directive('imageUpload', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				image: "="
			},
			controller: 'imageUploader',
			templateUrl: 'app/shared/uploaders/image.view.html',
			replace: true
		};
	});