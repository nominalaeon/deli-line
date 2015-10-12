(function () {
	/*
	 * $root is returned from FrenchDip
	 * $root represents a single instance of the class declared at bottom
	 */
	var TemplateInstance = function ($root, options) {
		this.$root 		= $root;
		this.options 	= options;

		console.trace('TemplateInstance', this.$root);
		
		// jQuery plug-in let's functions asynchronously load after specific content has loaded
		this.$root.imagesLoaded($.proxy(this.init, this));

		// Bind Events after Init functions have all run
		this.bindEvents();

		// Calm resize event so it doesn't fire for every pixel a window is changed
		$(window).on("resize", _.debounce($.proxy(this.onResize, this), 200));
	};

	$.extend(TemplateInstance.prototype, {
		init: function () {
			console.trace('TestComponent Init', this.$root.data('test'));
		},

		bindEvents: function () {
			this.$root.on('click', $.proxy(this.onClick, this));
		},

		onClick: function () {
			console.trace('TestComponent Click', this.$root);
		},

		onResize: function () {
			console.trace('TestComponent Resize', this.$root);
		}
	});

	/*
	 * FrenchDip(CWF) is called and told which class to tie instances to
	 * This call accepts options, see example below
	 * CWF returns first and second args when
	 * CWF calls third arg which is the function declared at top
	 */
	var instanceOptions = {
		dataAttr: 'test'
	}
	Site.Template = Site.FrenchDip('.dev-component', instanceOptions, TemplateInstance);
})();