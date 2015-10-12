(function () {
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

            options = options || {};

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
            }));

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