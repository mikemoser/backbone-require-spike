define(function (require) {
  'use strict';

  var $               = require('jquery'),
      _               = require('underscore'),
      Backbone        = require('backbone'),
      events          = require('app/events'),
      $content        = $('#content'),
      LocatingView    = require('app/views/locating-view'),
      RidesView       = require('app/views/rides-view'),
      locatingView    = new LocatingView({el: $content }),
      ridesView       = new RidesView({el: $content }),
      locationService = require('app/services/location-service');

  // TODO: Make sure there are no zombies.
  return Backbone.Router.extend({
    initialize: function () {
      events.on('location.found', _.bind(this.onLocationFound, this));
    },
    routes: {
      "" : "locating",
      'rides': "rides"
    },
    locating: function () {
      locatingView.render();
    },
    rides: function () {
      // Make sure we have a valid location before rendering nearby rides
      if (!locationService.hasValidPosition) {
        this.navigate('', true);
        return
      }

      ridesView.render();  
    },
    onLocationFound: function (position) {
      this.navigate('rides', true);
    }
  });
});