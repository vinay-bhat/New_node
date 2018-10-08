$(function(){
  // starting the container function
  "use strict";
  console.log('loaded');
  // start functions
  // start with search
  $('#SearchIcon').on('click',function(){
    $('form.search').css({
      'top' : 0
    });
  });

  $('.out').on('click' , function(){
    $('form.search').css({
      'top' : -100
    });
  });
  // end with search

  // start with submnue
  var li = $('.nav-item');
  li.each(function(){
    var sub = $(this).children(".dropdown-menu");
    if (sub) {
      $(this).hover(function(){
        $(this).addClass('show');
      },function(){
        $(this).removeClass('show');
      });
    };
  });
  // end submnue

  // display video
  if ($('#vlink')) {
    var link = $('#vlink') ,
        img = $('#vimg'),
        videoFrame = $('#videoFrame'),
        videoLinks = $('#videoLinks');
    // remove poster
    link.on('click' , function(){
      $(this).css({
        'display':'none',
        'z-index': 0
      });
      img.css({
        'display':'none',
        'z-index': 0
      });
      videoFrame.css({
        'z-index': 99
      })
    })
    // end remove the postr
    var btn = videoLinks.children().each(function(){
      $(this).on('click' , function(){
        var val = $(this).val();
        videoFrame.attr("src" , val);
        console.log(val);
      })
    });
    // out put videos

    // end output videos

    // strat collapsing the sidebar
  

    // end collapsing the sidebar
  };
  // end display video

  // end container function
});
