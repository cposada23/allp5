var config = require('./config/environment');

var express = require('express');
var socketio = require('socket.io');
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
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
	console.log(socket.id);
	socket.on('mouse',mouseMsg);
	socket.on('msg', sendMsg);
	socket.on('joinChat', joinChat);
	socket.on('leaveChat', leaveChat);
	socket.on('disconnect', function () {
		console.log("disconected");
		users--;
	});
	
	function leaveChat() {
		socket.leave('chat');
		defaultMessage.text = "Salio usuario";
		io.to('chat').emit('leaveChat', defaultMessage);
		users--;
		console.log("Joined " + users);
	}
	
	function joinChat(data){
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
		socket.broadcast.emit('newMsg', message);
	}
}



server.listen(config.port, config.ip, function  () {
	console.log("servidor corriendo en el puerto "+ config.port);
});

exports = module.exports = app;