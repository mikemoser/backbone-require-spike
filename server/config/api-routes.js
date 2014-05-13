'use strict'

var Controllers = require('../controllers');

module.exports = function (app) {
  // TODO: Decide best route pattern
  app.get('/api/nexbus/stops', Controllers.Nextbus.stops);  
}