'use strict';

var mongoose  = require('mongoose'),
    express   = require('express'),
    app       = express(),
    apiRoutes = require('./server/config/api-routes')


// Setup mongoose
mongoose.connect('mongodb://127.0.0.1:27017/uber-spike');

app.get('/', function(req, res){
  res.sendfile(__dirname + '/client/index.html');
});

// Static Routes
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use(express.favicon(__dirname + '/client/img/favicon.ico', { maxAge: null })); 

// Configure API routes
apiRoutes(app);

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
