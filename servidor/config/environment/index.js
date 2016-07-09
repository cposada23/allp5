'use strict';
var path = require('path');
var _ = require('lodash');

var all = {
	root: path.normalize(__dirname + '/../../..'),
	port: process.env.PORT || 3500,
	ip: process.env.IP 	|| "0.0.0.0",
	secret : "El secreto",
	defaultmessage:  {
		quien:"bot",
		text: "Hola nuevo usuario!!",
		x:0,
		y:10,
		textSize: 29,
		r:200,
		g:100,
		b:0,
		t:255
	}
};

module.exports = all;