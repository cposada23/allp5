'use strict';

var path = require('path');
var config = require('./config/environment');

module.exports = function  (app) {
	
	app.use('/api/usuario', require('./api/usuario'));


	app.route('/').get(function  (req,res) {
		res.sendFile(path.join(config.root, '/cliente/index.html'));
	});
};