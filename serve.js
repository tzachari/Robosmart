var express = require('express');
var noble   = require('noble');
var mdns    = require('mdns');
var app     = express();

// Serve www/
app.use(express.static(__dirname + '/www'));
app.listen(0, function() {
  var peripheral = null;
  console.log(new Date(), 'Serving http://localhost:' + this.address().port);

  // Advertise over mDNS
  mdns.createAdvertisement(mdns.tcp('http'), this.address().port,{name:'Robosmart'}).start();

  app.post('/state', function(req, res) {
    peripheral.connect(function(){
      peripheral.discoverSomeServicesAndCharacteristics(["ff10"],["ff11"], function(error, services, characteristics) {
        characteristics[0].read(function(error,data){
          if (req) res.send(data[0]==1);
          peripheral.disconnect();
        })
      });
    });
  });

  app.post('/toggle', function(req, res) {
    peripheral.connect(function(){
      peripheral.discoverSomeServicesAndCharacteristics(["ff10"],["ff11"], function(error, services, characteristics) {
        characteristics[0].read(function(error,data){
          characteristics[0].write(new Buffer([!data[0]]),false,function(e){
            if (req) res.send(!data[0]);
            peripheral.disconnect();
          });
        });
      });
    });
  });

  noble.on('stateChange',function(state){
    if (state=="poweredOn") noble.startScanning(["ff10"]);
  });

  noble.on('discover', function(p){
    if (p.advertisement.localName && p.advertisement.localName.startsWith("SHL")) {
      peripheral = p;
      noble.stopScanning();
      console.log("Found device.")
    }
  });
});
