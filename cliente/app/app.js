'use strict';

(function () {
    /*global angular*/
    /*global io*/
    angular.module('p5Sketch',['ui.router']).config(config).factory('socket', socket);
    
    
    /* app CONFIG */
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('sketch');
        
        $stateProvider
            .state('Sketch',{
                url:'/sketch',
                templateUrl:"cliente/views/sketch.html",
                controller:"sketchController as sketch"
            });
    }
    
    
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