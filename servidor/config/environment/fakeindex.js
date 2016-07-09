/* Usted debera modificar este archivo dandole los valores correctos */
/* Luego renombrelo como index.js */

'use strict';
var path = require('path');
var _ = require('lodash');

var all = {
    root: path.normalize(__dirname + '/../../..'),
    port: process.env.PORT || 3500,
    ip: process.env.IP 	|| "0.0.0.0",
    secret: "Su secreto"
};

module.exports = all;