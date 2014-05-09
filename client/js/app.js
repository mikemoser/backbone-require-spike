require.config({
  baseUrl: 'js/lib',
  paths: {
    app: '../app',
    tpl: '../app/tpl',
    jquery: 'jquery-1.11.1.min',
    backbone: 'backbone-1.1.2.min',
    underscore: 'underscore-1.6.0.min'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    }
  }
});

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {
  var router = new Router();
  Backbone.history.start();
});