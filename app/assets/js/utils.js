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

})(this);;var Site = {};

Site.location = window.location;

(function (window, undefined) {
	var initSite = new Initializr(Site, 'Site');
	var SiteComponent = _.bind(initSite.component, initSite);

	$(document).ready(function () {
    $.extend(Site.prototype, {
  		$body: $('body'),

  		breakpoint: {
  			xs: 480,
  			sm: 768,
  			md: 1024,
  			lg: 1400
  		},

  		isBreakpoint: {
  			Large:  	Site.$body.width() >= Site.breakpoints.md,
  			Medium: 	Site.$body.width() < Site.breakpoints.md,
  			Small:  	Site.$body.width() < Site.breakpoints.sm,
  			XSmall: 	Site.$body.width() < Site.breakpoints.xs,
  			Touch: 		$('html').hasClass('touch'),
  			Tablet: 	Site.$body.width() < Site.breakpoints.sm || $('html').hasClass('touch'),
  			Mobile: 	Site.$body.width() < Site.breakpoints.xs || $('html').hasClass('touch')
  		},

      getUrlParam: function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)", 
            regex = new RegExp(regexS),
            results = regex.exec(Site.location.href);
        if (results == null) {
          return "";
        } else {
          return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
      },

  		rightToLeft: $('html').attr('dir') === 'RTL'
    });

		/*
		 * COMPONENTS
     */
		SiteComponent('_template');
		

    /*
     * UTILITY FUNCTIONS
     */
    Site.$body.removeClass("disable-transition-load");
    $('select.selectpicker').selectpicker();

    /*
     * LOG ERRORS
     */
    initSite.logErrors();
	});
})(this);
;(function () {
  var Sizer = {
    setHeights: function ($elements, options) {
      /* 
       * # README
       *
       * ## OPTIONS
       * > defined by type and default
       *     options {
       *       lineHeight: Boolean, false,
       *       reset: Boolean, false,
       *       resize: Boolean, true,
       *       selector: String, $elements
       *     }
       *
       * ## RESIZE
       * Set Resize to true if the $element being used to gauge max-height
       *   already has its own height. In this case we want the $element
       *   sized to 'auto' so we're not using a height we may have already set
       *
       * ## SELECTORS
       * Often the $element being sized are floating or
       *   positioned absolute and do not have a height.
       * These $elements will rely on their contained elements for height and
       *   will be identified by options['selector']
       *
       * ## SELECTORS USAGE
       * Multiple Selectors can be defined but should be Strings not Arrays
       *     options['selector'] = '.this, .that, .the-other';
       */

      if (!$elements) {
        return;
      }

      options = options || {} ;

      // if $selector was declared, ensure it's a jQuery obj, otherwise assume it's $elements
      var $selector = $elements;
      if (options['selector']) {
        $selector = $elements.find(options['selector']);
      }

      // reset element heights
      if (options['reset']) {
        Sizer.adjustHeights($elements, options, 'auto');
      }

      // determine height of tallest selector
      var maxHeight = _.max($selector.map(function () {
        return $(this).outerHeight();
      }) );

      // if maxHeight wasn't returned correctly, return 0
      if (!_.isNumber(maxHeight) || !_.isFinite(maxHeight)) {
        return 0;
      }

      // resize elements to maxHeight
      if (options['resize'] !== false) {
        Sizer.adjustHeights($elements, options, maxHeight);
      }

      return maxHeight;
    },
    adjustHeights: function ($elements, options, size) {
      if (options['lineHeight']) {
        $elements.css({
          height: size,
          lineHeight: size + 'px'
        });
      } else {
        $elements.css({
          height: size
        });
      }
    }
  };

  Site.Sizer = Sizer; 
})();