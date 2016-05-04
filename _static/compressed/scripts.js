/*
 * Back to Top scripting.
 */
function backToTop() {
  $navigator.bind({
    click: function() {
      $("html,body").animate({
        scrollTop: 0
      }, 2000, "swing")
    }
  })
}

function addMore() {
  $(window).bind({
    scroll: function() {
      scrollPos = $(window).scrollTop();
      if (scrollPos < 1000) {
        $navigator.fadeOut(500)
      } else {
        $navigator.fadeIn(500)
      }
      
      if (scrollPos > 940) {
        $trills.slideDown('slow');
      } else {
        $trills.slideUp('slow');
      }
    }
  })
}


/*
 * Moments scripting.
 */
function appendItems() {
  var i = 1,
      input = 54,
      elem;

  while (i < input) {
    elem = '<div class="photo post masonry-brick"> \
              <img src="_static/images/moment/moment-' + i + '.jpg" /> \
            </div>';
    $moment.append(elem);
    //.masonry("appended", elem, false);

    i++
  }
}

function loadImages() {
  appendItems();
  
  $('.masonry').imagesLoaded()
//     .always( function( instance ) {
//       console.log('all images loaded');
//     })
    .done( function( instance ) {
      masonryStartMoment();
      //console.log('all images successfully loaded');
      //console.clear();
    })
    .fail( function() {
      //console.log('all images loaded, at least one is broken');
    })
//     .progress( function( instance, image ) {
//       var result = image.isLoaded ? 'loaded' : 'broken';
//       console.log( 'image is ' + result + ' for ' + image.img.src );
//     });
  
    if (window.console) console.log('But why!, What have I done to you?\n\nYou think that you can inject HTML?');
}


/*
 * Masonry scripting.
 */
function masonryStart() {
  $cohorts.masonry({
    itemSelector: '.cohorts-brick',
    columnWidth: $cohorts.find('.cohorts-brick')[0],
    gutter: 4,
    percentPosition: true,
    isResizable: true,
    animationOptions: {
      duration: 250,
      easing: "swing"
    },
    isAnimatedFromBottom: true
  });
}

function masonryStartMoment() {
  $moment.masonry({
    itemSelector: '.masonry-brick',
    columnWidth: $moment.find('.masonry-brick')[0],
    gutter: 4,
    percentPosition: true,
    isResizable: true,
    animationOptions: {
      duration: 250,
      easing: "swing"
    },
    isAnimatedFromBottom: true
  });
}


function checkNetworkStatus() {
  var elem = document.createElement('div'),
      notify = '<p class="notify">This page is thirsty, check your network connection.</p>';
      
  if (!$networkStatus) {
    $(notify).prependTo('body')
  }
}


/*
 * Global variables.
 */
var $moment = $('.masonry');
var $cohorts = $('.cohorts');
var $navigator = $('#back-to-top');
var $trills = $('.trills');
var $location = window.navigator.geolocation;
var $networkStatus = window.navigator.onLine;


/*
 * Start jquery scripting.
 */
jQuery(document).ready(function() {
  addMore();
  backToTop();
  loadImages();
  masonryStart();
  checkNetworkStatus();
});
