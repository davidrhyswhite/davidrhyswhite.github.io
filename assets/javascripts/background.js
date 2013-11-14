(function() {
  $(document).ready(function () {
    var canvas = document.getElementById('background_canvas');
    var context = canvas.getContext('2d');
    var size = canvas.width;
    var squareWidth = 50;
    var drawLine = function(x, y) {
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(y, x);
      context.strokeStyle = "rgba(0, 0, 0, 0.05)";
      context.stroke();
    };

    context.webkitImageSmoothingEnabled = true;
    drawLine(squareWidth, 0);
    drawLine(0, squareWidth);
    drawLine(squareWidth, squareWidth);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(1, 1);
    context.strokeStyle = "rgba(0, 0, 0, 0.2)";
    context.stroke();

    var data = canvas.toDataURL();
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url('+data+')';

  });
}).call(this);