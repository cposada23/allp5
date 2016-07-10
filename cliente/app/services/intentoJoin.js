'use strict';

(function () {
    angular.module('p5Sketch').factory('intentoService', intentoService);
    
    
    intentoService.$inject = ['notificationService'];
    function intentoService(notificationService) {
        return{
            conectIntento:function (namespace,tok) {
                var t = true;
                console.log("Token en intento server "  + tok );
                
                while(t){
                    var socket = io.connect(namespace,{
                        'query': 'token=' + tok
                    });
                    window.sleep(1);
                    socket.on('connect', function () {
                        t = false;
                    });
                }
                
                

                console.log("intentoservice");

                
                socket.on("unauthorized", function(error) {
                    if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
                        // redirect user to login page perhaps?
                        console.log("User's token has expired");
                        notificationService.error('La session expiro');

                    }
                });

                socket.on('intento',intento);

                function intento(data) {
                    console.log("data en el intento service " +data);
                    notificationService.success(data);
                }
                
                return socket;

            }
        }
    }
    
}());