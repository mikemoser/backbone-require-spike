'user strict'

var Models  = require('../models'),
    Promise = require('promise');

module.exports.getNearByStops = function (longitude, latitude) {
  var query = Models.Stop.aggregate([
    { 
      $geoNear: { 
        near: [longitude, latitude], 
        distanceField: "dist.calculated", 
        maxDistance: 0.01,  // TODO: Move to config value
        includeLocs: "dist.location" 
      }
    }
  ]);

  return Promise.denodeify(query.exec.bind(query))();
}

module.exports.getCuratedNearbyStops = function (longitude, latitude) {

  var routeStack = [];

  return this.getNearByStops(longitude, latitude)
  .then(function (stops) {

    // Loop through all nearby stops, which are ordered from closest to nearest
    // adding the closest inbound and outbound stop for each route.
    stops.forEach(function (stop) {

      // Initialize route if first stop in list
      if (!routeStack[stop.routeTitle])
        routeStack[stop.routeTitle] = [];

      // Add direction if not already added, otherwise skip
      if (!routeStack[stop.routeTitle][stop.direction])  
        routeStack[stop.routeTitle][stop.direction] = stop;

    });

    return routeStack;
  });
}