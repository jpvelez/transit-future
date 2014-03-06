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
        "cartocss_version":"2.1.1",
        "interactivity":["cartodb_id"]
      }
    },
    {
      "type":"cartodb",
      "options":{
        "sql":"select * from l_lines",
        "cartocss":"/** simple visualization */\n\n#l_lines{\n  line-color: #3e7bb6;\n  line-width: 2;\n  line-opacity: 0.7;\n}",
        "cartocss_version":"2.1.1",
        "interactivity":["cartodb_id"]
      }
    }
  ]
};

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
function loadedToken(tokenInfo){
var token = tokenInfo.layergroupid;
var template = new MM.Template('http://3.api.cartocdn.com/jpvelez/tiles/layergroup/' + token + '/{Z}/{X}/{Y}.png');
var layer = new MM.Layer(template);
map.addLayer(layer);
}

// Load the map when window is done loading.
// The map will only be displayed once you scroll the to the right part of the page.
window.onload = main;


// Ease around the map as you scroll through the project posts.
// Define map views for each paragraph.
var current_view = -1;
var views = [
[41.79876395, -87.50411926, 12],  // Gold line
[41.77177479, -87.53053094, 13],  // Gold line closeup
[41.87876395, -87.61411926, 13],  // BRT
[41.87876395, -87.65411926, 15],  // BRT closeup
[41.86426600, -87.48822491, 11],  // Lime line
[41.87648077,  -87.684650268, 13], // Lime line West side
[41.79448077,  -87.692650268, 13],  // Lime line South side
[41.77848077,  -87.719650268, 14],  // Orange line extension
[41.69887172,  -87.624292373, 14],  // Red line extension
[41.93747172,  -87.873292373, 12],  // Blue Line West - Forest Park to Oak Brook
[41.88926600,  -87.733292373, 12],  // Blue Line fixes
[41.88926600,  -87.733292373, 12],  // Inner Circumferential
[41.92276600,  -87.790292373, 12],  // Brown Line extension
[42.00440721,  -87.624933922, 13],  // Red/Purple Modernization
[42.04387172,  -87.733292373, 14],  // Yellow line
[41.88087172,  -87.628292373, 15],  // Downtown circulator
// [41.88087172,  -87.628292373, 15],  // West Loop Transportation Center
[41.66887172,  -87.624292373, 11],  // Southeast Service
];
