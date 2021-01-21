const request = require('request');

var kettleOn;
var kettleOff;
var motorOn;
var motorOff;

exports.init = function(settings) {
  kettleOn = settings.kettle.urlOn;
  kettleOff = settings.kettle.urlOff;
  motorOn = settings.motor.urlOn;
  motorOff = settings.motor.urlOff;
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
