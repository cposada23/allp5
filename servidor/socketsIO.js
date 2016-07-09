var socketio = require('socket.io');
var config = require('./config/environment');
module.exports = function  (server) {
    var io = socketio(server);
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