var socketio = require('socket.io');
var config = require('./config/environment');
var socketioJwt = require('socketio-jwt');
module.exports = function  (server) {
    var io = socketio(server);
    /*intento de namespaces*/
    var nsp = io.of('/hola');

    nsp.on('connection', function (socket) {
        console.log("Socket se conecto al namespace");

        socket.on('intento', intento);
        function intento(data) {
            console.log("data" + data);
            socket.emit('intento' , "Hola intento desde el server");
        }
    });
    
    /*Funciono el namespace ;) */
    
    var nsp2 = io.of('/hola2');
    nsp2.use(socketioJwt.authorize({secret:config.secret, handshake:true}));
    nsp2.on('connection', function (socket) {
        console.log("Hola nsp2 " + JSON.stringify(socket.decoded_token));

        socket.on('intento', intento);
        function intento(data) {
            console.log("data" + data);
            socket.emit('intento' , "Hola desde nps2");
        }
    });







    io.sockets.on('connection', newConnection);

    function newConnection (socket) {
        console.log(socket.rooms);
        require('./connect/roomChat')(io,socket);
        socket.on('mouse',mouseMsg);
        function  mouseMsg (data) {
            socket.broadcast.emit('mouse',data);
        }
    }

};