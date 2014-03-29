var express = require('express');
var request = require('request').defaults({ encoding: 'binary' });
var md5 = require('md5');
var mm = require("memjs").Client

var mj = mm.create();

var app = express();

app.get('/tiles/:layer/:z/:x/:y', function(req, res) {
  var tile_val;
  try{
    tile_val = (md5.digest_s(req.url+"")+"");
  }
  catch(e){
    tile_val = md5(req.url+"");
  }
  mj.get(tile_val, function(err, tile_content) {
    res.header('Content-Type', 'image/png');
    if (tile_content && tile_content != "undefined") {
      res.send(new Buffer(tile_content, 'binary'));
    }
    else{
      var requestOptions = {
        uri: req.url.replace('/tiles','http://jpvelez.cartodb.com/tiles'),
        encoding: 'binary'
      };
      request(requestOptions, function (err, response, body) {
        var img_body = new Buffer(body, 'binary');
        mj.set(tile_val, img_body);
        res.send(new Buffer(body, 'binary'));
      });
    }
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
