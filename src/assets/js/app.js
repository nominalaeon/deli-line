(function () {

    'use strict';

    function Site() {
        imagesLoaded(this.root, init.bind(this));
    }

    /**
     * Adds "loaded" class to HTML element once the site's images are all loaded.
     *     CSS: "html.loaded" allows default styles and content to appear, hides janky load flickers
     *     JS: "html.loaded" gives a hook for initializing DOM manipulation
     */
    function init(ImgsLoaded) {
        console.log('Site images are loaded', ImgsLoaded.images);
        this.root.classList.add('loaded');
    }

    FrenchDip.register(Site, 'Site');

})();
