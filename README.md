# Deli Line

A smorgasbord of crusty component encapsulation and greasy page templating.

## Let's start

    npm install
    bower install

> Install NPM and Bower dependencies, now tie them into the front

    grunt wiredep

> Now start a server for some hot livereload on livereload action at localhost:8000

    grunt serve

> When the site is ready to wrap, move the compiled/uglified/imagemin'ed files to the build directory

    grunt build

> Order is up

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

## The Chef
Grunt.

## whoa whoa whoa ...FrenchDip.js?

What is FrenchDip.js, you ask? FrenchDip.js is an encapsulation system that takes designated elements or classes on a page and creates unique instances for each of all of them.

For instance, let's say you had two '.example'-classed elements on one page. Well, crumbs, now that $('.example').on('click') is unconditionally bound to both of my example elements, right? Wrong-o, dipshit. With FrenchDip.js installed, each instance of a defined selector gets its own instance of a component's script.

So now you can rest easy as FrenchDip.js lovingly caresses each and every prescribed element on your page as if it were the center of its universe. Which it technically is. The super-condensed, vacuous center that consumes its every waking moment with nightmarish visions of the inevitable void.