'use strict';

(function () {
    angular.module('p5Sketch').factory('fireworkService', fireworkService);

    fireworkService.$inject = [];

    function fireworkService() {
        return {
            sketch:function () {
                var fireworkSketch = function (p) {

                    var ancho =  400, alto = 300;
                    var button;
                    var fireworks = [];
                    var gravedad;
                    p.setup = function () {
                        p.createCanvas(ancho,alto);
                        p.createP();
                        button = p.createButton("Firework!!");
                        button.mouseClicked(p.sendFirework);
                        gravedad = p.createVector(0,0.2);
                        fireworks.push(new Firework(p));
                        p.stroke(255);
                        p.strokeWeight(4);
                    };

                    p.sendFirework = function () {
                        fireworks.push(new Firework(p));
                    };
                    p.draw = function () {
                        p.background(0,25);

                        /*if(p.random(1) <0.1){
                         fireworks.push(new Firework(p));
                         }*/
                        for(var i = fireworks.length -1; i>=0;i--) {
                            fireworks[i].update(gravedad);
                            fireworks[i].show();
                            if(fireworks[i].done()){
                                fireworks.splice(i,1);
                            }
                        }

                    }
                };

                return  new p5(fireworkSketch);

            }
        }

    }

}());