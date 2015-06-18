#Parallax-images

##What it does
Parallax images is a **jQuery plugin** that allows you to implement traditional images
in a webpage while calling a single function  to convert the images into a parallaxing
presentation of images that slide vertically within themselves when the page scrolls.

In addition to the *parallaxing scroll* presentation, the plugin adds a mouse-over event
causing the image to *expand to present it entirely*, while the mouse-out event causes
the image to return to the appropriate amount of parallax based on the page scroll.

##How it works

###Requirements

* Your HTML document needs a DocType declaration in order to measure the width and height of elements
  * ````<!doctype html>````
* You need to include *jQuery* at the bottom of your HTML page, before the closing ````</body>```` tag
  * ````<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>```` 
* You need to include the *parallax-image* plugin at the bottom of your HTML page, before the closing ````</body>```` tag
  * ````<script type="text/javascript" src="scripts/parallax-images.js"></script>```` 

###Markup

