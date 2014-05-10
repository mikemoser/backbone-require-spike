define(function (require) {
  'use strict';

  var $               = require('jquery'),
      _               = require('underscore'),
      Backbone        = require('backbone'),
      tpl             = require('text!tpl/locating-tpl.html'),
      errorTpl        = require('text!tpl/locating-error-tpl.html'),
      template        = _.template(tpl),
      errorTemplate   = _.template(errorTpl),
      events          = require('app/events'),
      locatingError   = null;

  return Backbone.View.extend({
    initialize: function() {
      // TODO: Decouple this from the view
      navigator.geolocation.getCurrentPosition(
        _.bind(this.onFoundLocation, this), 
        _.bind(this.onLocatingError, this)); 
    },
    render: function () {
      if (this.locatingError)
        this.$el.empty().html(errorTemplate());  
      else
        this.$el.empty().html(template());
      return this;
    },
    onFoundLocation: function(position) {
      events.trigger('location.found', position);
    },
    onLocatingError: function (error) {
      this.locatingError = error;
      this.render();
    }
  });
});