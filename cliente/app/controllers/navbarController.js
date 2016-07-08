'use strict';

(function () {
    angular.module('p5Sketch').controller('navbarController', navbarController);

    navbarController.$inject = ['fireworkService', 'drawService','chatService'];
    
    function navbarController(fireworkService,drawService,chatService) {
        var vm = this;
        vm.sketch;


        console.log("nav controller");
        vm.createDrawing = function () {
            console.log("Click");
            if  (vm.sketch){
                console.log("click2");
                vm.sketch.remove();
            }
            vm.sketch = drawService.sketch();
        };
        
        vm.createFireworks = function () {
            console.log("Fireworks");
            if  (vm.sketch){
                console.log("click2");
                vm.sketch.remove();
            }
            vm.sketch = fireworkService.sketch();
            
        };

        vm.createChat = function () {
            console.log("Chat");
            if(vm.sketch){
                vm.sketch.remove();
            }
            vm.sketch = chatService.sketch();
        }

        vm.createDrawing();
    }
}());