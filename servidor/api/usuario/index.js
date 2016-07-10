var express = require('express');
var controller = require('./usuario.controller');
var Auth = require('../../auth/authService');
var router = express.Router();

/* Rutas para el usuario */

/* test */
router.get('/me',Auth.isAuthenticated(), controller.me);
router.post('/autenticate', controller.autenticate);
router.get('/admin', Auth.isAdmin(), controller.rutaAdmin);
/* fin test */


module.exports = router;