'use strict';



var Auth = require('../../auth/authService');


/* Test */
/*var jwt  = require('jsonwebtoken');
var config = require('../../config/environment');*/
exports.me = function (req,res) {
    console.log("Hola desde el me");
    console.log("usuario" + JSON.stringify(req.usuario));
    return res.status(200).json(req.body);
};

exports.rutaAdmin = function (req,res) {
    console.log("verificando que solo el admin pueda entrar");
    return res.status(200).json(req.body);
};

exports.autenticate = function (req, res) {
    console.log("req"+ JSON.stringify(req.body));
    var usuario = {};
    usuario.usuario= req.body.usuario;
    usuario.id  = "#4234";
    usuario.rol = "admin";
    console.log("usuario " + usuario);
    if(!(usuario.usuario==='camilo')){
        return res.status(401).json({mal:'usuario'});
    }

    var token = Auth.singToken(usuario);
    //var token = jwt.sign(usuario,config.secret,{expiresIn: 60*10*6});
    //var decoded = jwt.verify(token, config.secret);
    //console.log("decoded " + JSON.stringify(decoded));
    return res.status(200).json({token:token});
};
/* Fin test */

function handleError(res, err) {
    console.log("Error" + err);
    return res.status(500).send(err);
}
