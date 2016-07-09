'use strict';

(function () {
    angular.module('p5Sketch').controller('navbarController', navbarController);

    navbarController.$inject = ['fireworkService', 'drawService','chatService', 'socket'];
    
    function navbarController(fireworkService,drawService,chatService, socket) {
        var vm = this;
        vm.sketch;
        vm.inChat = false;


        console.log("nav controller");
        vm.createDrawing = function () {

            clean();
            vm.inChat = false;
            vm.sketch = drawService.sketch();
        };
        
        vm.createFireworks = function () {

            clean();
            vm.inChat = false;
            vm.sketch = fireworkService.sketch();
            
        };

        vm.createChat = function () {
            clean();
            vm.sketch = chatService.sketch();
            socket.emit('joinChat', 'hola');
            vm.inChat = true;
        };

        function clean() {
            if (vm.sketch){
                vm.sketch.remove();
            }
            if(vm.inChat){
                vm.inchat = false;
                socket.emit('leaveChat');
            }
        }

        vm.createDrawing();
    }
}());