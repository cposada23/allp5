'use strict';

(function () {
    angular.module('p5Sketch').factory('chatService', chatService);

    chatService.$inject = ['socket'];

    function chatService(socket) {
        return {
            sketch:function () {
                var chatSketch = function (p) {
                    var r = p.random(0,255);
                    var g = p.random(0,255);
                    var b = p.random(0,255);
                    var input;
                    var inputNombre;
                    var button;
                    var messages = [{
                        quien:"bot",
                        text: "Hola Chatea!!",
                        x:100,
                        y:100,
                        textSize: 20,
                        r:200,
                        g:100,
                        b:0,
                        t:255}];

                    p.setup = function () {
                        p.createCanvas(640,320);
                        p.background(0);
                        p.createP("");
                        inputNombre = p.createInput("@Anonimo");
                        input = p.createInput("Mensaje ...");
                        button  = p.createButton('Enviar');
                        button.mousePressed(p.instertarMensaje);
                        input.changed(p.instertarMensaje);
                        socket.on('newMsg',p.nuevoMensaje);
                        socket.on('joinChat', p.nuevoMensaje);
                        socket.on('adminMsg', p.nuevoMensaje);
                        socket.on('leaveChat',p.nuevoMensaje);
                    };

                    p.nuevoMensaje = function (message) {
                        messages.push(message);
                        console.log("Legth "+ messages.length);
                    };

                    p.instertarMensaje = function () {
                        var message = {
                            quien: "YO->"+inputNombre.value(),
                            text: input.value(),
                            x: p.random(p.width/3),
                            y: p.random(p.height/3),
                            textSize: p.random(14,25),
                            r: r,
                            g: g,
                            b: b,
                            t: 255
                        };
                        messages.push(message);
                        input.value("");
                        socket.emit('msg',{message:message, quien:inputNombre.value()});
                        console.log("length: " + messages.length);
                    };

                    p.draw = function () {
                        p.background(0);
                        
                        for(var i = messages.length-1;i>=0;i--){
                            p.fill(messages[i].r,messages[i].g,messages[i].b,messages[i].t);
                            p.textSize(messages[i].textSize);
                            p.text(messages[i].quien+': '+messages[i].text, messages[i].x, messages[i].y);
                            messages[i].y +=1;
                            messages[i].t -=1;
                            if(messages[i].y > p.height-10){
                                messages.splice(i,1);
                            }
                        }
                    };
                };

                return  new p5(chatSketch);

            }
        }

    }

}());