var Site = {};

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
