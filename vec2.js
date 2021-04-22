class Vec2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vec2(this.x, this.y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    div(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    normalize() {
        this.div(this.mag());
        return this;
    }

    setMag(scalar) {
        this.normalize();
        this.mult(scalar);
        return this;
    }

    rotate(angle) {
        this.set(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
        return this;
    }

    angle(vec) {
        return Math.acos(Vec2.dot(this, vec) / (this.mag() * vec.mag()));
    }

    proj(vec) {
        vec = vec.copy();
        vec.mult(Vec2.dot(this, vec) / Vec2.dot(vec, vec));
        return vec;
    }

    limit(scalar) {
        if (this.mag() > scalar)
            this.setMag(scalar);
        return this;
    }


    // Static Methods
    static add(vec1, vec2) {
        return new Vec2(vec1.x, vec1.y)
            .add(vec2);
    }

    static sub(vec1, vec2) {
        return new Vec2(vec1.x, vec1.y)
            .sub(vec2);
    }

    static mult(vec, scalar) {
        return new Vec2(vec.x, vec.y)
            .mult(scalar);
    }

    static div(vec, scalar) {
        return new Vec2(vec.x, vec.y)
            .div(scalar);
    }

    static dist(vec1, vec2) {
        return Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2));
    }

    static dot(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }

    static random() {
        return new Vec2(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }
    
}