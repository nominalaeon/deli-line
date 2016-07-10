# Deli Line

A simple website scaffold that promotes uninterrupted content loading and componentized JavaScript.

> tl;dr: Show the user content right away, only use as much browser memory as you need.

## Let's start

    npm install
    bower install

*Now fire up a server*

    grunt --verbose --debug

*Order's up!*

    grunt dist

## Adding new modules

If you want to add modules to this scaffold, use Bower to install them.

    bower install [module-name]

Then, once your module is installed, restart Grunt to auto-wiredep-ally inject its CSS or JS dependencies to the index file.

## Adding custom modules

Deli Line is built with [FrenchDipJS](http://nominalaeon.github.io/french-dip), harness its power to componentize your JavaScripts and basically build a framework custom-tailored to your project.

## Deli Line's one opinionation

Deli Line is also built with [imagesLoaded](http://imagesloaded.desandro.com/), which is used to create a global hook for JavaScript to use instead of simply waiting for DOM-ready. Standard DOM-ready events fire before images have fully loaded, so DOM manipulation scripts often fire before the true dimensions of an element can be correctly determined.

Use imagesLoaded to show quick-loading content and then gently introduce more complex assets once they're fully loaded. A loading spinner is included in the example to demonstrate how imagesLoaded is working, but I do not endorse hiding the meal for the sake of loading in garnish.
