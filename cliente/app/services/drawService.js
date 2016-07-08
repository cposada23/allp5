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
                    var slider,rojo,verde,azul,projo,pverde ,pazul,pcolor, ptam;
                    var col, crojo,cverde,cazul;
                    p.setup = function () {
                        p.createCanvas(screen.width,screen.height);
                        p.background(0);
                        socket.on('mouse', p.newDrawing);
                        ptam = p.createP("Tamaño");
                        ptam.parent('drawingControll');
                        slider = p.createSlider(5,35,15);
                        slider.parent('drawingControll');


                        pcolor = p.createP("Color");
                        pcolor.parent('drawingControll');
                        col = p.color(r,g,b,255);
                        crojo = p.color(255,0,0,255);
                        cverde = p.color(0,255,0,255);
                        cazul = p.color(0,0,255,255);
                        pcolor.style("color", col);
                        pcolor.style('font-size', 2.5+'em');
                        projo = p.createP("Rojo: ");
                        projo.parent('drawingControll');
                        projo.style("color",crojo);
                        rojo = p.createSlider(0,255,r);
                        rojo.parent('drawingControll');

                        pverde = p.createP("Verde: ");
                        pverde.parent('drawingControll');
                        pverde.style("color",cverde);
                        verde = p.createSlider(0,255,g);
                        verde.parent('drawingControll');

                        pazul = p.createP("Azul: ");
                        pazul.parent('drawingControll');
                        pazul.style("color",cazul);
                        azul = p.createSlider(0,255,b);
                        azul.parent('drawingControll');


                        rojo.input(p.cambiarColor);
                        verde.input(p.cambiarColor);
                        azul.input(p.cambiarColor);

                    };

                    p.cambiarColor = function () {
                        r = rojo.value();
                        g = verde.value();
                        b = azul.value();
                        col = p.color(r,g,b,255);

                        pcolor.style('color',col);
                    }
                    p.newDrawing = function (data) {
                        p.noStroke();
                        p.fill(data.r, data.g, data.b);
                        p.ellipse(data.x, data.y, data.size, data.size);
                    };

                    p.mouseDragged = function () {
                        var data= {
                            x :p.mouseX,
                            y : p.mouseY,
                            size: slider.value(),
                            r : r,
                            g : g,
                            b : b
                        };

                        socket.emit('mouse', data);
                        p.noStroke();
                        p.fill(r,g,b);
                        p.ellipse(data.x,data.y,slider.value() ,slider.value());
                    };

                    p.draw = function () {
                    }
                };

                return  new p5(drawSketch);

            }
        }

    }

}());