'use strict';

(function () {
   angular.module('p5Sketch').factory('drawService', drawService);

    drawService.$inject = ['socket'];

    function drawService(socket) {
        return {
            sketch:function () {
                var drawSketch = function (p) {
                    var r = p.random(0,255);
                    var g = p.random(0,255);
                    var b = p.random(0,255);

                    p.setup = function () {
                        p.createCanvas(screen.width,screen.height);
                        p.background(0);
                        socket.on('mouse', p.newDrawing);
                    };

                    p.newDrawing = function (data) {
                        p.noStroke();
                        p.fill(data.r, data.g, data.b);
                        p.ellipse(data.x, data.y, 20, 20);
                    };

                    p.mouseDragged = function () {
                        var data= {
                            x :p.mouseX,
                            y : p.mouseY,
                            r : r,
                            g : g,
                            b : b
                        };

                        socket.emit('mouse', data);
                        p.noStroke();
                        p.fill(r,g,b);
                        p.ellipse(data.x,data.y,20 ,20);
                    };

                    p.draw = function () {
                    }
                };

                return  new p5(drawSketch);

            }
        }

    }

}());