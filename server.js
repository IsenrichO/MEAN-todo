var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

app.all('/', function(req, res) {
  res.send('\
    <!DOCTYPE html>\
    <html>\
      <head>\
        <title>MEAN To Do App</title>\
      </head>\
      <body>\
        <h1>HELLO, this is the app</h1>\
        <script src="bundle.js"></script>\
      </body>\
    </html>\
    ');
});

app.listen(PORT, function() {
  console.log('server listening on ' + PORT);
});



