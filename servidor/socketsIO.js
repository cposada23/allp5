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
        socket.on('mouse',mouseMsg);
        socket.on('msg', sendMsg);
        socket.on('joinChat', joinChat);
        socket.on('leaveChat', leaveChat);
        socket.on('disconnect', function () {
            console.log("disconected");
            if(users>0) {
                users--;
                console.log("users " + users);
            }else{
                console.log("else " + users);
            }

        });

        function leaveChat() {
            console.log("leave");
            socket.leave('chat');
            defaultMessage.text = "Salio usuario";
            io.to('chat').emit('leaveChat', defaultMessage);
            if(users>0)users--;
            console.log("Joined " + users);
        }

        function joinChat(data){
            console.log("join");
            socket.join('chat');
            defaultMessage.text = "Hola nuevo usuario";
            io.to('chat').emit('joinChat',defaultMessage);
            users++;
            console.log("joined " + users);
        }

        function  mouseMsg (data) {
            socket.broadcast.emit('mouse',data);
            //console.log(data);
        }



        function sendMsg(data) {
            var message = data.message;
            message.quien = data.quien;
            socket.broadcast.to('chat').emit('newMsg', message);
        }
    }

};