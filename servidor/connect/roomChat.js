
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


module.exports = function  (io,socket, users) {
    
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





    function sendMsg(data) {
        var message = data.message;
        message.quien = data.quien;
        socket.broadcast.to('chat').emit('newMsg', message);
    }
};