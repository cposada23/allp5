var socketio = require('socket.io');

module.exports = function  (server) {
    var io = socketio(server);
    io.sockets.on('connection', newConnection);

    var users = 0;
    var defaultMessage = {
        quien:"bot",
        text: "Hola nuevo usuario!!",
        x:0,
        y:10,
        textSize: 29,
        r:200,
        g:100,
        b:0,
        t:255
    };
    setInterval(sendAdminMessage, 10000);

    function sendAdminMessage() {
        if(users > 0){
            defaultMessage.text = "Hay " + users + " Usuarios conectados"
            io.to('chat').emit('adminMsg', defaultMessage);
        }

    }

    function newConnection (socket) {
        // body...
        console.log(socket.id + " Usuarios conectados: " + users);
        require('./connect/roomChat')(io,socket, users);

        socket.on('mouse',mouseMsg);
        function  mouseMsg (data) {
            socket.broadcast.emit('mouse',data);
            //console.log(data);
        }
    }

};