var $head = $('head'),
	$body = $('body');

ss
	.factory('hitch', [function(){

		return function(context, func){
			if(Function.prototype.bind){
				return func.bind(context);
			} else {
				return func.apply(context, arguments);
			}	
		};

	}])

	.factory('objScan', [function(){
		return function(context, prop, value) {
			props = prop.split(".");
			while (props.length > 1){ //Degrade props and loop into context
				context = context[props.shift()];
			}
			if(value){
				return context[props.shift()] = value; // jshint ignore:line
			} else {
				return context[props.shift()];
			}
		};
	}]);