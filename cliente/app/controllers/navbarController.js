'use strict';

(function () {
    angular.module('p5Sketch').controller('navbarController', navbarController);

    navbarController.$inject = ['fireworkService', 'drawService'];
    
    function navbarController(fireworkService,drawService) {
        var vm = this;
        vm.sketch;


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
    }
}());