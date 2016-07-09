'use strict';

(function () {
    /*global angular*/
    /*global io*/
    angular
        .module('p5Sketch',['ui.router', 'ngCookies'])
        .config(config)
        .factory('socket', socket)
        .factory('authInterceptor', authInterceptor);
    
    /* authInterceptor */

    authInterceptor.$inject=['$rootScope','$q','$cookieStore' , '$location'];
    function authInterceptor($rootScope,$q,$cookieStore , $location) {
        return {
            request: function (config) {
                config.headers = config.headers||{};
                if($cookieStore.get('token')){
                    config.headers.Authorization = 'Bearer '+ $cookieStore.get('token');
                }
                return config;
            },
            response:function (response) {
                if (response.status === 401){
                    console.log("No autorizado");
                }

                return response || $q.when(response);
            }
        };
    }


    /* app CONFIG */
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
    function config($stateProvider, $urlRouterProvider, $httpProvider) {

        /* Routes */
        $urlRouterProvider.otherwise('home');
        $httpProvider.interceptors.push('authInterceptor');
        $stateProvider
            
            .state('Fireworks',{
                url:'/fireworks',
                templateUrl:"cliente/app/projects/fireworks/fireworks.html",
                controller:"fireworkController as firework"
            }).state('Home',{
                url:'/home',
                templateUrl:"cliente/views/sketch.html"
            }).state('Autenticated',{
                url:'/autenticar',
                templateUrl:"cliente/views/auth.html",
                controller:"authController as auth"
            });
    }


    /* Auth interceptor */
    /*authInterceptor.$inject = ['$rootScope', '$q', '$cookieSore', '$location'];
    function authInterceptor($rootScope, $q, $cookieSore, $location) {

    };*/



    /* Socket factory */
    socket.$inject = ['$rootScope'];
    function socket($rootScope) {
          var socket = io.connect();
          return {
            on: function (eventName, callback) {
              socket.on(eventName, function () {  
                var args = arguments;
                $rootScope.$apply(function () {
                  callback.apply(socket, args);
                });
              });
            },
            emit: function (eventName, data, callback) {
              socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  if (callback) {
                    callback.apply(socket, args);
                  }
                });
              })
            }
          };
        }
}());