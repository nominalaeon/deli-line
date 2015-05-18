/* globals jQuery, _ */
(function ($, _, Site) {
	/* 
	 * Generates a standard init function for each component
	 * Encapsulates component instances
	 * Is ground-breaking.
	 */
	var FrenchDip = function (selector, defaultOptions, instanceObject) {
		var parseInstanceOptions = function ($root) {
			var $config = $root.find('> .component-config');
			var instanceOptions = {};
			
			_.each(defaultOptions, function (optionValue, optionKey) {
				var dataValue = $config.data(optionKey);

				if (!_.isUndefined(dataValue)) {
					instanceOptions[optionKey] = dataValue;
				}
			});
			return instanceOptions;
		};
		
		return {
			init: function (siteOptions) {
				siteOptions = _.extend({}, defaultOptions, siteOptions);

				$(selector).each(function () {
					var $this = $(this);
					var instanceOptions = _.extend({}, siteOptions, parseInstanceOptions($this));
					new instanceObject($this, instanceOptions);
				});
			}
		}
	};

	Site.FrenchDip = FrenchDip;
})(jQuery, _, Site);
