var config = require('../config/environment');
var defaultMessage = config.defaultmessage;
var users = 0;

module.exports = function  (io,socket) {
    /*setInterval(function () {
        if (users > 0){
            defaultMessage.text = "Hay " + users + " usuarios conectados en el chat";
            io.to('chat').emit('adminMsg', defaultMessage);
        }
    }, 3000);*/
    socket.on('msg', sendMsg);
    socket.on('joinChat', joinChat);
    socket.on('leaveChat', leaveChat);
    socket.on('disconnect', function () {
        console.log("disconected");
        if(users>0)users--;
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
        console.log("socket rooms " + JSON.stringify(socket.rooms));
    }

    function sendMsg(data) {
        var message = data.message;
        message.quien = data.quien;
        socket.broadcast.to('chat').emit('newMsg', message);
    }
};