# Deli Line

A smorgasbord of crusty component encapsulation and greasy page templating.

<!-- MarkdownTOC -->

- [Let's start](#lets-start)
- [The Chef](#the-chef)
- [The Fixin's](#the-fixins)
- [whoa whoa whoa ...FrenchDip.js?](#whoa-whoa-whoa-frenchdipjs)
- [Using Assemble](#using-assemble)

<!-- /MarkdownTOC -->


## Let's start

    npm install
    bower install

> Now start a server for some hot livereload on livereload action at localhost:8000

`grunt` *or* `grunt serve`

> When the site is ready to wrap, move the compiled/uglified/imagemin'ed files to the build directory

    grunt build

> Order is up

## The Chef
Grunt.

## The Fixin's

### Markup

* Assemble.io templating
* HTML5
* Foundation (active)
* Bootstrap (dormant)

### Style

* SCSS/Compass
* A few BEM examples but not enough. Just use BEM, alright.

### Scripts

* Unabashed jQuery.
* Modernizr, lodash, Verge, HammerJS, imagesLoaded
* FrenchDip.js

## whoa whoa whoa ...FrenchDip.js?

What is FrenchDip.js, you ask? FrenchDip.js is an encapsulation system that takes designated elements or classes on a page and creates unique instances for each of all of them.

For instance, let's say you had two '.example'-classed elements on one page. Well, crumbs, now that $('.example').on('click') is unconditionally bound to both of my example elements, right? Wrong-o, dingus. With FrenchDip.js installed, each instance of a defined selector gets its own instance of a component's script.

So now you can rest easy as FrenchDip.js lovingly caresses each and every prescribed element on your page as if it were the center of its universe. Which it technically is. The super-condensed, vacuous center that consumes its every waking moment with nightmarish visions of the inevitable void.

### Getting started with FrenchDip

Every time you need to make a new component, you'll add a unique JavaScript file for it.

1. Copy `app/scripts/components/_template.js` and rename every instance of "Template" in the file.
2. At the bottom of the file, change the Selector from `'.template'` to whatever page element you want to encapsulate.
3. Open `app/scripts/init.js` and, under the `/* Componentes */` heading, add an invocation line for your new component `SiteComponent('Template');`

The SiteComponent Object is in charge of forEach'ing through the matches of your component's defined Selector. If none are on a page, the component isn't used. If one or more are present, FrenchDip will invoke a new instance of your component script per match.

Doing this automatically confines the context of each script to each instance of the Selector. This is especially handy when tracking click, load, resize, or any other kind of Event, but it also streamlines utility, DOM-manipulation functionality

## Using Assemble

### Relative paths

Scripts and other site assets loaded in page-layout.hbs rely on relative-path variable from page templates.

    <script src="{{relativePath}}assets/js/utils.js"></script>

The relative-path variable is set at the top of the page template file.

    ---
    title: "Some child-of-a-child page"
    relative-path: "../../"
    ---
