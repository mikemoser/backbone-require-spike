'user strict'

var Services = require('../../services'),
    should   = require('should'),
    testUtil = require('../util');

describe('Nextbus Service', function () {
  describe('getNearByStops', function () {
    it('should return a list of nearby stops', function (done) {
      this.timeout(10000);

      var longitude = -122.42531310000001,
          latitude  = 37.7534834;

      Services.Nextbus.getNearByStops(longitude, latitude)
      .then(function (stops) {
        should.exist(stops);
        done();
      }, function (error) {
        should.not.exist(error);
        done();
      });
    });
  });

  describe('getCuratedNearbyStops', function () {
    it('should return a aggregated list of stops', function (done) {

      var longitude = -122.42531310000001,
          latitude  = 37.7534834;

      Services.Nextbus.getCuratedNearbyStops(longitude, latitude)
      .then(function (stops) {
        should.exist(stops);
        done();
      }, function (error) {
        should.not.exist(error);
        done();
      });
    });
  });
});