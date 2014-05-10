define(function (require) {
  'use strict';

  var $               = require('jquery'),
      _               = require('underscore'),
      Backbone        = require('backbone'),
      tpl             = require('text!tpl/locating-tpl.html'),
      template        = _.template(tpl),
      events          = require('app/events'),
      locationService = require('app/services/location-service');

  return Backbone.View.extend({
    initialize: function() {
      events.on('location.error', _.bind(this.onLocationError, this));
    },
    render: function () {
      this.$el.empty().html(template({error: locationService.error}));
      return this;
    },
    onLocationError: function (error) {
      this.render();
    }
  });
});