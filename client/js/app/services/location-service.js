define(function (require) {

  var events = require('app/events'),
      _      = require('underscore');

  // TODO: Expire location.
  // TODO: Decide if we need to watch for location changes.
  var LocationService = function () {
    this.hasValidLocation   = false;
    this.error              = null;
    this.position           = {
                                latitude:  null,
                                longitude: null,
                                accuracy:  null,
                              }
  }

  LocationService.prototype.requestLocation = function () {
    navigator.geolocation.getCurrentPosition(
      _.bind(this.onLocationFound, this),
      _.bind(this.onLocationError, this));
  }

  LocationService.prototype.onLocationFound = function (position) {
    this.position = {
      latitude:  position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy:  position.coords.accuracy
    }

    this.hasValidPosition = true;

    events.trigger('location.found', this.position);
  }

  LocationService.prototype.onLocationError = function (error) {
    this.error = error;
    events.trigger('location.error', error);
  }

  // Singlton
  return new LocationService();
});