const request = require('request');
var appSettings = require('../app/models/appsetting');

var kettleOn = 'http://sonoff-spuele/cm?user=admin&password=Leostar1&cmnd=Power%20On';
var kettleOff = 'http://sonoff-spuele/cm?user=admin&password=Leostar1&cmnd=Power%20Off';
var motorOn;
var motorOff;

appSettings.findOne(function(err, settings) {
  if (err) {
    brewlog.log('Couldn\'t get app settings: ' + err);
  } else {
    console.log(settings);
    //kettleOn = settings.kettle.urlOn;
    //kettleOff = settings.kettle.urlOff;
    //motorOn = settings.motor.urlOn;
    //motorOff = settings.motor.urlOff;
  }
});

exports.switchKettle = function(state) {
  if (state) {
    sendRequest(kettleOn);
  } else {
    sendRequest(kettleOff);
  }
};

exports.switchMotor = function(state) {
  if (state) {
    sendRequest(motorOn);
  } else {
    sendRequest(motorOff);
  }
};

function sendRequest(url) {
  request(url, function(err, res, body) {
    if (err) {
      return console.error(err);
    } else {
      console.log(body);
    }
  });
}
