define(function (require) {
  'use strict';

  var $ = require('jquery'),
      _ = require('underscore'),
      Backbone = require('backbone'),
      tpl = require('text!tpl/locating-tpl.html'),
      template = _.template(tpl);

  return Backbone.View.extend({
    render: function () {
      this.$el.empty().html(template());
      return this;
    }
  });
});