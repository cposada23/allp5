/**
 * Created by cposa on 7/07/2016.
 */
function Particle(x,y,p) {
    this.x = x;
    this.y = y;

    this.update = function () {
        this.x += p.random(-10,10);
        this.y += p.random(-10,10);
    }

    this.show = function () {
        console.log("llamado");
        p.noStroke();
        p.fill(255,15,45);
        p.ellipse(this.x,this.y,24,24);
    }
}