---
layout: post
title:  "Managing front-end dependencies with Bower"
date:   2013-11-17 15:06:00
tags:
- JavaScript
- CSS
- Bower
---

I recently started working on a new Rails application and one of the first things I do when starting any new project is get a list of all my usual dependencies setup. In Ruby this is simple, just add any gems I know I'll need to my Gemfile and a `bundle install` command later and they've been downloaded and are ready to use.

That's great for Ruby based dependencies but modern web applications usually have a whole host of JavaScript dependencies such as [Backbone][backbone], [Ember][ember], [Underscore][underscore], [jQuery][jquery] as well as some CSS dependencies such as [960][960], [Mueller][mueller] and [Normalize][normalize].

## Bower to the rescue

Luckyly the kind people of Twitter have created a handy little tool for managing these front-end dependencies called [Bower][bower] thats really quick and easy to intergrate into Rails or any other application. Firstly create a dot file named .bowerrc in the root of your application. This file is simply so we can override the default bower install directory. For Rails applications is best to point this towards your vendor/assets folder, I like to create another folder in here called components, so I can keep track of all bower installed packages.

{% highlight json %}
{
  "directory": "vendor/assets/components"
}
{% endhighlight %}

Next we need to install bower, this should be a quick task if you already have Node.js and NPM installed on your system otherwise you'll need to install them first. The `-g` flag ensures bower is installed globally

{% highlight bash %}
npm install -g bower
{% endhighlight %}

Now you need to initialize Bower for your project. From the root of your application run the `bower init` command. You'll be asked a series of questions such as the name of your package, version, homepage, licence etc. Once you've answered all these questions bower will have created a bower.json file in your applications root directory, it looks not too disimilar to the package.json file found in Node libraries.

{% highlight json %}
{
  "name": "YOUR_PROJECT_NAME",
  "version": "0.0.1",
  "authors": [
    "YOUR NAME <your_name[at]your_domain[dot]com>"
  ],
  "license": "MIT",
  "private": true,
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "vendor/assets/components",
    "test",
    "tests"
  ],
  "dependencies": {
  }
}
{% endhighlight %}

That's it for setup we can now run `bower install normalize-css` from our project and that will install the package into the `vendor/assets/components/normalize-css` directory. For any more dependencies you can just run the `bower search PACKAGE_NAME` to see if a package exists for that library.

[backbone]: http://backbonejs.org
[ember]: http://emberjs.com
[underscore]: http://underscorejs.org
[jquery]: http://jquery.com
[960]: http://960.gs
[mueller]: http://muellergridsystem.com
[normalize]: http://necolas.github.io/normalize.css
[bower]: http://bower.io