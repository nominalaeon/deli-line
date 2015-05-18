(function (window, undefined) {
	function Initializr (namespace, name) {
		if (_.isObject(namespace)) {
			this.namespace = namespace;
		} else {
			throw new Error('no namespace specified');
		}

		this.name = name;
		this._errors = [];
		
		return this;
	};

	$.extend(Initializr.prototype, {
		component: function (name, args) {
			var initializr = this;
			var namespace = initializr.namespace;
			var component;
			
			if (!_.isUndefined(args)) {
				if (!_.isArray(args)) {
					args = [args];
				}
			} else {
				args = [];
			}

			if (namespace) {
				component = namespace[name];
			}

			if (component && _.isFunction(component.init)) {
				component.init.apply(component, args);
			} else {
				initializr._errors.push(name);
			}
		},
		logErrors: function () {
			var initializr = this;
			var errors = initializr._errors;

			if (errors.length) {
				_.each(errors, function (err) {
					console.error('%s Component %s failed to load.', initializr.name, err);
				});
			} else {
				console.log('%s Components successfully loaded.', initializr.name);
			}
			
			errors = [];
		}
	});

	window.Initializr = Initializr;

})(this);