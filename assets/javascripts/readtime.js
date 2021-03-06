$.fn.addReadTime = function () {
  return this.each(function () {
    var wordCount = parseInt($(this).attr('content')),
        seconds = (wordCount / 5);

    var readTime = function () {
      if (seconds < 44) {
        return "less than a minute";
      } else if (seconds < 59) {
        return "about 1 minute";
      } else {
        var number_of_minutes = Math.round(seconds / 60);
        var plural = (number_of_minutes < 2) ? "" : "s";
        return "about " + number_of_minutes + " minute" + plural;
      }
    };

    $(this).after(readTime());
  });
}


$(document).ready(function () {

  $('meta[itemprop="wordCount"]').addReadTime();

});