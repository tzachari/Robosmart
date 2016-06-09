Robosmart
=========

Simple web app served on the local network that discovers and controls [Robosmart Light Bulbs](http://www.smartbotics.com/#!products/c218d) over BLE.


Getting Started
---------------

    npm install
    node serve.js

By default, content is hosted at a random port. 
The URL is announced to the local network as an HTTP service over mDNS.
The app will automatically detect nearby Robosmart BLE Light Bulbs.

For quick access on your phone, [Summon](https://github.com/lab11/summon) ([Android](https://play.google.com/store/apps/details?id=edu.umich.eecs.lab11.summon), [iOS](https://itunes.apple.com/us/app/summon-lab11/id1051205682)) will display the web app when your phone is connected to the WiFi network.

__NOTE__: For Debian-based systems like Raspberry Pis, you may need to first `apt-get install libavahi-compat-libdnssd-dev`.

