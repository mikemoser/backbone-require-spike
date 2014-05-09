define(function (require) {
  'use strict';

  var $             = require('jquery'),
      Backbone      = require('backbone'),
      LocatingView  = require('app/views/locating-view'),
      $content      = $('#content'),
      locatingView  = new LocatingView({el: $content })

  return Backbone.Router.extend({
    routes: {
      "" : "locating"
    },
    locating: function () {
      // TODO: Don't we need to clear our zombies?
      locatingView.render();
    }
  });
});