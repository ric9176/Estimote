
var beaconsModule = angular.module('beacons', []);

beaconsModule.factory('$beaconSniffer', function () {
  return {
    sniff : function (estimote) {
      onDeviceReady(estimote);
    }
  };

  function onDeviceReady(estimote) {
  $('#found_beacons').text('Device Ready');
  startScan(estimote);
  updateTimer = setInterval(checkHotelBeacon, 1000);
  }

  function startScan(estimote) {
    $('#found_beacons').text('Start Scan');

    function onBeaconsRanged(beaconInfo) {
      for (var i in beaconInfo.beacons) {
        var beacon = beaconInfo.beacons[i];
        if (beacon.rssi < 0) {
          beacon.timeStamp = Date.now();
          var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
          var beaconslist = [];
          beaconslist[key] = beacon;
          console.log(beaconslist);
        }
      }
    }

    function onError(errorMessage) {
      console.log('Ranging beacons did fail: ' + errorMessage);
    }

    $('#found_beacons').text('Before');
    estimote.beacons.requestAlwaysAuthorization();
    $('#found_beacons').text('After');
    estimote.beacons.startRangingBeaconsInRegion({}, onBeaconsRanged, onError);
  }

  function checkHotelBeacon() {
    for (var i in beacons) {
      var beacon = beacons[i];
      if ((beacon.macAddress = 'C5:A5:F9:2D:52:3F') && (beacon.distance < 0.1)) {
        $('#found-beacons').text("You have entered the hotel");
        console.log("Distance: " + beacon.distance + "-In");
      } else if ((beacon.macAddress = 'C5:A5:F9:2D:52:3F') && (beacon.distance > 0.1)) {
        $('#found-beacons').text("You are near the hotel");
        console.log("Distance: " + beacon.distance + '-Near');
      }
    }
  }

});