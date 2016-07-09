'use strict';
var path = require('path');
var _ = require('lodash');

var all = {
	root: path.normalize(__dirname + '/../../..'),
	port: process.env.PORT || 3500,
	ip: process.env.IP 	|| "0.0.0.0",
	secret : "El secreto"
};

module.exports = all;