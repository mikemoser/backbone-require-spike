'use strict'

var mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  routeTitle: { type: String, required: true }, // Note: MongoDb does not allow .populate on aggregation queries, so need to denormalize some data
  tag: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: [], required: true }, // Note: Longitute then latitude [ long, lat ]
  stopId: { type: String, required: true },
  direction: { type: String, required: true }
});

schema.index({ location: '2d' });

module.exports = mongoose.model('Stop', schema);
