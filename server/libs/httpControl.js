const request = require('request');
var appSettings = require('../app/models/appsetting');

var kettleOn;
var kettleOff;
var motorOn;
var motorOff;

exports.init = function() {
  appSettings.findOne(function(err, settings) {
    if (err) {
      brewlog.log('Couldn\'t get app settings: ' + err);
    } else {
      if (settings.httpControl.enabled) {
        kettleOn = settings.httpControl.kettle.urlOn;
        kettleOff = settings.httpControl.kettle.urlOff;
        motorOn = settings.httpControl.motor.urlOn;
        motorOff = settings.httpControl.motor.urlOff;
      }
    }
  });
};

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
