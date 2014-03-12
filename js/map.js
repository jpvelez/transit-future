// Define Modest Map of region with transit lines.
var map;
function main(){

// when page is refreshed, jump back to the top
if($(document.body).scrollTop() > 300){
  $(document.body).scrollTop(0);
}

// Define a basemap
var basemap = mapbox.layer().id('jpvelez.map-h88danj5');

// Create a map in the map container, using the basemap.
// We're using Modest Maps with mapbox.js on top.
map = mapbox.map('map', basemap, null, [ easey_handlers.DragHandler() ]);

// Center the map.
map.centerzoom({ lat: 41.853575, lon: -87.615443 }, 11);
setCurrentView(0);

// Create the tileset in CartoDB using map_data info.
var s = document.createElement("script");
s.type = "text/javascript";
s.src = "http://jpvelez.cartodb.com/api/v1/map?"
  + "config=" + escape(JSON.stringify(map_data))
  + "&callback=loadedToken&t="
  + (new Date()) * 1;
document.body.appendChild(s);
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


// Create transit line tileset using CartoDB API.
// You define what features to show using a PostgreSQL-like query.
// You define how to style those features using CartoCSS.
var map_data = {
  "version":"1.0.1",
  "stat_tag":"f1e3cbd2-a15f-11e3-8d43-0edbca4b5057",
  "layers":[
    {
      "type":"cartodb",
      "options":{
        "sql":"select * from transit_future_projects",
        "cartocss": "#transit_future_projects{\nline-width: 5;\nline-join: round;\nline-cap: round;\n[type='Rapid Transit']{\n  line-color: #f84f40;\n}\n[type='Commuter Rail']{\n  line-color: #2e5387;\n}\n[type='BRT']{\n  line-color: #229A00;\n}\n [cartodb_id=1]{\nline-color: #5EEA8C;\n}\n [cartodb_id=2]{\nline-color:  #F37537;\n}\n[cartodb_id=3]{\nline-color:  #74BBE7;\n}\n [cartodb_id=4]{\n  line-color:  #EA5854;\n}\n[cartodb_id=5]{\n  line-color:  #FEE800;\n}\n[cartodb_id=6]{\n  line-color: #73451C;\n}\n[cartodb_id=7]{\n  line-color:  #74BBE7;\n}\n[cartodb_id=8]{\n  line-color:  grey;\n}\n[cartodb_id=9]{\n  line-color:  #9A51A0 ;\n}\n[cartodb_id=10]{\n  line-color:  #EA5854;\n  line-width: 3;\n[cartodb_id=10]::offset{\nline-color: #823393;\n  line-offset: 4;\n  line-width: 3;\n  line-cap: round;\nline-join: round;\n}\n}\n[cartodb_id=11]{\nline-color:  blue;\n}\n[cartodb_id=12]{\nline-color:  #74BBE7;\n}\n[cartodb_id=13]{\nline-color:  #E0CE4B;\n}\n[cartodb_id=14]{\nline-color:  grey;\n}\n[cartodb_id=15]{\nline-color:  grey;\n}\n}",
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
    }
  ]
};

// store a CartoCSS string for each state
// can contain multiple styles / zoom levels
// only styling #transit_future_projects and not existing L line layer
var layer_states = {
  gold_line: "#transit_future_projects{"
    + "[cartodb_id=13]{"
    + "  line-color: #F3DE71;"
    + "  line-width: 7;"
    + "}"
  + "}",
  ashland: "#transit_future_projects{"
  + "[cartodb_id=11]{"
  + "  line-color: blue;"
  + "  line-width: 7;"
  + "}"
  + "}",
  lime_line: "#transit_future_projects{"
      + "[cartodb_id=1]{"
      + "line-color: lime;"
      + "line-width: 7;"
      + "}"
  + "}",
  orange_line_extension: "#transit_future_projects{"
      + "[cartodb_id=2]{"
      + "line-color: #F37537;"
      + "line-width: 7;"
      + "}"
  + "}",
  red_line_extension: "#transit_future_projects{"
    + "[cartodb_id=4]{"
    + "line-color: #EA5854;"
    + "line-width: 7;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
  + "}",
  blue_line_extension: "#transit_future_projects{"
     + "[cartodb_id=3]{"
     + "line-color: #74BBE7;"
     + "line-width: 7;"
     + "line-join: round;"
     + "line-cap: round;"
     + "}"
    + "[cartodb_id=7]{"
    + "line-color: #74BBE7;"
    + "line-width: 7;"
    + "line-join: round;"
    + "line-cap: round;"
    + "}"
  + "}",
  inner_circle: "#transit_future_projects{"
    + "[cartodb_id=9]{"
    + "line-color: #9A51A0;"
    + "line-width: 7;"
    + "line-cap: round;"
    + "line-join: round;"
  + "}"
+ "}",
  brown_line_extension: "#transit_future_projects{"
      + "[cartodb_id=6]{"
      + "line-color: #73451C;"
      + "line-width: 7;"
      + "line-cap: round;"
      + "line-join: round;"
    + "}"
  + "}",
  red_purple: "#transit_future_projects{"
      + "[cartodb_id=10]{"
      + "line-color: #EA5854;"
      + "line-width: 7;"
      + "line-cap: round;"
      + "line-join: round;"
    + "}"
  + "}",
  yellow_line: "#transit_future_projects{"
    + "[cartodb_id=5]{"
    + "line-color: #FEE800;"
    + "line-width: 7;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
  + "}",
  downtown: "",
  southeast: "#transit_future_projects{"
    + "[cartodb_id=8]{"
    + "line-color: grey;"
    + "line-width: 7;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
  + "}"
};

// Ease around the map as you scroll through the project posts.
// Define map views for each paragraph.
// Format 1: [lat, lng, zoom] point
// Format 2: [south, west, north, east] bounding box
// Format 3: add a string like "gold_line" to enable a special CartoCSS layer

var current_view = 0;
var views = [
[41.77131167976407,-87.77252197265625,41.95744765908283,-87.67501831054688],
[41.73519798789358,-87.62763977050781,41.88464303825411,-87.54558563232422, "gold_line"],               // Gold line
[41.782833048804136,-87.61931419372559,41.80311842739231,-87.5833511352539, "gold_line"],               // Gold line closeup
[41.74467659677642,-87.76840209960938,41.97786911170172,-87.62557983398438, "lime_line"],               // Lime line
[41.836444171978776,-87.77286529541016,41.90355467806868,-87.70917892456055, "lime_line"],
[41.671373126259354,-87.77320861816406,41.79435234802088,-87.71656036376953, "lime_line"],             // Lime line South Side closeup
[41.70777900286713,-87.73681640625,41.96357478222518,-87.58781433105467, "ashland"],                 // BRT
[41.8562650797484,-87.68119812011717,41.895057911050564,-87.64291763305664, "ashland"],                 // BRT closeup
[41.65970350473566,-87.63914108276367,41.723027452614744,-87.59485244750977, "red_line_extension"],    // Red line extension
[41.92424883732577,-87.76582717895508,41.98871534571069,-87.70523071289062, "brown_line_extension"],  // Brown Line extension
[42.00440721,  -87.624933922, 13, "red_purple"],            // Red/Purple Modernization NEED TO UPDATE
[41.93747172,  -87.873292373, 12, "blue_line_extension"],   // BLUE REHAB - CREATE
[41.77848077,  -87.719650268, 14, "orange_line_extension"], // Orange line extension
[41.88926600,  -87.733292373, 11, "inner_circle"],          // Other projects CREATE

[41.66887172,  -87.624292373, 10, "southeast"],             // South suburbs, CREATE
[41.66887172,  -87.624292373, 11, "southeast"],             // Southeast Service
[41.36887172,  -87.324292373, 11, "southeast"],             // ART, CREATE


[41.93747172,  -87.873292373, 10, "blue_line_extension"],   // West suburbs, CREATE
[41.88926600,  -87.733292373, 11, "inner_circle"],          // Inner Circumferential
[41.93747172,  -87.873292373, 12, "blue_line_extension"],   // Blue Line West - Forest Park to Oak Brook
[41.83747172,  -87.873292373, 12, "blue_line_extension"],   // ART, CREATE

[42.04387172,  -87.733292373, 10, "yellow_line"],           // North suburbs, CREATE
[41.93747172,  -87.873292373, 12, "blue_line_extension"],   // Blue Line West - Forest Park to Oak Brook
[42.00440721,  -87.624933922, 13, "red_purple"],            // Purple Line Rehab, CREATE
[42.04387172,  -87.733292373, 14, "yellow_line"],           // Yellow line
[42.04387172,  -87.933292373, 11, "yellow_line"],           // ART, CREATE
// [41.88087172,  -87.628292373, 15],                       // West Loop Transportation Center

];