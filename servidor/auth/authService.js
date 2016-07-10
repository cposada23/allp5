var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var validateJwt = expressJwt({secret: config.secret,requestProperty: 'usuario'});
var compose = require('composable-middleware');

function isAuthenticated(){
    return compose()
        .use(validate);
}

function validate(req, res, next) {
    console.log("validando");
    if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    validateJwt(req, res, next);
}

function isAdmin(){
    return compose()
        .use(isAuthenticated())
        .use(cumpleRol);
}

function cumpleRol(req, res, next) {
    if(req.usuario.rol === 'admin'){
        next();
    }else{
        res.send(403);
    }
}

function singToken(usuario){
    return jwt.sign(usuario,config.secret,{expiresIn: 60*2});
}

exports.isAuthenticated = isAuthenticated;
exports.isAdmin = isAdmin;
exports.singToken = singToken;

