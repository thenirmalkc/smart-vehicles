class Target {

    constructor(x, y) {
        this.pos = new Vec2(x, y)
    }

    display() {
        noStroke();
        fill(color(255, 0, 0));
        circle(this.pos.x, this.pos.y, 8);
    }

}