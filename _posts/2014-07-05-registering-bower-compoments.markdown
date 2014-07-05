---
layout: post
title:  "Registering bower components"
date:   2014-7-5 13:00:00
tags:
- Bower
---

Registering a Bower component is a really simple process when you know how. Unfortunately the documentation on the bower site is a little too suggestive so I thought it would be good to give a basic step through on resistering and updating a bower compoment.

Once you're happy with your component and you've updated the version (versions should based off [semver][semver]) in the `bower.json` in the root of your project you'll need to push those changes up to your master git branch.


{% highlight bash %}
  # Update the `bower.json` version number, for example: "version": "0.1.0"
  $ git push origin master

  # Create a git tag based off of this version
  $ git tag v0.1.0

  # Now push this tag to your git repo
  $ git push origin v0.1.0
{% endhighlight %}

Next you just need to inform the bower registry of your new component by running:

{% highlight bash %}
  $ bower register NAME_OF_YOUR_COMPONENT PATH_TO_YOUR_GIT_REPO
{% endhighlight %}

Your component should now be installable via the `bower install` command:

{% highlight bash %}
  $ bower install NAME_OF_YOUR_COMPONENT
{% endhighlight %}

Updating is just as simple, just update your `bower.json` version, push that to master, create a git tag based off of that and push that tag up to your git repo.

[semver]: http://semver.org/
