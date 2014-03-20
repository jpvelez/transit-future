// Define Modest Map of region with transit lines.
var map;
function main(){
  // Define a basemap
  // We're using a Mapbox basemap, and Mapbox.js to make fetch it easy.
  var basemap = mapbox.layer().id('jpvelez.map-h88danj5');

  // Create a map in the map container, using the basemap.
  // We're using Modest Maps with mapbox.js on top.
  map = mapbox.map('map', basemap, null, [ easey_handlers.DragHandler() ]);

  // Center the map.
  map.centerzoom({ lat: 41.853575, lon: -87.615443 }, 11);
  setCurrentView(0);

  // Create the tileset in CartoDB using map_data info.
/*
var s = document.createElement("script");
s.type = "text/javascript";
s.src = "http://jpvelez.cartodb.com/api/v1/map?"
  + "config=" + escape(JSON.stringify(map_data))
  + "&callback=loadedToken&t="
  + (new Date()) * 1;
document.body.appendChild(s);
*/

  // Add base layers for transit future projects, art projects, and exiting L lines.
  // Uses the CartoDB SQL API to get back specifically styled tilsets. That's all defined below.  
  var template_art = new MM.Template('http://jpvelez.cartodb.com/tiles/art/{Z}/{X}/{Y}.png?sql='
    + escape(map_data.layers[2].options.sql)
    + '&style=' + escape(map_data.layers[2].options.cartocss));
  var layer_art = new MM.Layer(template_art);
  map.addLayer(layer_art);

  var template_rail = new MM.Template('http://jpvelez.cartodb.com/tiles/cta_rail_updated_cartodb/{Z}/{X}/{Y}.png?sql='
    + escape(map_data.layers[1].options.sql)
    + '&style=' + escape(map_data.layers[1].options.cartocss));
  var layer_rail = new MM.Layer(template_rail);
  map.addLayer(layer_rail);

  var template_future = new MM.Template('http://jpvelez.cartodb.com/tiles/transit_future_projects_updated/{Z}/{X}/{Y}.png?sql='
    + escape(map_data.layers[0].options.sql)
    + '&style=' + escape(map_data.layers[0].options.cartocss));
  var layer_future = new MM.Layer(template_future);
  map.addLayer(layer_future);

  if($(document.body).scrollTop() + $(window).height() > $(".fellowship").offset().top
    && $(document.body).scrollTop() < $(".scrollout").offset().top){
    // starting out somewhere where the map should be visible
    map_follow_element = $($(".mapstage")[0]);
    map_tail_element = $($(".mapstage")[$(".mapstage").length-1]);
    $("#map").css({top: 10, visibility: "visible", position: "fixed"});
    var mapstages = $(".mapstage");
    for(var m=0; m<mapstages.length; m++){
      if($(mapstages[m]).offset().top > $(document.body).scrollTop()){
        current_view = m;
        setCurrentView(current_view);
        break;
      }
    }
  }

}


// Load the tileset onto the Modest Map.
var highlight_layer = null;
var layer_to_set = null;
function loadedToken(tokenInfo){
  var token = tokenInfo.layergroupid;
  if(!token){
    layer_to_set = null;
    return;
  }
  var template = new MM.Template('http://3.api.cartocdn.com/jpvelez/tiles/layergroup/' + token + '/{Z}/{X}/{Y}.png');
  if(layer_to_set){
    layer_states[layer_to_set] = template;
    highlight_layer = new MM.Layer(template);
    map.addLayer(highlight_layer);
  }
  else{
    var layer = new MM.Layer(template);
    map.addLayer(layer);
  }
}

// Load the map when window is done loading.
// The map will only be displayed once you scroll the to the right part of the page.
window.onload = main;


