'use strict';
(function () {
    angular.module('p5Sketch').controller('authController', authController);

    authController.$inject  = ['$http', '$cookieStore', 'notificationService','SocketFactory','intentoService'];
    
    function authController($http, $cookieStore, notificationService, SocketFactory,intentoService) {
        console.log("authcontroller");

        var vm = this;
        vm.usuario = {};
        vm.otroSocket;
        vm.otromas;
        vm.autenticar = function () {
            console.log("autenticando " + JSON.stringify(vm.usuario));
            $http.post('/api/usuario/autenticate', vm.usuario).success(function (response) {
                console.log("hola  " + JSON.stringify(response));
                $cookieStore.put('token',response.token );
                notificationService.success('Autenticado');
            }).error(function (error) {
                console.log("error");
                console.error(error);
                notificationService.error('mal usuario');
            });
        };

        vm.conectarSocket = function () {
            console.log("conectando socket");
            vm.otroSocket = intentoService.conectIntento('/hola2', $cookieStore.get('token'));
            console.log("debio de haber conectado");
        };


        vm.verificarCon = function () {
            console.log("verificando coneccion a namespace");
            vm.otroSocket.emit('intento','hola intento');
            console.log("emitido");
        };
        vm.verificarAuth = function () {
            console.log("verificando " + $cookieStore.get('token'));
            $http.get('/api/usuario/me').success(function (response) {
                console.log("hola  " + JSON.stringify(response));
                /*var query = {'query': 'token='+$cookieStore.get('token')};
                console.log(query);
                vm.otroSocket = intentoService.conectIntento('/hola2',query);*/
                /*vm.otroSocket = SocketFactory.conect('/hola2', query);
                intentoService.conectIntento(vm.otroSocket);*/

            }).error(function (error) {
                console.error("Error " + error);
            });
        };
        
        vm.verificarAdmin = function () {
            console.log("verificando que es admin");
            $http.get('/api/usuario/admin').success(function (response) {
                console.log("correcto " + JSON.stringify(response));

            }).error(function (error) {
                console.error("Error " + error);
            });
        }
    }
    
}());
