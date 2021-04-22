class Wall {

    constructor(x1, y1, x2, y2) {
        this.start = new Vec2(x1, y1);
        this.end = new Vec2(x2, y2);
    }

    display () {
        stroke(color(0, 160, 0));
        strokeWeight(8);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

}