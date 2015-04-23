//To do - tidy this
ss.factory('i18n', ['$q', '$cookies', 'objScan', function($q, $cookies, objScan){

	var cookieLocale = $cookies.languageLocale ? $cookies.languageLocale : 'en',
		service = function(){
			angular.extend(this, {
				locale: cookieLocale,
				page: 'global',
				store: {},
				langPack: null,
				set: function(prop, val){
					objScan(this, prop, val);
					if(prop.split('.').length == 1 && this.langPack){
						this.update();
					}
				},
				update: function(){
					var global = this.langPack[this.locale].global,
						extended = this.langPack[this.locale][this.page];
					this.store = angular.extend({}, global, extended);
					$cookies.languageLocale = this.locale;
				}
			});
		};

	return new service();

}])

.controller('i18nToggle', ['$scope', 'i18n', function($scope, i18n){
		$scope.languageOptions = [];
		angular.extend($scope, {
			toggle: function(scope) {
				angular.forEach($scope.languageOptions, function(scope){
					scope.active = false;
				});
				scope.active = true;
				i18n.set('locale', scope.locale);
			}
		});
		angular.extend(this, {
			i18n: i18n,
			addOption: function(scope){
				$scope.languageOptions.push(scope);
			}
		});
	}])
	.directive('i18nToggle', function() {
		return {
			restrict: 'E',
			transclude: true,
			controller: 'i18nToggle',
			//TODO make template options dynamic from the i18n packs in json data
			template: '<ul class="languageToggle"><i18n-option title="English" locale="en"></i18n-option><i18n-option title="French" locale="fr"></i18n-option><li ng-repeat="option in languageOptions" ng-class="{active:option.active}"><a href="" ng-click="toggle(option)">{{option.title}}</a></li></ul>',
			replace: true
		};
	})
	.directive('i18nOption', function() {
		return {
			restrict: 'E',
			require: '^i18nToggle',
			scope: { locale: '@', title: '@' },
			link: function(scope, element, attrs, i18nToggleCtrl){
				i18nToggleCtrl.addOption(scope);
				if(attrs.locale == i18nToggleCtrl.i18n.locale){
					scope.active = true;
				}
				element.remove();
			}
		};
	});