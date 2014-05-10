define(function (require) {

  var Backbone = require('backbone'),
      events   = require('app/events');

  var LocationModel = Backbone.Model.extend({
    defaults: {
      latitude: null,
      longitude: null,
      accuracy: null,
      error: null
    },
    initialize: function () {
      alert('init: location model')
      // TODO: Decouple navigator dependency
      navigator.geolocation.getCurrentPosition(
        _.bind(this.found, this), 
        _.bind(this.error, this)); 
    },
    found: function(position) {
      this.set({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
      events.trigger('location.found');
    },
    error: function (error) {
      this.set({ error: error});
      events.trigger('location.error');
    }
  });

  // Singleton
  return new LocationModel();
});