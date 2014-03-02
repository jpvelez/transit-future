var color2011 = "fedd44",
    color2012 = "C82A45";

if (typeof console === "undefined" || typeof console.log === "undefined") {
  console = {log:function(){}};
}


// Fadeout loading once first image is loaded.
$(function(){
  var readytoshow = false;
  $('<img/>').attr('src', 'img/eltrain.jpg').load(function() {
    if(readytoshow)
      $("#loading").fadeOut({duration:1000});
    readytoshow = true;
  });
  setTimeout(function(){
    if(readytoshow)
      $("#loading").fadeOut({duration:1000});
    readytoshow = true;
  }, 1500);
  var usTopology;
  //shows nav when user hovers over the logo
  var height = $(window).height(),
  width = $(window).width();

  var setSize = function(){
    height = $(window).height();
    width = $(window).width();

    $(".quote").css({width:width, "min-height":height});
    $(".story").css({width:width, "min-height":height});
    $(".pagebg").css({width:width, "min-height":height});
    $(".scrollout").css({height: 100});
    $(".fellowship").css({height: 100});
    $(".mapscroll").css({height:height});
    scrollEvent.onScroll();

  }

  // scrollEvent keeps track of where any element is on the page
  // it should be left unchanged
  var scrollEvent = {
    handlers: {top:[], middle:[], bottom:[], inview:[]},
    currentElements: {top:[], middle:[], bottom:[], inview:[]},
    on:function(pos, el, addCb, removeCb){
      var elements = el.toArray();
      var i = 0;
      for(e in elements){
        if(typeof elements[e] !== "object")
          continue;
        scrollEvent.handlers[pos].push({el:elements[e], addCb:addCb, removeCb:removeCb, count:i});
        i++;
      }
    },
    onScroll:function(){
      var pos = $(window).scrollTop();
      var height = $(window).height();

      if(pos < 0)
        return;

      for(e in scrollEvent.handlers.middle){
        var el = scrollEvent.handlers.middle[e].el;
        if(typeof el !== "object")
          continue;

        //console.log(el);
        //middle
        if(($(el).offset().top <= (pos + height/2)) &&
           ($(el).offset().top + $(el).outerHeight()  >= (pos + height/2))){
          scrollEvent.setCurrentElement("middle", scrollEvent.handlers.middle[e]);
       }else{
          scrollEvent.removeCurrentElement("middle", scrollEvent.handlers.middle[e]);
        }
      }

      for(e in scrollEvent.handlers.top){
        var el = scrollEvent.handlers.top[e].el;
        if(typeof el !== "object")
          continue;

        //if the element is at the top of the page
        if(($(el).offset().top <= pos) &&
           ($(el).offset().top + $(el).outerHeight()  >= pos)){
          scrollEvent.setCurrentElement("top", scrollEvent.handlers.top[e]);

        }else{
          scrollEvent.removeCurrentElement("top", scrollEvent.handlers.top[e]);
        }
      }
      for(e in scrollEvent.handlers.bottom){
        var el = scrollEvent.handlers.bottom[e].el;
        if(typeof el !== "object")
          continue;

        //if the element is at the top of the page
        if(($(el).offset().top <= (pos+ height)) &&
           ($(el).offset().top + $(el).outerHeight()  >= (pos +height))){
          scrollEvent.setCurrentElement("bottom", scrollEvent.handlers.bottom[e]);

        }else{
          scrollEvent.removeCurrentElement("bottom", scrollEvent.handlers.bottom[e]);
        }
      }
      for(e in scrollEvent.handlers.inview){
        var el = scrollEvent.handlers.inview[e].el;
        if(typeof el !== "object")
          continue;

        //if the element is at the top of the page
        if(($(el).offset().top + $(el).outerHeight() >= pos) &&
           ($(el).offset().top   <= (pos +height))){
          scrollEvent.setCurrentElement("inview", scrollEvent.handlers.inview[e]);

        }else{
          scrollEvent.removeCurrentElement("inview", scrollEvent.handlers.inview[e]);
        }
      }


    },
    setCurrentElement:function(pos, handler){

      if(scrollEvent.currentElements[pos].indexOf(handler) === -1){
        scrollEvent.currentElements[pos].push(handler);
        handler.addCb(handler.el,handler.count);
      }
    },
    removeCurrentElement:function(pos, handler){

      if(scrollEvent.currentElements[pos].indexOf(handler) >=0 ){
        delete scrollEvent.currentElements[pos][scrollEvent.currentElements[pos].indexOf(handler)];
        handler.removeCb(handler.el,handler.count);
      }
    }
  };


  // When you hit the middle of any page, fade in the page's background.
  scrollEvent.on("middle", $(".page"), function(el,i){
    $($("div.pagebg")[i]).fadeIn({duration:500});

    // If nosidebar param is set on page, hide sidebartitle element.
    // Otherwise show it.
    if(($(el).attr("class").indexOf("quote") >= 0) || ($(el).attr("class").indexOf("nosidebar") >= 0))
      $("div.sidebartitle").hide();
    else{
      $($("div.sidebartitle")[i]).show();
      $($("div.sidebartitle")[i]).addClass("appear");
    }
  }, function(el, i){
    $($("div.pagebg")[i]).fadeOut({duration:700});
    $($("div.sidebartitle")[i]).removeClass("appear");
  });
  scrollEvent.on("inview", $("iframe[data-src]"), function(el,i){
    if($(el).attr("src") === undefined)
      $(el).attr("src", $(el).attr("data-src"))
  }, function(el, i, pos){
  });


  // When you hit map section, make map appear
  scrollEvent.on("bottom", $(".fellowship"), function(el,i){
    $("#map").css({"position":"fixed", "top": $(".fellowship").offset().top - $($(".pagebg")[0]).offset().top, "visibility": "visible" });

    // the top of the map follows the top of the map_follow_element until it is at the top of the window
    map_follow_element = $(".fellowship");

  }, function(el, i, pos){});

  scrollEvent.on("bottom", $(".scrollout"), function(el, i){
    // the bottom of the map follows the top of the map_tail_element until it is above or below the window
      //map_follow_element = null;
      map_tail_element = $(".scrollout");
  }, function(){ });

 scrollEvent.on("top", $(".page"), function(el,i){

   $(".navbar li").removeClass("active");;
   if($(el).attr("data-section") !== "")
     $(".navbar li."+$(el).attr("data-section")).addClass("active");

 },function(){

 });
 scrollEvent.on("bottom", $(".page"), function(el,i){

   $(".navbar li").removeClass("active");;
   if($(el).attr("data-section") !== "")
     $(".navbar li."+$(el).attr("data-section")).addClass("active");

 },function(){});

 // every element with the class 'mapstage' is tracked here
 scrollEvent.on("middle", $(".mapstage"), function(el, i){

    // select mapstage
    if(i == current_view || views[i] === null){
      // already viewing this mapstage, or one does not exist
      return;
    }
    current_view = i;

    // if view is defined with [south,west,north,east] bounds, calculate lat,lng,zoom
    if(views[current_view].length == 4){
      var lat_coefficient = 0.00051144938704069;
      var lng_coefficient = 0.00068664550781251;
      var zoom_coefficient = 11;
      var pixel_lng = (views[current_view][3] - views[current_view][1]) / lng_coefficient;
      var pixel_lat = (views[current_view][2] - views[current_view][0]) / lat_coefficient;

      views[current_view][0] = (views[current_view][0] + views[current_view][2]) / 2; // lat
      views[current_view][1] = (views[current_view][1] + views[current_view][3]) / 2; // lng
      views[current_view].pop();

      // explaining the math:
      // pixels_at_zoom_11 = SCREEN_DIMENSION_TO_STRETCH / DEGREE_PER_PIXEL
      // multiply_scale_by = (AVAILABLE_PIXELS / pixels_at_zoom_11)
      // zoom_delta = log(multiply_scale_by) / log(2) because width is 2^zoom

      if(pixel_lng / pixel_lat > $("#map").width() / $("#map").height()){
        // we're going to squeeze until the width fits
        views[current_view][2] = 11 - Math.ceil( Math.log( Math.round(pixel_lng / $("#map").width()) ) / Math.log(2) );
      }
      else{
        // we're going to squeeze until the height fits
        views[current_view][2] = 11 - Math.ceil( Math.log( Math.round(pixel_lat / $("#map").height()) ) / Math.log(2) );
      }
    }

    // Ease to lat/lon/z view of current paragraph - the first p element
    // below the top edge of the box. This gets called the instant the previous
    // element's offset becomes negative.
    map.ease.location({
      lat: views[current_view][0],
      lon: views[current_view][1]
    }).zoom(views[current_view][2]).optimal();

  });

  $(".navbar .nav li a").on("click touchend", function(e){
    e.preventDefault();
    var section = $(e.currentTarget).parent().attr("class").split(" ")[0];
    $("body,html").animate({scrollTop: $($("div.page[data-section='"+section+"']")[0]).offset().top}, 1000);
  });

  // call scrollEvent now to set what's on the page
  scrollEvent.onScroll();
  // call scrollEvent again whenever the page is scrolled
  $(window).scroll(scrollEvent.onScroll);

  // set map to follow map_follow_element and map_tail_element
  map_follow_element = null;
  map_tail_element = null;
  var scrollUpdate = function(){
    if(map_follow_element){
      // move top of map to follow the map_follow_element
      // when map_follow_element is above the top of the window, fix map to top of window
      var suggestTop = map_follow_element.offset().top - $($(".pagebg")[0]).offset().top;
      if(suggestTop > 10){
        $("#map").css({"top": suggestTop, "height": "auto" });
      }
      else{
        $("#map").css({"top": 10 });
      }
    }
    if(map_tail_element){
      // move bottom of map to follow the map_tail_element
      // when map_tail_element is below the bottom of the window, forget about the tail element
      var suggestBottom = $(window).height() - $(".scrollout").offset().top + $($(".pagebg")[0]).offset().top;
      if(suggestBottom < $(window).height() + $("#map").height() ){
        $("#map").css({"bottom": suggestBottom, "height": "auto"});
      }
      else{
        map_tail_element = null;
      }
    }
  };
  // call the above scrollUpdate function whenever the page scrolls
  $(window).scroll(scrollUpdate);

  setSize();
  $(window).resize(setSize);

  $('[id^="myCarousel"]').carousel({
    interval: false,
    cycle: true
  });

  $('.captpop').popover({
    placement: 'top',
    trigger: 'hover'
  });

  $('.morefellowspop').popover({
    placement: 'top',
    trigger: 'hover'
  });

  $('.appspop').popover({
    placement: 'top',
    trigger: 'hover',
  });

  $('.footnote').popover({
    placement: 'top',
    trigger: 'hover'
  });


  //$($("#map").children()[1]).css("z-index", "1");

  var colors = ["#5db7ad", "#88c5be", "#9ccdc8", "#aed5d1", "#c2dedb", "#d4e7e5", "#e8f2f1", "#FFFFFF"];

  $(".bargraph").each(function(i, el){

    var that = this;

    var total = 0;
    // Count all the money for each data point in the source
    $("."+$(el).attr("data-source")).each(function(i, el){
      // remove commas and dollar signs
      total += parseInt($(el).text().replace(/,/g, "").replace("$", ""));
    });

    // for each group add the hover events
    $(".financialsgroup").each(function(i, el) {
      var group = $(el).attr("data-group");
      $(el).hover(function() {
        $(el).addClass("active");
        $('.group' + group).addClass('active');
      }, function(){
        $(el).removeClass("active");
        $('.group' + group).removeClass('active');
      });
    });

    // for each data point add a section to the graph and hover events
    $("."+$(el).attr("data-source")).each(function(i, el){
      var count = parseInt($(el).text().replace(/,/g, "").replace("$", ""));
      var perc = (count/total)*100;
      var group = $(el).attr("data-group");

      // create section
      var section = $("<div class='graphsection'></div>").css({
        width:perc + "%",
        background:colors[i]
      });

      // add classs for group
      if(group !== undefined) {
        $(el).addClass('group' + group);
        section.addClass('group' + group);
      }

      //hover over the numbers
      $(el).hover(highlight, unhighlight);
      $(section).hover(highlight, unhighlight);

      function  highlight() {
        $(el).addClass('active');
        $(section).addClass('active');
      }

      function unhighlight() {
        $(el).removeClass('active');
        $(section).removeClass('active');
      }


      $(that).append(section);
    });



  });




});


if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
