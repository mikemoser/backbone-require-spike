'use strict';

var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendfile(__dirname + '/client/index.html');
});

// Static Routes
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use(express.favicon(__dirname + '/client/img/favicon.ico', { maxAge: null })); 

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
