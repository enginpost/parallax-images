(function( $ ){
  
  var parallaxImageAmount = 0;
  var parallaxWindow = $(window).height();
  var parallaxImages = [];

  $.parallaxify = function( parallaxAmount ){

    parallaxImageAmount = (parallaxAmount > 0 ? parallaxAmount : 100)

    //window scroll event
    $(window).scroll(function() {
      //scroll in-content images */
      parallaxImageScrollTest();
    });

    //replace images with DIVs with background images
    $('img.parallax-image').each(function(index){
      //for each image, replace the image with a div shortened by the parallaxImageAmount value
      //    and set the background image the same as the src of the image
      var divImageHtml = "<div id='px" + index + "' class='"+ $(this).attr('class') +"' style='background-image: url(\"" + 
            $(this).attr('src') + "\"); width: " + $(this).attr('width') + "px; height: " + 
            (parseInt($(this).attr('height'))-parallaxImageAmount) + "px; background-size: " + $(this).attr('width') + 
            "px; display:block;" + 
            ($(this).attr('align')=='middle'?"clear:both;margin:10px auto;":"float:" + $(this).attr('align')) + 
            "' title='" + $(this).attr('alt') +"' data-height='" + $(this).attr('height') + "'></div>";
      $(this).replaceWith(divImageHtml);
      //keep a list of images that will be parallaxed in the parallaxImages array
      var divImg = $('#px'+index);
      var pImg;
      if(divImg.hasClass('parallax-hero')){
        pImg = { 
          id: divImg.attr('id'), 
          start: 0, 
          end: divImg.offset().top + divImg.height(),
          distance: (divImg.offset().top + divImg.height()) - (0),
          height: divImg.height()
        };
      }else{
        pImg = { 
          id: divImg.attr('id'), 
          start: divImg.offset().top + divImg.height() - $(window).height(), 
          end: divImg.offset().top,
          distance: (divImg.offset().top) - (divImg.offset().top + divImg.height() - $(window).height()),
          height: divImg.height()
        };
      }
      divImg.hover(hoverParallaxImage,unHoverParallaxImage);
      parallaxImages.push(pImg);
    });
  }

  //Test to see if any parallax image is visible in the window viewport
  function parallaxImageScrollTest(){
    for( var i = 0; i < parallaxImages.length; i++){
      if( $(window).scrollTop() < (parallaxImages[i].end) && $(window).scrollTop() > (parallaxImages[i].start) ){
        //if the current window scroll position is more than the start and less 
        //   than the end criteria for a parallax image, then scroll the position
        //   of the background image
        //Determine the percentage of the scroll distance for the current image
        //    we are currently at.
        var percentageScroll = ($(window).scrollTop() - parallaxImages[i].start) / parallaxImages[i].distance;
        //scroll the background position vertically by a distance percentage times the parallaxImageAmount
        animateImage( parallaxImages[i], 
          {
            backgroundPositionX: '0px', 
            backgroundPositionY: $(parallaxImages[i]).css('background-position').split(' ')[1]
          },
          { 
            backgroundPositionX: 0, 
            backgroundPositionY: parseInt(0-(parallaxImageAmount*percentageScroll))
          },
          0
        );
      }
    }
  }

  function animateImage( someElement, propertiesFrom, propertiesTo, duration ){
    propertiesReferenceBackgroundPosition = false;
    for( prop in propertiesFrom){
      propertiesFrom[prop] = parseInt(propertiesFrom[prop]);
      if( propertiesReferenceBackgroundPosition == false ){
        propertiesReferenceBackgroundPosition = ( prop.indexOf('backgroundPosition') > -1 ) ? true : false;
      }
    }
    $( propertiesFrom ).animate(
      propertiesTo,
      { 'duration': duration,
        step: function( now, fx ){
          propertiesFrom[fx.prop] = now;
          if( propertiesReferenceBackgroundPosition ){
            var tempProps = $.extend({}, propertiesFrom);
            tempProps.backgroundPosition = tempProps.backgroundPositionX + 'px ' + tempProps.backgroundPositionY + 'px';
            delete tempProps.backgroundPositionX;
            delete tempProps.backgroundPositionY;
            $(someElement).css(tempProps);
          }else{
            $(someElement).css(propertiesFrom);
          }
        }
      }
    );
  }
  function hoverParallaxImage(){
    for(var i = 0; i < parallaxImages.length; i++){
      if( parallaxImages[i].id == $(this).attr('id')){
        // Animate the DIV to the full height of the parallaxing image and pin the top of the background to the top of the DIV
        animateImage( parallaxImages[i], {'height': $(this).attr('data-height'), 'background-position-y': '0'}, 500);
        break;
      }
    }
  }
  function unHoverParallaxImage(){
    for(var i = 0; i < parallaxImages.length; i++){
      if( parallaxImages[i].id == $(this).attr('id')){
        //Determine the current percentage of the scroll distance range for the hovered image.
        var percentageScroll = ($(window).scrollTop() - parallaxImages[i].start) / parallaxImages[i].distance;
        //scroll the background position vertically by a distance percentage times the parallaxImageAmount, and set the DIV back to the parallax height
        var thisAnimation = {'background-position-y': parseInt(0-(parallaxImageAmount*percentageScroll)), 'height': parallaxImages[i].height};
        animateImage( parallaxImages[i], thisAnimation, 500 );      
        break;
      }
    }
  }

}(jQuery));