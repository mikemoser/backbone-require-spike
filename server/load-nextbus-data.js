(function (undefined) {
  var util                  = require('./util'),
      mongoose              = require('mongoose')
      Promise               = require('promise'),
      Models                = require('./models'),
      routeListUrlTemplate  = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=%s',
      routeDetailsUrlTemplate  = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=%s&r=%s';

  // mongoose.connect('mongodb://web:vs-spike@oceanic.mongohq.com:10071/vs-spike');
  mongoose.connect('mongodb://127.0.0.1:27017/uber-spike');
  loadData();

  function loadData() {
    console.log('Start loading Nextbus data...')

    // TODO: Update existing data instead of just deleting and readding
    return clearAllData()
    .then(function () {
      // TODO: Load routes for all agencies from a dynamic list
      // HACK: Hardcoded first agency (sf-muni) for MVP
      return getRouteList('sf-muni');
    })
    .then(function (routes) {
      return Promise.all(routes.map(saveRoute));
    })
    .then(function (routes) {
      return Promise.all(routes.map(getRouteStops));
    })
    .then(function (routeStops) {
      return Promise.all(routeStops.map(saveRouteStops));
    })
    .then(function () {
      console.log('Done loading Nextbus data.')
      mongoose.disconnect();
    })
    .done();
  }

  function clearAllData () {
   return Promise.all([
      clearRoutes(),
      clearStops()
   ]);
  }

  function clearRoutes() {
    return Promise.denodeify(Models.Route.remove.bind(Models.Route))();
  }

  function clearStops() {
    return Promise.denodeify(Models.Stop.remove.bind(Models.Stop))();  
  }

  function getRouteList(agencyTag) {
    var url = util.format(routeListUrlTemplate, agencyTag);
    var routeList = [];
    
    return util.requestXmlToJson(url)
    .then(function (response) {
      response.body.route.forEach(function (route) {
        routeList.push({
          tag: route.$.tag, 
          agency: { tag: agencyTag }, // TODO: Use db driven agency
          title: route.$.title
        });
      });

      return routeList;
    })
  }

  function saveRoute(route) {
    var route = new Models.Route(route);
    return Promise.denodeify(route.save.bind(route))();
  }

  function getRouteStops(route) {
    var url = util.format(routeDetailsUrlTemplate, route.agency.tag, route.tag);
    var stops = [];

    return util.requestXmlToJson(url)
    .then(function (result) {
      var directionHash = buildDirectionHash(result.body.route[0].direction);

      result.body.route[0].stop.forEach(function (stop) {
        stops.push({
          route: route,
          routeTitle: route.title,
          tag: stop.$.tag,
          title: stop.$.title,
          location: [parseFloat(stop.$.lon), parseFloat(stop.$.lat)],
          stopId: stop.$.stopId,
          direction: directionHash[stop.$.tag] ? directionHash[stop.$.tag] : 'End of line' //TODO: Is this really end of line?  They are missing directions for the last stops
        })
      });

      return stops;
    });
  }

  function buildDirectionHash(directions) {
    var hash = {};
    directions.forEach(function (direction) {
      var directionName = direction.$.name;
      direction.stop.forEach(function (stop) {
        hash[stop.$.tag] = directionName;
      });
    });

    return hash;
  }

  function saveRouteStops(routeStops) {
    return Promise.all(routeStops.map(saveStop));
  }

  function saveStop(stop) {
    var stop = new Models.Stop(stop);
    return Promise.denodeify(stop.save.bind(stop))();
  }
  
})();