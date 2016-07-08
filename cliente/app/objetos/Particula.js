
/**
 * Created by cposa on 7/07/2016.
 */

function Particula(x,y, p, firework) {
    this.pos = p.createVector(x,y);
    this.firework = firework;
    this.lifespan = 255;
    if(this.firework){
        this.vel = p.createVector(0,(p.random(-10,-8)));
    }
    else{
        this.vel = p5.Vector.random2D();
        this.vel.mult(p.random(2,8));
    }

    this.acc = p.createVector(0,0);

    this.applyForce = function (force) {
        this.acc.add(force);
    };

    this.update = function () {
        if(!this.firework){
            this.vel.mult(0.9);
            this.lifespan -=4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };

    this.done = function () {
        return this.lifespan<0;
    };

    this.show = function () {
        if(!this.firework){
            p.strokeWeight(2);
            p.stroke(255, this.lifespan);
        }else{
            p.strokeWeight(4);
            p.stroke(255);
        }
        p.point(this.pos.x, this.pos.y);
    };
}
