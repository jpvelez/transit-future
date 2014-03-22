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
var highlight_layers = [];
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
    var highlight_layer = new MM.Layer(template);
    map.addLayer(highlight_layer);
    highlight_layers.push(highlight_layer);
  }
  else{
    var layer = new MM.Layer(template);
    map.addLayer(layer);
  }
}

// Load the map when window is done loading.
// The map will only be displayed once you scroll the to the right part of the page.
window.onload = main;

// array of tables in CartoDB
var accept_layers = ["transit_future_projects_updated","cta_rail_updated_cartodb","art","oakbrookshaumburg_boundaries"];

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
[41.675989,-88.049926,42.054391,-87.838439],
[41.746213,-87.637596,41.886176,-87.543525, ["gold_line"]],             // Gold line
[41.787761,-87.616567,41.802222,-87.593221, ["gold_line"]],             // Gold line closeup
[41.744676,-87.768402,41.977869,-87.625579, ["lime_line"]],             // Lime line
[41.792560,-87.751235,41.969956,-87.735786, ["lime_line"]],
[41.695475,-87.783851,41.794352,-87.739219, ["lime_line"]],             // Lime line South Side closeup
[41.707779,-87.736816,41.963574,-87.587814, ["ashland"]],               // BRT
[41.865310,-87.677807,41.881384,-87.666478, ["ashland"]],               // BRT closeup
[41.659960,-87.638626,41.743651,-87.613735, ["red_line_extension"]],    // Red line extension
[41.899593,-87.771835,41.975827,-87.710380, ["brown_line_extension"]],  // Brown Line extension
[41.940339,-87.689437,42.028001,-87.652015, ["red_purple"]],            // Red/Purple Modernization
[41.724693,-87.826766,41.889754,-87.736473, ["blue_line_extension"]],   // BLUE REHAB - CREATE
// [41.748775,-87.763423,41.800367,-87.736129, ["orange_line_extension"]], // Orange line extension
[41.675989,-88.049926,42.054391,-87.838439],          // Other projects CREATE

[41.454563,-88.139190,41.819431,-87.957229, ["southeast"]],             // South suburbs, CREATE
[41.388142,-87.735443,41.887965,-87.567901, ["southeast"]],             // Southeast Service
[41.454563,-88.139190,41.819431,-87.957229, ["art"]],                   // ART, CREATE


[41.681630,-88.242187,42.023283,-88.106918, ["blue_line_extension"]],   // West suburbs, CREATE
[41.771823,-87.887878,41.992670,-87.780761, ["inner_circle"]],          // Inner Circumferential
[41.704190,-88.017311,41.880297,-87.921524, ["blue_line_extension"]],   // Blue Line West - Forest Park to Oak Brook
[41.833758,-88.299865,42.045213,-88.200302, ["art"]],   // ART, CREATE

[41.971232,-88.343811,42.315908,-88.190002, ["yellow_line"]],           // North suburbs, CREATE
[41.975827,-88.053531,42.058979,-88.008213, ["blue_line_extension"]],   // Blue Line West - Forest Park to Oak Brook
[42.006958,-87.704544,42.077839,-87.656307, ["purple_line"]],           // Purple Line Rehab
[42.020924,-87.769775,42.063695,-87.742481, ["yellow_line"]],           // Yellow line
[41.971232,-88.343811,42.315908,-88.190002, ["art"]],           // ART, CREATE
// [41.880871,  -87.628292, 15],                       // West Loop Transportation Center

];