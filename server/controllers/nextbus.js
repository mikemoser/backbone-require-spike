'use strict'

var Services = require('../services');

module.exports.stops = function (req, res) {
  Services.Nextbus.getCuratedNearbyStops(req.query.longitude, req.query.latitude)
  .then(function (stops) {
    console.log(stops)
    res.json(stops);
  });  
}