define(function (require) {
  'use strict';

  var $               = require('jquery'),
      _               = require('underscore'),
      Backbone        = require('backbone'),
      tpl             = require('text!tpl/rides-tpl.html'),
      template        = _.template(tpl),
      locationService = require('app/services/location-service');

  return Backbone.View.extend({
    initialize: function() {
      
    },
    render: function () {
      this.$el.empty().html(template({position: locationService.position}));
      return this;
    }
  });
});