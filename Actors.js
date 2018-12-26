class SpaceShip extends BaseObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.rotate = 0.0;
        this.speed = 3;
        this.reload = 0;
        this.hp = 5;
    }


}

class Bullet extends BaseObject {
    constructor(x, y, rotate) {
        super();
        this.x = x;
        this.y = y;
        this.rotate = rotate;
        this.radius = 3;
        this.speed = 5;
        this.ttl = 1000;
    }
}

class Meteor extends BaseObject {
    constructor(x, y, rotate) {
        super();
        this.x = x;
        this.y = y;
        this.rotate = rotate;
        this.radius = 8;
        this.speed = 2;
        this.hp = 10;
    }
}
