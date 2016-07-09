'use strict';
(function () {
    angular.module('p5Sketch').controller('authController', authController);

    authController.$inject  = ['$http', '$cookieStore'];
    
    function authController($http, $cookieStore) {
        console.log("authcontroller");

        var vm = this;
        vm.usuario = {};
        vm.autenticar = function () {
            console.log("autenticando " + JSON.stringify(vm.usuario));
            $http.post('/api/usuario/autenticate', vm.usuario).success(function (response) {
                console.log("hola  " + JSON.stringify(response));
                $cookieStore.put('token',response.token );
            }).error(function (error) {
                console.log("error");
                console.error(error);
            });
        }
        
        vm.verificarAuth = function () {
            console.log("verificando " + $cookieStore.get('token'));
            $http.get('/api/usuario/me').success(function (response) {
                console.log("hola  " + JSON.stringify(response));
            }).error(function (error) {
                console.log("error");
                console.error(error);
            });
        }
    }
    
}());
