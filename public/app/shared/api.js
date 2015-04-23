/**
 * API service
 *
 * @class api
 * @service
 */
ss.service('api', [
	'$http', 
	'$q', 
	'$upload', 
	'hitch', 
function($http, $q, $upload, hitch){

	var promises = [], //authorise promises
		//Data store used for stopping multiple mongodb queries
		store = {},
		request = function(opts){ //Handle http request, if 'GET' store response in store for retrieval if requesting again
			if(opts.method == 'PUT' || opts.method == 'POST'){ //empty store if we are creating or updating
				store = {};
			}
			if(opts.method == 'GET' && store[opts.url]){
				var deferred = $q.defer();
				deferred.resolve(store[opts.url]); 
				return deferred.promise;
			} else if(opts.method == 'GET'){
				return $http(opts).success(function(response){
					store[opts.url] = {data: response};
				});
			} else {
				return $http(opts);
			}
		};

	angular.extend(this, {

		dashboard: {

			createPost: function(form) {
				return request({
					method: 'POST', 
					url: '/posts/create',
					data: form
				});
			},

			editPost: function(form) {
				return request({
					method: 'PUT', 
					url: '/posts/edit',
					data: form
				});
			},
			
			deletePost: function(data){
				return request({
					method: 'DELETE', 
					url: '/posts/delete/'+JSON.stringify(data)
				});
			},

			createCategory: function(form) {
				return request({
					method: 'POST', 
					url: '/categories/create',
					data: form
				});
			},

			editCategory: function(form) {
				return request({
					method: 'PUT', 
					url: '/categories/edit',
					data: form
				});
			},

			deleteCategory: function(data){
				return request({
					method: 'DELETE', 
					url: '/categories/delete/'+JSON.stringify(data)
				});
			}
		},

		blog: {

			getPosts: function() {
				return request({
					method: 'GET', 
					url: '/posts'
				});
			},

			getPost: function(data) {
				return request({
					method: 'GET', 
					url: '/posts/'+JSON.stringify(data)
				});
			},

			getCategories: function() {
				return request({
					method: 'GET', 
					url: '/categories'
				});
			},

			getCategory: function(data) {
				return request({
					method: 'GET', 
					url: '/categories/'+JSON.stringify(data)
				});
			}

		},

		upload: {

			image: function(image){
				return $upload.upload({
					url: '/upload/image',
					method: 'POST',
					file: image
				});
			},

			deleteFile: function(file){
				return request({
					method: 'DELETE', 
					url: '/upload/delete/'+encodeURIComponent(file)
				});
			}

		},

		getJson: function(path) {
			return $http.get(path);
		},

		logout: function() {
			var self = this;
			return request({
				method: 'GET', 
				url: '/auth/logout'
			}).then(function(response){
				self.session = null;
			});
		},

		login: function(form) {
			return request({
				method: 'POST', 
				url: '/auth/login',
				data: form
			});
		},

		register: function(form) {
			return request({
				method: 'POST', 
				url: '/auth/register',
				data: form
			});
		},

		authorise: function() {

			var deferred = $q.defer(),
				self = this;

			//Make sure we are not already authorising user
			$q.all(promises).then(hitch(this, function(){
				//Reset promises
				promises = [];

				//If active session resolve
				if(this.session){
					deferred.resolve(this.session); 

				//Else check passport session in express
				} else {

					request({
						method: 'GET', 
						url: '/auth/authorise'
					}).then(hitch(this, function(response){
						//Set session and resolve
						this.session = response.data;
						deferred.resolve(response);
					}), hitch(this, function(error){
						//Empty session and reject
						this.session = null;
						deferred.reject(error);
					}));

				}
				
				//Add deferred to active promises
				promises.push(deferred.promise);

			}), hitch(this, function(error){

				deferred.reject(error);

			}));

			return deferred.promise;

		}

	});

}]);