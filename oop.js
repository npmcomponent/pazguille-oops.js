(function(window, undefined) {

	Object.create = Object.create || (function(){
		var F = function(){};
		return function (obj) {
			F.prototype = obj;
			return new F();
		};
	}());

	var oop = (function(){

		var Class = function (klass) {
			var Klass, definitor;
	
			Klass = function (conf) {
				// Forgot "new" prefix?
				var that = (this instanceof Klass) ? this : Object.create(Klass.prototype);
				var conf = conf || {};
				that.type = klass;

				if (this.parent && this.parent["init"]) {					this.parent.init.call(that, conf);
				}

				if (this["init"]) {
					this.init.call(that, conf);				}

				return that;
			};
		
			definitor = {

				"extends": function (Parent) {
					Klass.prototype = Object.create(Parent.prototype);
					Klass.prototype.constructor = Klass;
					Klass.parent = Klass.prototype.parent = Parent.prototype;

					return definitor;
				},
		
				"init": function (func) {
					Klass.prototype.init = func;
		
					return definitor;
				},
		
				"addMethod": function (name, fn) {
					Klass.prototype[name] = fn;
		
					return definitor;
				},
	
				"build": function () {
					return Klass;
				}
		
		    };
		
		    return definitor;
		
		};
	
	    var core = {
			"Class": Class
	    };
	
	    return core;

	})();

	window.oop = oop;

})(window);