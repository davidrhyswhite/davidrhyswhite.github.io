---
layout: post
title:  "Simplified JavaScript templates"
date:   2014-3-2 22:00:00
tags:
- JavaScript
---

Occasionally when I'm doing some JavaScript work I come across the need to take some data and easily insert it into the DOM. The easiest solution to this is usually to do some string concatenation in JavaScript and insert that directy into the DOM, but that can quickly lead to some nasty looking JS files with HTML snippets littered throughout.

Another method might be to include a JS templating library such as [Moustache][moustache], [EJS][ejs] or [Jade][jade], but that's going to include another dependency on your application and if you only need to do some simple rendering that might be overkill.

My prefered solution these days is to use the [String.replace()][replace] method with some simple Regex to render this data.


Lets say we have the following data about a person, a simple first name, last name and age:
{% highlight javascript %}
var person = {
{
  "firstName": "David",
  "lastName": "White",
  "age": 31
};
{% endhighlight %}

I like to wrap up this reusuable peice of DOM in a script tag with the type of "text/template", it can sit inside your HTML document and doesn't get rendered by the browser:

{% assign firstName = '{{firstName}}' %}
{% assign lastName  = '{{lastName}}' %}
{% assign age       = '{{age}}' %}
{% highlight text %}
<script type="text/template" id="person-template">
  <div id="person">
    <p><strong>Name</strong>: {{firstName}} {{lastName}}</p>
    <p><strong>Age</strong>: {{age}}</p>
  </div>
</script>
{% endhighlight %}

Next we need to load up that DOM template and using the String.replace() method, which is surpisingly simple.

{% highlight javascript %}
var render = function (text, data) {
  var interpolate = /\{\{(.+?)\}\}/g;

  return text.replace(interpolate, function (match, contents) {
    return data[contents];
  });
};
var template = document.getElementById('person-template').innerHTML;
var body = document.getElementById('body');

body.innerHTML = render(template, person);
{% endhighlight %}

It's a really simple method for rendering some JS attributes into the DOM by matching on the double curly brackets.

### Extending it further

We can take this method a little further and support nested objects with just a couple of changes, for example if we added an address object to the `person` data:

{% highlight javascript %}
var person = {
{
  "firstName": "David",
  "lastName": "White",
  "age": 31,
  "workAddress": {
    "lineOne": "BBC Broadcasting House",
    "lineTwo": "Llantrisant Road",
    "city": "Cardiff"
    "postalCode": "CF5 4UE"
  }
};
{% endhighlight %}

Updating the template now to use the new nested fields we might do somthing along the following:

{% assign lineOne    = '{{workAddress.lineOne}}' %}
{% assign lineTwo    = '{{workAddress.lineTwo}}' %}
{% assign city       = '{{workAddress.city}}' %}
{% assign postalCode = '{{workAddress.postalCode}}' %}

{% highlight text %}
<script type="text/template" id="person-template">
  <div id="person">
    <p><strong>Name</strong>: {{firstName}} {{lastName}}</p>
    <p><strong>Age</strong>: {{age}}</p>
    <p>
      <strong>Work address</strong>: {{lineOne}},<br />
      {{lineTwo}},<br />
      {{city}},<br />
      {{postalCode}}
    </p>
  </div>
</script>
{% endhighlight %}

Next we need to update the `render()` function to handle nested objects and properties. This is easily achieved by spliting each matched expression at the [dot] and appending the variables in a JavaScript specific manner:

{% highlight javascript %}
var render = function (text, data) {
  var interpolate = /\{\{(.+?)\}\}/g;

  return text.replace(interpolate, function (match, contents) {
      var i = data;
      contents.split(".").map(function (element) {
        i = i[element];
      });
      return i;
  });
};
{% endhighlight %}

### Caveats

Unfortunately this doesn't cover every possible scenario with your data. While you could easily loop over an array of objects you'll need to do a bit more work to get this to work with an array nested in the object, but if your data is more complicated then it's probably worth investing in a view templating library to manage your views.

[replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
[moustache]: http://mustache.github.io/
[jade]: http://jade-lang.com/
[ejs]: http://embeddedjs.com/