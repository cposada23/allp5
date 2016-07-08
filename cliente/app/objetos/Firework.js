function Firework(p) {
    this.firework = new Particula(p.random(p.width), p.height,p, true);
    this.exploded = false;
    this.particulas = [];

    this.done = function () {
        
        return this.exploded && this.particulas.length===0;
    };

    this.update = function (gravedad) {

        if (!this.exploded){
            this.firework.applyForce(gravedad);
            this.firework.update();

            if(this.firework.vel.y >=0){
                this.exploded = true;
                this.explode();
            }
        }
        else{
            for(var i = this.particulas.length-1; i>=0; i--){
                this.particulas[i].applyForce(gravedad);
                this.particulas[i].update();
                if(this.particulas[i].done()){
                    this.particulas.splice(i,1);
                }
            }
        }

    };

    this.explode = function () {
        for(var i = 0; i<100; i++){
            var particula = new Particula(this.firework.pos.x, this.firework.pos.y,p);
            this.particulas.push(particula);
        }
    }
    this.show = function () {
        if(!this.exploded){
            this.firework.show();
        }

        for(var i = 0; i<this.particulas.length; i++){
            this.particulas[i].show();
        }
    };
}