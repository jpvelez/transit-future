// Define Modest Map of region with transit lines.
var map;
function main(){

// Define a basemap
var basemap = mapbox.layer().id('jpvelez.map-h88danj5');

// Create a map in the map container, using the basemap.
// We're using Modest Maps with mapbox.js on top.
map = mapbox.map('map', basemap, null, [ easey_handlers.DragHandler() ]);

// Center the map.
map.centerzoom({ lat: 41.853575, lon: -87.615443 }, 11);

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
        "cartocss":"/** simple visualization */\n\n#transit_future_projects{\n  line-color: #FF6600;\n  line-width: 2;\n  line-opacity: 0.7;\n}",
        "cartocss_version":"2.1.1"
      }
    },
    {
      "type":"cartodb",
      "options":{
        "sql":"select * from l_lines",
        "cartocss":"/** simple visualization */\n\n#l_lines{\n  line-color: #3e7bb6;\n  line-width: 2;\n  line-opacity: 0.7;\n}",
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
    + "  line-width: 4;"
    + "}"
    + "[cartodb_id=13]::glow{"
    + "  line-color: #F3DE71;"
    + "  line-width: 12;"
    + "  line-cap: round;"
    + "  line-join: round;"
    + "  line-opacity: .5;"
    + "}"
  + "}",
  ashland: "#transit_future_projects{"
  + "[cartodb_id=11]{"
  + "  line-color: blue;"
  + "  line-width: 4;"
  + "}"
  + "  [cartodb_id=11]::glow{"
  + "  line-color: blue;"
  + "  line-width: 10;"
  + "  line-opacity: .5;"
  + "  line-cap: round;"
  + "  line-join: round;"
  + "}"
  + "}",
  lime_line: "#transit_future_projects{"
      + "[cartodb_id=1]{"
      + "line-color: lime;"
      + "line-width: 4;"
      + "}"
      + "[cartodb_id=1]::glow{"
      + "line-color: #5EEA8C;"
      + "line-width: 12;"
      + "line-opacity: .5;"
      + "line-cap: round;"
      + "line-join: round;"
      + "}"
  + "}",
  orange_line_extension: "#transit_future_projects{"
      + "[cartodb_id=2]{"
      + "line-color: #F37537;"
      + "line-width: 5;"
      + "}"
      + "[cartodb_id=2]::glow{"
      + "line-color: #F37537;"
      + "line-width: 12;"
      + "line-opacity: .5;"
      + "line-cap: round;"
      + "line-join: round;"
    + "}"
  + "}",
  red_line_extension: "#transit_future_projects{"
    + "[cartodb_id=4]{"
    + "line-color: #EA5854;"
    + "line-width: 5;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
    + "[cartodb_id=4]::glow{"
    + "line-color: #EA5854;"
    + "line-width: 12;"
    + "line-opacity: .5;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
  + "}",
  blue_line_extension: "#transit_future_projects{"
     + "[cartodb_id=3]{"
     + "line-color: #74BBE7;"
     + "line-width: 5;"
     + "line-join: round;"
     + "line-cap: round;"
     + "}"
     + "[cartodb_id=3]::glow{"
     + "line-color: #74BBE7;"
     + "line-width: 12;"
     + "line-opacity: .5;"
     + "line-cap: round;"
     + "line-join: round;"
    + "}"
    + "[cartodb_id=7]{"
    + "line-color: #74BBE7;"
    + "line-width: 5;"
    + "line-join: round;"
    + "line-cap: round;"
    + "}"
    + "[cartodb_id=7]::glow{"
    + "line-color: #74BBE7;"
    + "line-width: 12;"
    + "line-opacity: .5;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
  + "}",
  brown_line_extension: "#transit_future_projects{"
      + "[cartodb_id=6]{"
      + "line-color: #73451C;"
      + "line-width: 5;"
      + "line-cap: round;"
      + "line-join: round;"
    + "}"
      + "[cartodb_id=6]::glow{"
      + "line-color: #73451C;"
      + "line-width: 12;"
      + "line-opacity: .5;"
      + "line-cap: round;"
      + "line-join: round;"
    + "}"
  + "}",
  yellow_line: "#transit_future_projects{"
    + "[cartodb_id=5]{"
    + "line-color: #FEE800;"
    + "line-width: 5;"
    + "line-cap: round;"
    + "line-join: round;"
    + "}"
    + "[cartodb_id=5]::glow{"
    + "line-color: #FEE800;"
    + "line-width: 12;"
    + "line-opacity: .5;"
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
var current_view = -1;
var views = [
[41.79876395, -87.50411926, 12, "gold_line"],               // Gold line
[41.77177479, -87.53053094, 13, "gold_line"],               // Gold line closeup
[41.87876395, -87.61411926, 13, "ashland"],                 // BRT
[41.87876395, -87.65411926, 15, "ashland"],                 // BRT closeup
[41.86426600, -87.48822491, 11, "lime_line"],               // Lime line
[41.87648077,  -87.684650268, 13, "lime_line"],             // Lime line West side
[41.79448077,  -87.692650268, 13, "lime_line"],             // Lime line South side
[41.77848077,  -87.719650268, 14, "orange_line_extension"], // Orange line extension
[41.69887172,  -87.624292373, 14, "red_line_extension"],    // Red line extension
[41.93747172,  -87.873292373, 12, "blue_line_extension"],   // Blue Line West - Forest Park to Oak Brook
[41.88926600,  -87.733292373, 12, "blue_line_extension"],   // Blue Line fixes
[41.88926600,  -87.733292373, 12],                          // Inner Circumferential
[41.92276600,  -87.790292373, 12, "brown_line_extension"],  // Brown Line extension
[42.00440721,  -87.624933922, 13],                          // Red/Purple Modernization
[42.04387172,  -87.733292373, 14, "yellow_line"],           // Yellow line
[41.88087172,  -87.628292373, 15],                          // Downtown circulator
// [41.88087172,  -87.628292373, 15],                       // West Loop Transportation Center
[41.66887172,  -87.624292373, 11],                          // Southeast Service
];
