// BEGIN modal and hash code
// thank you page after supporter form submission
// (needs to be ahead of the "loading" screen)
$(function(){
  if(window.location.hash) {
      var hash= window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      if (hash == 'thankyou'){
        $("#loading").hide();
        readytoshow = true;
        $('#ThankYouModal').modal('show');
      }
      if (hash == 'I-Support-This'){
        $("#loading").hide();
        readytoshow = true;
        $('#myModal').modal('show');
      }
   }
   $('#myModal').on('show.bs.modal', function (e) {
      window.location.hash = '#I-Support-This';
   })
   $('#myModal').on('hide.bs.modal', function (e) {
      window.location.hash = '#';
   })
});
// END modal and hash code

if (typeof console === "undefined" || typeof console.log === "undefined") {
  console = {log:function(){}};
}

var browser_map_top = 10;
var browser_easy = false;
var user_agent = navigator.userAgent.toLowerCase();
if(user_agent.indexOf('firefox') > -1){
  browser_map_top = 40;
  if(user_agent.indexOf('macintosh') > -1){
    browser_easy = true;
  }
}
else if(user_agent.indexOf(' msie ') > -1){
  browser_easy = true;
}
else if(user_agent.indexOf('safari') > -1 && user_agent.indexOf('chrome') == -1){
  browser_easy = true;
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
    if(!browser_easy){
      $("#map").css({"position":"fixed", "top": $(".fellowship").offset().top - $($(".pagebg")[0]).offset().top, "visibility": "visible" });
    }

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
    setCurrentView(current_view);
  });
  scrollEvent.on("bottom", $(".mapstage"), function(el, i){
    if(i == current_view && i > 0){
      // currently on a mapstage which is falling below the window
      // switch to previous page
      current_view = i-1;
      setCurrentView(current_view);
    }
  });

  $(".navbar .nav li a").not( ".supportbutton a" ).on("click touchend", function(e){
    e.preventDefault();
    var section = $(e.currentTarget).parent().attr("class").split(" ")[0];
    $("body,html").animate({scrollTop: $($("div.page[data-section='"+section+"']")[0]).offset().top}, 1000);
  });

  // call scrollEvent now to set what's on the page
  scrollEvent.onScroll();
  // call scrollEvent again whenever the page is scrolled
  $(window).scroll(scrollEvent.onScroll);

  // set map to follow map_follow_element and map_tail_element
  map_follow_element = $($(".mapstage")[0]);
  map_tail_element = $($(".mapstage")[$(".mapstage").length-1]);
  current_layer_state = null;
  var scrollUpdate = function(){
    if(map_follow_element){
      // move top of map to follow the map_follow_element
      // when map_follow_element is above the top of the window, fix map to top of window
      var suggestTop = map_follow_element.offset().top - $($(".pagebg")[0]).offset().top;
      if(suggestTop > browser_map_top){
        if(!browser_easy){
          $("#map").css({"top": suggestTop, "height": "auto", "visibility": "visible"});
        }
        else if(suggestTop > $(window).height()){
          $('#map').css({ top: suggestTop })
        }
      }
      else{
        $("#map").css({"top": browser_map_top, "visibility": "visible"});
      }
    }
    if(map_tail_element){
      // move bottom of map to follow the map_tail_element
      // when map_tail_element is below the bottom of the window, forget about the tail element
      var suggestBottom = $(".scrollout").offset().top - $(window).scrollTop();
      if(suggestBottom >= $(window).height()){
        $("#map").css({"bottom": 0});
      }
      else if(suggestBottom < 0 ){
        $("#map").css({"bottom": $(window).height()*2})
      }
      else{
        $("#map").css({"bottom": $(window).height() - suggestBottom, "height": "auto", "visibility": "visible"});
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

});

function setCurrentView(current_view){

  // if view is defined with [south,west,north,east] bounds, calculate lat,lng,zoom
  if(views[current_view].length > 3 && typeof views[current_view][3] != "object"){
    var lat_coefficient = 0.00051144938704069;
    var lng_coefficient = 0.00068664550781251;
    var zoom_coefficient = 11;
    var pixel_lng = (views[current_view][3] - views[current_view][1]) / lng_coefficient;
    var pixel_lat = (views[current_view][2] - views[current_view][0]) / lat_coefficient;

    views[current_view][0] = (views[current_view][0] + views[current_view][2]) / 2; // lat
    views[current_view][1] = (views[current_view][1] + views[current_view][3]) / 2; // lng

    if(views[current_view].length == 5){
      views[current_view][3] = views[current_view][4]
    }
    views[current_view].pop();

    // explaining the math:
    // pixels_at_zoom_11 = SCREEN_DIMENSION_TO_STRETCH / DEGREE_PER_PIXEL
    // multiply_scale_by = (AVAILABLE_PIXELS / pixels_at_zoom_11)
    // zoom_delta = log(multiply_scale_by) / log(2) because width is 2^zoom

    var effective_width = $(window).width() / 3;
    if(pixel_lng / pixel_lat > effective_width / $(window).height()){
      // we're going to squeeze until the width fits
      views[current_view][2] = Math.round(11 - Math.ceil( Math.log( pixel_lng / effective_width ) / Math.log(2) ));
    }
    else{
      // we're going to squeeze until the height fits
      views[current_view][2] = Math.round(11 - Math.ceil( Math.log( pixel_lat / $(window).height() ) / Math.log(2) ));
    }
    var effective_lng_offset = (lng_coefficient * effective_width) * Math.pow(2, 11 - views[current_view][2]);
    views[current_view][1] += effective_lng_offset;

  }

  // if map is not initial state, minimal opacity on transit lines
  if(current_view > 0){
    $($("#map").children()[1]).css({ opacity: 1 });
    $($("#map").children()[2]).css({ opacity: 0.4 });
    $($("#map").children()[3]).css({ opacity: 0.4 });
  }
  else{
    $($("#map").children()[1]).css({ opacity: 1 });
    $($("#map").children()[2]).css({ opacity: 1 });
    $($("#map").children()[3]).css({ opacity: 1 });
  }

  // add and remove special CartoCSS style layers
  // a mapstage has a CartoCSS layer if you add a named layer_state string
  // [lat, lng, zoom, layer_state] or [south, west, north, east, layer_state]
  if(views[current_view].length > 3 && typeof views[current_view][3] == "object"){
    if(current_layer_state !== views[current_view][3].join(",")){
      // change last layer_state to the current map state
      for(var hl=0;hl<highlight_layers.length;hl++){
        map.removeLayer(highlight_layers[hl]);
      }
      highlight_layers = [];
      current_layer_state = views[current_view][3].join(",");
      for(var hl=0;hl<views[current_view][3].length;hl++){
        var activate_layer_state = views[current_view][3][hl];

        if(typeof layer_states[activate_layer_state] == "string"){
          // need to generate the tile template URL for this CartoCSS layer
          var custom_layer = $.extend(true, {}, map_data);
          custom_layer.layers[0].options.cartocss = layer_states[activate_layer_state];
          // custom_layer.layers.pop(); // remove L layer

          // call for a tile template URL for the CartoCSS
          //layer_to_set = current_layer_state;

          // make sure the tile URL and SQL match the CartoDB table used in the CartoCSS
          var accept_layer = null;

          for(var a=0;a<accept_layers.length;a++){
            if(custom_layer.layers[0].options.cartocss.indexOf(accept_layers[a]) > -1){
              accept_layer = accept_layers[a];
              break;
            }
          }
          if(!accept_layer){
            continue;
          }

          var template = new MM.Template('http://transit-cache.herokuapp.com/tiles/' + accept_layer + '/{Z}/{X}/{Y}.png?sql='
            + escape('select * from ' + accept_layer)
            + '&style=' + escape(custom_layer.layers[0].options.cartocss));
          var highlight_layer = new MM.Layer(template);
          map.addLayer(highlight_layer);
          highlight_layers.push(highlight_layer);

          /*
          var s = document.createElement("script");
          s.type = "text/javascript";
          s.src = "http://jpvelez.cartodb.com/api/v1/map?"
            + "config=" + escape(JSON.stringify(custom_layer))
            + "&callback=loadedToken&t="
            + (new Date()) * 1;
          document.body.appendChild(s);
          */
        }
        else if(layer_states[activate_layer_state]){
          // use a known tile template for this layer
          var highlight_layer = new MM.Layer(layer_states[activate_layer_state]);
          map.addLayer(highlight_layer);
          highlight_layers.push(highlight_layer);
        }
      }
    }
  }
  else if(current_layer_state){
    // this mapstage has no CartoCSS layer
    // remove any existing CartoCSS layer
    for(var hl=0;hl<highlight_layers.length;hl++){
      map.removeLayer(highlight_layers[hl]);
    }
    highlight_layers = [];
    current_layer_state = null;
  }

  // Ease to lat/lon/z view of current paragraph - the first p element
  // below the top edge of the box. This gets called the instant the previous
  // element's offset becomes negative.
  /*
  if(browser_easy){
    map.setZoom(views[current_view][2]).setCenter({ lat: views[current_view][0], lon: views[current_view][1] });
  }
  else{
  */
    map.ease.location({
      lat: views[current_view][0],
      lon: views[current_view][1]
    }).zoom(views[current_view][2]).optimal();
  //}
}

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


// BEGIN AJAX Google Civic Information API Call

var commissionerImages = {
    'Toni Preckwinkle'  : 'ToniPreckwinkle.jpeg',
    'Earlean Collins'  : 'EarleanCollins.jpeg',
    'Robert Steele'  : 'RobertSteele.jpeg',
    'Jerry Butler'  : 'JerryButler.jpeg',
    'Stanley Moore'  : 'StanleyMoore.jpeg',
    'Deborah Sims'  : 'DeborahSims.jpeg',
    'Joan Murphy' : 'JoanPatriciaMurphy.jpeg',
    'Jesus Garcia'  : 'JesusGarcia.jpeg',
    'Edwin Reyes'  : 'EdwinReyes.jpeg',
    'Peter Silvestri'  : 'PeterNSilvestri.jpeg',
    'Bridget Gainer'  : 'BridgetGainer.jpeg',
    'John Daley'  : 'JohnPDaley.jpeg',
    'John Fritchey'  : 'JohnFritchey.jpeg',
    'Larry Suffredin'  : 'LarrySuffredin.jpeg',
    'Gregg Goslin'  : 'GreggGoslin.jpeg',
    'Timothy Schneider'  : 'TimothySchneider.jpeg',
    'Jeffery Tobolski'  : 'JefferyRTobolski.jpeg',
    'Liz Gorman' : 'LizDoodyGorman.jpeg',
};

$(function(){
   initialize();

   $("#tfa_2").on("keyup", function(e){
      //findCommissionerFromAddress( $(this).val() );
   });

   $('#commissionerInfo').html('');
   //findCommissionerFromAddress( $("#tfa_2").val() ); //onLoad

    $('#tfa_2').keypress(function(e){

        if (e.keyCode == 10 || e.keyCode == 13)
            e.preventDefault();

      });

    $('#modalHowItWorks').click(function(e){
        $('#myModal').modal('hide');
        $('.navfunding a').trigger('click');
        e.preventDefault();
        return false;
    });

});

function findCommissionerFromAddress(address){

      $('#commissionerInfo').fadeOut(function(){
        $('#commissionerInfo').html('');


      if (address.length > 5){   // we want at least 5 chars before call the API
         delay(function(){
            $.ajax({
               url: "https://www.googleapis.com/civicinfo/v1/representatives/lookup?key=AIzaSyDCmhSkgw-kNAabPl2Btt93RjB3CJHwNrc",
               type: 'post',
               data: "{ address: ' " + $('#tfa_2').val() + " ' }",
               dataType: 'json',
               contentType: 'application/json'
            })
            .done(function( response ) {
               if (response.status == 'success'){

                  // find the commissioner for this address
                  // the ID can change randomly, so we have to search for it via the 'scope' value
                  var wantedOfficeId = '';
                  $.each(response.divisions, function( i, val ) {
                     if (val.scope == 'countyCouncil'){
                        wantedOfficeId = val.officeIds[0];
                     }
                  });

                  if (wantedOfficeId != '') {

                     // load comisioner data
                     var wantedOfficalId = response.offices[wantedOfficeId]['officialIds'][0];
                     var wantedOfficalDistict = response.offices[wantedOfficeId]['name'];
                     var wantedOfficalInfo = response.officials[wantedOfficalId];
                     var commissionerName = wantedOfficalInfo.name;          // eg., "Edwin Reyes"
                     var commissionerEmail = wantedOfficalInfo['emails'][0]; // eg., "County Commissioner, District 8"

                     if (commissionerName != '' && commissionerName != undefined){
                        //populate hidden fields
                        $('#tfa_3').val(commissionerName);  // we're only sending the name to FormAssembly
                        //$('#commissionerEmail').val(commissionerEmail);

                        // output to user
                        $('#commissionerInfo').html('<div class="img_box"><img src="/img/commissioners/'+commissionerImages[commissionerName] +'" alt=""/></div><div class="commissioner_box">Your <a href="http://en.wikipedia.org/wiki/Cook_County_Board_of_Commissioners" style="font-weight: 600;">county commissioner<\/a> is <strong>'+ commissionerName +'<\/strong></div>');
                        $('#commissionerInfo').fadeIn();
                     } else {

                     }
                } else {
                  $('#commissionerInfo').html('');
                }
               } else {
                  $('#commissionerInfo').html('');
               }
            });
         }, 1 );   // delay before ajax call
      } else {
        $('#commissionerInfo').html('');
      }
      });
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();
// END AJAX Google Civic Information API Call



///////////////////////////////////////
// START Google Location Autocomplete

var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initialize() {
  // Create the autocomplete object, restricting the search
  // to geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('tfa_2')),  /** @type {HTMLInputElement} */
      { types: ['geocode'], location:'Chicago', radius: '100 miles', key: 'AIzaSyDCmhSkgw-kNAabPl2Btt93RjB3CJHwNrc' }
  );
  //autocomplete.setComponentRestrictions({ state: 'il'  });

  // When the user selects an address from the dropdown,
  // populate the address fields in the form.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
  //google.maps.event.addListener(autocomplete, 'click', function() {

    var place = autocomplete.getPlace();

    console.log(place);

    var street_number = '';
    var route         = '';
    var city          = '';
    var state         = '';
    var zip           = '';
    $.each(place.address_components,function(key, val){
        if (val.types[0] == 'street_number')               street_number = val.long_name;
        if (val.types[0] == 'route')                       route         = val.long_name;
        if (val.types[0] == "locality")                    city          = val.long_name;
        if (val.types[0] == "administrative_area_level_1") state         = val.long_name;
        if (val.types[0] == "postal_code")                 zip           = val.long_name;
    });
    var streetString = street_number + ' ' + route + ', ' + city + ', ' + state + ' ' + zip;
    delay(function(){
      $('#tfa_2').val(streetString);

      // load commissioner
      findCommissionerFromAddress( $('#tfa_2').val() );
    }, 100);
  });

  // load on init
  findCommissionerFromAddress( $('#tfa_2').val() );
}

// END Google Location Autocomplete
////////////////////////////////////


