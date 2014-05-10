define(function (require) {
  'use strict';

  var $             = require('jquery'),
      _             = require('underscore'),
      Backbone      = require('backbone'),
      tpl           = require('text!tpl/rides-tpl.html'),
      template      = _.template(tpl),
      events        = require('app/events');

  return Backbone.View.extend({
    initialize: function() {
      events.on('location.found', this.foundLocation, this);
    },
    render: function () {
      this.$el.empty().html(template());
      return this;
    },
    foundLocation: function (position) {
      console.log(position);
    }
  });
});