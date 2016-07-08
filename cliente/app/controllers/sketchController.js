'use strict';
(function () {
   angular.module('p5Sketch').controller('sketchController', sketchController);
    
    sketchController.$inject = ['$scope'];
    function sketchController($scope) {
        var vm = this;
        $scope.saludo = "Hola desde sketch controller";


        var sketch = function (p) {

            var xwidth = 640;
            var yheight = 480;
            var video;
            var vScale = 16;
            var input;
            var particle;
            //p.text = "";
            //var x = xwidth/2, y = yheight/2;
            p.setup = function () {
                p.createCanvas(xwidth, yheight);
                p.pixelDensity(1);
                video = p.createCapture(p.VIDEO);
                video.size(p.width/vScale,p.height/vScale);
                //input = p.createInput("Hola");
                //input.changed(p.textChanged);
                particle = new Particle(320,240,p);

                //
            };

            /*p.textChanged = function () {
                console.log("text changed");
                vm.saludo = input.value();
                p.text = input.value();
                console.log("vm " +  vm.saludo);
            };*/
            /*p.mouseDragged = function () {
                p.fill(51,51,255);
                p.noStroke();
                p.ellipse(p.mouseX,p.mouseY,10,10);
            };*/
            p.draw = function () {
                p.background(26);
                particle.update();
                particle.show();
                /*video.loadPixels();

                for(var y = 0; y<video.height; y++){
                    for(var x = 0; x<video.width; x++){
                        var index = (x+y*video.width)*4;
                        var r = video.pixels[index+0];
                        var g = video.pixels[index+0];
                        var b = video.pixels[index+0];
                        var brigth = (r+g+b)/3;
                        p.fill(brigth);
                        p.ellipse(x*vScale, y*vScale, vScale, vScale);

                    }
                }*/


                /*p.fill(255,0,200,25);
                p.noStroke();
                p.ellipse(x,y,50,50);
                x = (x + p.random(-10,10))%width;
                y = (y + p.random(-10,10))%height;*/
            };
        };

        var myP5 = new p5(sketch);



        //setInterval(reset,5000);

        function reset() {
            myP5.background(51);
            console.log("reset" +  myP5.text);

            console.log("$scope" +  $scope.saludo);
        }
    }
    
    
}());