// Define transit line layer styles to be fetched above using CartoDB API.
// You define what features to show using a PostgreSQL-like query.
// You define how to style those features using CartoCSS.
var map_data = {
  "version":"1.0.1",
  "stat_tag":"f1e3cbd2-a15f-11e3-8d43-0edbca4b5057",
  "layers":[
    {
      "type":"cartodb",
      "options":{
        "sql":"select * from transit_future_projects_updated",
        "cartocss": "#transit_future_projects_updated{\nline-width: 5;\nline-join: round;\nline-cap: round;\n[type='Rapid Transit']{\n  line-color: #f84f40;\n}\n[type='Commuter Rail']{\n  line-color: #2e5387;\n}\n[type='BRT']{\n  line-color: #229A00;\n}\n [cartodb_id=1]{\nline-color: #5EEA8C;\n}\n [cartodb_id=2]{\nline-color:  #F37537;\n}\n[cartodb_id=3]{\nline-color:  #74BBE7;\n}\n [cartodb_id=4]{\n  line-color:  #EA5854;\n}\n[cartodb_id=5]{\n  line-color:  #FEE800;\n}\n[cartodb_id=6]{\n  line-color: #73451C;\n}\n[cartodb_id=7]{\n  line-color:  #74BBE7;\n}\n[cartodb_id=8]{\n  line-color:  grey;\n}\n[cartodb_id=9]{\n  line-color:  #9A51A0 ;\n}\n[cartodb_id=10]{\n  line-color:  #EA5854;\n  line-width: 3;\n[cartodb_id=10]::offset{\nline-color: #823393;\n  line-offset: 4;\n  line-width: 3;\n  line-cap: round;\nline-join: round;\n}\n}\n[cartodb_id=11]{\nline-color:  blue;\n}\n[cartodb_id=12]{\nline-color:  #74BBE7;\n}\n[cartodb_id=13]{\nline-color:  #E0CE4B;\n}\n[cartodb_id=14]{\nline-color:  grey;\n}\n[cartodb_id=15]{\nline-color:  #823393;\n}\n}",
        "cartocss_version":"2.1.1"
      }
    },
    {
      "type":"cartodb",
      "options":{
        "sql":"select * from cta_rail_updated_cartodb",
        "cartocss":"#cta_rail_updated_cartodb{ \n line-width: 5;\nline-cap: round;\nline-join: round;\n[name_new='Red'] {\nline-color: #EA5854;\n}\n[name_new='Brown'] {\nline-color: #73451C;\n}\n[name_new='Pink'] {\nline-color: #F38CB4;\n}\n[name_new='Purple'] {\nline-color: #823393;\n}\n[name_new='Yellow'] {\nline-color: #FEE800;\n}\n[name_new='Blue'] {\nline-color: #74BBE7;\n}\n[name_new='Orange'] {\nline-color: #F37537;\n}\n[name_new='Green'] {\nline-color: #1DAA4D;\n}\n}",
        "cartocss_version":"2.1.1"
      }
    },
    {
      "type":"cartodb",
      "options":{
        "sql":"select * from art",
        "cartocss":"#art{\nline-width: 2;\nline-cap: round;\nline-join: round;\nline-color: #055D00;\nline-dasharray: 2, 2, 2, 2;\nline-opacity: .35\n}",
        "cartocss_version":"2.1.1"
      }
    }
  ]
};

// store a CartoCSS string for each state
// can contain multiple styles / zoom levels
// only styling #transit_future_projects_updated and not existing L line layer
var layer_states = {
  gold_line: "#transit_future_projects_updated{"
    + "[cartodb_id=13]{"
    + "  line-color: #F3DE71;"
    + "  line-width: 8;"
    + "}"
  + "}",
  ashland: "#transit_future_projects_updated{"
  + "[cartodb_id=11]{"
  + "  line-color: blue;"
  + "  line-width: 8;"
  + "}"
  + "}",
  lime_line: "#transit_future_projects_updated{"
      + "[cartodb_id=1]{"
      + "line-color: lime;"
      + "line-width: 8;"
      + "}"
  + "}",
  orange_line_extension: "#transit_future_projects_updated{"
      + "[cartodb_id=2]{"
      + "line-color: #F37537;"
      + "line-width: 8;"
      + "}"
  + "}",
  red_line_extension: "#transit_future_projects_updated{"
    + "[cartodb_id=4]{"
    + "line-color: #EA5854;"
    + "line-width: 8;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
  + "}",
  blue_line_extension: "#transit_future_projects_updated{"
     + "[cartodb_id=3]{"
     + "line-color: #74BBE7;"
     + "line-width: 8;"
     + "line-join: round;"
     + "line-cap: round;"
     + "}"
    + "[cartodb_id=7]{"
    + "line-color: #74BBE7;"
    + "line-width: 8;"
    + "line-join: round;"
    + "line-cap: round;"
    + "}"
  + "}",
  inner_circle: "#transit_future_projects_updated{"
    + "[cartodb_id=9]{"
    + "line-color: #9A51A0;"
    + "line-width: 8;"
    + "line-cap: round;"
    + "line-join: round;"
  + "}"
+ "}",
  brown_line_extension: "#transit_future_projects_updated{"
      + "[cartodb_id=6]{"
      + "line-color: #73451C;"
      + "line-width: 8;"
      + "line-cap: round;"
      + "line-join: round;"
    + "}"
  + "}",
  red_purple: "#transit_future_projects_updated{"
      + "[cartodb_id=10]{"
      + "line-color: #EA5854;"
      + "line-width: 8;"
      + "line-cap: round;"
      + "line-join: round;"
    + "}"
  + "}",
  yellow_line: "#transit_future_projects_updated{"
   + "[cartodb_id=5]::glow{"
    + "line-color: FEE800;"
    + "line-width: 8;"
    + "line-cap: round;"
    + "line-join: cap;"
    + "[cartodb_id=5]{"
    + "line-color: #000000;"
    + "line-width: 10;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
  + "}",
  purple_line: "#transit_future_projects_updated{"
    + "[cartodb_id=15]{"
    + "line-color: #823393;"
    + "line-width: 8;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
  + "}",
  downtown: "",
  southeast: "#transit_future_projects_updated{"
    + "[cartodb_id=8]{"
    + "line-color: grey;"
    + "line-width: 8;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
  + "}",
  art: "#art{"
    + "line-color: #055D00;"
    + "line-width: 5;"
    + "line-cap: round;"
    + "line-join: round;"
    + "line-dasharray: 2, 2, 2, 2;"
    + "}"
};

