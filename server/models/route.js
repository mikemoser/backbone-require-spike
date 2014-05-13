'use strict'

var mongoose = require('mongoose');

// TODO: Use a model when we support more than one agency
var agencySchema = new mongoose.Schema({
  tag: { type: String, required: true }
})

var routeSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  agency: { type: { 
    tag: { type: String }
  }, require: true },
  title: { type: String, required: true }
});

module.exports = mongoose.model('Route', routeSchema);
