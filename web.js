var http = require('http');
var request = require('request').defaults({ encoding: 'binary' });
var md5 = require('md5');
var mm = require("memjs").Client

var mj = mm.create();

var server = http.createServer(function(req, res){
  var tile_root = 'http://jpvelez.cartodb.com/tiles';
  if(req.url.indexOf("tile") == -1){
    if(req.url.indexOf('/mb') != -1){
      tile_root = 'http://a.tiles.mapbox.com/v3/jpvelez.map-h88danj5';
    }
    else{
      return;
    }
  }
  var tile_val;
  try{
    tile_val = (md5.digest_s(req.url+"")+"");
  }
  catch(e){
    tile_val = md5(req.url+"");
  }
  mj.get(tile_val, function(err, tile_content) {
    res.setHeader('content-type', 'image/png');
    if (tile_content && tile_content != "undefined") {
      return res.end(new Buffer(tile_content, 'binary'));
    }
    else{
      var requestOptions = {
        uri: req.url.replace('/tiles', root).replace('/mb', tile_root),
        encoding: 'binary'
      };
      request(requestOptions, function (err, response, body) {
        var img_body = new Buffer(body, 'binary');
        mj.set(tile_val, img_body);
        return res.end(new Buffer(body, 'binary'));
      });
    }
  });
}).listen(process.env.PORT || 3000);
