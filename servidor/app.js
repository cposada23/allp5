var config = require('./config/environment');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
require('./socketsIO')(server);


server.listen(config.port, config.ip, function  () {
	console.log("servidor corriendo en el puerto "+ config.port);
});

exports = module.exports = app;