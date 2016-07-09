'use strict';

var jwt  = require('jsonwebtoken');


//intento
var config = require('../../config/environment');


exports.me = function (req,res) {
    console.log("Hola desde el me");
    console.log("usuario" + req.auth.usuario + "id " + req.auth.id);
    return res.status(200).json(req.body);
};

exports.autenticate = function (req, res) {
    console.log("req"+ JSON.stringify(req.body));
    var usuario = {}
    usuario.usuario= req.body.usuario;
    usuario.id  = "#4234";
    console.log("usuario " + usuario);
    if(!(usuario.usuario==='camilo')){
        return res.status(401).json({mal:'usuario'});
    }
    var token = jwt.sign(usuario,config.secret);
    var decoded = jwt.verify(token, config.secret);
    console.log("decoded " + decoded);

    return res.status(200).json({token:token});
};

function handleError(res, err) {
    console.log("Error" + err);
    return res.status(500).send(err);
}
