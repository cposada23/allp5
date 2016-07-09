var express = require('express');
var controller = require('./usuario.controller');

/*intento */
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var config = require('../../config/environment');
var secret = config.secret;
///////////


var router = express.Router();

router.get('/me',expressJwt({secret:secret, requestProperty: 'auth'}), controller.me);
router.post('/autenticate', controller.autenticate);

module.exports = router;