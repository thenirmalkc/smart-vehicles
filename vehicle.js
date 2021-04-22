class Vehicle {

    constructor(x, y, lifespan) {
        this.dead = false;

        this.pos = new Vec2(x, y);
        this.vel = new Vec2(0, 0);
        this.acc = new Vec2(0, 0);
        this.dna;
        
        this.mass = 1;

        this.maxSpeed = 1.5;
        this.maxForce = 0.05;
    }

    calc_SteeringForce(time) {
        let desVel = this.dna.genes[time];
        desVel.setMag(this.maxSpeed);

        let sf = Vec2.sub(desVel, this.vel);
        sf.limit(this.maxForce);

        return sf;
    }

    applyForce(force) {
        // force = mass * acceleration
        this.acc = force.div(this.mass);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.mult(0);
    }

    display() {
        const vel = this.vel.copy();

        if (vel.x == 0 && vel.y == 0)
            vel.set(0, -1);

        vel.setMag(8);

        const p2 = Vec2.add(this.pos, vel);
        const p1 = Vec2.add(this.pos, vel.copy().mult(-1).rotate( 0.4));
        const p3 = Vec2.add(this.pos, vel.copy().mult(-1).rotate(-0.4));

        noStroke();
        fill(color(240, 120));
        triangle(
            p1.x, p1.y,
            p2.x, p2.y,
            p3.x, p3.y
        );
    }

}