// Ease around the map as you scroll through the project posts.
// Define map views for each paragraph.
// Format 1: [lat, lng, zoom] point
// Format 2: [south, west, north, east] bounding box
// Format 3: add a string like "gold_line" to enable a special CartoCSS layer

var current_view = 0;
var views = [
[41.67598909594535,-88.0499267578125,42.05439124994332,-87.83843994140625],
[41.746213536653045,-87.6375961303711,41.88617662305848,-87.54352569580078, "gold_line"],               // Gold line
[41.787761002359865,-87.61656761169434,41.802222678668265,-87.59322166442871, "gold_line"],               // Gold line closeup
[41.74467659677642,-87.76840209960938,41.97786911170172,-87.62557983398438, "lime_line"],               // Lime line
[41.79256059297935,-87.75123596191405,41.96995657567428,-87.73578643798827, "lime_line"],
[41.69547509615208,-87.78385162353516,41.79435234802088,-87.73921966552734, "lime_line"],             // Lime line South Side closeup
[41.70777900286713,-87.73681640625,41.96357478222518,-87.58781433105467, "ashland"],                 // BRT
[41.86531032384558,-87.67780780792236,41.881384048319816,-87.66647815704346, "ashland"],                 // BRT closeup
[41.659960002665635,-87.63862609863281,41.74365194975239,-87.61373519897461, "red_line_extension"],    // Red line extension
[41.89959391982876,-87.77183532714844,41.97582726102573,-87.71038055419922, "brown_line_extension"],  // Brown Line extension
[41.940339655623845,-87.68943786621092,42.02800151556251,-87.65201568603516, "red_purple"],            // Red/Purple Modernization
[41.7246930304541,-87.82676696777344,41.8897548444455,-87.7364730834961, "blue_line_extension"],   // BLUE REHAB - CREATE
// [41.748775021355044,-87.76342391967772,41.80036715933411,-87.73612976074217, "orange_line_extension"], // Orange line extension
[41.67598909594535,-88.0499267578125,42.05439124994332,-87.83843994140625],          // Other projects CREATE

[41.454563895325855,-88.13919067382812,41.81943165932009,-87.95722961425781, "southeast"],             // South suburbs, CREATE
[41.38814294931545,-87.73544311523436,41.887965758804484,-87.56790161132812, "southeast"],             // Southeast Service
[41.454563895325855,-88.13919067382812,41.81943165932009,-87.95722961425781, "art"],             // ART, CREATE


[41.68163038712496,-88.24218749999999,42.02328335531967,-88.10691833496094, "blue_line_extension"],   // West suburbs, CREATE
[41.77182378456081,-87.88787841796875,41.99267057124887,-87.78076171875, "inner_circle"],          // Inner Circumferential
[41.7041906065988,-88.0173110961914,41.880297681402865,-87.92152404785156, "blue_line_extension"],   // Blue Line West - Forest Park to Oak Brook
[41.83375828633243,-88.29986572265625,42.04521345501039,-88.20030212402344, "art"],   // ART, CREATE

[41.97123285764962,-88.34381103515624,42.31590854308647,-88.19000244140625, "yellow_line"],           // North suburbs, CREATE
[41.97582726102573,-88.05353164672852,42.05897965014623,-88.00821304321289, "blue_line_extension"],   // Blue Line West - Forest Park to Oak Brook
[42.00695837037897,-87.7045440673828,42.07783959017503,-87.65630722045898, "purple_line"],            // Purple Line Rehab
[42.02092414389371,-87.769775390625,42.06369516045284,-87.74248123168945, "yellow_line"],           // Yellow line
[41.97123285764962,-88.34381103515624,42.31590854308647,-88.19000244140625, "art"],           // ART, CREATE
// [41.88087172,  -87.628292373, 15],                       // West Loop Transportation Center

];