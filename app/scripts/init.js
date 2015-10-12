var Site = {};

Site.location = window.location;

(function(window, undefined) {
    var initSite = new Initializr(Site, 'Site');
    var SiteComponent = _.bind(initSite.component, initSite);

    $(document).ready(function() {

        $.extend(Site, {
            $html: $('html'),
            $body: $('body'),

            breakpoint: {
                xs: 480,
                sm: 768,
                md: 1024,
                lg: 1400
            },

            rightToLeft: $('html').attr('dir') === 'RTL'
        });

        $.extend(Site.prototype, {
            isBreakpoint: function(size) {
                var sizes = {
                    large: this.$body.width() >= this.breakpoints.md,
                    medium: this.$body.width() < this.breakpoints.md,
                    small: this.$body.width() < this.breakpoints.sm,
                    xSmall: this.$body.width() < this.breakpoints.xs,
                    touch: this.$html.hasClass('touch'),
                    tablet: this.$body.width() < this.breakpoints.sm || $('html').hasClass('touch'),
                    mobile: this.$body.width() < this.breakpoints.xs || $('html').hasClass('touch')
                };
                return sizes[size];
            },

            getUrlParam: function(name) {
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regexS = "[\\?&]" + name + "=([^&#]*)",
                    regex = new RegExp(regexS),
                    results = regex.exec(Site.location.href);
                if (results == null) {
                    return "";
                } else {
                    return decodeURIComponent(results[1].replace(/\+/g, " "));
                }
            }
        });

        /*
         * COMPONENTS
         */
        SiteComponent('Template');


        /*
         * UTILITY FUNCTIONS
         */
        Site.$body.removeClass("disable-transition-load"); // stops transitioned elements from loading in silly

        /*
         * LOG ERRORS
         */
        initSite.logErrors();
    });
})(this);