var express = require('express');
var mdns    = require('mdns');
var wemo    = require('noble');
var app     = express();

// Serve www/
app.use(express.static(__dirname + '/www'));
app.listen(0, function() {
  console.log(new Date(), 'Serving http://localhost:' + this.address().port);

  // Advertise over mDNS
  mdns.createAdvertisement(mdns.tcp('http'), this.address().port,{name:'Robosmart'})
    .start();


});
