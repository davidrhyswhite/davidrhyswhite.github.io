---
layout: post
title:  "Simple HTTP Server with Go (Part 1)"
date:   2014-3-3 13:00:00
tags:
- Go
- Server
---

I've been playing recently with [Go][go], the blazingly fast C-like language from Google and so far have been very impressed. The syntax is surprisingly simple and the language comes packed with a very powerful standard library, especially for web developers. They even have an excellent interactive tutorial in the form of [play.golang.org][playgo].

A simple command-line `hello world` application in Go might look something like the following:

{% highlight go %}
package main

import "fmt"

func main() {
  fmt.Println("Hello World")
}
{% endhighlight %}

With this example we've essentally setup our main package and defined our main method, which is going to automatically be run by Go. We've also imported the `fmt` for outputting our message using the `Println` method.

I'm usually not a fan of hello world applications as they're usually so simple and bypass any real application structure to be as small as possible that they fail to help a developer understand any key standards / concepts. One of the most surprising things about Go is how simple it is to write a HTTP server using only Go's standard libraries.

{% highlight go %}
package main

import (
  "fmt"
  "net/http"
)

func main() {
  http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello World")
  })
  http.ListenAndServe(":8080", nil)
}
{% endhighlight %}

It's actually that simple, the `http.HandleFunc` method allows us to write to the `http.ResponseWriter` with the text content 'Hello World'. The `http.ListenAndServe` method simple runs the server on port 8080. It's a very very simple example of a HTTP server in action but really shows how much of a modern language Go is.

Starting up the application is as easy as running: `go run server.go`, if you named your go file *server.go*.

### Where next

While that was a very simple example it's probably not something you need to do very often. I'll write up another post going further into URL handling aka **routing** and go through some examples of how to make some dynamic URLs.

[go]: http://golang.org/
[playgo]: http://play.golang.org/