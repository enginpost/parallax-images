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
* You need to include the *parallax-images* plugin at the bottom of your HTML page, before the closing ````</body>```` tag
  * ````<script type="text/javascript" src="scripts/parallax-images.js"></script>```` 

###Markup

* Parallax images transforms traditional HTML````<img>```` tags in your HTML document:
  * ````<img src="images/gopher.jpg" height="280" width="180" alt="a gopher" class="parallax-image" align="right">````
    * Be sure to include:
      * The ````parallax-image```` class
      * The *width* and *height* of the image
      * An *alt* property value for section-508 compliance
    * Note: *Parallax images does not style your image. If you want to round the corners or inset the image, create additional classes. Parallax images will respect the ````left, middle, right```` alignment of your ````<img>```` tag when it is transformed.
* Include a ````<script>```` block to initiate parallaxification of your ````<img>```` tags
* ```javascript
    <script type="text/javascript">
      $(document).ready(function(){
        $.parallaxify(100);
      });
    </script>
 ```
